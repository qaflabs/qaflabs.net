import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("hero copy", () => {
  test.describe("without JavaScript", () => {
    test.use({ javaScriptEnabled: false });

    test("headline, sub-headline and both buttons are readable", async ({ page }) => {
      await page.goto("/");
      const hero = page.locator("#hero");
      await expect(hero.getByRole("heading", { level: 1 })).toHaveText("Where structure meets craft.");
      await expect(hero.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(hero.getByText(/^We design and build web, mobile, desktop and AI products/)).toBeVisible();
      await expect(hero.getByRole("link", { name: "Start a conversation" })).toHaveAttribute(
        "href",
        "mailto:hello@qaflabs.net",
      );
      await expect(hero.getByRole("link", { name: "See what we build" })).toHaveAttribute("href", "#capabilities");
      await expect(hero.getByText("Qaf Labs · software company")).toBeVisible();
    });
  });

  test("headline is visible at full opacity from the first paint", async ({ page }) => {
    await page.goto("/", { waitUntil: "commit" });
    const h1 = page.getByRole("heading", { level: 1 });
    await h1.waitFor();
    const state = await h1.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { opacity: cs.opacity, visibility: cs.visibility };
    });
    expect(state).toEqual({ opacity: "1", visibility: "visible" });
  });

  test("See what we build reaches Capabilities", async ({ page }) => {
    await page.goto("/");
    await page.locator("#hero").getByRole("link", { name: "See what we build" }).click();
    await expect(page).toHaveURL(/#capabilities$/);
    await expect(page.locator("#capabilities")).toBeInViewport();
  });

  test("outline button border turns only while hovered", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop", "hover is a mouse state");
    await page.goto("/");
    const link = page.locator("#hero").getByRole("link", { name: "See what we build" });
    const border = link.locator("span[aria-hidden='true']");
    await expect(border).toHaveCSS("animation-name", "none");
    await link.hover();
    await expect(border).toHaveCSS("animation-name", "border-spin");
    await page.mouse.move(0, 0);
    await expect(border).toHaveCSS("animation-name", "none");
  });

  test("eyebrow shine runs a fixed number of times", async ({ page }) => {
    await page.goto("/");
    const iterations = await page
      .getByText("Qaf Labs · software company")
      .evaluate((el) => getComputedStyle(el).animationIterationCount);
    expect(iterations).toBe("2");
  });

  test.describe("reduced motion", () => {
    test.use({ reducedMotion: "reduce" });

    test("headline and eyebrow show their end state", async ({ page }) => {
      await page.goto("/");
      const h1 = page.getByRole("heading", { level: 1 });
      await expect(h1).toHaveText("Where structure meets craft.");
      await expect(h1.locator(".split-word")).toHaveCount(0);
      const shine = await page
        .getByText("Qaf Labs · software company")
        .evaluate((el) => getComputedStyle(el).animationName);
      expect(shine).toBe("none");
    });
  });

  test("axe passes on the hero", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(2000);
    const results = await new AxeBuilder({ page }).include("#hero").analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
});
