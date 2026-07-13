import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE } from "./lib/constants";
import NexusChat from "./components/NexusChat";
import AnalyticsProvider from "./components/AnalyticsProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | Software, IA y Automatización`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: SITE.name,
    title: `${SITE.name} | Software, IA y Automatización`,
    description:
      "Desarrollamos software, inteligencia artificial y automatización para impulsar tu empresa.",
    url: SITE.url,
    images: [{ url: `${SITE.url}/opengraph-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Software, IA y Automatización`,
    description:
      "Desarrollamos software, inteligencia artificial y automatización para impulsar tu empresa.",
    images: [`${SITE.url}/opengraph-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "desarrollo web",
    "inteligencia artificial",
    "automatización",
    "software",
    "marketing digital",
    "RA2P Labs",
    "agente IA",
    "automatización de procesos",
    "transformación digital",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-background text-foreground font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE.name,
              url: SITE.url,
              description:
                "Empresa de desarrollo de software, inteligencia artificial y automatización.",
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
        {children}
        <NexusChat />
        <AnalyticsProvider />
      </body>
    </html>
  );
}
