"use client";

import { useActionState, useEffect, useRef } from "react";
import { contactAction, type ContactState } from "../lib/actions/contact";
import { SERVICES } from "../lib/constants";
import { Send } from "./Icons";
import { trackEvent } from "../lib/analytics";

const initialState: ContactState = { success: false };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    contactAction,
    initialState
  );

  const tracked = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && !tracked.current) {
      tracked.current = true;
      const service = formRef.current
        ? (new FormData(formRef.current).get("service") as string) || "unknown"
        : "unknown";
      trackEvent("contact_submit", { service });
    }
    if (!state.success) {
      tracked.current = false;
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="max-w-lg mx-auto mt-10 text-left space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1.5">
            Nombre <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
            placeholder="Tu nombre"
            aria-describedby={state.errors?.name ? "error-name" : undefined}
          />
          {state.errors?.name && (
            <p id="error-name" className="mt-1 text-xs text-red-400" role="alert">
              {state.errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-muted-foreground mb-1.5">
            Empresa <span className="text-red-400">*</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
            placeholder="Tu empresa"
            aria-describedby={state.errors?.company ? "error-company" : undefined}
          />
          {state.errors?.company && (
            <p id="error-company" className="mt-1 text-xs text-red-400" role="alert">
              {state.errors.company}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1.5">
          Correo electrónico <span className="text-red-400">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
          placeholder="correo@ejemplo.com"
          aria-describedby={state.errors?.email ? "error-email" : undefined}
        />
        {state.errors?.email && (
          <p id="error-email" className="mt-1 text-xs text-red-400" role="alert">
            {state.errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1.5">
          Teléfono <span className="text-muted-foreground/60">(opcional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
          placeholder="+1 234 567 890"
          aria-describedby={state.errors?.phone ? "error-phone" : undefined}
        />
        {state.errors?.phone && (
          <p id="error-phone" className="mt-1 text-xs text-red-400" role="alert">
            {state.errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-muted-foreground mb-1.5">
          Servicio de interés <span className="text-red-400">*</span>
        </label>
        <select
          id="service"
          name="service"
          required
          className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
          aria-describedby={state.errors?.service ? "error-service" : undefined}
        >
          <option value="">Selecciona un servicio</option>
          {SERVICES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {state.errors?.service && (
          <p id="error-service" className="mt-1 text-xs text-red-400" role="alert">
            {state.errors.service}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1.5">
          Mensaje <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 resize-y"
          placeholder="Cuéntanos sobre tu proyecto..."
          aria-describedby={state.errors?.message ? "error-message" : undefined}
        />
        {state.errors?.message && (
          <p id="error-message" className="mt-1 text-xs text-red-400" role="alert">
            {state.errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-hover disabled:opacity-60 disabled:cursor-not-allowed rounded-xl font-semibold text-sm transition-all duration-300 glow-indigo"
      >
        {isPending ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Enviar Mensaje
          </>
        )}
      </button>

      {state.success && (
        <p className="text-sm text-green-400 text-center" role="status">
          Mensaje enviado con éxito. Te responderemos en menos de 48 horas.
        </p>
      )}

      {state.error && (
        <p className="text-sm text-red-400 text-center" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}
