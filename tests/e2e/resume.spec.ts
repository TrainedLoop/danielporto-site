import { expect, test } from "./helpers.ts";

for (const path of ["/curriculo/", "/en/resume/"]) {
  test(`${path} prints to at most 2 A4 pages`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    await page.emulateMedia({ media: "print" });
    const pdf = (await page.pdf({ format: "A4" })).toString("latin1");
    // Page objects only: "/Type /Pages" is the page tree.
    const pages = pdf.match(/\/Type\s*\/Page(?![a-zA-Z])/g)?.length ?? 0;
    expect(pages).toBeGreaterThanOrEqual(1);
    expect(pages).toBeLessThanOrEqual(2);
  });
}

test.describe("résumé sidebar", () => {
  test("on a short laptop (1366×768) it scrolls with the page, down to the last skill group", async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto("/curriculo/");
    const sidebar = page.locator(".resume__sidebar");
    await expect(sidebar).toHaveCSS("position", "static");

    const last = page.locator(".resume__sidebar .skill-group").last();
    // Scroll the page itself (not the sidebar) to the group and check it is really on screen.
    const top = await last.evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
    await page.evaluate((y) => window.scrollTo(0, y - 200), top);
    await expect(last).toBeInViewport({ ratio: 1 });
    expect(await sidebar.evaluate((el) => el.scrollHeight <= el.clientHeight)).toBe(true);
  });

  test("on a tall screen (1440×1000) it stays sticky", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/curriculo/");
    await expect(page.locator(".resume__sidebar")).toHaveCSS("position", "sticky");
  });
});
