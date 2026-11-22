import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const orbitState = (page: Page) =>
  page
    .locator("[data-orbit] .animate-orbit")
    .first()
    .evaluate((el) => getComputedStyle(el).animationPlayState);

const tileTransform = (page: Page) =>
  page
    .locator("[data-orbit] .animate-orbit")
    .first()
    .evaluate((el) => getComputedStyle(el).transform);

test.describe("principles and stack", () => {
  test("three principle cards with the unrotated mark", async ({ page }) => {
    await page.goto("/");
    const cards = page.locator("#principles li:has(h3)");
    await expect(cards).toHaveCount(3);
    const transforms = await page
      .locator("#principles li img[src*='qaf-labs-mark-on-dark']")
      .evaluateAll((imgs) => imgs.map((img) => getComputedStyle(img).transform));
    expect(transforms).toEqual(["none", "none", "none"]);
  });

  test("tools are listed as readable text", async ({ page }) => {
    await page.goto("/");
    const list = page.locator("#stack ul li");
    await expect(list).toHaveText([
      "TypeScript",
      "Python",
      "Dart",
      "SQL",
      "React",
      "Next.js",
      "Node.js",
      "NestJS",
      "FastAPI",
      "React Native",
      "Expo",
      "Flutter",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Docker",
      "Kubernetes",
      "Terraform",
      "AWS",
      "Anthropic API",
      "OpenAI API",
    ]);
  });

  test("Pause orbit stops the motion and toggles its label", async ({ page }) => {
    await page.goto("/");
    const button = page.getByRole("button", { name: "Pause orbit" });
    await button.scrollIntoViewIfNeeded();
    await expect(button).toHaveAttribute("aria-pressed", "false");
    expect(await orbitState(page)).toBe("running");
    await button.click();
    const resume = page.getByRole("button", { name: "Resume orbit" });
    await expect(resume).toHaveAttribute("aria-pressed", "true");
    expect(await orbitState(page)).toBe("paused");
    const a = await tileTransform(page);
    await page.waitForTimeout(600);
    expect(await tileTransform(page)).toBe(a);
    await resume.click();
    expect(await orbitState(page)).toBe("running");
  });

  test("tilt follows the mouse on desktop", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop", "tilt is mouse-only");
    await page.goto("/");
    const card = page.locator("#principles li").first();
    await card.scrollIntoViewIfNeeded();
    const box = await card.boundingBox();
    if (!box) throw new Error("no card");
    await page.mouse.move(box.x + box.width * 0.9, box.y + box.height * 0.1);
    await page.mouse.move(box.x + box.width * 0.95, box.y + box.height * 0.05, { steps: 5 });
    await page.waitForTimeout(500);
    const transform = await card.locator("[style*='preserve-3d']").first().evaluate((el) => getComputedStyle(el).transform);
    expect(transform).not.toBe("none");
  });

  test.describe("reduced motion", () => {
    test.use({ reducedMotion: "reduce" });
    test("the orbit is still and cards do not tilt", async ({ page }, info) => {
      await page.goto("/");
      await page.locator("#stack").scrollIntoViewIfNeeded();
      expect(await orbitState(page)).toBe("paused");
      if (info.project.name !== "desktop") return;
      const card = page.locator("#principles li").first();
      const box = await card.boundingBox();
      if (!box) throw new Error("no card");
      await page.mouse.move(box.x + box.width * 0.9, box.y + 10, { steps: 5 });
      await page.waitForTimeout(400);
      const transform = await card.locator("[style*='preserve-3d']").first().evaluate((el) => getComputedStyle(el).transform);
      expect(transform === "none" || transform === "matrix(1, 0, 0, 1, 0, 0)").toBe(true);
    });
  });

  test("axe passes on the section", async ({ page }) => {
    await page.goto("/");
    await page.locator("#principles").scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    const results = await new AxeBuilder({ page }).include("#principles").analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
});
