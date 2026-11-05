import { expect, test } from "@playwright/test";
import { at } from "./base";

const langs = [
  {
    home: "./",
    detail: "./proyectos/huella-minera/",
    other: at("en/projects/huella-minera/"),
    lang: "es",
  },
  {
    home: "./en/",
    detail: "./en/projects/huella-minera/",
    other: at("proyectos/huella-minera/"),
    lang: "en",
  },
] as const;

for (const l of langs) {
  test.describe(`projects (${l.lang})`, () => {
    test("home lists six featured projects with cover, question, result and links", async ({
      page,
    }) => {
      await page.goto(l.home);
      const rows = page.locator("#projects article");
      await expect(rows).toHaveCount(6);
      for (const row of await rows.all()) {
        await expect(row.locator("img")).toHaveCount(1);
        await expect(row.locator("h3")).not.toBeEmpty();
        await expect(row.locator(".text-figure")).not.toBeEmpty();
        expect(await row.locator('a[target="_blank"]').count()).toBeGreaterThan(0);
      }
    });

    test("archive filter narrows the list and can be reset", async ({ page }) => {
      await page.goto(l.home);
      const archive = page.locator("#projects ol").last();
      await archive.scrollIntoViewIfNeeded();
      // The filter is a Svelte island hydrated when visible; wait until it is interactive.
      await expect(page.locator("#projects astro-island")).not.toHaveAttribute("ssr", "");
      const total = await archive.locator("> li").count();
      expect(total).toBeGreaterThan(5);
      const chip = page.locator('#projects [role="group"] button').nth(1);
      await chip.click();
      await expect(chip).toHaveAttribute("aria-pressed", "true");
      await expect.poll(() => archive.locator("> li").count()).toBeLessThan(total);
      await page.locator('#projects [role="group"] button').first().click();
      await expect.poll(() => archive.locator("> li").count()).toBe(total);
    });

    test("detail page tells the case and links to its translation", async ({ page }) => {
      const response = await page.goto(l.detail);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", l.lang);
      await expect(page.getByRole("heading", { level: 1 })).not.toBeEmpty();
      await expect(page.locator(".prose-rn h2").first()).toBeVisible();
      await expect(page.locator("[data-lang-switch]")).toHaveAttribute("href", l.other);
    });
  });
}

test("video loads only after the visitor asks for it", async ({ page }) => {
  await page.goto("./");
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.locator("[data-video-play]").click();
  await expect(page.locator('iframe[src*="youtube-nocookie.com/embed/7wBcUbhUgcs"]')).toHaveCount(
    1,
  );
});
