import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";
import { Check } from "./Icons";
import { SECTION } from "../lib/constants";

interface Benefit {
  title: string;
  description: string;
}

interface ServiceBenefitsProps {
  benefits: Benefit[];
}

export default function ServiceBenefits({ benefits }: ServiceBenefitsProps) {
  return (
    <section className={SECTION.PADDING}>
      <div className={SECTION.CONTAINER}>
        <Reveal>
          <SectionTitle
            tag="Beneficios"
            title="¿Por qué elegirnos?"
            description="Cada servicio está diseñado para generar impacto real en tu negocio."
          />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-16 stagger">
          {benefits.map((b) => (
            <div key={b.title} className="card p-8 cursor-default">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-primary-hover mb-6 group-hover:scale-110 group-hover:from-primary/25 group-hover:to-primary/10 transition-all duration-300">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight mb-3">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
