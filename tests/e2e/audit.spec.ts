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
    // Walks the whole page and tabs through every control, which is slow under a parallel run.
    test.setTimeout(60_000);
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

  test("every control offers at least a 44px tap target", async ({ page }) => {
    await page.goto("/");
    await visitAll(page);
    // Let entrance animations (bento cells, morphs) settle before measuring.
    await page.waitForTimeout(1500);
    const small = await page.evaluate(() =>
      // Pointer targets only: the stepper's spinbutton readout is driven by arrow keys, its buttons by touch.
      Array.from(document.querySelectorAll<HTMLElement>("a[href], button"))
        .filter((el) => el.offsetParent !== null && !el.closest("[inert], [aria-hidden='true']"))
        .map((el) => {
          const box = el.getBoundingClientRect();
          // Small visual buttons may carry a larger hit area on ::after.
          const after = getComputedStyle(el, "::after");
          const hitW = after.content !== "none" ? parseFloat(after.width) || 0 : 0;
          const hitH = after.content !== "none" ? parseFloat(after.height) || 0 : 0;
          return { label: (el.textContent ?? el.getAttribute("aria-label") ?? "").trim().slice(0, 30), w: Math.max(box.width, hitW), h: Math.max(box.height, hitH) };
        })
        .filter((t) => t.w < 44 || t.h < 44)
        .map((t) => `${t.label} ${Math.round(t.w)}x${Math.round(t.h)}`),
    );
    expect(small).toEqual([]);
  });

  test("clicking through every control logs no errors", async ({ page, context }, info) => {
    test.skip(info.project.name !== "desktop", "one click-through");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    for (const name of ["Capabilities", "Approach", "Principles", "Contact"]) {
      await nav.getByRole("link", { name }).click();
      await page.waitForTimeout(700);
    }
    await page.locator("#hero").getByRole("link", { name: "See what we build" }).click();
    const quantity = page.getByRole("spinbutton", { name: "Quantity" });
    await quantity.scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Increase quantity" }).click({ force: true });
    await page.getByRole("button", { name: "Decrease quantity" }).click({ force: true });
    await page.getByRole("button", { name: "Pause orbit" }).click();
    await page.getByRole("button", { name: "Resume orbit" }).click();
    await page.locator("#contact").getByRole("button", { name: "Copy email" }).click();
    await page.locator("footer").getByRole("link", { name: "Approach" }).click();
    await page.waitForTimeout(800);
    expect(errors).toEqual([]);
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
