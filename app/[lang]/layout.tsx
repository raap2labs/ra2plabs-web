import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { SITE } from "../lib/constants";
import { locales, type Locale } from "./locales";
import { getDictionary } from "./dictionaries";
import { hasLocale } from "./locales";
import { LanguageProvider } from "../components/LanguageProvider";
import NexusChatWrapper from "../components/NexusChatWrapper";
import AnalyticsProvider from "../components/AnalyticsProvider";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang);
  const t = dict.site as { name: string; description: string };
  const og = dict.og as { title: string; description: string };
  const siteUrl = SITE.url;

  return {
    title: {
      default: `${t.name} | ${og.title}`,
      template: `%s | ${t.name}`,
    },
    description: t.description,
    metadataBase: new URL(siteUrl),
    openGraph: {
      type: "website",
      locale: lang === "es" ? "es_MX" : "en_US",
      siteName: t.name,
      title: `${t.name} | ${og.title}`,
      description: og.description,
      url: siteUrl,
      images: [
        { url: `${siteUrl}/${lang}/opengraph-image.png`, width: 1200, height: 630 },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t.name} | ${og.title}`,
      description: og.description,
      images: [`${siteUrl}/${lang}/opengraph-image.png`],
    },
    robots: { index: true, follow: true },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.ico", sizes: "32x32" }],
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
    keywords: [
      "desarrollo web",
      "inteligencia artificial",
      "automatización",
      "software",
      "marketing digital",
      "RA2P Labs",
    ],
    alternates: {
      languages: {
        es: `${siteUrl}/es`,
        en: `${siteUrl}/en`,
      },
    },
    manifest: "/manifest.webmanifest",
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const t = dict.site as { name: string };

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#0A192F" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={t.name} />
      </head>
      <body className="bg-background text-foreground font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: t.name,
              url: SITE.url,
              description: dict.site.description,
              email: SITE.email,
              foundingDate: SITE.foundingDate,
              sameAs: [],
              knowsAbout: [
                "Desarrollo Web",
                "Inteligencia Artificial",
                "Automatización",
                "Marketing Digital",
              ],
            }),
          }}
        />
        <LanguageProvider lang={lang as Locale} dict={dict as Record<string, unknown>}>
          {children}
        </LanguageProvider>
        <NexusChatWrapper />
        <AnalyticsProvider />
        <Script
          id="sw-register"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' });
  });
}
`,
          }}
        />
      </body>
    </html>
  );
}
