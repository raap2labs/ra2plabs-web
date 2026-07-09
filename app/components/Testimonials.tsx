import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";
import { Quote } from "./Icons";
import { SECTION } from "../lib/constants";

const testimonials = [
  {
    quote: "RA2P Labs transformó nuestra operación con automatización inteligente. Redujimos tiempos de proceso en un 60%.",
    author: "Carlos Mendoza",
    role: "CEO, TechCorp LATAM",
  },
  {
    quote: "La implementación de IA superó nuestras expectativas. El ROI fue evidente desde el primer mes.",
    author: "María Fernández",
    role: "Directora de Operaciones, InnovaGroup",
  },
  {
    quote: "Trabajar con RA2P Labs fue excepcional. Entregaron a tiempo con calidad superior.",
    author: "Ricardo Santos",
    role: "CTO, Digital Solutions MX",
  },
];

export default function Testimonials() {
  return (
    <section className={SECTION.PADDING}>
      <div className={SECTION.CONTAINER}>
        <Reveal>
          <SectionTitle
            tag="Testimonios"
            title="Lo que Dicen Nuestros Clientes"
            description="La satisfacción de nuestros clientes es nuestra mejor carta de presentación."
          />
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5 mt-16 stagger">
          {testimonials.map((t) => (
            <div key={t.author} className="card p-8 flex flex-col">
              <Quote className="w-8 h-8 text-primary/30 mb-6" />
              <p className="text-muted-foreground leading-relaxed flex-1 text-sm">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="font-semibold text-sm">{t.author}</p>
                <p className="text-xs text-muted mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
