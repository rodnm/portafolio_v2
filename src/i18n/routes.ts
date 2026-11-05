import type { Locale } from "./locales";

// Path segments that change with the language. Everything else is shared.
const translatedSegments: Record<string, Record<Locale, string>> = {
  projects: { es: "proyectos", en: "projects" },
};

function canonicalSegment(segment: string): string {
  for (const [key, byLocale] of Object.entries(translatedSegments)) {
    if (segment === byLocale.es || segment === byLocale.en) return key;
  }
  return segment;
}

function withSlashes(base: string): string {
  const trimmed = base.replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${trimmed}/` : "/";
}

/**
 * Builds the URL of a page for a language. `path` uses canonical (English)
 * segment names, e.g. "projects/huella-minera".
 */
export function localePath(lang: Locale, path = "", base = import.meta.env.BASE_URL): string {
  const parts = path.split("/").filter(Boolean);
  if (parts[0]) {
    const translated = translatedSegments[parts[0]];
    if (translated) parts[0] = translated[lang];
  }
  const prefix = lang === "en" ? ["en"] : [];
  const rest = [...prefix, ...parts].join("/");
  return rest ? `${withSlashes(base)}${rest}/` : withSlashes(base);
}

/** Returns the equivalent URL of `pathname` in the other language. */
export function switchLocalePath(
  pathname: string,
  base = import.meta.env.BASE_URL,
  to: Locale,
): string {
  const root = withSlashes(base);
  const relative = pathname.startsWith(root)
    ? pathname.slice(root.length)
    : pathname.replace(/^\//, "");
  const parts = relative.split("/").filter(Boolean);
  if (parts[0] === "en") parts.shift();
  if (parts[0]) parts[0] = canonicalSegment(parts[0]);
  return localePath(to, parts.join("/"), base);
}
