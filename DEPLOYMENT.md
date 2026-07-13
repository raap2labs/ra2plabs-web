# Deployment Guide

## Folder Structure

```
ra2plabs-web/
├── .github/
│   └── workflows/
│       └── ci.yml              # CI pipeline
├── app/                         # Next.js App Router pages & API
├── public/                      # Static assets
├── Dockerfile                   # Multi-stage Docker build
├── DEPLOYMENT.md                # This file
├── next.config.ts               # Next.js configuration
├── proxy.ts                     # Security headers middleware
├── package.json
├── tsconfig.json
├── .nvmrc                       # Node.js version (22)
├── .env.example                 # Environment variable reference
└── .gitignore
```

---

## CI Workflow (`.github/workflows/ci.yml`)

Triggered on `push` and `pull_request` to `main`.

**Steps:**
1. **Checkout** — clone repo
2. **Setup Node.js** — reads `.nvmrc` for version, enables `npm` cache
3. **Install dependencies** — `npm ci` (clean install, respects lockfile)
4. **Cache Next.js build** — `.next/cache` keyed on lockfile + source hash
5. **Lint** — `npm run lint` (fail-fast pipeline if errors)
6. **Type check** — `npx tsc --noEmit`
7. **Build** — `npm run build` (fail-fast pipeline if errors)
8. **Upload artifact** — only on `main` branch; saves `.next`, `public`, `package.json`, `next.config.ts`

**Concurrency:** Cancels in-progress runs for the same branch to save CI minutes.

**Fail conditions** (pipeline stops immediately):
- `npm run lint` exits with non-zero
- `npm run build` exits with non-zero

---

## Vercel

The recommended deployment target for Next.js.

[1] **Prerequisites**
  - Git repository (GitHub, GitLab, or Bitbucket)
  - Vercel account (vercel.com)

[2] **Steps**
  1. Go to [vercel.com/new](https://vercel.com/new)
  2. Import the `ra2plabs/ra2plabs-web` repository
  3. Framework preset is auto-detected: **Next.js**
  4. Add environment variables (see `.env.example`):
     - `NEXT_PUBLIC_SITE_URL`
     - `NEXT_PUBLIC_CONTACT_EMAIL`
     - `NEXT_PUBLIC_WHATSAPP_NUMBER`
     - `NEXT_PUBLIC_ANALYTICS_PROVIDER` (optional)
     - `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional)
     - `NEXT_PUBLIC_CALENDLY_URL` (optional)
     - `EMAIL_PROVIDER`, `EMAIL_API_KEY`, `EMAIL_FROM` (optional, for contact form)
  5. Click **Deploy**
  6. Vercel runs `next build` and deploys automatically on every `git push` to `main`
  7. Enable [Preview Deployments](https://vercel.com/docs/deployments/preview-deployments) for PRs

[3] **Custom domain** (optional)
  - In Vercel dashboard → Project → Domains
  - Add your domain (e.g., `ra2plabs.com`)
  - Update DNS records as instructed

[4] **Monitoring**
  - Vercel Analytics: enable in Dashboard → Analytics
  - Vercel Speed Insights: enable in Dashboard → Speed Insights
  - Logs: Dashboard → Logs

---

## Docker

Suitable for any container orchestration platform (Docker Compose, Kubernetes, AWS ECS, etc.).

[1] **Build**
```bash
docker build -t ra2plabs-web .
```

[2] **Run**
```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://example.com \
  -e NEXT_PUBLIC_CONTACT_EMAIL=ceo@example.com \
  -e NEXT_PUBLIC_WHATSAPP_NUMBER=68345701 \
  ra2plabs-web
```

[3] **Docker Compose** (`compose.yml`)
```yaml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      NEXT_PUBLIC_SITE_URL: https://example.com
      NEXT_PUBLIC_CONTACT_EMAIL: ceo@example.com
      NEXT_PUBLIC_WHATSAPP_NUMBER: "68345701"
    restart: unless-stopped
```
Run:
```bash
docker compose up -d
```

[4] **Image size optimization**
  - The multi-stage Dockerfile uses `node:22-alpine` for all stages
  - Only production `node_modules` are copied to the final image
  - Dev dependencies, source maps, and build cache are excluded

---

## Self-hosted Linux

For VPS or bare-metal servers without Docker.

[1] **Prerequisites**
  - Linux server (Ubuntu 22.04+ or Debian 12+ recommended)
  - Node.js 22.x
  - A reverse proxy (Caddy, Nginx, or Traefik) for SSL/domain
  - Process manager (PM2 recommended)

[2] **Install Node.js 22**
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version   # should print v22.x
```

[3] **Clone & build**
```bash
git clone https://github.com/ra2plabs/ra2plabs-web.git
cd ra2plabs-web
cp .env.example .env.local
# Edit .env.local with your values
npm ci
npm run build
```

[4] **Run with PM2**
```bash
npm install -g pm2
pm2 start npm --name "ra2plabs-web" -- start
pm2 save
pm2 startup   # follow the printed instructions for auto-start on reboot
```

[5] **Reverse proxy (Caddy)** — Recommended, auto HTTPS
```caddyfile
ra2plabs.com {
    reverse_proxy localhost:3000
}
```

[6] **Reverse proxy (Nginx)**
```nginx
server {
    listen 80;
    server_name ra2plabs.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name ra2plabs.com;

    ssl_certificate /etc/letsencrypt/live/ra2plabs.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ra2plabs.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

[7] **Environment variables**
Create `/opt/ra2plabs-web/.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://ra2plabs.com
NEXT_PUBLIC_CONTACT_EMAIL=ceo@ra2plabs.com
NEXT_PUBLIC_WHATSAPP_NUMBER=68345701
# Add optional vars as needed
```

[8] **Systemd service** (alternative to PM2)
```ini
# /etc/systemd/system/ra2plabs-web.service
[Unit]
Description=RA2P Labs Web
After=network.target

[Service]
Type=simple
User=node
WorkingDirectory=/opt/ra2plabs-web
ExecStart=/usr/bin/npm start
Restart=always
Environment=NODE_ENV=production
EnvironmentFile=/opt/ra2plabs-web/.env.local

[Install]
WantedBy=multi-user.target
```
```bash
sudo systemctl daemon-reload
sudo systemctl enable ra2plabs-web
sudo systemctl start ra2plabs-web
```

[9] **Security**
  - Run as non-root user (the Dockerfile already uses `nextjs` user)
  - Keep the server updated: `apt update && apt upgrade && npm update`
  - Use a firewall: `ufw allow 80,443/tcp`
  - Monitor with `pm2 monit` or `journalctl -u ra2plabs-web`
