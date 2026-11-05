import { describe, expect, it } from "vitest";
import { formatMonth, formatPeriod, startYear } from "../../src/lib/format";

describe("formatMonth", () => {
  it("formats a YYYY-MM value per language", () => {
    expect(formatMonth("2025-03", "es")).toBe("mar 2025");
    expect(formatMonth("2025-03", "en")).toBe("Mar 2025");
  });
});

describe("formatPeriod", () => {
  it("shows an open period as ongoing", () => {
    expect(formatPeriod("2025-03", null, "es")).toBe("mar 2025 — actualidad");
    expect(formatPeriod("2025-03", null, "en")).toBe("Mar 2025 — present");
  });

  it("shows a closed period with both months", () => {
    expect(formatPeriod("2024-08", "2025-01", "es")).toBe("ago 2024 — ene 2025");
    expect(formatPeriod("2024-04", "2024-07", "en")).toBe("Apr 2024 — Jul 2024");
  });
});

describe("startYear", () => {
  it("returns the year of a YYYY-MM value", () => {
    expect(startYear("2025-03")).toBe("2025");
  });
});
