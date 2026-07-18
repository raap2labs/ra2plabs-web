"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  initProviders,
  trackEvent,
  trackPageView,
  type AnalyticsProvider,
  type EventProps,
} from "../lib/analytics";
import { useScrollDepth } from "../lib/analytics/hooks";

const SCRIPT_SRC: Record<string, string> = {
  plausible: "https://plausible.io/js/script.js",
  umami: "https://cloud.umami.is/script.js",
  google: "https://www.googletagmanager.com/gtag/js",
};

const CSP_DOMAINS: Record<string, string[]> = {
  plausible: ["plausible.io"],
  umami: ["cloud.umami.is"],
  google: ["www.googletagmanager.com", "www.google-analytics.com"],
};

export function getAnalyticsCSPDomains(): string[] {
  const raw = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || "";
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((p) => p === "plausible" || p === "umami" || p === "google")
    .flatMap((p) => CSP_DOMAINS[p] || []);
}

export default function AnalyticsProvider() {
  const pathname = usePathname();

  useScrollDepth();

  useEffect(() => {
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    const raw = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || "";
    const providers = raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter((p): p is AnalyticsProvider =>
        p === "plausible" || p === "umami" || p === "google"
      );

    if (providers.length === 0) return;

    initProviders();

    providers.forEach((provider) => {
      if (document.querySelector(`script[data-analytics="${provider}"]`)) return;

      const script = document.createElement("script");
      script.setAttribute("data-analytics", provider);
      script.defer = true;
      script.async = true;

      if (provider === "umami") {
        const id = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
        if (!id) return;
        script.src =
          process.env.NEXT_PUBLIC_UMAMI_SRC || SCRIPT_SRC.umami;
        script.setAttribute("data-website-id", id);
      } else if (provider === "google") {
        const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
        if (!id) return;
        script.src = `${SCRIPT_SRC.google}?id=${id}`;
      } else {
        script.src =
          process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || SCRIPT_SRC.plausible;
      }

      document.head.appendChild(script);

      if (provider === "google") {
        const gtagScript = document.createElement("script");
        gtagScript.setAttribute("data-analytics", "google-init");
        gtagScript.textContent = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""}');
        `;
        document.head.appendChild(gtagScript);
      }
    });

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-analytics]");
      if (!target) return;

      const el = target as HTMLElement;
      const eventName = el.getAttribute("data-analytics");
      if (!eventName) return;

      const props: EventProps = {};
      for (const attr of el.attributes) {
        if (attr.name.startsWith("data-analytics-")) {
          const key = attr.name.replace("data-analytics-", "");
          props[key] = attr.value;
        }
      }

      trackEvent(eventName as Parameters<typeof trackEvent>[0], props);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
