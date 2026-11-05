import { expect, test } from "@playwright/test";
import { findLeaks } from "../../scripts/privacy.mjs";

/** Visible text with a separator between text nodes, so adjacent numbers never merge. */
async function visibleText(
  page: import("@playwright/test").Page,
  selector: string,
): Promise<string> {
  return page.locator(selector).evaluate((root) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const parts: string[] = [];
    while (walker.nextNode()) parts.push(walker.currentNode.textContent ?? "");
    return parts.join(" | ");
  });
}

const homes = [
  { path: "./", lang: "es", headline: /economista/, about: "Sobre mí", metric: "3 días → 5 min" },
  { path: "./en/", lang: "en", headline: /economist/, about: "About", metric: "3 days → 5 min" },
] as const;

for (const home of homes) {
  test.describe(`home (${home.lang})`, () => {
    test("opening shows headline, bio, portrait and calls to action", async ({ page }) => {
      await page.goto(home.path);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(home.headline);
      await expect(page.locator("#opening img")).toHaveAttribute("alt", "Rodrigo Norabuena");
      await expect(page.locator('#opening a[href^="mailto:"]')).toBeVisible();
      await expect(page.locator('#opening a[href$=".pdf"]')).toBeVisible();
    });

    test("about publishes the full text in four paragraphs", async ({ page }) => {
      await page.goto(home.path);
      const about = page.locator("#about");
      await expect(about.getByRole("heading", { level: 2 })).toHaveText(home.about);
      await expect(about.locator("p.text-lead, .leading-relaxed > p")).toHaveCount(4);
      await expect(about.getByRole("img")).toHaveCount(1);
    });

    test("experience lists the current role with its metric", async ({ page }) => {
      await page.goto(home.path);
      const experience = page.locator("#experience");
      await expect(experience).toContainText("CENTRUM PUCP");
      await expect(experience).toContainText(home.metric);
      await expect(experience).toContainText("Revista Económica");
    });

    test("stack renders every group as a table row", async ({ page }) => {
      await page.goto(home.path);
      await expect(page.locator("#stack tbody tr")).toHaveCount(7);
    });

    test("never shows a phone number or an ID", async ({ page }) => {
      await page.goto(home.path);
      expect(findLeaks(await visibleText(page, "body"))).toEqual([]);
    });
  });
}
