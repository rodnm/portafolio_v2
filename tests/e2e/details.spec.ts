import { expect, test } from "@playwright/test";

test.describe("Stata console", () => {
  test("opens from the HUD, runs commands and closes with Escape", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "desktop only");
    await page.goto("./");
    const trigger = page.locator("[data-console-open]");
    await expect(trigger).toBeEnabled();
    await trigger.click();
    const dialog = page.locator("dialog[data-console]");
    await expect(dialog).toBeVisible();
    const input = dialog.getByRole("textbox");
    await expect(input).toBeFocused();
    await input.fill("help");
    await input.press("Enter");
    await expect(dialog.getByRole("log")).toContainText("summarize stack");
    await input.fill("reg exito esfuerzo");
    await input.press("Enter");
    await expect(dialog.getByRole("log")).toContainText("_cons");
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("toggles with Ctrl+K and reports unknown commands", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "desktop only");
    await page.goto("./en/");
    await expect(page.locator("[data-console-open]")).toBeEnabled();
    await page.keyboard.press("Control+k");
    const dialog = page.locator("dialog[data-console]");
    await expect(dialog).toBeVisible();
    const input = dialog.getByRole("textbox");
    await input.fill("xyzzy");
    await input.press("Enter");
    await expect(dialog.getByRole("log")).toContainText("unrecognized command");
    // Only "reg"/"regress" run the regression; other words sharing the prefix do not.
    await input.fill("register");
    await input.press("Enter");
    await expect(dialog.getByRole("log")).toContainText("unrecognized command: register");
    await expect(dialog.getByRole("log")).not.toContainText("_cons");
    await page.keyboard.press("Control+k");
    await expect(dialog).toBeHidden();
  });

  test("is not offered on phones", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile only");
    await page.goto("./");
    await expect(page.locator("[data-console-open]")).toBeHidden();
    await expect(page.locator("dialog[data-console]")).toBeHidden();
  });
});

test("chapter readout follows the section in view", async ({ page, isMobile }) => {
  test.skip(!!isMobile, "desktop only");
  await page.goto("./");
  const hud = page.locator("[data-chapter-hud]");
  await expect(hud).toContainText("01 / 10");
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await page.evaluate(() =>
    document.querySelector("#projects")!.scrollIntoView({ block: "start" }),
  );
  await expect(hud).toContainText("04 / 10");
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  for (const path of ["./", "./en/"]) {
    test(`${path} shows every chapter's content`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      for (const id of [
        "about",
        "experience",
        "projects",
        "credentials",
        "studies",
        "papers",
        "events",
        "stack",
        "contact",
      ]) {
        const section = page.locator(`#${id}`);
        await expect(section.locator("h2")).toBeVisible();
        expect((await section.innerText()).length, id).toBeGreaterThan(80);
      }
      expect(await page.locator("#projects ol").last().locator("> li").count()).toBeGreaterThan(5);
      expect(await page.locator("#credentials ul").last().locator("> li").count()).toBeGreaterThan(
        30,
      );
    });
  }
});
