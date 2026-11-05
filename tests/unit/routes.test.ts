import { describe, expect, it } from "vitest";
import { localePath, switchLocalePath } from "../../src/i18n/routes";

const base = "/portafolio_v2/";

describe("localePath", () => {
  it("keeps Spanish at the base root and prefixes English with /en/", () => {
    expect(localePath("es", "", base)).toBe("/portafolio_v2/");
    expect(localePath("en", "", base)).toBe("/portafolio_v2/en/");
  });

  it("translates the projects segment per language", () => {
    expect(localePath("es", "projects/huella-minera", base)).toBe(
      "/portafolio_v2/proyectos/huella-minera/",
    );
    expect(localePath("en", "projects/huella-minera", base)).toBe(
      "/portafolio_v2/en/projects/huella-minera/",
    );
  });

  it("works when the site lives at the domain root", () => {
    expect(localePath("en", "", "/")).toBe("/en/");
    expect(localePath("es", "cv", "/")).toBe("/cv/");
  });
});

describe("switchLocalePath", () => {
  it("maps the home pages to each other", () => {
    expect(switchLocalePath("/portafolio_v2/", base, "en")).toBe("/portafolio_v2/en/");
    expect(switchLocalePath("/portafolio_v2/en/", base, "es")).toBe("/portafolio_v2/");
  });

  it("maps a project detail page to its translation", () => {
    expect(switchLocalePath("/portafolio_v2/proyectos/huella-minera/", base, "en")).toBe(
      "/portafolio_v2/en/projects/huella-minera/",
    );
    expect(switchLocalePath("/portafolio_v2/en/projects/huella-minera/", base, "es")).toBe(
      "/portafolio_v2/proyectos/huella-minera/",
    );
  });

  it("tolerates a missing trailing slash", () => {
    expect(switchLocalePath("/portafolio_v2/en", base, "es")).toBe("/portafolio_v2/");
  });
});
