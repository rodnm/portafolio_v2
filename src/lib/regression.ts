// Simple linear regression used by the "About" figure. The data are simulated
// (and labelled as such on the page); the fit is a real OLS estimate.

export interface Point {
  x: number;
  y: number;
}

export interface Fit {
  intercept: number;
  slope: number;
  slopeSE: number;
  interceptSE: number;
  r2: number;
  n: number;
  meanX: number;
  /** Half width of the 95% confidence band for the mean prediction at x. */
  bandHalfWidth: (x: number) => number;
}

/** Deterministic pseudo-random sample around y = 1.4 + 0.62·x. */
export function simulate({ n, seed }: { n: number; seed: number }): Point[] {
  let s = seed >>> 0;
  const rand = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
  const gauss = () => Math.sqrt(-2 * Math.log(rand() || 1e-12)) * Math.cos(2 * Math.PI * rand());
  return Array.from({ length: n }, () => {
    const x = 0.4 + rand() * 9.2;
    return { x, y: 1.4 + 0.62 * x + gauss() * 0.9 };
  });
}

export function ols(points: Point[]): Fit {
  const n = points.length;
  const meanX = points.reduce((a, p) => a + p.x, 0) / n;
  const meanY = points.reduce((a, p) => a + p.y, 0) / n;
  const sxx = points.reduce((a, p) => a + (p.x - meanX) ** 2, 0);
  const sxy = points.reduce((a, p) => a + (p.x - meanX) * (p.y - meanY), 0);
  const slope = sxy / sxx;
  const intercept = meanY - slope * meanX;
  const sse = points.reduce((a, p) => a + (p.y - intercept - slope * p.x) ** 2, 0);
  const sst = points.reduce((a, p) => a + (p.y - meanY) ** 2, 0);
  const df = Math.max(n - 2, 1);
  const s = Math.sqrt(sse / df);
  const t = 2.05; // ≈ t(0.975, ~27 df); exact enough for a decorative band.
  return {
    intercept,
    slope,
    slopeSE: s / Math.sqrt(sxx),
    interceptSE: s * Math.sqrt(1 / n + meanX ** 2 / sxx),
    r2: sst === 0 ? 1 : 1 - sse / sst,
    n,
    meanX,
    bandHalfWidth: (x) => t * s * Math.sqrt(1 / n + (x - meanX) ** 2 / sxx),
  };
}
