import { expect, test, type Page } from "@playwright/test";

const canvas = (page: Page) => page.locator("#hero canvas");

// Share of strongly coloured pixels whose hue falls outside the vermilion band (±45° around 13°).
async function offBrandShare(page: Page, png: Buffer) {
  return page.evaluate(async (data) => {
    const img = new Image();
    img.src = `data:image/png;base64,${data}`;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = img.width;
    c.height = img.height;
    const ctx = c.getContext("2d");
    if (!ctx) return 1;
    ctx.drawImage(img, 0, 0);
    const px = ctx.getImageData(0, 0, c.width, c.height).data;
    let coloured = 0;
    let off = 0;
    for (let i = 0; i < px.length; i += 16) {
      const r = px[i] / 255;
      const g = px[i + 1] / 255;
      const b = px[i + 2] / 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const d = max - min;
      if (max < 0.2 || d / max < 0.35) continue;
      let h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h = (h * 60 + 360) % 360;
      coloured++;
      if (h > 58 && h < 328) off++;
    }
    return coloured ? off / coloured : 0;
  }, png.toString("base64"));
}

test.describe("the light", () => {
  test("canvas is decorative and renders", async ({ page }) => {
    await page.goto("/");
    await expect(canvas(page)).toHaveCount(1);
    await expect(canvas(page)).toHaveAttribute("aria-hidden", "true");
  });

  test("only vermilion hues appear in the hero light", async ({ page }) => {
    await page.goto("/");
    await expect(canvas(page)).toHaveCount(1);
    await page.waitForTimeout(4000);
    const shot = await page.locator("#hero").screenshot();
    expect(await offBrandShare(page, shot)).toBeLessThan(0.01);
  });

  test("hero text stays clear of the beam on a phone", async ({ page }, info) => {
    test.skip(info.project.name !== "mobile", "narrow layout");
    await page.goto("/");
    const beamX = (page.viewportSize()?.width ?? 390) * 0.9;
    for (const selector of ["#hero-title", "#hero p:not(:first-child)"]) {
      const box = await page.locator(selector).first().boundingBox();
      expect(box).toBeTruthy();
      if (box) expect(box.x + box.width).toBeLessThan(beamX - 8);
    }
  });

  test("the light holds still after its clock stops", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop", "one run is enough");
    test.setTimeout(90_000);
    await page.goto("/");
    await expect(canvas(page)).toHaveCount(1);
    // The clock counts rendered time, so under a loaded machine it can run a little past 14s of wall time.
    await page.waitForTimeout(14_000);
    // The frame's border beam runs on its own timer, so mask it out.
    const mask = [page.locator("#hero-frame")];
    await expect
      .poll(
        async () => {
          const a = await page.locator("#hero").screenshot({ animations: "disabled", mask });
          await page.waitForTimeout(800);
          const b = await page.locator("#hero").screenshot({ animations: "disabled", mask });
          return a.equals(b);
        },
        { timeout: 30_000, intervals: [1000] },
      )
      .toBe(true);
  });

  test.describe("reduced motion", () => {
    test.use({ reducedMotion: "reduce" });
    test("draws one still frame", async ({ page }, info) => {
      test.skip(info.project.name !== "desktop", "one run is enough");
      await page.goto("/");
      await expect(canvas(page)).toHaveCount(1);
      await page.waitForTimeout(1500);
      const a = await page.locator("#hero").screenshot({ animations: "disabled" });
      await page.waitForTimeout(800);
      const b = await page.locator("#hero").screenshot({ animations: "disabled" });
      expect(a.equals(b)).toBe(true);
    });
  });
});
