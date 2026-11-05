// Captures the 1200×630 social cards. Needs `astro preview` running on :4321.
// Usage: scripts/node.sh scripts/make-og.mjs
import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";

const base = process.env.SHOTS_BASE ?? "http://localhost:4321/portafolio_v2/";
const out = new URL("../public/og/", import.meta.url);
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const lang of ["es", "en"]) {
  await page.goto(new URL(`og/${lang}/`, base).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const file = new URL(`og-${lang}.png`, out);
  await page.screenshot({ path: file.pathname });
  console.log(file.pathname);
}
await browser.close();
