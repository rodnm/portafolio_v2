import { describe, expect, it } from "vitest";
import { toLocale } from "../../src/i18n/locales";

describe("toLocale", () => {
  it("maps 'en' to English", () => {
    expect(toLocale("en")).toBe("en");
  });

  it("falls back to Spanish for the default route and unknown values", () => {
    expect(toLocale(undefined)).toBe("es");
    expect(toLocale("fr")).toBe("es");
  });
});
