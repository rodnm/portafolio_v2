import { expect, test } from "@playwright/test";

// H1: every internal link and asset resolves under the base path (no 404s).
test("internal links and images resolve on every page", async ({
  page,
  request,
  isMobile,
  baseURL,
}) => {
  test.skip(!!isMobile, "crawl once");
  const origin = new URL(baseURL!).origin;
  const base = new URL(baseURL!).pathname;
  const queue = [new URL(baseURL!).href, new URL("en/", baseURL).href];
  const seen = new Set<string>();
  const checked = new Map<string, number>();

  while (queue.length) {
    const url = queue.shift()!;
    if (seen.has(url)) continue;
    seen.add(url);
    await page.goto(url);
    const targets = await page.evaluate(() => [
      ...[...document.querySelectorAll("a[href]")].map((a) => (a as HTMLAnchorElement).href),
      ...[...document.querySelectorAll("img[src], link[rel='icon']")].map(
        (el) => (el as HTMLImageElement).src || (el as HTMLLinkElement).href,
      ),
    ]);
    for (const raw of targets) {
      const target = new URL(raw);
      if (target.origin !== origin) continue;
      target.hash = "";
      const href = target.href;
      expect(target.pathname.startsWith(base), `${href} (from ${url}) escapes the base path`).toBe(
        true,
      );
      if (!checked.has(href)) checked.set(href, (await request.get(href)).status());
      if (target.pathname.endsWith("/") && !seen.has(href)) queue.push(href);
    }
  }

  const broken = [...checked].filter(([, status]) => status >= 400);
  expect(broken).toEqual([]);
  expect(seen.size).toBeGreaterThan(10);
});
