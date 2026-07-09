import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Página no encontrada",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <span className="text-7xl font-bold text-border">404</span>
        <h1 className="text-2xl font-semibold tracking-tight mt-4">
          Página no encontrada
        </h1>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          La página que buscas no existe o ha sido movida.
        </p>
        <Link
          href="/"
          className="inline-flex items-center mt-8 px-6 py-3 bg-primary hover:bg-primary-hover rounded-xl text-sm font-medium transition-all duration-200"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
