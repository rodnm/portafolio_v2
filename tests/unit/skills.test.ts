import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";

interface Group {
  id: string;
  items: string[];
  items_en?: string[];
}

const groups = parse(readFileSync(join(process.cwd(), "src/data/skills.yaml"), "utf8")) as Group[];
const group = (id: string) => groups.find((g) => g.id === id)!;

describe("stack", () => {
  it("keeps every item whole, so a comma inside parentheses never splits it", () => {
    for (const g of groups) {
      for (const item of [...g.items, ...(g.items_en ?? [])]) {
        expect((item.match(/\(/g) ?? []).length, `${g.id}: ${item}`).toBe(
          (item.match(/\)/g) ?? []).length,
        );
      }
    }
  });

  it("translates every item one to one", () => {
    for (const g of groups) {
      if (g.items_en) expect(g.items_en.length, g.id).toBe(g.items.length);
    }
  });

  it("lists the tools backed by the credentials", () => {
    expect(group("cloud").items).toEqual(expect.arrayContaining(["AWS", "Microsoft Azure"]));
    expect(group("ai").items).toEqual(expect.arrayContaining(["RAG", "Deep Learning"]));
    expect(group("languages").items).toContain("MATLAB");
    expect(group("quant").items.join(" ")).toMatch(/inferencia causal/i);
  });
});
