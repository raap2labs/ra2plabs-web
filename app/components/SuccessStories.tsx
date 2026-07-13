import SectionTitle from "./SectionTitle";
import SuccessStoryCard from "./SuccessStoryCard";
import Reveal from "./Reveal";
import { Circuit, Gear, Chart } from "./Icons";
import { SECTION } from "../lib/constants";

const stories = [
  {
    industry: "Comercio Electrónico",
    title: "Plataforma E-commerce con IA Predictiva",
    problem:
      "Tienda en línea con altas tasas de abandono de carrito y sin personalización en la experiencia de usuario.",
    solution:
      "Implementamos un sistema de recomendaciones basado en IA, automatización de seguimiento post-venta y dashboard analítico en tiempo real.",
    technologies: ["Next.js", "Python", "TensorFlow", "PostgreSQL", "AWS"],
    results: [
      { metric: "Reducción de abandono", value: "42%" },
      { metric: "Incremento en ventas", value: "+35%" },
      { metric: "ROI en 3 meses", value: "280%" },
    ],
    imageGradient: "from-blue-600 to-cyan-600",
    icon: <Circuit className="w-full h-full" />,
  },
  {
    industry: "Fintech",
    title: "Automatización de Procesos Financieros",
    problem:
      "Procesos manuales de conciliación bancaria que tomaban 8 horas diarias y generaban errores frecuentes.",
    solution:
      "Desarrollamos un agente de IA que automatiza la conciliación, detecta anomalías y genera reportes automáticos.",
    technologies: ["React", "Node.js", "OpenAI", "MongoDB", "Docker"],
    results: [
      { metric: "Tiempo de conciliación", value: "-87%" },
      { metric: "Precisión", value: "99.8%" },
      { metric: "Ahorro mensual", value: "$12K" },
    ],
    imageGradient: "from-violet-600 to-blue-600",
    icon: <Gear className="w-full h-full" />,
  },
  {
    industry: "Marketing Digital",
    title: "Campañas Automatizadas con IA Generativa",
    problem:
      "Agencia de marketing invertía 20+ horas semanales en crear contenido y gestionar campañas manualmente.",
    solution:
      "Implementamos un sistema multi-agente que genera contenido, optimiza pujas y programa publicaciones automáticamente.",
    technologies: ["Next.js", "LangChain", "Meta API", "Redis", "Vercel"],
    results: [
      { metric: "Contenido generado", value: "10x rápido" },
      { metric: "Costo por lead", value: "-45%" },
      { metric: "Cobertura", value: "+200%" },
    ],
    imageGradient: "from-emerald-600 to-teal-600",
    icon: <Chart className="w-full h-full" />,
  },
];

export default function SuccessStories() {
  return (
    <section className={`${SECTION.PADDING} bg-surface-alt`}>
      <div className={SECTION.CONTAINER}>
        <Reveal>
          <SectionTitle
            tag="Casos de Éxito"
            title="Resultados que Hablan"
            description="Conoce cómo hemos transformado empresas con soluciones tecnológicas inteligentes."
          />
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 stagger">
          {stories.map((s, i) => (
            <SuccessStoryCard key={s.industry} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
