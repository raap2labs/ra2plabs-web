"use client";

import { useEffect, useRef } from "react";
import { trackEvent, EVENTS } from "./index";

export function useScrollDepth() {
  const tracked = useRef<Set<number>>(new Set());

  useEffect(() => {
    const thresholds = [25, 50, 75, 100];
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (docHeight <= 0) return;
          const pct = Math.round((scrollTop / docHeight) * 100);

          thresholds.forEach((t) => {
            if (pct >= t && !tracked.current.has(t)) {
              tracked.current.add(t);
              trackEvent(EVENTS.SCROLL_DEPTH, { percent: t });
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
