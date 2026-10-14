import { expect, test } from "./helpers.ts";
import type { Page } from "@playwright/test";

/** Starts the phase opened by the link and waits for the dialog box. */
async function play(page: Page, path: string) {
  await page.goto(path);
  await page.locator(".phase__start").click();
  await expect(page.locator(".dialog")).toBeVisible();
}

/** Bounding boxes, in viewport pixels, of the first element matching each selector. */
const boxes = (page: Page, selectors: string[]) =>
  page.evaluate(
    (list) =>
      list.map((selector) => {
        const rect = document.querySelector(selector)!.getBoundingClientRect();
        return { top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left };
      }),
    selectors,
  );

test.describe("story on portrait phones", () => {
  for (const width of [360, 390]) {
    test(`the inventory fits at ${width}px, label included`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/historia/?fase=2");
      const fit = await page.evaluate(() => {
        const label = document.querySelector(".inventory__label")!.getBoundingClientRect();
        const slots = [...document.querySelectorAll(".inventory__slot")].map((slot) => slot.getBoundingClientRect());
        return {
          labelLeft: label.left,
          labelRight: label.right,
          slotsLeft: Math.min(...slots.map((slot) => slot.left)),
          slotsRight: Math.max(...slots.map((slot) => slot.right)),
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
        };
      });
      expect(fit.labelLeft).toBeGreaterThanOrEqual(0);
      expect(fit.labelRight).toBeLessThanOrEqual(fit.innerWidth);
      expect(fit.slotsLeft).toBeGreaterThanOrEqual(0);
      expect(fit.slotsRight).toBeLessThanOrEqual(fit.innerWidth);
      expect(fit.scrollWidth).toBeLessThanOrEqual(fit.innerWidth);
    });
  }
});

test.describe("story on a landscape phone (844×390)", () => {
  test.use({ viewport: { width: 844, height: 390 }, hasTouch: true, isMobile: true });

  test("the dialog clears the inventory and the visible title clears the top bar", async ({ page, problems }) => {
    await play(page, "/historia/?fase=2");
    const [dialog, inventory, count] = await boxes(page, [".dialog", ".inventory", ".story__count"]);
    expect(dialog.bottom).toBeLessThanOrEqual(inventory.top);

    const links = await page.locator(".topbar a").evaluateAll((all) =>
      all.map((link) => {
        const rect = link.getBoundingClientRect();
        return { top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left };
      }),
    );
    for (const link of links) {
      const overlaps =
        count.left < link.right && link.left < count.right && count.top < link.bottom && link.top < count.bottom;
      expect(overlaps).toBe(false);
    }
    expect(problems).toEqual([]);
  });
});

test.describe("keyboard hints", () => {
  test.describe("on a touch phone", () => {
    test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

    test("say tap and hide Enter", async ({ page }) => {
      await page.goto("/historia/?fase=2");
      await expect(page.locator(".phase__hint--touch")).toHaveText("toque para começar");
      await expect(page.locator(".phase__hint--keyboard")).toBeHidden();
      await page.locator(".phase__start").click();
      await expect(page.locator(".dialog__next")).toBeVisible();
      await expect(page.locator(".dialog__next kbd")).toBeHidden();
    });
  });

  test("on desktop, show click or Enter", async ({ page }) => {
    await page.goto("/en/story/?phase=2");
    await expect(page.locator(".phase__hint--keyboard")).toHaveText("click, or press Enter");
    await expect(page.locator(".phase__hint--touch")).toBeHidden();
    await page.locator(".phase__start").click();
    await expect(page.locator(".dialog__next kbd")).toBeVisible();
  });
});

test.describe("story ending", () => {
  for (const [path, contact, resume] of [
    ["/historia/", "Falar comigo no LinkedIn", "/curriculo/"],
    ["/en/story/", "Message me on LinkedIn", "/en/resume/"],
  ]) {
    test(`${path} offers contact on LinkedIn and the résumé`, async ({ page, problems }) => {
      await page.goto(path);
      await page.evaluate(() => localStorage.setItem("story:progress", JSON.stringify({ phase: 8, items: [] })));
      await page.goto(path);
      const actions = page.locator(".next__actions");
      const linkedIn = actions.getByRole("link", { name: contact });
      await expect(linkedIn).toHaveAttribute("href", "https://www.linkedin.com/in/daniel-porto/");
      await expect(linkedIn).toHaveAttribute("target", "_blank");
      await expect(linkedIn).toHaveClass(/button--primary/);
      await expect(actions.locator(`a.button--secondary[href="${resume}"]`)).toBeVisible();
      await expect(page.locator(".next__restart")).toBeVisible();
      expect(problems).toEqual([]);
    });
  }
});
