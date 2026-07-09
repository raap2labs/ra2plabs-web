import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";
import { SECTION } from "../lib/constants";

const steps = [
  {
    number: "01",
    title: "Descubrimiento",
    description: "Analizamos tu negocio, identificamos oportunidades y definimos objetivos claros para tu proyecto.",
  },
  {
    number: "02",
    title: "Estrategia",
    description: "Diseñamos la arquitectura de la solución, seleccionamos las tecnologías adecuadas y planificamos la ejecución.",
  },
  {
    number: "03",
    title: "Desarrollo",
    description: "Construimos tu solución con metodologías ágiles, entregando valor incremental en cada iteración.",
  },
  {
    number: "04",
    title: "Implementación",
    description: "Desplegamos la solución, integramos con tus sistemas existentes y capacitamos a tu equipo.",
  },
  {
    number: "05",
    title: "Optimización",
    description: "Monitoreamos el rendimiento, realizamos ajustes continuos y escalamos la solución.",
  },
];

export default function Process() {
  return (
    <section id="proceso" className={SECTION.PADDING}>
      <div className={SECTION.CONTAINER}>
        <Reveal>
          <SectionTitle
            tag="Metodología"
            title="Cómo Trabajamos"
            description="Seguimos un proceso estructurado pero flexible que garantiza resultados predecibles y de alta calidad."
          />
        </Reveal>
        <div className="mt-20 max-w-3xl">
          {steps.map((step, index) => (
            <Reveal key={step.number}>
              <div className="flex items-start gap-8 group">
                <div className="flex flex-col items-center">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 text-lg font-bold text-primary-hover shrink-0 group-hover:border-primary/40 group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300">
                    {step.number}
                  </span>
                  {index < steps.length - 1 && (
                    <div className="w-px flex-1 min-h-8 bg-gradient-to-b from-primary/20 to-transparent" />
                  )}
                </div>
                <div className="pt-2.5 pb-12">
                  <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed max-w-xl text-sm">{step.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
