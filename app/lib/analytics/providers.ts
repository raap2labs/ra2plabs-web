import type { EventName, EventProps } from "./events";

export type AnalyticsProvider = "plausible" | "umami" | "google";

type ProviderImpl = (name: EventName, props?: EventProps) => void;

const plausible: ProviderImpl = (name, props) => {
  if (typeof window === "undefined") return;
  const p = (window as unknown as Record<string, unknown>).plausible as
    | ((event: string, opts?: { props?: Record<string, unknown> }) => void)
    | undefined;
  p?.(name, { props: props as Record<string, unknown> });
};

const umami: ProviderImpl = (name, props) => {
  if (typeof window === "undefined") return;
  const u = (window as unknown as Record<string, unknown>).umami as
    | ((event: string, data?: Record<string, unknown>) => void)
    | undefined;
  u?.(name, props as Record<string, unknown>);
};

const google: ProviderImpl = (name, props) => {
  if (typeof window === "undefined") return;
  const g = (window as unknown as Record<string, unknown>).gtag as
    | ((cmd: string, event: string, opts?: Record<string, unknown>) => void)
    | undefined;
  g?.("event", name, props as Record<string, unknown>);
};

const PROVIDER_MAP: Record<AnalyticsProvider, ProviderImpl> = {
  plausible,
  umami,
  google,
};

let enabledProviders: AnalyticsProvider[] = [];

export function initProviders(): void {
  const raw = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || "";
  enabledProviders = raw
    .split(",")
    .map((s) => s.trim().toLowerCase() as AnalyticsProvider)
    .filter((p) => p === "plausible" || p === "umami" || p === "google");
}

export function trackEvent(name: EventName, props?: EventProps): void {
  if (enabledProviders.length === 0) return;
  enabledProviders.forEach((provider) => PROVIDER_MAP[provider](name, props));
}
