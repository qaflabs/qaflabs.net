import { expect, test } from "@playwright/test";

test.describe("smooth scroll", () => {
  test("Lenis is active and anchors clear the navbar", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop", "desktop nav links");
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/lenis/);
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Approach" }).click();
    await expect
      .poll(async () => page.locator("#approach").evaluate((el) => Math.round(el.getBoundingClientRect().top)), {
        timeout: 8000,
      })
      .toBeLessThan(140);
    // Lenis offsets the anchor so the section starts below the fixed navbar.
    const top = await page.locator("#approach").evaluate((el) => el.getBoundingClientRect().top);
    expect(top).toBeGreaterThanOrEqual(80);
  });

  test("the page does not scroll while the menu is open", async ({ page }, info) => {
    test.skip(info.project.name !== "mobile", "menu is the mobile pattern");
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
    const before = await page.evaluate(() => window.scrollY);
    await page.mouse.wheel(0, 800);
    await page.waitForTimeout(600);
    expect(await page.evaluate(() => window.scrollY)).toBe(before);
  });

  test("approach pins and reaches its last step with Lenis", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop", "the panel is desktop only");
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/lenis/);
    const panel = page.locator("#approach .sticky");
    await page.locator("#approach").evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY));
    await page.waitForTimeout(600);
    for (let i = 0; i < 20; i++) {
      await page.mouse.wheel(0, 250);
      await page.waitForTimeout(120);
      if ((await panel.textContent())?.includes("05 / 05")) break;
    }
    await expect(panel).toContainText("05 / 05");
    const top = await panel.evaluate((el) => el.getBoundingClientRect().top);
    expect(Math.round(top)).toBe(120);
  });

  test.describe("reduced motion", () => {
    test.use({ reducedMotion: "reduce" });
    test("uses native scroll", async ({ page }) => {
      await page.goto("/");
      await page.waitForTimeout(1000);
      await expect(page.locator("html")).not.toHaveClass(/lenis/);
    });
  });
});
