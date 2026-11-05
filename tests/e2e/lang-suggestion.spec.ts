import { expect, test } from "./helpers.ts";

test.describe("an English browser on a Portuguese page", () => {
  test.use({ locale: "en-US" });

  test("is offered the same page in English, in English", async ({ page, problems }) => {
    await page.goto("/curriculo/#fulllab-retail-solutions-lider-tecnico");
    const bar = page.locator(".lang-suggestion");
    await expect(bar).toBeVisible();
    await expect(bar).toHaveAttribute("lang", "en");
    await expect(bar).toContainText("This page is also available in English.");
    await bar.getByRole("link", { name: "Read in English" }).click();
    await expect(page).toHaveURL("/en/resume/#fulllab-retail-solutions-lider-tecnico");
    await expect(page.locator(".lang-suggestion")).toHaveCount(0);
    expect(problems).toEqual([]);
  });

  test("closing it keeps it closed on the next page", async ({ page }) => {
    await page.goto("/projetos/");
    await page.locator(".lang-suggestion").getByRole("button", { name: "Close" }).click();
    await expect(page.locator(".lang-suggestion")).toHaveCount(0);
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".lang-suggestion")).toHaveCount(0);
  });

  test("choosing PT in the top bar counts as a choice", async ({ page }) => {
    await page.goto("/en/");
    await page.locator(".topbar__lang").getByRole("link", { name: "PT" }).click();
    await expect(page).toHaveURL("/");
    await expect(page.locator(".lang-suggestion")).toHaveCount(0);
  });

  test("is not in the build's HTML, and not on English pages", async ({ page, request }) => {
    const html = await (await request.get("/curriculo/")).text();
    expect(html).not.toContain("lang-suggestion");
    await page.goto("/en/resume/");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".lang-suggestion")).toHaveCount(0);
  });

  test("is not on the story", async ({ page }) => {
    await page.goto("/historia/");
    await expect(page.locator(".phase__start, .next__actions").first()).toBeVisible();
    await expect(page.locator(".lang-suggestion")).toHaveCount(0);
  });

  test("fits a 360px phone", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("/");
    const bar = page.locator(".lang-suggestion");
    await expect(bar).toBeVisible();
    const box = (await bar.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(360);
    const close = (await bar.getByRole("button", { name: "Close" }).boundingBox())!;
    expect(close.height).toBeGreaterThanOrEqual(44);
  });
});

test.describe("a Portuguese-first browser on an English page", () => {
  test.use({ locale: "pt-BR" });

  test("is offered the page in Portuguese", async ({ page }) => {
    await page.goto("/en/projects/");
    const bar = page.locator(".lang-suggestion");
    await expect(bar).toHaveAttribute("lang", "pt-BR");
    await bar.getByRole("link", { name: "Ler em português" }).click();
    await expect(page).toHaveURL("/projetos/");
  });

  test("sees nothing on a Portuguese page", async ({ page }) => {
    await page.goto("/curriculo/");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".lang-suggestion")).toHaveCount(0);
  });
});
