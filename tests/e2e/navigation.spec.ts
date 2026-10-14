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
