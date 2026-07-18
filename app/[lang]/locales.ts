export type Locale = "es" | "en";

export const locales: Locale[] = ["es", "en"];

export const defaultLocale: Locale = "es";

export const hasLocale = (locale: string): locale is Locale =>
  (locales as string[]).includes(locale);
