import Reveal from "./Reveal";
import { Mail, WhatsApp } from "./Icons";
import { SECTION, SITE } from "../lib/constants";

export default function CTA() {
  return (
    <section id="contacto" className={`${SECTION.PADDING} bg-surface-alt`}>
      <div className={SECTION.CONTAINER}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background via-surface to-[#1e1b4b] border border-border p-10 md:p-16 lg:p-20 text-center">
          <div className="orb orb-indigo" style={{ width: 500, height: 500, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
          <div className="orb orb-purple" style={{ width: 300, height: 300, top: "0%", right: "0%" }} />

          <div className="relative">
            <Reveal>
              <span className="inline-block text-sm font-medium text-accent tracking-[0.2em] uppercase mb-6">
                Contacto
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Hablemos de tu Proyecto
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Cuéntanos sobre tu proyecto y te enviaremos una propuesta
                personalizada en menos de 48 horas.
              </p>
            </Reveal>
            <Reveal>
              <div className="flex flex-wrap justify-center gap-4 mt-12">
                <a
                  href={`mailto:${SITE.email}`}
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover rounded-xl font-semibold text-sm transition-all duration-300 glow-indigo animate-pulse-glow"
                >
                  <Mail className="w-4 h-4" />
                  {SITE.email}
                </a>
                <a
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm border border-border bg-white/[0.02] hover:bg-white/[0.05] hover:border-border-hover transition-all duration-300"
                >
                  <WhatsApp className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
