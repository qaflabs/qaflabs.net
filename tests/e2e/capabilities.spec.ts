import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const cards = (page: Page) => page.locator("#capabilities .magic-bento__cell");

// Cards in the first row: the ones sharing the first card's top edge.
async function columns(page: Page) {
  const tops = await cards(page).evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().top)));
  return tops.filter((top) => top === tops[0]).length;
}

test.describe("capabilities", () => {
  test("six cards with their titles", async ({ page }) => {
    await page.goto("/");
    await expect(cards(page)).toHaveCount(6);
    for (const title of [
      "Web apps that stay fast as they grow",
      "One codebase, iOS and Android",
      "AI that answers from your data",
      "Desktop software people keep open all day",
      "Checkouts built for how people buy",
      "From commit to production, set up to last",
    ]) {
      await expect(page.getByRole("heading", { level: 3, name: title })).toBeVisible();
    }
  });

  for (const [width, expected] of [
    [1440, 2],
    [900, 2],
    [390, 1],
  ] as const) {
    test(`${expected} column(s) per row at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await expect(cards(page)).toHaveCount(6);
      await expect.poll(() => columns(page)).toBe(expected);
    });
  }

  test("desktop rows follow 7 + 5, 5 + 7, 6 + 6", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop", "12-column layout");
    await page.goto("/");
    const widths = await cards(page).evaluateAll((els) => els.map((el) => el.getBoundingClientRect().width));
    const ratio = (a: number, b: number) => Math.round((widths[a] / widths[b]) * 10) / 10;
    expect(ratio(0, 1)).toBeCloseTo(7 / 5, 0);
    expect(ratio(3, 2)).toBeCloseTo(7 / 5, 0);
    expect(Math.abs(widths[4] - widths[5])).toBeLessThan(2);
  });

  test("web-app status rows stay on one line", async ({ page }) => {
    await page.goto("/");
    for (const name of ["Checkout redesign", "Search, version two"]) {
      const row = page.locator("#capabilities").getByText(name, { exact: true });
      const height = await row.evaluate((el) => el.getBoundingClientRect().height);
      expect(height).toBeLessThan(20);
    }
  });

  test("cart stepper changes the order total by keyboard", async ({ page }) => {
    await page.goto("/");
    const cart = page.getByRole("group", { name: "Illustration: a shopping cart" });
    const quantity = cart.getByRole("spinbutton", { name: "Quantity" });
    await quantity.scrollIntoViewIfNeeded();
    await expect(cart.getByText("$128.00")).toBeVisible({ timeout: 10_000 });
    await quantity.focus();
    await page.keyboard.press("ArrowUp");
    await expect(quantity).toHaveAttribute("aria-valuenow", "2");
    await expect(cart.getByText("$256.00")).toBeVisible({ timeout: 10_000 });
  });

  test("cart stepper buttons are labelled", async ({ page }) => {
    await page.goto("/");
    const cart = page.getByRole("group", { name: "Illustration: a shopping cart" });
    await expect(cart.getByRole("button", { name: "Increase quantity" })).toHaveCount(1);
    await expect(cart.getByRole("button", { name: "Decrease quantity" })).toHaveCount(1);
  });

  test.describe("reduced motion", () => {
    test.use({ reducedMotion: "reduce" });
    test("illustrations show their end states", async ({ page }) => {
      await page.goto("/");
      const section = page.locator("#capabilities");
      await section.scrollIntoViewIfNeeded();
      await expect(section.getByText("Sync complete")).toBeVisible();
      await expect(section.getByText("live at app.yourcompany.com")).toBeVisible();
      await expect(section.getByText("pnpm deploy --prod")).toBeVisible();
      await expect(section.getByText("$128.00")).toBeVisible();
    });
  });

  test("axe passes on the section", async ({ page }) => {
    await page.goto("/");
    await page.locator("#capabilities").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    const results = await new AxeBuilder({ page }).include("#capabilities").analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
});
