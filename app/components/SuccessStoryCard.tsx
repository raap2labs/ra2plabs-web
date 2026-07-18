import { ArrowRight, Check } from "./Icons";

interface Result {
  metric: string;
  value: string;
}

interface SuccessStoryCardProps {
  industry: string;
  title: string;
  problem: string;
  solution: string;
  technologies: string[];
  results: Result[];
  imageGradient: string;
  icon: React.ReactNode;
  index: number;
}

export default function SuccessStoryCard({
  industry,
  title,
  problem,
  solution,
  technologies,
  results,
  imageGradient,
  icon,
  index,
}: SuccessStoryCardProps) {
  return (
    <div
      className="group card overflow-hidden cursor-default"
      style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "both" }}
    >
      <div className={`relative h-48 bg-gradient-to-br ${imageGradient} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative text-white/90 group-hover:scale-110 transition-transform duration-500 ease-premium">
          <div className="w-16 h-16">{icon}</div>
        </div>
        <span className="absolute top-4 left-4 px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-medium text-white tracking-wide">
          {industry}
        </span>
      </div>

      <div className="p-6 md:p-8">
        <h3 className="text-xl font-bold tracking-tight mb-5">
          {title}
        </h3>

        <div className="space-y-4 text-sm">
          <div>
            <h4 className="text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground/70 mb-1.5">
              Problema
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              {problem}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground/70 mb-1.5">
              Solución
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              {solution}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6 py-5 border-y border-border">
          {results.map((r) => (
            <div key={r.metric} className="text-center">
              <span className="block text-lg font-bold text-primary-hover">
                {r.value}
              </span>
              <span className="text-[11px] text-muted-foreground leading-tight block mt-0.5">
                {r.metric}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-5">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[11px] font-medium bg-primary/10 text-primary-hover rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        <a
          href="#contacto"
          data-analytics="case_study_click"
          data-analytics-title={title}
          className="group/btn inline-flex items-center gap-1.5 mt-6 text-sm font-medium text-primary-hover hover:text-primary transition-colors duration-200"
        >
          <Check className="w-3.5 h-3.5" />
          Solicita un proyecto similar
          <ArrowRight className="w-3.5 h-3.5 group/btn-hover:translate-x-0.5 transition-transform duration-200" />
        </a>
      </div>
    </div>
  );
}
