import { expect, test } from "@playwright/test";

const LABEL = "Illustration: a button component designed on a canvas, written as code, and previewed on a phone";

test.describe("hero frame", () => {
  test("is one labelled illustration for assistive technology", async ({ page }) => {
    await page.goto("/");
    const frame = page.getByRole("img", { name: LABEL });
    await expect(frame).toBeVisible();
    const children = await frame.evaluate((el) => el.querySelectorAll(":scope > :not([aria-hidden='true'])").length);
    expect(children).toBe(0);
  });

  for (const [width, code, preview] of [
    [1440, true, true],
    [900, false, true],
    [390, false, false],
  ] as const) {
    test(`panes at ${width}px: code ${code}, preview ${preview}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      const frame = page.locator("#hero-frame");
      await expect(frame.getByText("export function")).toBeVisible({ visible: code });
      await expect(frame.getByText("A few lines is enough to start.")).toBeVisible({ visible: preview });
      await expect(frame.getByText("Button / Primary")).toBeVisible();
    });
  }

  test("the mark sits on the frame's top edge", async ({ page }) => {
    await page.goto("/");
    const frame = await page.locator("#hero-frame").boundingBox();
    const mark = await page.locator("#hero-frame").locator("xpath=..").locator("img").first().boundingBox();
    expect(frame && mark).toBeTruthy();
    if (!frame || !mark) return;
    expect(Math.abs(mark.y + mark.height / 2 - frame.y)).toBeLessThan(4);
  });

  test("border beam stops after its runs", async ({ page }) => {
    test.slow();
    await page.goto("/");
    const beam = page.locator("#hero-frame .aspect-square");
    await expect(beam).toHaveCount(1);
    await expect(beam).toHaveCount(0, { timeout: 30_000 });
  });

  test.describe("reduced motion", () => {
    test.use({ reducedMotion: "reduce" });
    test("no border beam", async ({ page }) => {
      await page.goto("/");
      await page.waitForTimeout(500);
      await expect(page.locator("#hero-frame .aspect-square")).toHaveCount(0);
    });
  });

  test("no horizontal scroll with the frame", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
