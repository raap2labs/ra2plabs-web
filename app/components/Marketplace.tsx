import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";
import { Check, ArrowRight } from "./Icons";
import { SECTION } from "../lib/constants";

const features = [
  "Generación de contenido automatizada",
  "Hashtags inteligentes con IA",
  "Recomendación de precios óptimos",
  "Campañas Meta Ads automatizadas",
  "Integración con WhatsApp Business",
  "Automatización comercial completa",
];

export default function Marketplace() {
  return (
    <section id="marketplace" className={`${SECTION.PADDING} bg-surface-alt`}>
      <div className={SECTION.CONTAINER}>
        <div           className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#1E3A5F] p-10 md:p-14 lg:p-20">
          <div className="orb orb-indigo" style={{ width: 400, height: 400, top: "-20%", right: "-10%" }} />
          <div className="orb orb-purple" style={{ width: 300, height: 300, bottom: "-10%", left: "-5%" }} />

          <div className="relative">
            <Reveal>
              <SectionTitle
                tag="Producto"
                title="Marketplace AI Agent"
                description="Nuestro sistema inteligente genera publicaciones, precios recomendados, hashtags y campañas para redes sociales en segundos."
              />
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mt-12">
              {features.map((f, i) => (
                <div
                  key={f}
                  className="flex items-center gap-3 text-[#DBEAFE] animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "both" }}
                >
                  <Check className="w-5 h-5 shrink-0 text-accent" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <Reveal>
              <div className="mt-12">
                <a
                  href="#contacto"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold text-sm transition-all duration-300"
                >
                  Solicitar Demo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
