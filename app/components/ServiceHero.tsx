import Link from "next/link";
import { ArrowRight } from "./Icons";
import { Code, Circuit, Gear, Chart } from "./Icons";

const heroIcons: Record<string, React.ReactNode> = {
  Code: <Code className="w-full h-full" />,
  Circuit: <Circuit className="w-full h-full" />,
  Gear: <Gear className="w-full h-full" />,
  Chart: <Chart className="w-full h-full" />,
};

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  heroGradient: string;
  heroIcon: string;
}

export default function ServiceHero({
  title,
  subtitle,
  description,
  heroGradient,
  heroIcon,
}: ServiceHeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-grid bg-[length:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black,transparent)] will-change-transform" />

      <div className={`orb orb-indigo`} style={{ width: 450, height: 450, top: "10%", left: "50%", transform: "translateX(-50%)" }} />
      <div className="orb orb-purple" style={{ width: 300, height: 300, top: "40%", left: "10%" }} />
      <div className="orb orb-cyan" style={{ width: 250, height: 250, top: "50%", right: "10%" }} />

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 w-full">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <div className="flex items-center gap-2 text-sm text-accent tracking-[0.2em] uppercase mb-6 animate-fade-in-up">
              <span className="inline-block w-8 h-px bg-accent/50" />
              Servicios
            </div>

            <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.06] tracking-[-0.03em] animate-fade-in-up"
              style={{ animationDelay: "0.1s", animationFillMode: "both" }}
            >
              {title}
            </h1>

            <p className="mt-4 text-xl md:text-2xl font-medium text-primary-hover animate-fade-in-up"
              style={{ animationDelay: "0.15s", animationFillMode: "both" }}
            >
              {subtitle}
            </p>

            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-[1.7] animate-fade-in-up"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              {description}
            </p>

            <div className="flex flex-wrap gap-4 mt-10 animate-fade-in-up"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            >
              <Link
                href="/#contacto"
                data-analytics="cta_click"
                data-analytics-label="servicehero-cotizar"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover rounded-xl font-semibold text-sm transition-all duration-300 glow-indigo"
              >
                Solicitar Cotización
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/services"
                data-analytics="nav_click"
                data-analytics-label="servicehero-ver-todos"
                className="inline-flex items-center px-8 py-4 rounded-xl font-semibold text-sm border border-border bg-white/[0.02] hover:bg-white/[0.05] hover:border-border-hover transition-all duration-300"
              >
                Ver Todos los Servicios
              </Link>
            </div>
          </div>

          <div className="hidden md:block md:col-span-2">
            <div className={`relative w-64 h-64 mx-auto rounded-2xl bg-gradient-to-br ${heroGradient} p-8 flex items-center justify-center`}>
              <div className="absolute inset-0 bg-black/20 rounded-2xl" />
              <div className="relative text-white/90 w-32 h-32">
                {heroIcons[heroIcon]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
