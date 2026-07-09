interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <div className="group card p-8 cursor-default">
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-primary-hover mb-6 group-hover:scale-110 group-hover:from-primary/25 group-hover:to-primary/10 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold tracking-tight mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
