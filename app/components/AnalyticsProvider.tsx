"use client";

import { useEffect } from "react";
import { initProviders, trackEvent, type AnalyticsProvider, type EventProps } from "../lib/analytics";
import { useScrollDepth } from "../lib/analytics/hooks";

type ScriptConfig = {
  src: string;
  attrs?: Record<string, string>;
  check: string;
};

const SCRIPTS: Record<AnalyticsProvider, ScriptConfig> = {
  plausible: {
    src: "https://plausible.io/js/script.js",
    check: "plausible",
  },
  umami: {
    src: "https://cloud.umami.is/script.js",
    attrs: { "data-website-id": "UMAMI_WEBSITE_ID" },
    check: "umami",
  },
  google: {
    src: "https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID",
    check: "gtag",
  },
};

export default function AnalyticsProvider() {
  useScrollDepth();

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
      const config = SCRIPTS[provider];
      if (!config) return;

      if (document.querySelector(`script[data-analytics="${provider}"]`)) return;
      if ((window as unknown as Record<string, unknown>)[config.check]) return;

      const script = document.createElement("script");
      script.setAttribute("data-analytics", provider);
      script.defer = true;
      script.src = resolveSrc(provider);

      if (config.attrs) {
        Object.entries(config.attrs).forEach(([key, val]) => {
          const envVal = process.env[`NEXT_PUBLIC_${val}`];
          if (envVal) script.setAttribute(key, envVal);
        });
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

function resolveSrc(provider: AnalyticsProvider): string {
  switch (provider) {
    case "plausible":
      return process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || "https://plausible.io/js/script.js";
    case "umami":
      return process.env.NEXT_PUBLIC_UMAMI_SRC || "https://cloud.umami.is/script.js";
    case "google":
      const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
      return id
        ? `https://www.googletagmanager.com/gtag/js?id=${id}`
        : "https://www.googletagmanager.com/gtag/js";
  }
}
