"use client";

import { useEffect, useRef } from "react";

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
  const onTokenRef = useRef(onToken);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onTokenRef.current = onToken;
    onErrorRef.current = onError;
  });

  useEffect(() => {
    const init = () => {
      if (!window.turnstile || !containerRef.current) return;
      window.turnstile.render(containerRef.current, {
        sitekey: SITE_KEY,
        theme: "dark",
        callback: (token: string) => onTokenRef.current?.(token),
        "error-callback": () => {
          onTokenRef.current?.(null);
          onErrorRef.current?.();
        },
        "expired-callback": () => {
          onTokenRef.current?.(null);
          if (containerRef.current && window.turnstile) {
            window.turnstile.reset(containerRef.current);
          }
        },
      });
    };

    if (window.turnstile) {
      init();
    } else {
      const prev = window.onTurnstileLoad;
      window.onTurnstileLoad = () => {
        prev?.();
        init();
      };
      if (!document.querySelector('script[src*="turnstile"]')) {
        const s = document.createElement("script");
        s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad&render=explicit";
        s.async = true;
        s.defer = true;
        document.head.appendChild(s);
      }
    }

    const el = containerRef.current;
    return () => {
      if (el && window.turnstile) {
        window.turnstile.remove(el);
      }
    };
  }, []);

  return <div ref={containerRef} />;
}
