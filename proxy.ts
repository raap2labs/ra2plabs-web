import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["es", "en"];
const DEFAULT_LOCALE = "es";

function getLocale(request: NextRequest): string {
  const acceptLang = request.headers.get("accept-language") || "";
  if (acceptLang.startsWith("en")) return "en";
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname !== "/admin/auth") {
      /*
       * ─── AUTHENTICATION ──────────────────────────────────
       * When ready, uncomment and configure:
       *
       *   const session = request.cookies.get("session");
       *   if (!session) {
       *     const login = new URL("/admin/auth", request.url);
       *     login.searchParams.set("redirect", pathname);
       *     return NextResponse.redirect(login);
       *   }
       *
       *   const isValid = await validateSession(session.value);
       *   if (!isValid) {
       *     const login = new URL("/admin/auth", request.url);
       *     return NextResponse.redirect(login);
       *   }
       */
    }
  }

  const hasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!hasLocale && !pathname.startsWith("/_next") && !pathname.startsWith("/admin") && pathname !== "/sw.js" && pathname !== "/manifest.webmanifest" && pathname !== "/favicon.ico" && pathname !== "/favicon.svg" && pathname !== "/logo-icon.png" && pathname !== "/logo.png" && pathname !== "/robots.txt" && pathname !== "/sitemap.xml") {
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin",
  );
  response.headers.set(
    "Permissions-Policy",
    [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "interest-cohort=()",
      "payment=()",
      "usb=()",
      "bluetooth=()",
      "midi=()",
    ].join(", "),
  );

  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    "https://challenges.cloudflare.com",
    "https://plausible.io",
    "https://cloud.umami.is",
    "https://www.googletagmanager.com",
  ].join(" ");

  const connectSrc = [
    "'self'",
    "https://plausible.io",
    "https://cloud.umami.is",
    "https://www.google-analytics.com",
  ].join(" ");

  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      `script-src ${scriptSrc}`,
      "style-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
      "frame-src 'self' https://challenges.cloudflare.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      `connect-src ${connectSrc}`,
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
    ].join("; "),
  );

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
