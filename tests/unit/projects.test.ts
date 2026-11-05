import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";

const dir = join(process.cwd(), "src/content/projects");
const frontmatter = (lang: string, file: string) =>
  parse(readFileSync(join(dir, lang, file), "utf8").split(/^---$/m)[1] ?? "") as Record<
    string,
    unknown
  >;

describe("featured projects", () => {
  const es = readdirSync(join(dir, "es")).sort();
  const en = readdirSync(join(dir, "en")).sort();

  it("exist in both languages with the same slugs", () => {
    expect(en).toEqual(es);
    expect(es.length).toBeGreaterThanOrEqual(3);
  });

  it("share language-independent fields across translations", () => {
    for (const file of es) {
      const a = frontmatter("es", file);
      const b = frontmatter("en", file);
      for (const key of ["order", "year", "cover", "categories", "links", "stack"]) {
        if (key === "stack") continue; // stack labels may be translated
        expect(b[key], `${file}:${key}`).toEqual(a[key]);
      }
    }
  });

  it("have unique display order", () => {
    const orders = es.map((f) => frontmatter("es", f).order);
    expect(new Set(orders).size).toBe(orders.length);
  });

  it("link only over HTTPS", () => {
    for (const lang of ["es", "en"]) {
      for (const file of es) {
        const links = frontmatter(lang, file).links as { url: string }[];
        for (const { url } of links) expect(url, `${lang}/${file}`).toMatch(/^https:\/\//);
      }
    }
  });

  it("never embed an encrypted access token in a link", () => {
    for (const lang of ["es", "en"]) {
      for (const file of es) {
        const links = frontmatter(lang, file).links as { url: string }[];
        for (const { url } of links) expect(url, `${lang}/${file}`).not.toMatch(/eyJ[\w-]+\./);
      }
    }
  });
});

describe("requested project links", () => {
  const link = (file: string, kind: string) =>
    (frontmatter("es", file).links as { kind: string; url: string }[]).find((l) => l.kind === kind)
      ?.url;

  it("sends the mining video to the LinkedIn post", () => {
    expect(link("huella-minera.md", "video")).toBe("https://lnkd.in/p/edJbsVDx");
  });

  it("opens the credit risk report in the HTML preview without a token", () => {
    expect(link("riesgo-crediticio.md", "report")).toBe(
      "https://github-html-preview.dohyeon5626.com/?https://github.com/rodnm/credit-risk-project/blob/HEAD/reports/credit_risk_report.html",
    );
  });
});
