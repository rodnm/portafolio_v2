// H2: mobile Lighthouse audit of the home pages. Needs `astro preview` running on :4321.
// Usage: scripts/node.sh scripts/lighthouse.mjs   (exits 1 if a pre-committed threshold is missed)
import { writeFile, mkdir } from "node:fs/promises";
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
import { chromium } from "@playwright/test";

const base = process.env.SHOTS_BASE ?? "http://localhost:4321/";
const thresholds = { performance: 0.9, accessibility: 0.95, "best-practices": 0.95, seo: 0.95 };
const limits = { "largest-contentful-paint": 2500, "cumulative-layout-shift": 0.1 };
const out = new URL("../test-results/lighthouse/", import.meta.url);
await mkdir(out, { recursive: true });

const chrome = await launch({
  chromePath: process.env.CHROME_PATH ?? chromium.executablePath(),
  chromeFlags: ["--headless=new", "--no-sandbox"],
});
let failed = false;
for (const path of ["", "en/"]) {
  const url = new URL(path, base).href;
  const { lhr } = await lighthouse(url, { port: chrome.port, output: "json", logLevel: "error" });
  const scores = Object.fromEntries(
    Object.keys(thresholds).map((k) => [k, lhr.categories[k]?.score ?? 0]),
  );
  const metrics = Object.fromEntries(
    Object.keys(limits).map((k) => [k, lhr.audits[k]?.numericValue ?? Infinity]),
  );
  const ok =
    Object.entries(thresholds).every(([k, min]) => scores[k] >= min) &&
    Object.entries(limits).every(([k, max]) => metrics[k] <= max);
  failed ||= !ok;
  console.log(
    `${ok ? "PASS" : "FAIL"} ${url}`,
    Object.entries(scores)
      .map(([k, v]) => `${k}=${Math.round(v * 100)}`)
      .join(" "),
    `LCP=${Math.round(metrics["largest-contentful-paint"])}ms CLS=${metrics["cumulative-layout-shift"].toFixed(3)}`,
  );
  if (!ok) {
    const worst = Object.values(lhr.audits)
      .filter((a) => a.score !== null && a.score < 0.9 && a.details?.type)
      .slice(0, 8)
      .map((a) => `  - ${a.id}: ${a.displayValue ?? a.score}`);
    console.log(worst.join("\n"));
  }
  await writeFile(new URL(`${path ? "en" : "es"}.json`, out), JSON.stringify(lhr));
}
await chrome.kill();
process.exit(failed ? 1 : 0);
