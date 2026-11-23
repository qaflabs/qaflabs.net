import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const MAILTO = "mailto:hello@qaflabs.net";

const SOCIALS = [
  ["Qaf Labs on GitHub", "https://github.com/qaflabs"],
  ["Qaf Labs on Facebook", "https://www.facebook.com/qaflabs.net/"],
] as const;

test.describe("navigation", () => {
  test("desktop nav links reach their sections", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop", "desktop nav");
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    for (const name of ["Capabilities", "Approach", "Principles", "Contact"]) {
      await nav.getByRole("link", { name }).click();
      const id = name.toLowerCase();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(page.locator(`#${id}`)).toBeInViewport();
    }
  });

  test("navbar shrinks into a pill after scrolling", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop", "pill width is a desktop behaviour");
    await page.goto("/");
    const pill = page.getByRole("navigation", { name: "Main" }).locator("xpath=..");
    const before = (await pill.boundingBox())?.width ?? 0;
    await page.mouse.wheel(0, 400);
    await expect.poll(async () => (await pill.boundingBox())?.width ?? 0).toBeLessThanOrEqual(880);
    expect(before).toBeGreaterThan(1000);
  });

  test("the bar only blurs what is behind it once it becomes a pill", async ({ page }) => {
    await page.goto("/");
    const bar = page.locator("header .rounded-full.border").first();
    await expect(bar).toHaveCSS("backdrop-filter", "none");
    await page.mouse.wheel(0, 400);
    await expect(bar).toHaveCSS("backdrop-filter", "blur(16px)");
  });

  test("start a conversation opens the configured email", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop", "CTA is in the menu on mobile");
    await page.goto("/");
    await expect(page.locator("header").getByRole("link", { name: "Start a conversation" })).toHaveAttribute(
      "href",
      MAILTO,
    );
  });

  test("mobile menu opens, traps focus, closes on Escape and returns focus", async ({ page }, info) => {
    test.skip(info.project.name !== "mobile", "menu is the mobile pattern");
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: "Menu" });
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    await menuButton.click();

    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog).toBeVisible();
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");

    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      const inside = await dialog.evaluate((el) => el.contains(document.activeElement));
      expect(inside).toBe(true);
    }

    await page.keyboard.press("Escape");
    await expect(menuButton).toBeFocused();
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    await expect(dialog.getByRole("link", { name: "Approach" })).not.toBeVisible();
  });

  test("closing the menu leaves nothing covering the page", async ({ page }, info) => {
    test.skip(info.project.name !== "mobile", "menu is the mobile pattern");
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, 1200));
    for (const close of ["button", "escape"] as const) {
      await page.getByRole("button", { name: "Menu" }).click();
      const dialog = page.getByRole("dialog", { name: "Menu" });
      await expect(dialog).toBeVisible();
      if (close === "button") await dialog.getByRole("button", { name: "Close" }).click();
      else await page.keyboard.press("Escape");
      await expect
        .poll(() =>
          page.evaluate(() => {
            const hit = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
            return hit?.closest(".sm-scope") === null;
          }),
        )
        .toBe(true);
    }
  });

  test("the panel slides in from the right instead of snapping in", async ({ page }, info) => {
    test.skip(info.project.name !== "mobile", "menu is the mobile pattern");
    await page.goto("/");
    await page.locator("#staggered-menu-panel").waitFor({ state: "attached" });
    // Sample the panel and the menu layer every frame for the length of the open.
    const frames = page.evaluate(
      () =>
        new Promise<{ left: number; scrollLeft: number }[]>((resolve) => {
          const out: { left: number; scrollLeft: number }[] = [];
          const start = performance.now();
          const tick = (now: number) => {
            const panel = document.getElementById("staggered-menu-panel");
            const layer = document.querySelector(".sm-scope");
            out.push({ left: panel?.getBoundingClientRect().left ?? 0, scrollLeft: layer?.scrollLeft ?? 0 });
            if (now - start < 1200) requestAnimationFrame(tick);
            else resolve(out);
          };
          requestAnimationFrame(tick);
        }),
    );
    await page.getByRole("button", { name: "Menu" }).click();
    const samples = await frames;
    expect(samples.every((s) => s.scrollLeft === 0)).toBe(true);
    const width = page.viewportSize()?.width ?? 0;
    const between = samples.filter((s) => s.left > 1 && s.left < width - 1);
    expect(between.length).toBeGreaterThan(2);
    expect(samples.at(-1)?.left).toBe(0);
  });

  test("reopening while the menu closes leaves it open on screen", async ({ page }, info) => {
    test.skip(info.project.name !== "mobile", "menu is the mobile pattern");
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: "Menu" });
    await menuButton.click();
    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "Close" }).click();
    await page.waitForTimeout(100);
    await menuButton.click();
    await expect
      .poll(() => page.locator("#staggered-menu-panel").evaluate((el) => el.getBoundingClientRect().left))
      .toBe(0);
    await expect(dialog.getByRole("link", { name: "Approach" })).toBeInViewport();
  });

  test("mobile menu links close the menu and reach their section", async ({ page }, info) => {
    test.skip(info.project.name !== "mobile", "menu is the mobile pattern");
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog.getByRole("link", { name: "Start a conversation" })).toHaveAttribute("href", MAILTO);
    await dialog.getByRole("link", { name: "Principles" }).click();
    await expect(page).toHaveURL(/#principles$/);
    await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("#principles")).toBeInViewport();
  });

  test("closed menu panel sits off-screen", async ({ page }) => {
    await page.goto("/");
    const viewport = page.viewportSize()?.width ?? 0;
    const panel = page.locator("#staggered-menu-panel");
    // Phones mount the closed menu at idle; wider screens never load it.
    if ((await panel.count()) === 0) return;
    const x = await panel.evaluate((el) => el.getBoundingClientRect().x);
    expect(x).toBeGreaterThanOrEqual(viewport);
  });

  test("closed menu links are not focusable", async ({ page }, info) => {
    test.skip(info.project.name !== "mobile", "menu is the mobile pattern");
    await page.goto("/");
    const focusable = await page
      .locator("#staggered-menu-panel a")
      .evaluateAll((links) => links.some((a) => a.closest("[inert]") === null));
    expect(focusable).toBe(false);
  });

  test("footer has the email, three section links and the year", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: "hello@qaflabs.net" })).toHaveAttribute("href", MAILTO);
    const links = footer.getByRole("navigation", { name: "Footer" }).getByRole("link");
    await expect(links).toHaveText(["Capabilities", "Approach", "Principles"]);
    await expect(footer).toContainText("© 2026 Qaf Labs");
  });

  test("footer and mobile menu link to the social accounts in a new tab", async ({ page }, info) => {
    await page.goto("/");
    const scopes = [page.locator("footer")];
    if (info.project.name === "mobile") {
      await page.getByRole("button", { name: "Menu" }).click();
      scopes.push(page.getByRole("dialog", { name: "Menu" }));
    }
    for (const scope of scopes) {
      for (const [name, href] of SOCIALS) {
        const link = scope.getByRole("link", { name });
        await expect(link).toHaveAttribute("href", href);
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      }
    }
  });

  test("tap targets are at least 44px", async ({ page }) => {
    await page.goto("/");
    const small = await page.locator("header a:visible, header button:visible, footer a:visible").evaluateAll((els) =>
      els
        .map((el) => el.getBoundingClientRect())
        .filter((r) => r.width > 0 && r.height < 44).length,
    );
    expect(small).toBe(0);
  });

  test("axe passes with the menu open", async ({ page }, info) => {
    test.skip(info.project.name !== "mobile", "menu is the mobile pattern");
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
    await page.waitForTimeout(1200);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
});
