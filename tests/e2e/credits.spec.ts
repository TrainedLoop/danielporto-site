import { expect, test } from "./helpers.ts";

// Some LPC layers credit the bare https://opengameart.org/content/ (a 404): shown as text, not a link.
test("credits don't link to the bare opengameart.org/content/ address", async ({ page }) => {
  await page.goto("/creditos/");
  await expect(page.locator(".credits__list li").first()).toBeVisible();
  await expect(page.locator('.credits__urls a[href$="opengameart.org/content/"]')).toHaveCount(0);
  await expect(page.locator(".credits__urls span", { hasText: /^opengameart\.org\/content\/$/ }).first()).toBeVisible();
});
