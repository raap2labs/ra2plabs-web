"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { locales, type Locale } from "../[lang]/locales";

const labels: Record<Locale, string> = { es: "ES", en: "EN" };

export default function LanguageSwitcher() {
  const { lang } = useLanguage();
  const pathname = usePathname();

  const switchTo = locales.find((l) => l !== lang) || lang;
  const targetPath = pathname.replace(`/${lang}`, `/${switchTo}`);

  return (
    <Link
      href={targetPath}
      className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
      aria-label={`${lang === "es" ? "Switch to English" : "Cambiar a Español"}`}
    >
      {labels[switchTo]}
    </Link>
  );
}
