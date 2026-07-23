"use client";

import { useActionState, useRef, useState } from "react";
import { loginAction, type AuthState } from "../../lib/actions/auth";
import TurnstileWidget from "../../components/TurnstileWidget";

const initialState: AuthState = { success: false };

export default function AdminAuthPage() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );
  const [token, setToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight">RA<span className="text-primary">2</span>P Labs</h1>
          <p className="text-sm text-muted-foreground mt-1">Accede al panel de administración</p>
        </div>

        <form
          ref={formRef}
          action={formAction}
          className="space-y-4"
          onSubmit={(e) => {
            if (!token) {
              e.preventDefault();
              return;
            }
          }}
        >
          <input type="hidden" name="cf-turnstile-response" value={token || ""} />

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {state.fieldErrors?.email && (
              <p className="text-xs text-red-400 mt-1">{state.fieldErrors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {state.fieldErrors?.password && (
              <p className="text-xs text-red-400 mt-1">{state.fieldErrors.password}</p>
            )}
          </div>

          <div className="flex justify-center">
            <TurnstileWidget
              onToken={setToken}
              onError={() => setTurnstileError(true)}
            />
          </div>

          {turnstileError && (
            <p className="text-xs text-red-400 text-center">
              Error al cargar la verificación de seguridad. Recarga la página.
            </p>
          )}

          {state.error && (
            <p className="text-sm text-red-400 text-center">{state.error}</p>
          )}

          {state.success && (
            <p className="text-sm text-green-400 text-center">
              Inicio de sesión exitoso. Redirigiendo...
            </p>
          )}

          <button
            type="submit"
            disabled={isPending || !token}
            className="w-full py-2.5 bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-semibold transition-colors"
          >
            {isPending ? "Verificando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}
