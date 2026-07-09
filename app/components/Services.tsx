import ServiceCard from "./ServiceCard";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";
import { Code, Circuit, Gear, Chart } from "./Icons";
import { SECTION } from "../lib/constants";

const services = [
  {
    title: "Desarrollo Web",
    description: "Aplicaciones modernas, sistemas empresariales y plataformas personalizadas con tecnologías de vanguardia.",
    icon: <Code className="w-5 h-5" />,
  },
  {
    title: "Inteligencia Artificial",
    description: "Agentes de IA, asistentes virtuales, chatbots inteligentes y automatización cognitiva para tu negocio.",
    icon: <Circuit className="w-5 h-5" />,
  },
  {
    title: "Automatización",
    description: "Integración de procesos empresariales, eliminación de tareas repetitivas y orquestación inteligente.",
    icon: <Gear className="w-5 h-5" />,
  },
  {
    title: "Marketing Digital",
    description: "Meta Ads, generación de contenido automatizado y estrategias impulsadas por IA para maximizar resultados.",
    icon: <Chart className="w-5 h-5" />,
  },
];

export default function Services() {
  return (
    <section id="servicios" className={SECTION.PADDING}>
      <div className={SECTION.CONTAINER}>
        <Reveal>
          <SectionTitle
            tag="Servicios"
            title="Soluciones Tecnológicas"
            description="Ofrecemos un ecosistema completo de servicios diseñados para impulsar la transformación digital de tu empresa."
          />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16 stagger">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
