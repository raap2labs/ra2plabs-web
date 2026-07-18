"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "../[lang]/locales";

interface LanguageContextType {
  lang: Locale;
  dict: Record<string, unknown>;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({
  lang,
  dict,
  children,
}: {
  lang: Locale;
  dict: Record<string, unknown>;
  children: ReactNode;
}) {
  return (
    <LanguageContext.Provider value={{ lang, dict }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
