// Captures screenshots of built pages for visual review.
// Usage: scripts/node.sh scripts/shots.mjs <path> [<path> ...]  (needs `astro preview` running on :4321)
import { chromium } from "@playwright/test";

const base = process.env.SHOTS_BASE ?? "http://localhost:4321/";
const out = new URL("../test-results/shots/", import.meta.url);
const paths = process.argv.slice(2);
const viewports = [
  {
    name: "mobile",
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  },
  { name: "desktop", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
];
const themes = (process.env.SHOTS_THEMES ?? "light,dark").split(",");

const browser = await chromium.launch();
for (const vp of viewports) {
  for (const theme of themes) {
    const { name: _name, ...options } = vp;
    const context = await browser.newContext({ ...options, colorScheme: theme });
    const page = await context.newPage();
    for (const p of paths) {
      await page.goto(new URL(p, base).href, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      const slug = p.replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "") || "home";
      const file = new URL(`${slug}-${vp.name}-${theme}.png`, out);
      const sections = (process.env.SHOTS_SECTIONS ?? "").split(",").filter(Boolean);
      if (sections.length) {
        for (const id of sections) {
          const target = new URL(`${slug}-${id}-${vp.name}-${theme}.png`, out);
          await page.locator(`#${id}`).screenshot({ path: target.pathname });
          console.log(target.pathname);
        }
      } else {
        await page.screenshot({ path: file.pathname, fullPage: process.env.SHOTS_FULL === "1" });
        console.log(file.pathname);
      }
    }
    await context.close();
  }
}
await browser.close();
