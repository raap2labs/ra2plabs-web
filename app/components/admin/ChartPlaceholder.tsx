interface ChartPlaceholderProps {
  title: string;
  height?: number;
  type?: "line" | "bar" | "pie";
}

export default function ChartPlaceholder({ title, height = 240, type = "line" }: ChartPlaceholderProps) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <h3 className="text-sm font-semibold mb-4">{title}</h3>
      <div
        className="flex items-center justify-center rounded-lg bg-surface-hover/50 border border-border"
        style={{ height }}
      >
        <div className="text-center">
          <svg className="w-10 h-10 mx-auto mb-2 text-muted-foreground/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {type === "line" && <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />}
            {type === "bar" && <><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></>}
            {type === "pie" && <><path d="M21.21 15.89A10 10 0 118 2.83" /><path d="M22 12A10 10 0 0012 2v10z" /></>}
          </svg>
          <p className="text-xs text-muted-foreground">Conecta una fuente de datos</p>
        </div>
      </div>
    </div>
  );
}
