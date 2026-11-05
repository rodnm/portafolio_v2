import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// The site is first published as a GitHub Pages project site (/portafolio_v2/)
// and later moved to the user site root. Both values come from the environment
// so the move is a configuration change, not a code change.
const site = process.env.SITE_URL ?? "https://rodnm.github.io";
const base = process.env.BASE_PATH ?? "/portafolio_v2/";

export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    svelte(),
    sitemap({
      i18n: { defaultLocale: "es", locales: { es: "es-PE", en: "en-US" } },
    }),
  ],
  build: { inlineStylesheets: "always" },
  vite: { plugins: [tailwindcss()] },
});
