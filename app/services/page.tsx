import type { Metadata } from "next";
import Link from "next/link";
import SectionTitle from "../components/SectionTitle";
import { Code, Circuit, Gear, Chart, ArrowRight } from "../components/Icons";
import { SITE, SERVICE_PAGES, SECTION } from "../lib/constants";

const pageIcons: Record<string, React.ReactNode> = {
  Code: <Code className="w-5 h-5" />,
  Circuit: <Circuit className="w-5 h-5" />,
  Gear: <Gear className="w-5 h-5" />,
  Chart: <Chart className="w-5 h-5" />,
};

export const metadata: Metadata = {
  title: `Servicios | ${SITE.name}`,
  description:
    "Descubre nuestros servicios de Desarrollo Web, Inteligencia Artificial, Automatización y Marketing Digital. Soluciones tecnológicas para tu empresa.",
  openGraph: {
    title: `Servicios | ${SITE.name}`,
    description:
      "Desarrollo Web, Inteligencia Artificial, Automatización y Marketing Digital para tu empresa.",
    images: [{ url: `${SITE.url}/opengraph-image.png`, width: 1200, height: 630 }],
  },
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-[length:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black,transparent)] will-change-transform" />
        <div className="orb orb-indigo" style={{ width: 500, height: 500, top: "5%", left: "50%", transform: "translateX(-50%)" }} />
        <div className="orb orb-purple" style={{ width: 350, height: 350, top: "40%", left: "15%" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className={SECTION.CONTAINER}>
          <SectionTitle
            tag="Servicios"
            title="Soluciones Tecnológicas"
            description="Ofrecemos un ecosistema completo de servicios diseñados para impulsar la transformación digital de tu empresa."
          />
        </div>
      </section>

      <section className="pb-28 md:pb-36">
        <div className={SECTION.CONTAINER}>
          <div className="grid sm:grid-cols-2 gap-6">
            {SERVICE_PAGES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                data-analytics="nav_click"
                data-analytics-label={`services-card-${service.slug}`}
                className="group card p-8 md:p-10 hover:-translate-y-1 transition-all duration-400"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.heroGradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {pageIcons[service.heroIcon]}
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-3">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-hover group-hover:text-primary transition-colors duration-200">
                  Explorar servicio
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
