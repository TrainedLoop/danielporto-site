import { expect, expectLandedBelowTopBar, test } from "./helpers.ts";

/** Job the "AI agents" home card and the AI chat case point to (same id in both languages). */
const AI_JOB = "purple-metrics-desenvolvedor-full-stack-senior";

test.describe("PT · EN switch", () => {
  for (const [pt, en] of [
    ["/curriculo/", "/en/resume/"],
    ["/projetos/chat-de-ia/", "/en/projects/ai-chat/"],
  ]) {
    test(`${pt} ↔ ${en}`, async ({ page, problems }) => {
      await page.goto(pt);
      const switcher = page.locator(".topbar__lang");
      await switcher.getByRole("link", { name: "EN" }).click();
      await expect(page).toHaveURL(en);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      await switcher.getByRole("link", { name: "PT" }).click();
      await expect(page).toHaveURL(pt);
      await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
      expect(problems).toEqual([]);
    });
  }
});

test.describe("anchors land below the top bar", () => {
  test("home: AI agents card → résumé job", async ({ page }) => {
    await page.goto("/");
    await page.locator(`a.achievement__link[href="/curriculo/#${AI_JOB}"]`).click();
    await expect(page).toHaveURL(`/curriculo/#${AI_JOB}`);
    await expectLandedBelowTopBar(page, AI_JOB);
  });

  test("home: computer vision card → résumé projects", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.achievement__link[href="/curriculo/#projects"]').click();
    await expect(page).toHaveURL("/curriculo/#projects");
    await expectLandedBelowTopBar(page, "projects");
  });

  test("case page: see on résumé → résumé job", async ({ page }) => {
    await page.goto("/projetos/chat-de-ia/");
    await page.locator("a.case__resume").click();
    await expect(page).toHaveURL(`/curriculo/#${AI_JOB}`);
    await expectLandedBelowTopBar(page, AI_JOB);
  });

  test("direct load of /en/resume/#projects", async ({ page }) => {
    await page.goto("/en/resume/#projects");
    await expectLandedBelowTopBar(page, "projects");
  });
});

test("story deep link /historia/?fase=3 opens phase 3 of 8", async ({ page, problems }) => {
  await page.goto("/historia/?fase=3");
  await expect(page.locator(".story__count")).toHaveText("3/8");
  expect(problems).toEqual([]);
});

test.describe("case study footer", () => {
  for (const width of [1366, 390]) {
    test(`previous on the left, next on the right, résumé on its own row (${width}px)`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/projetos/ci-cd-design-system/");
      const box = async (selector: string) => (await page.locator(selector).boundingBox())!;
      const nav = await box(".case__nav");
      const previous = await box("a.case__previous");
      const next = await box("a.case__next");
      const resume = await box("a.case__resume");
      expect(Math.round(previous.x)).toBe(Math.round(nav.x));
      expect(Math.round(next.x + next.width)).toBe(Math.round(nav.x + nav.width));
      expect(resume.y).toBeGreaterThanOrEqual(Math.max(previous.y + previous.height, next.y + next.height));
    });
  }
});
