import { SITE_PATHS, expect, langOf, test } from "./helpers.ts";

test("the sitemap lists all 20 pages (10 routes × 2 languages)", () => {
  expect(SITE_PATHS).toHaveLength(20);
  expect(SITE_PATHS.filter((path) => path.startsWith("/en/"))).toHaveLength(10);
});

for (const path of SITE_PATHS) {
  test.describe(path, () => {
    test("loads with the right lang, one h1 and no console errors", async ({ page, problems }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await page.waitForLoadState("networkidle");
      await expect(page.locator("html")).toHaveAttribute("lang", langOf(path));
      await expect(page.locator("h1")).toHaveCount(1);
      expect(problems).toEqual([]);
    });

    test("has no horizontal scroll at 360×800", async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 800 });
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      const { scrollWidth, innerWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      expect(scrollWidth).toBeLessThanOrEqual(innerWidth);
    });
  });
}
