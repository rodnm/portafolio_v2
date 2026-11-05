// Base path the site is built and served under (see playwright.config.ts and astro.config.ts).
export const basePath = process.env.BASE_PATH ?? "/portafolio_v2/";

/** Regex for a path under the base, e.g. at("en/") matches ".../portafolio_v2/en/" and an optional #hash. */
export function at(path: string, { hash = false } = {}): RegExp {
  const escaped = `${basePath}${path}`.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
  return new RegExp(`${escaped}${hash ? "(#.*)?" : ""}$`);
}
