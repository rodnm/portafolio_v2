import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { at } from "./base";

const pages = ["./", "./en/", "./design/"];
const widths = [360, 390, 768, 1024, 1280, 1440];

test.describe("responsive layout", () => {
  test.skip(({ isMobile }) => isMobile, "widths are set explicitly; run once");

  for (const path of pages) {
    for (const width of widths) {
      test(`${path} has no horizontal overflow at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        await page.goto(path);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow).toBeLessThanOrEqual(0);
      });
    }
  }
});

test.describe("theme", () => {
  test("toggle switches the theme and remembers it", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("./");
    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme", "light");
    await page.locator("[data-theme-toggle]").click();
    await expect(html).toHaveAttribute("data-theme", "dark");
    await page.reload();
    await expect(html).toHaveAttribute("data-theme", "dark");
  });

  test("first visit follows the system preference", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("./en/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });
});

test.describe("language switch", () => {
  test("goes to the equivalent page in the other language and back", async ({ page }) => {
    await page.goto("./");
    await page.locator("[data-lang-switch]").click();
    await expect(page).toHaveURL(at("en/", { hash: true }));
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await page.locator("[data-lang-switch]").click();
    await expect(page).toHaveURL(at("", { hash: true }));
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
  });

  test("declares alternate languages for search engines", async ({ page }) => {
    await page.goto("./en/");
    await expect(page.locator('link[rel="alternate"][hreflang="es"]')).toHaveAttribute(
      "href",
      at(""),
    );
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
      "href",
      at("en/"),
    );
  });
});

test.describe("navigation", () => {
  test("mobile menu opens, closes with Escape and returns focus", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile only");
    await page.goto("./");
    const button = page.locator("[data-menu-button]");
    const nav = page.locator("[data-site-nav]");
    await expect(nav).toBeHidden();
    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(nav).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(nav).toBeHidden();
    await expect(button).toBeFocused();
  });

  test("desktop shows the navigation inline without a menu button", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "desktop only");
    await page.goto("./");
    await expect(page.locator("[data-site-nav]")).toBeVisible();
    await expect(page.locator("[data-menu-button]")).toBeHidden();
  });

  test("skip link is the first focusable element and moves focus to main", async ({
    page,
    isMobile,
  }) => {
    test.skip(!!isMobile, "keyboard flow checked on desktop");
    await page.goto("./");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Saltar al contenido" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main")).toBeFocused();
  });
});

test.describe("accessibility", () => {
  for (const path of pages) {
    for (const scheme of ["light", "dark"] as const) {
      test(`${path} has no serious axe violations (${scheme})`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme });
        await page.goto(path);
        const results = await new AxeBuilder({ page }).analyze();
        const serious = results.violations.filter(
          (v) => v.impact === "serious" || v.impact === "critical",
        );
        expect(
          serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`),
        ).toEqual([]);
      });
    }
  }
});
