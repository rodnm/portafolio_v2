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

for (const lang of ["es", "en"] as const) {
  const home = lang === "es" ? "./" : "./en/";

  test.describe(`record (${lang})`, () => {
    test("credentials show education, counters, highlights, timeline and a filterable wall", async ({
      page,
    }) => {
      await page.goto(home);
      const section = page.locator("#credentials");
      await expect(section.locator("h4").first()).toContainText(
        lang === "es" ? "Bachiller" : "B.A.",
      );
      await expect(section.locator("dl dd").first()).toHaveText(/^\d+$/);
      await expect(section.locator('svg[role="img"]')).toHaveCount(1);
      const wall = section.locator("ul").last();
      await wall.scrollIntoViewIfNeeded();
      await expect(section.locator("astro-island")).not.toHaveAttribute("ssr", "");
      const total = await wall.locator("> li").count();
      expect(total).toBeGreaterThan(30);
      await section.locator('[role="group"] button').nth(1).click();
      await expect.poll(() => wall.locator("> li").count()).toBeLessThan(total);
    });

    test("currently studying lists two programs with a live dot", async ({ page }) => {
      await page.goto(home);
      await expect(page.locator("#studies li")).toHaveCount(2);
      await expect(
        page.locator("#studies .animate-blip, #studies [class*='animate-blip']"),
      ).toHaveCount(2);
    });

    test("the working paper is classified and never shows its title", async ({ page }) => {
      await page.goto(home);
      const papers = page.locator("#papers");
      await expect(papers).toContainText(lang === "es" ? "Clasificado" : "Classified");
      await expect(
        papers.getByRole("img", {
          name: lang === "es" ? "Título clasificado" : "Classified title",
        }),
      ).toBeVisible();
    });

    test("events start with the latest transmission and mark the finalist", async ({ page }) => {
      await page.goto(home);
      const events = page.locator("#events");
      await expect(events.locator("li h3").first()).toContainText("Qiskit Fall Fest 2026");
      await expect(events).toContainText(lang === "es" ? "Finalista" : "Finalist");
      await expect(events).toContainText(lang === "es" ? "Medallista" : "Medalist");
    });

    test("contact offers email and profiles but no phone", async ({ page }) => {
      await page.goto(home);
      const contact = page.locator("#contact");
      await expect(contact.locator('a[href^="mailto:"]').first()).toBeVisible();
      expect(findLeaks(await visibleText(page, "#contact"))).toEqual([]);
    });

    test("CV page renders and its PDF is served", async ({ page, request }) => {
      const response = await page.goto(lang === "es" ? "./cv/" : "./en/cv/");
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Rodrigo Andrés Norabuena Mascaraqui",
      );
      // S17: "Finalist" always travels with its note about the participation certificate.
      await expect(page.locator("main")).toContainText(
        lang === "es"
          ? "La constancia oficial es de participación"
          : "The official certificate is a participation certificate",
      );
      const href = await page.locator('a[href$=".pdf"]').first().getAttribute("href");
      const pdf = await request.get(href!);
      expect(pdf.status()).toBe(200);
      expect(pdf.headers()["content-type"]).toContain("pdf");
    });
  });
}
