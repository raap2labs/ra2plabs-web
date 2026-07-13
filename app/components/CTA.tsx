import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import { SECTION } from "../lib/constants";

export default function CTA() {
  return (
    <section id="contacto" className={`${SECTION.PADDING} bg-surface-alt`}>
      <div className={SECTION.CONTAINER}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background via-surface to-[#112240] border border-border p-10 md:p-16 lg:p-20">
          <div className="orb orb-indigo" style={{ width: 500, height: 500, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
          <div className="orb orb-purple" style={{ width: 300, height: 300, top: "0%", right: "0%" }} />

          <div className="relative">
            <Reveal>
              <div className="text-center">
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
              </div>
            </Reveal>
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
