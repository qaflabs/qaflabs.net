import { expect, test } from "@playwright/test";

const band = (page: import("@playwright/test").Page) => page.locator("#capability-band");

async function rowX(page: import("@playwright/test").Page) {
  return band(page).locator(".flex.whitespace-nowrap").first().evaluate((el) => getComputedStyle(el).transform);
}

test.describe("capability band", () => {
  test("is hidden from assistive technology", async ({ page }) => {
    await page.goto("/");
    await expect(band(page)).toHaveAttribute("aria-hidden", "true");
    await expect(page.getByRole("heading", { name: "WEB APPS" })).toHaveCount(0);
  });

  test("does not move without scrolling", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(500);
    const a = await rowX(page);
    await page.waitForTimeout(1000);
    expect(await rowX(page)).toBe(a);
  });

  test("moves when the page scrolls", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(500);
    const a = await rowX(page);
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(400);
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(400);
    expect(await rowX(page)).not.toBe(a);
  });

  test.describe("reduced motion", () => {
    test.use({ reducedMotion: "reduce" });
    test("stays still while scrolling", async ({ page }) => {
      await page.goto("/");
      await page.waitForTimeout(500);
      const a = await rowX(page);
      await page.mouse.wheel(0, 800);
      await page.waitForTimeout(600);
      expect(await rowX(page)).toBe(a);
    });
  });

  test("causes no horizontal page scroll", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
