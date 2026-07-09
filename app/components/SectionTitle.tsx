interface SectionTitleProps {
  tag?: string;
  title: string;
  description?: string;
}

export default function SectionTitle({ tag, title, description }: SectionTitleProps) {
  return (
    <div className="max-w-2xl">
      {tag && (
        <div className="flex items-center gap-2 text-sm font-medium text-accent tracking-[0.2em] uppercase mb-5">
          <span className="inline-block w-8 h-px bg-accent/50" />
          {tag}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
