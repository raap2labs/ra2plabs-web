interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <span className={`text-lg font-semibold tracking-tight ${className}`}>
      RA<span className="text-primary">2</span>P Labs
    </span>
  );
}
