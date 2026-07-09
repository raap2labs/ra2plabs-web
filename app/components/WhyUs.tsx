import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";
import { Users, Trending, Terminal, Message } from "./Icons";
import { SECTION } from "../lib/constants";

const reasons = [
  {
    title: "Equipo Experto",
    description: "Profesionales con experiencia en tecnologías modernas y metodologías ágiles.",
    icon: <Users className="w-5 h-5" />,
  },
  {
    title: "Enfoque en Resultados",
    description: "Cada solución está diseñada para generar impacto medible en tu negocio.",
    icon: <Trending className="w-5 h-5" />,
  },
  {
    title: "Tecnología Moderna",
    description: "Utilizamos las herramientas y frameworks más avanzados de la industria.",
    icon: <Terminal className="w-5 h-5" />,
  },
  {
    title: "Soporte Continuo",
    description: "Acompañamos tu proyecto desde la concepción hasta la operación y más allá.",
    icon: <Message className="w-5 h-5" />,
  },
];

export default function WhyUs() {
  return (
    <section className={`${SECTION.PADDING} bg-surface-alt`}>
      <div className={SECTION.CONTAINER}>
        <Reveal>
          <SectionTitle
            tag="Por qué RA2P Labs"
            title="Tu Socio Tecnológico"
            description="Combinamos experiencia técnica, visión estratégica y compromiso con los resultados de tu negocio."
          />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16 stagger">
          {reasons.map((r) => (
            <div key={r.title} className="group card card-cyan p-8 cursor-default">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-secondary/15 to-secondary/5 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 group-hover:from-secondary/25 group-hover:to-secondary/10 transition-all duration-300">
                {r.icon}
              </div>
              <h3 className="text-lg font-semibold tracking-tight mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
