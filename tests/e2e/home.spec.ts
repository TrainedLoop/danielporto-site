import { expect, test } from "./helpers.ts";

for (const path of ["/", "/en/"]) {
  test(`${path} achievement cards open with their title, the largest text in the card`, async ({ page }) => {
    await page.goto(path);
    const cards = page.locator("article.achievement");
    await expect(cards).toHaveCount(3);
    for (const card of await cards.all()) {
      expect(await card.evaluate((el) => el.firstElementChild?.tagName)).toBe("H3");
      const size = (selector: string) => card.locator(selector).evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
      const title = await size("h3");
      expect(await size(".achievement__result")).toBeLessThan(title);
      expect(await size(".achievement__text")).toBeLessThan(title);
    }
  });
}
