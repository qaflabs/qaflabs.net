import { expect, test } from "@playwright/test";

test.describe("seo and security", () => {
  test("robots.txt allows crawling and points at the sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("Allow: /");
    expect(body).toContain("Sitemap: https://qaflabs.net/sitemap.xml");
  });

  test("sitemap lists the home page", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain("<loc>https://qaflabs.net</loc>");
  });

  test("canonical URL and organization data are present", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://qaflabs.net");
    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
    expect(data).toMatchObject({ "@type": "Organization", name: "Qaf Labs", url: "https://qaflabs.net", email: "hello@qaflabs.net" });
    expect(data.sameAs).toEqual(["https://github.com/qaflabs", "https://www.facebook.com/qaflabs.net/"]);
  });

  test("responses carry security headers and no framework banner", async ({ request }) => {
    const res = await request.get("/");
    const headers = res.headers();
    expect(headers["x-powered-by"]).toBeUndefined();
    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["permissions-policy"]).toContain("camera=()");
  });
});
