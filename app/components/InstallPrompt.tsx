"use client";

import { useState, useEffect } from "react";

function getIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as unknown as Record<string, unknown>).MSStream;
}

function getStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(display-mode: standalone)").matches;
}

export default function InstallPrompt() {
  const [isIOS] = useState(getIOS);
  const [isStandalone] = useState(getStandalone);

  useEffect(() => {
    if (!isStandalone) {
      const mq = window.matchMedia("(display-mode: standalone)");
      const handler = (e: MediaQueryListEvent) => {
        if (e.matches) window.location.reload();
      };
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [isStandalone]);

  if (isStandalone) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-[280px] bg-surface border border-border rounded-xl p-4 shadow-lg">
      <p className="text-xs text-muted-foreground leading-relaxed">
        {isIOS
          ? "Para instalar esta app, toca el botón de compartir y selecciona 'Agregar a Pantalla de Inicio'."
          : "Instala esta app en tu dispositivo para una experiencia mejorada."}
      </p>
    </div>
  );
}
