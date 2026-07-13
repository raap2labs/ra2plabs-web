import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";
import { SECTION } from "../lib/constants";

interface Tech {
  name: string;
  category: string;
}

interface ServiceTechStackProps {
  technologies: Tech[];
}

export default function ServiceTechStack({ technologies }: ServiceTechStackProps) {
  const groups = technologies.reduce<Record<string, Tech[]>>((acc, t) => {
    if (!acc[t.category]) acc[t.category] = [];
    acc[t.category].push(t);
    return acc;
  }, {});

  return (
    <section className={`${SECTION.PADDING} bg-surface-alt`}>
      <div className={SECTION.CONTAINER}>
        <Reveal>
          <SectionTitle
            tag="Tecnologías"
            title="Stack Tecnológico"
            description="Utilizamos las herramientas más avanzadas de la industria para cada proyecto."
          />
        </Reveal>
        <div className="mt-16 space-y-10">
          {Object.entries(groups).map(([category, techs], gi) => (
            <Reveal key={category}>
              <div>
                <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {techs.map((t, ti) => (
                    <span
                      key={t.name}
                      className="px-4 py-2 text-sm font-medium bg-surface border border-border rounded-xl text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200"
                      style={{
                        animationDelay: `${(gi * 0.1) + (ti * 0.04)}s`,
                        animationFillMode: "both",
                      }}
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
