import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const TITLE = "Qaf Labs: Where structure meets craft";
const SHARE_IMAGE = /^https:\/\/qaflabs\.net\/brand\/png\/qaf-labs-logo-on-dark-2400\.png$/;
// Stack and Manifesto follow the design: Stack titles with an h3 inside Principles, Manifesto has no heading.
const SECTION_IDS = ["hero", "capabilities", "approach", "principles", "stack", "contact"];

test.describe("foundation", () => {
  test("document basics and metadata", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page).toHaveTitle(TITLE);

    const meta = (selector: string) => page.locator(selector).first();
    const description = await meta('meta[name="description"]').getAttribute("content");
    expect(description).toMatch(/^Qaf Labs designs and engineers/);
    await expect(meta('meta[name="theme-color"]')).toHaveAttribute("content", "#0B0B0F");
    await expect(meta('meta[property="og:title"]')).toHaveAttribute("content", TITLE);
    await expect(meta('meta[property="og:description"]')).toHaveAttribute("content", description ?? "");
    await expect(meta('meta[property="og:image"]')).toHaveAttribute("content", SHARE_IMAGE);
    await expect(meta('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    await expect(meta('meta[name="twitter:title"]')).toHaveAttribute("content", TITLE);
    await expect(meta('meta[name="twitter:image"]')).toHaveAttribute("content", SHARE_IMAGE);
    await expect(meta('link[rel="icon"][type="image/svg+xml"]')).toHaveAttribute("href", /favicon\.svg/);
    await expect(meta('link[rel="icon"][sizes="32x32"]')).toHaveAttribute("href", /favicon-32\.png/);
    await expect(meta('link[rel="apple-touch-icon"]')).toHaveAttribute("href", /favicon-180\.png/);
  });

  test("landmarks and heading structure", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("header")).toHaveCount(1);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("footer")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
    for (const id of SECTION_IDS) {
      await expect(page.locator(`#${id} :is(h1, h2, h3)`).first()).toBeVisible();
    }
    await expect(page.locator("#manifesto")).toHaveAttribute("aria-label", "Manifesto");
  });

  test("skip link is first in tab order and moves focus to main", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();
  });

  test("controls show a pointer cursor and a vermilion focus ring", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const styles = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      const cs = getComputedStyle(el);
      return {
        cursor: cs.cursor,
        outlineWidth: cs.outlineWidth,
        outlineColor: cs.outlineColor,
        outlineOffset: cs.outlineOffset,
      };
    });
    expect(styles.cursor).toBe("pointer");
    expect(styles.outlineWidth).toBe("2px");
    expect(styles.outlineColor).toBe("rgb(255, 74, 28)");
    expect(parseFloat(styles.outlineOffset)).toBeGreaterThan(0);
  });

  test("uses Geist and the ink background", async ({ page }) => {
    await page.goto("/");
    const body = await page.evaluate(() => {
      const cs = getComputedStyle(document.body);
      return { font: cs.fontFamily, bg: cs.backgroundColor, color: cs.color };
    });
    expect(body.font).toMatch(/Geist/);
    expect(body.font).not.toMatch(/Arial/);
    expect(body.bg).toBe("rgb(11, 11, 15)");
    expect(body.color).toBe("rgb(246, 245, 241)");
  });

  test("no horizontal scroll", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });

  test("axe finds no violations", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
});
