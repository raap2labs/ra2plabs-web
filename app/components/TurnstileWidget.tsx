"use client";

import { useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        opts: {
          sitekey: string;
          theme?: string;
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
        },
      ) => string;
      reset: (container: HTMLElement) => void;
      remove: (container: HTMLElement) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

const SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
  "1x00000000000000000000AA";

interface TurnstileWidgetProps {
  onToken: (token: string | null) => void;
  onError?: () => void;
}

export default function TurnstileWidget({ onToken, onError }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  const init = useCallback(() => {
    if (!window.turnstile || !containerRef.current) return;
    widgetId.current = window.turnstile.render(containerRef.current, {
      sitekey: SITE_KEY,
      theme: "dark",
      callback: (token: string) => onToken(token),
      "error-callback": () => {
        onToken(null);
        onError?.();
      },
      "expired-callback": () => {
        onToken(null);
        if (containerRef.current && window.turnstile) {
          window.turnstile.reset(containerRef.current);
        }
      },
    });
  }, [onToken, onError]);

  useEffect(() => {
    init();
    const el = containerRef.current;
    return () => {
      if (el && window.turnstile) {
        window.turnstile.remove(el);
      }
    };
  }, [init]);

  return <div ref={containerRef} />;
}
