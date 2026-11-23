import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Walks the page so every lazy and in-view piece has rendered before checking it.
async function visitAll(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 600) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(120);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(300);
}

test.describe("page audit", () => {
  test("axe finds no violations across the whole page", async ({ page }) => {
    await page.goto("/");
    await visitAll(page);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
  });

  test("every control shows the vermilion focus ring by keyboard", async ({ page }) => {
    await page.goto("/");
    await visitAll(page);
    const seen = new Set<string>();
    for (let i = 0; i < 60; i++) {
      await page.keyboard.press("Tab");
      const info = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body) return null;
        const cs = getComputedStyle(el);
        const label = `${el.tagName}:${(el.getAttribute("aria-label") ?? el.textContent ?? "").trim().slice(0, 30)}`;
        return { label, outline: cs.outlineStyle, color: cs.outlineColor, width: cs.outlineWidth, cursor: cs.cursor };
      });
      if (!info || seen.has(info.label)) continue;
      seen.add(info.label);
      expect.soft(info.outline, info.label).not.toBe("none");
      expect.soft(info.color, info.label).toBe("rgb(255, 74, 28)");
      expect.soft(info.width, info.label).toBe("2px");
    }
    expect(seen.size).toBeGreaterThan(8);
  });

  test("only brand hues appear across the page", async ({ page }) => {
    await page.goto("/");
    await visitAll(page);
    await page.waitForTimeout(1500);
    const shot = await page.screenshot({ fullPage: true, animations: "disabled" });
    const off = await page.evaluate(async (data) => {
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
      let outside = 0;
      for (let i = 0; i < px.length; i += 32) {
        const r = px[i] / 255;
        const g = px[i + 1] / 255;
        const b = px[i + 2] / 255;
        const max = Math.max(r, g, b);
        const d = max - Math.min(r, g, b);
        if (max < 0.2 || d / max < 0.35) continue;
        let h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        h = (h * 60 + 360) % 360;
        coloured++;
        if (h > 58 && h < 328) outside++;
      }
      return coloured ? outside / coloured : 0;
    }, shot.toString("base64"));
    expect(off).toBeLessThan(0.01);
  });

  test.describe("200% zoom", () => {
    // Browser zoom at 200% on a 1440px window lays the page out at 720 CSS pixels.
    test.use({ viewport: { width: 720, height: 450 } });
    test("no horizontal scroll and no clipped text", async ({ page }, info) => {
      test.skip(info.project.name !== "desktop", "one zoom run");
      await page.goto("/");
      await visitAll(page);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
      const clipped = await page.evaluate(() =>
        Array.from(document.querySelectorAll<HTMLElement>("main h1, main h2, main h3, main p, footer p, footer a"))
          .filter((el) => el.offsetParent !== null && !el.closest("[aria-hidden='true']"))
          .filter((el) => el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflowX !== "visible")
          .map((el) => el.textContent?.slice(0, 40)),
      );
      expect(clipped).toEqual([]);
    });
  });
});
