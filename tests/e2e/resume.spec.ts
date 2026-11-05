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

test.describe("résumé content", () => {
  for (const path of ["/curriculo/", "/en/resume/"]) {
    test(`${path} lists every job, Hebara and the merged Fulllab entry included, with no early-career section`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator(".early-career")).toHaveCount(0);
      const jobs = page.locator("article.job");
      await expect(jobs).toHaveCount(4);
      await expect(jobs.nth(2)).toHaveAttribute("id", "fulllab-retail-solutions-lider-tecnico");
      await expect(jobs.nth(2).locator(".job__period")).toHaveText("09/2015 – 08/2019");
      await expect(jobs.nth(3)).toHaveAttribute("id", "hebara-distribuidora-de-produtos-lotericos-programador-junior");
      await expect(page.locator("#fulllab-retail-solutions-desenvolvedor-net")).toHaveCount(0);
    });

    test(`${path} has no headline figures and each project card reads title, then what was done, then the result`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator(".glance__stats")).toHaveCount(0);
      const card = page.locator("#projects .project-card").first();
      const classes = await card.evaluate((el) => [...el.children].map((child) => child.tagName === "H3" ? "h3" : child.className));
      expect(classes.slice(0, 3)).toEqual(["h3", "project-card__did", "project-card__result"]);
    });
  }

  test("in print, the résumé is a single column: header with the contacts, summary, skills, experience", async ({ page }) => {
    await page.goto("/curriculo/");
    await page.emulateMedia({ media: "print" });
    const box = async (selector: string) => (await page.locator(selector).first().boundingBox())!;
    const contact = await box(".resume__print-contact");
    const summary = await box(".glance");
    const skills = await box(".resume__skills");
    const experience = await box(".resume__main");
    // The contacts are part of the header (first in the PDF's text too), and the side block is hidden.
    await expect(page.locator(".resume__header .resume__print-contact a")).toHaveCount(3);
    await expect(page.locator(".resume__contact")).toBeHidden();
    expect(summary.y).toBeGreaterThanOrEqual(contact.y + contact.height);
    expect(skills.y).toBeGreaterThanOrEqual(summary.y + summary.height);
    expect(experience.y).toBeGreaterThanOrEqual(skills.y + skills.height);
    for (const block of [contact, summary, skills]) expect(Math.round(block.x)).toBe(Math.round(experience.x));
    // Each skill group is a single inline line ("IA: a · b · c"), not a box of chips.
    await expect(page.locator(".skill-group .chips").first()).toHaveCSS("display", "inline");
  });
});

test("résumé project cards sit one per row, full width", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto("/curriculo/");
  const grid = (await page.locator("#projects .projects__grid").boundingBox())!;
  const cards = await page.locator("#projects .project-card").evaluateAll((els) => els.map((el) => el.getBoundingClientRect().toJSON()));
  expect(cards).toHaveLength(3);
  for (const card of cards) {
    expect(Math.round(card.x)).toBe(Math.round(grid.x));
    expect(Math.round(card.width)).toBe(Math.round(grid.width));
  }
});
