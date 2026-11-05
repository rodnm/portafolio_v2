import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

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
      filter: (page) => !page.includes("/design/"),
      i18n: { defaultLocale: "es", locales: { es: "es-PE", en: "en-US" } },
    }),
  ],
  // Fonts are self-hosted from @fontsource packages: no network at build time.
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Space Grotesk",
      cssVariable: "--font-space-grotesk",
      fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
      options: {
        variants: [
          {
            src: ["@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2"],
            weight: "300 700",
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "IBM Plex Mono",
      cssVariable: "--font-ibm-plex-mono",
      fallbacks: ["ui-monospace", "monospace"],
      options: {
        variants: [
          {
            src: ["@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2"],
            weight: 400,
            style: "normal",
          },
          {
            src: ["@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2"],
            weight: 500,
            style: "normal",
          },
        ],
      },
    },
  ],
  build: { inlineStylesheets: "always" },
  vite: { plugins: [tailwindcss()] },
});
