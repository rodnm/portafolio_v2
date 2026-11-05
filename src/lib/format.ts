import type { Locale } from "../i18n/locales";

const monthsShort: Record<Locale, string[]> = {
  es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};
const ongoing: Record<Locale, string> = { es: "actualidad", en: "present" };

/** "2025-03" → "mar 2025" / "Mar 2025". Fixed tables keep output identical across runtimes. */
export function formatMonth(value: string, lang: Locale): string {
  const [year, month] = value.split("-");
  return `${monthsShort[lang][Number(month) - 1]} ${year}`;
}

export function formatPeriod(start: string, end: string | null | undefined, lang: Locale): string {
  return `${formatMonth(start, lang)} — ${end ? formatMonth(end, lang) : ongoing[lang]}`;
}

export function startYear(value: string): string {
  return value.slice(0, 4);
}
