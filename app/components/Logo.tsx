import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 text-lg font-semibold tracking-tight ${className}`}>
      <Image
        src="/logo-icon.png"
        alt="RA2P Labs Logo"
        width={36}
        height={36}
        className="shrink-0 w-[28px] h-[28px] md:w-[36px] md:h-[36px]"
        unoptimized
      />
      RA<span className="text-primary">2</span>P Labs
    </span>
  );
}
