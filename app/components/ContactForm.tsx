"use client";

import { useActionState, useEffect, useRef, useState, useCallback } from "react";
import { contactAction, type ContactState } from "../lib/actions/contact";
import { SERVICES } from "../lib/constants";
import { Send } from "./Icons";
import { trackEvent } from "../lib/analytics";
import Toast from "./Toast";

const initialState: ContactState = { success: false };

const siteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
  "1x00000000000000000000AA";

type TurnstileWindow = Window & {
  turnstile?: {
    render: (container: HTMLElement, opts: {
      sitekey: string;
      theme?: string;
    }) => string | undefined;
    remove: (container: HTMLElement) => void;
    reset: (container: HTMLElement) => void;
  };
  onTurnstileLoad?: () => void;
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    contactAction,
    initialState,
  );

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const tracked = useRef(false);
  const lastStateKey = useRef<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const win = window as unknown as TurnstileWindow;
    const container = turnstileRef.current;
    if (!container) return;

    const init = () => {
      if (!win.turnstile) return;
      win.turnstile.render(container, {
        sitekey: siteKey,
        theme: "dark",
      });
    };

    if (win.turnstile) {
      init();
    } else {
      win.onTurnstileLoad = init;
      if (!document.querySelector('script[src*="turnstile"]')) {
        const s = document.createElement("script");
        s.src =
          "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad&render=explicit";
        s.async = true;
        s.defer = true;
        document.head.appendChild(s);
      }
    }

    return () => {
      if (container && win.turnstile) {
        win.turnstile.remove(container);
      }
    };
  }, []);

  useEffect(() => {
    const stateKey = `${state.success}-${state.error || ""}`;
    if (stateKey === lastStateKey.current) return;
    lastStateKey.current = stateKey;

    const win = window as unknown as TurnstileWindow;

    if (state.success && !tracked.current) {
      tracked.current = true;
      trackEvent("contact_submit", { service: "form" });
      formRef.current?.reset();
      if (turnstileRef.current && win.turnstile) {
        win.turnstile.reset(turnstileRef.current);
      }
      const id = setTimeout(() =>
        setToast({
          type: "success",
          message:
            "Mensaje enviado con éxito. Te responderemos en menos de 48 horas.",
        }),
      );
      return () => clearTimeout(id);
    }

    if (state.error) {
      if (turnstileRef.current && win.turnstile) {
        win.turnstile.reset(turnstileRef.current);
      }
      const id = setTimeout(() =>
        setToast({ type: "error", message: state.error! }),
      );
      return () => clearTimeout(id);
    }
  }, [state.success, state.error]);

  const closeToast = useCallback(() => setToast(null), []);

  return (
    <>
      <Toast
        show={toast !== null}
        type={toast?.type || "success"}
        message={toast?.message || ""}
        onClose={closeToast}
      />

      <form
        ref={formRef}
        action={formAction}
        noValidate
        className="max-w-lg mx-auto mt-10 text-left space-y-5"
      >
        <div className="absolute -left-[9999px]" aria-hidden>
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-muted-foreground mb-1.5"
            >
              Nombre <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
              placeholder="Tu nombre"
              aria-describedby={
                state.errors?.name ? "error-name" : undefined
              }
            />
            {state.errors?.name && (
              <p
                id="error-name"
                className="mt-1 text-xs text-red-400"
                role="alert"
              >
                {state.errors.name}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-muted-foreground mb-1.5"
            >
              Empresa <span className="text-red-400">*</span>
            </label>
            <input
              id="company"
              name="company"
              type="text"
              required
              className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
              placeholder="Tu empresa"
              aria-describedby={
                state.errors?.company ? "error-company" : undefined
              }
            />
            {state.errors?.company && (
              <p
                id="error-company"
                className="mt-1 text-xs text-red-400"
                role="alert"
              >
                {state.errors.company}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-muted-foreground mb-1.5"
          >
            Correo electrónico <span className="text-red-400">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
            placeholder="correo@ejemplo.com"
            aria-describedby={
              state.errors?.email ? "error-email" : undefined
            }
          />
          {state.errors?.email && (
            <p
              id="error-email"
              className="mt-1 text-xs text-red-400"
              role="alert"
            >
              {state.errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-muted-foreground mb-1.5"
          >
            Teléfono{" "}
            <span className="text-muted-foreground/60">(opcional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
            placeholder="+1 234 567 890"
            aria-describedby={
              state.errors?.phone ? "error-phone" : undefined
            }
          />
          {state.errors?.phone && (
            <p
              id="error-phone"
              className="mt-1 text-xs text-red-400"
              role="alert"
            >
              {state.errors.phone}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="service"
            className="block text-sm font-medium text-muted-foreground mb-1.5"
          >
            Servicio de interés <span className="text-red-400">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
            aria-describedby={
              state.errors?.service ? "error-service" : undefined
            }
          >
            <option value="">Selecciona un servicio</option>
            {SERVICES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          {state.errors?.service && (
            <p
              id="error-service"
              className="mt-1 text-xs text-red-400"
              role="alert"
            >
              {state.errors.service}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-muted-foreground mb-1.5"
          >
            Mensaje <span className="text-red-400">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 resize-y"
            placeholder="Cuéntanos sobre tu proyecto..."
            aria-describedby={
              state.errors?.message ? "error-message" : undefined
            }
          />
          {state.errors?.message && (
            <p
              id="error-message"
              className="mt-1 text-xs text-red-400"
              role="alert"
            >
              {state.errors.message}
            </p>
          )}
        </div>

        <div ref={turnstileRef} />

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
      </form>
    </>
  );
}
