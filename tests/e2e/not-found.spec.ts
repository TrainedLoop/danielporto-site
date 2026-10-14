import { expect, test } from "./helpers.ts";

/**
 * Unknown paths. GitHub Pages answers them with dist/404.html, but vite preview doesn't, so
 * the test serves that file (with a 404 status) for the made-up paths itself.
 */
const CASES = [
  { path: "/nao-existe/", lang: "pt-BR", text: "Página não encontrada.", home: "/", resume: "/curriculo/" },
  { path: "/en/does-not-exist/", lang: "en", text: "Page not found.", home: "/en/", resume: "/en/resume/" },
];

test("404.html is the not-found screen, kept out of search indexes", async ({ request }) => {
  const html = await (await request.get("/404.html")).text();
  expect(html).toContain('<meta name="robots" content="noindex" />');
  expect(html).toContain('data-route="not-found"');
  expect(html).not.toContain('rel="canonical"');
});

for (const { path, lang, text, home, resume } of CASES) {
  test(`${path} shows the not-found screen in its language`, async ({ page, problems }) => {
    await page.route(`**${path}`, async (route) => {
      const response = await route.fetch({ url: new URL("/404.html", route.request().url()).href });
      await route.fulfill({ response, status: 404 });
    });
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1")).toHaveText(text);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.locator(".not-found__actions a").first()).toHaveAttribute("href", home);
    await expect(page.locator(".not-found__actions a").last()).toHaveAttribute("href", resume);
    // The document's own 404 status is logged by the browser; anything else is a problem.
    expect(problems.filter((problem) => !/status of 404/.test(problem))).toEqual([]);
  });
}
