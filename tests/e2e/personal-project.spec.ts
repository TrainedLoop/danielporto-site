import { expect, expectLandedBelowTopBar, test } from "./helpers.ts";

const LIVE = "https://trainedloop.github.io/rendermd/";
const CODE = "https://github.com/TrainedLoop/rendermd";

const PAGES = [
  { projects: "/projetos/", resume: "/curriculo/", open: "Abrir", code: "Código" },
  { projects: "/en/projects/", resume: "/en/resume/", open: "Open", code: "Code" },
];

for (const { projects, resume, open, code } of PAGES) {
  test(`${projects} shows the rendermd card with its screenshot and links`, async ({ page }) => {
    await page.goto(projects);
    const card = page.locator("#rendermd");
    await expect(card.getByRole("heading", { name: "rendermd" })).toBeVisible();

    // The screenshot is lazy-loaded: bring it on screen, then check it really decoded.
    const image = card.locator("img");
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveAttribute("alt", /.+/);
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth)).toBeGreaterThan(0);

    for (const [name, url] of [
      [open, LIVE],
      [code, CODE],
    ]) {
      const link = card.getByRole("link", { name, exact: true });
      await expect(link).toHaveAttribute("href", url);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
  });

  test(`${resume} links its personal project block to ${projects}#rendermd`, async ({ page }) => {
    await page.goto(resume);
    const link = page.locator(".personal-note a");
    await expect(link).toHaveAttribute("href", `${projects}#rendermd`);
    // Not part of the selected projects.
    await expect(page.locator("#projects")).not.toContainText("rendermd");

    await link.click();
    await expect(page).toHaveURL(`${projects}#rendermd`);
    await expectLandedBelowTopBar(page, "rendermd");
  });
}
