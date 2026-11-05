import { expect, test } from "@playwright/test";

// portafolio_v1 registered a service worker at /sw.js (scope "/") that precaches its pages.
// The site that replaces it at the root must serve a worker that retires it.
test("serves a service worker that retires the previous site's worker", async ({
  request,
  isMobile,
  baseURL,
}) => {
  test.skip(!!isMobile, "one request is enough");
  const response = await request.get(new URL("sw.js", baseURL).href);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("javascript");
  const body = await response.text();
  expect(body).toContain("caches.delete");
  expect(body).toContain("self.registration.unregister()");
});
