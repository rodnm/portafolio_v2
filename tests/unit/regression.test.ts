import { describe, expect, it } from "vitest";
import { ols, simulate } from "../../src/lib/regression";

describe("ols", () => {
  it("recovers the coefficients of a noiseless line", () => {
    const points = [0, 1, 2, 3, 4].map((x) => ({ x, y: 2 + 0.5 * x }));
    const fit = ols(points);
    expect(fit.intercept).toBeCloseTo(2, 10);
    expect(fit.slope).toBeCloseTo(0.5, 10);
    expect(fit.r2).toBeCloseTo(1, 10);
  });

  it("gives a confidence band that is narrowest at the mean of x", () => {
    const fit = ols(simulate({ n: 30, seed: 7 }));
    const atMean = fit.bandHalfWidth(fit.meanX);
    expect(atMean).toBeGreaterThan(0);
    expect(fit.bandHalfWidth(fit.meanX + 3)).toBeGreaterThan(atMean);
  });
});

describe("simulate", () => {
  it("is deterministic for a given seed", () => {
    expect(simulate({ n: 5, seed: 3 })).toEqual(simulate({ n: 5, seed: 3 }));
  });
});
