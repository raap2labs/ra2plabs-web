"use client";

export default function LangError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <span className="text-7xl font-bold text-border">500</span>
        <h1 className="text-2xl font-semibold tracking-tight mt-4">
          Error del servidor
        </h1>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          Ocurrió un error inesperado. Por favor intenta de nuevo.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center mt-8 px-6 py-3 bg-primary hover:bg-primary-hover rounded-xl text-sm font-medium transition-all duration-200"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
