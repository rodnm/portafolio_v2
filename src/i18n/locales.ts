export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export function toLocale(value: string | undefined): Locale {
  return value === "en" ? "en" : "es";
}
