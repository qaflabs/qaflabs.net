import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const STEPS = ["Discover", "Design", "Engineer", "Ship", "Evolve"];
const panel = (page: Page) => page.locator("#approach .sticky");

async function scrollToStep(page: Page, name: string) {
  await page.locator("#approach").getByRole("heading", { level: 3, name }).evaluate((el) => {
    const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2 + 40;
    window.scrollTo({ top, behavior: "instant" });
  });
  await page.waitForTimeout(1200);
}

test.describe("approach", () => {
  test("five steps in order", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#approach ol > li h3")).toHaveText(STEPS);
  });

  test("the panel follows the active step and shows the mark on Evolve", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop", "the panel is hidden below 900px");
    await page.goto("/");
    await scrollToStep(page, "Design");
    await expect(panel(page)).toContainText("02 / 05");
    await scrollToStep(page, "Evolve");
    await expect(panel(page)).toContainText("05 / 05");
    const mark = panel(page).locator("img[src*='qaf-labs-mark-on-dark']");
    await expect(mark).toHaveCSS("opacity", "1");
  });

  test("panel is hidden and each step shows its drawing below 900px", async ({ page }, info) => {
    test.skip(info.project.name !== "mobile", "narrow layout");
    await page.goto("/");
    await expect(panel(page)).toBeHidden();
    const drawings = page.locator("#approach ol > li > div > div[aria-hidden='true']");
    await expect(drawings).toHaveCount(5);
    for (let i = 0; i < 5; i++) await expect(drawings.nth(i)).toBeVisible();
  });

  test("step bodies keep full muted contrast", async ({ page }) => {
    await page.goto("/");
    const opacities = await page
      .locator("#approach ol > li p.text-muted")
      .evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity));
    expect(opacities).toEqual(["1", "1", "1", "1", "1"]);
  });

  test("axe passes on the section", async ({ page }) => {
    await page.goto("/");
    await page.locator("#approach").scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    const results = await new AxeBuilder({ page }).include("#approach").analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
});
