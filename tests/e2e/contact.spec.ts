import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const EMAIL = "hello@qaflabs.net";

test.describe("contact", () => {
  test("heading, line and Start a conversation", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#contact");
    await expect(section.getByRole("heading", { level: 2 })).toHaveText("Tell us what you're making.");
    await expect(section.getByRole("link", { name: "Start a conversation" })).toHaveAttribute("href", `mailto:${EMAIL}`);
  });

  test("Copy email confirms and announces the result", async ({ page, context }, info) => {
    test.skip(info.project.name !== "desktop", "clipboard permission is granted once");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");
    const button = page.locator("#contact").getByRole("button", { name: "Copy email" });
    await button.scrollIntoViewIfNeeded();
    await button.click();
    await expect(button).toContainText("Copied");
    await expect(page.locator("#copy-status")).toHaveText(`${EMAIL} is on your clipboard.`);
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(EMAIL);
  });

  test("shows the address when the clipboard is blocked", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        value: { writeText: () => Promise.reject(new Error("denied")) },
      });
    });
    await page.goto("/");
    const button = page.locator("#contact").getByRole("button", { name: "Copy email" });
    await button.scrollIntoViewIfNeeded();
    await button.click();
    const live = page.locator("#copy-status");
    await expect(live).toContainText("Copy failed. The address is");
    await expect(live.getByText(EMAIL)).toBeVisible();
  });

  test("Copy email works from the keyboard", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", { value: { writeText: () => Promise.resolve() } });
    });
    await page.goto("/");
    const button = page.locator("#contact").getByRole("button", { name: "Copy email" });
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#copy-status")).toHaveText(`${EMAIL} is on your clipboard.`);
  });

  test("axe passes on the section", async ({ page }) => {
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    const results = await new AxeBuilder({ page }).include("#contact").analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
});
