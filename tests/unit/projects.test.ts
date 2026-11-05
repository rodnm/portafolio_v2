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
});
