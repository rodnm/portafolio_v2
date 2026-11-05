import { describe, expect, it } from "vitest";
import { ui } from "../../src/i18n/ui";

function keys(obj: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object"
      ? keys(v as Record<string, unknown>, `${prefix}${k}.`)
      : [`${prefix}${k}`],
  );
}

describe("ui dictionary", () => {
  it("has the same keys in Spanish and English", () => {
    expect(keys(ui.en).sort()).toEqual(keys(ui.es).sort());
  });

  it("has no empty strings", () => {
    for (const lang of ["es", "en"] as const) {
      const flat = keys(ui[lang]);
      for (const key of flat) {
        const value = key
          .split(".")
          .reduce<unknown>((o, k) => (o as Record<string, unknown>)[k], ui[lang]);
        expect(value, `${lang}:${key}`).not.toBe("");
      }
    }
  });
});
