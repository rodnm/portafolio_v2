import { describe, expect, it } from "vitest";
import { findLeaks } from "../../scripts/privacy.mjs";

describe("findLeaks", () => {
  it("flags Peruvian mobile numbers in any common format", () => {
    expect(findLeaks("llámame al 912 345 678")).toHaveLength(1);
    expect(findLeaks("tel: +51 912345678")).toHaveLength(1);
    expect(findLeaks("912-345-678")).toHaveLength(1);
  });

  it("flags 8-digit identifiers such as a DNI or a student code", () => {
    expect(findLeaks("DNI 12345678")).toHaveLength(1);
  });

  it("ignores ordinary numbers used on the site", () => {
    expect(findLeaks("206,740 personas a menos de 5 km")).toEqual([]);
    expect(findLeaks("<lastmod>2026-11-05</lastmod>")).toEqual([]);
    expect(findLeaks("AUC 0.7738 · 30,000 clientes · 3 días → 5 min")).toEqual([]);
    expect(findLeaks('<path d="M12.25 4.50L100.00 200.00"/>')).toEqual([]);
  });
});
