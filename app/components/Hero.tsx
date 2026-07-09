import { ArrowRight } from "./Icons";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-grid bg-[length:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black,transparent)]" />

      <div className="orb orb-indigo" style={{ width: 500, height: 500, top: "5%", left: "50%", transform: "translateX(-50%)" }} />
      <div className="orb orb-purple" style={{ width: 400, height: 400, top: "40%", left: "15%" }} />
      <div className="orb orb-cyan" style={{ width: 300, height: 300, top: "50%", right: "10%" }} />

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-40 w-full">
        <div className="flex items-center gap-2 text-sm text-accent tracking-[0.2em] uppercase mb-8 animate-fade-in-up">
          <span className="inline-block w-8 h-px bg-accent/50" />
          Innovación y Tecnología
        </div>

        <h1
          className="text-[clamp(2.8rem,8vw,6rem)] font-bold leading-[1.04] tracking-[-0.03em] animate-fade-in-up"
          style={{ animationDelay: "0.1s", animationFillMode: "both" }}
        >
          Construimos el
          <br />
          <span className="bg-gradient-to-r from-primary via-accent to-primary-hover bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
            Futuro Digital
          </span>
          <br />
          de tu Empresa
        </h1>

        <p
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-[1.7] tracking-[-0.01em] animate-fade-in-up"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          En RA2P Labs transformamos tu negocio con software inteligente,
          automatización avanzada e inteligencia artificial. Digitalizamos
          procesos, eliminamos tareas repetitivas y aceleramos tu crecimiento.
        </p>

        <div
          className="flex flex-wrap gap-4 mt-12 animate-fade-in-up"
          style={{ animationDelay: "0.3s", animationFillMode: "both" }}
        >
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover rounded-xl font-semibold text-sm transition-all duration-300 glow-indigo"
          >
            Solicitar Cotización
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>

          <a
            href="#servicios"
            className="inline-flex items-center px-8 py-4 rounded-xl font-semibold text-sm border border-border bg-white/[0.02] hover:bg-white/[0.05] hover:border-border-hover transition-all duration-300"
          >
            Ver Servicios
          </a>
        </div>
      </div>
    </section>
  );
}
