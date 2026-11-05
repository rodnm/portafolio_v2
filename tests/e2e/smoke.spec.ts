import { expect, test } from "@playwright/test";

test.describe("home pages", () => {
  test("Spanish home is served at the base path with lang=es", async ({ page }) => {
    const response = await page.goto("./");
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
  });

  test("English home is served under /en/ with lang=en", async ({ page }) => {
    const response = await page.goto("./en/");
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });
});
