import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Waits for the lazy Scroll Reveal to replace the static fallback before measuring.
const minOpacity = async (page: Page) => {
  await expect(page.locator("#manifesto [data-piece]").first()).toBeAttached();
  return page.locator("#manifesto p").evaluate((p) => {
    const spans = Array.from(p.querySelectorAll<HTMLElement>("[data-piece]"));
    const targets = spans.length ? spans : [p as HTMLElement];
    return Math.min(...targets.map((el) => parseFloat(getComputedStyle(el).opacity)));
  });
};

test.describe("manifesto", () => {
  test("is the light section with the ink mark and the full text", async ({ page }) => {
    await page.goto("/");
    const section = page.getByRole("region", { name: "Manifesto" });
    await expect(section).toHaveCSS("background-color", "rgb(246, 245, 241)");
    await expect(section.getByRole("img", { name: "Qaf Labs mark" })).toHaveAttribute("src", /qaf-labs-mark\.svg/);
    await expect(section).toContainText("Most software is built fast and forgotten faster.");
    await expect(section).toContainText("that point is where we work.");
  });

  test("words never drop below 45% opacity while revealing", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#manifesto");
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    for (const delta of [-500, 250, 250]) {
      await page.mouse.wheel(0, delta);
      await page.waitForTimeout(400);
      expect(await minOpacity(page)).toBeGreaterThanOrEqual(0.45);
    }
  });

  test.describe("reduced motion", () => {
    test.use({ reducedMotion: "reduce" });
    test("text is fully opaque", async ({ page }) => {
      await page.goto("/");
      await page.locator("#manifesto").scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      expect(await minOpacity(page)).toBe(1);
    });
  });

  test("axe passes on the light section", async ({ page }) => {
    await page.goto("/");
    await page.locator("#manifesto").scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    const results = await new AxeBuilder({ page }).include("#manifesto").analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
});
