"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, Globe, ArrowRight } from "./Icons";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";
import { SECTION } from "../lib/constants";
import { trackMeetingBooked } from "../lib/analytics";

const DURATIONS = [
  { value: 15, label: "15 min" },
  { value: 30, label: "30 min" },
  { value: 60, label: "60 min" },
] as const;

const BENEFITS = [
  "Diagnóstico personalizado de tu proyecto sin compromiso",
  "Propuesta de solución con alcance, tecnologías y presupuesto",
  "Roadmap claro con hitos y tiempos de entrega estimados",
  "Resolución de dudas técnicas con nuestro equipo senior",
];

function detectTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "UTC";
  }
}

function getLocalTime(): string {
  try {
    return new Date().toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  } catch {
    return "";
  }
}

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || "";

export default function ScheduleMeeting() {
  const [duration, setDuration] = useState(30);
  const [timezone] = useState(detectTimezone());
  const [localTime, setLocalTime] = useState(getLocalTime());

  useEffect(() => {
    const interval = setInterval(() => setLocalTime(getLocalTime()), 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSchedule = () => {
    if (CALENDLY_URL) {
      const url = new URL(CALENDLY_URL);
      url.searchParams.set("duration", String(duration));
      window.open(url.toString(), "_blank", "noopener,noreferrer");
      trackMeetingBooked(duration);
    }
  };

  return (
    <section className={SECTION.PADDING}>
      <div className={SECTION.CONTAINER}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background via-surface to-[#112240] border border-border">
          <div className="orb orb-indigo" style={{ width: 600, height: 600, top: "20%", left: "30%" }} />
          <div className="orb orb-cyan" style={{ width: 300, height: 300, bottom: "0%", right: "0%" }} />

          <div className="relative grid md:grid-cols-2 gap-12 p-10 md:p-16 lg:p-20">
            <div>
              <Reveal>
                <SectionTitle
                  tag="Consultoría"
                  title="Agenda una Reunión"
                  description="Conversemos sobre tu proyecto. Analizamos tus necesidades, te proponemos la mejor estrategia y definimos juntos los siguientes pasos."
                />
              </Reveal>

              <Reveal>
                <div className="mt-10 space-y-4">
                  {BENEFITS.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </span>
                      <span className="text-sm text-muted-foreground leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <div className="bg-surface border border-border rounded-xl p-6 md:p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 pb-4 border-b border-border">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Tu zona horaria:</span>
                    <span className="font-medium text-foreground">{timezone}</span>
                    <span className="text-muted">·</span>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{localTime}</span>
                  </div>

                  <p className="text-sm font-medium text-foreground mb-3">Duración de la reunión</p>
                  <div className="flex gap-2 mb-8">
                    {DURATIONS.map((d) => (
                      <button
                        key={d.value}
                        onClick={() => setDuration(d.value)}
                        data-analytics="cta_click"
                        data-analytics-label="schedule-duration"
                        data-analytics-duration={d.value}
                        className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                          duration === d.value
                            ? "bg-primary text-white border-primary shadow-sm shadow-primary/20"
                            : "bg-surface-hover text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleSchedule}
                    data-analytics="meeting_booked"
                    data-analytics-duration={duration}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      CALENDLY_URL
                        ? "bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
                        : "bg-primary/10 border border-primary/30 text-primary cursor-default"
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    {CALENDLY_URL ? "Agendar Reunión" : "Próximamente"}
                    {CALENDLY_URL && <ArrowRight className="w-3.5 h-3.5" />}
                  </button>

                  {!CALENDLY_URL && (
                    <p className="mt-3 text-xs text-muted-foreground text-center">
                      Mientras tanto, escríbenos por el formulario de contacto
                    </p>
                  )}

                  <p className="mt-4 text-xs text-muted-foreground text-center leading-relaxed">
                    Respuesta garantizada en menos de{" "}
                    <span className="text-accent font-medium">48 horas</span>
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
