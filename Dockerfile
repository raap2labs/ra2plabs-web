# ─────────────────────────────────────────────────────────
# Stage 1: Install dependencies
# ─────────────────────────────────────────────────────────
FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM deps AS deps-dev
RUN npm ci

# ─────────────────────────────────────────────────────────
# Stage 2: Lint, type-check, and build
# ─────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps-dev /app/node_modules ./node_modules
COPY . .

RUN npm run lint
RUN npx tsc --noEmit
RUN npm run build

# ─────────────────────────────────────────────────────────
# Stage 3: Production runner
# ─────────────────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nextjs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nextjs /app/public ./public
COPY --from=builder --chown=nextjs:nextjs /app/.next ./.next
COPY --from=builder --chown=nextjs:nextjs /app/package.json ./package.json
COPY --from=deps --chown=nextjs:nextjs /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["npm", "start"]
