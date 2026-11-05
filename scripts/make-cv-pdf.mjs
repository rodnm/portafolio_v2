// Exports /cv/ and /en/cv/ to PDF. Needs `astro preview` running on :4321.
// Usage: scripts/node.sh scripts/make-cv-pdf.mjs
// Refuses to write a PDF whose text contains personal data (see privacy.mjs).
import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { findLeaks } from "./privacy.mjs";

const base = process.env.SHOTS_BASE ?? "http://localhost:4321/";
const out = new URL("../public/cv/", import.meta.url);
await mkdir(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();
for (const [lang, path] of [
  ["es", "cv/"],
  ["en", "en/cv/"],
]) {
  await page.goto(new URL(path, base).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const leaks = findLeaks(await page.locator("body").innerText());
  if (leaks.length)
    throw new Error(`${path}: personal data found: ${leaks.map((l) => l.match).join(", ")}`);
  const file = new URL(`rodrigo-norabuena-cv-${lang}.pdf`, out);
  await page.pdf({
    path: file.pathname,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  });
  console.log(file.pathname);
}
await browser.close();
