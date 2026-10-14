import { expect, test } from "./helpers.ts";

// The top bar clips overflow instead of scrolling, so the page-level scroll check can't catch a
// link pushed off screen. Measure the bar itself across phone and small-tablet widths. The résumé
// pages are enough: every page renders the same bar, and Portuguese has the longest labels.
const WIDTHS = [320, 360, 390, 425, 480, 540, 600, 768];

for (const path of ["/curriculo/", "/en/resume/"]) {
  for (const width of WIDTHS) {
    test(`${path} top bar fits on one line at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(path);
      const fit = await page.evaluate(() => {
        const bar = document.querySelector<HTMLElement>(".topbar")!;
        const links = [...bar.querySelectorAll<HTMLElement>("a")];
        const tops = new Set(links.map((link) => Math.round(link.getBoundingClientRect().top)));
        return {
          right: Math.max(...links.map((link) => link.getBoundingClientRect().right)),
          clientWidth: bar.clientWidth,
          rows: tops.size,
        };
      });
      expect(fit.right).toBeLessThanOrEqual(fit.clientWidth);
      expect(fit.rows).toBe(1);
    });
  }
}
