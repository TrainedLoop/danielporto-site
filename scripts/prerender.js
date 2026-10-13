// Writes the static HTML of every page after the build, for search engines and for people
// without JavaScript. Uses the real components (src/entry-server.ts, compiled to dist-ssr/)
// and dist/index.html as the template: dist/index.html, dist/historia/index.html,
// dist/en/story/index.html, etc. Also writes:
// - dist/404.html (the home page), so GitHub Pages opens the app on unknown paths;
// - a redirect page at each old path (LEGACY_PATHS, e.g. /en/curriculo/ → /en/resume/);
// - dist/sitemap.xml, with every page and its hreflang alternates.
import { existsSync } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssrDir = join(root, "dist-ssr");

const { render, pageMeta, pageKey, PAGES, LANGS, LEGACY_PATHS, href, routePath, SITE_URL, shareText, checkStory } =
  await import(pathToFileURL(join(ssrDir, "entry-server.js")).href);
const template = await readFile(join(dist, "index.html"), "utf8");

// Fails the build if a story beat has no text or a sprite (e.g. an .en.png variant) is missing.
const problems = checkStory((path) => existsSync(join(dist, path)));
if (problems.length) throw new Error(`Story check failed:\n- ${problems.join("\n- ")}`);

const escape = (text) =>
  text.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

/** Replaces an attribute of a template tag; fails the build if the tag is gone from index.html. */
function replace(html, pattern, value) {
  if (!pattern.test(html)) throw new Error(`${pattern} not found in index.html`);
  return html.replace(pattern, (_, start, end) => `${start}${escape(value)}${end}`);
}

const metaContent = (attribute, name) =>
  new RegExp(`(<meta\\s+${attribute}="${name}"\\s+content=")[^"]*("\\s*\\/?>)`);

const HREFLANG = { pt: "pt-BR", en: "en" };
const OG_LOCALE = { pt: "pt_BR", en: "en_US" };
const OG_IMAGE = { pt: "og-image.png", en: "og-image.en.png" };

const pageUrl = (route, lang) => `${SITE_URL}${routePath(route, lang)}`;

/** hreflang alternates of a route: one per language, plus x-default (Portuguese). */
const alternates = (route) => [
  ...LANGS.map((lang) => ({ hreflang: HREFLANG[lang], href: pageUrl(route, lang) })),
  { hreflang: "x-default", href: pageUrl(route, "pt") },
];

function page(target) {
  const { route, lang } = target;
  const { title, description } = pageMeta(target);
  const url = pageUrl(route, lang);
  let html = template;
  if (lang !== "pt") {
    html = replace(html, /(<html\s+lang=")[^"]*(")/, HREFLANG[lang]);
    html = replace(html, metaContent("property", "og:locale"), OG_LOCALE[lang]);
    html = replace(html, metaContent("property", "og:image"), `${SITE_URL}${OG_IMAGE[lang]}`);
    html = replace(html, metaContent("name", "twitter:image"), `${SITE_URL}${OG_IMAGE[lang]}`);
    html = replace(html, metaContent("property", "og:image:alt"), shareText(lang).imageAlt);
  }
  html = replace(html, /(<title>)[^<]*(<\/title>)/, title);
  html = replace(html, metaContent("name", "description"), description);
  html = replace(html, /(<link\s+rel="canonical"\s+href=")[^"]*(")/, url);
  html = replace(html, metaContent("property", "og:url"), url);
  html = replace(html, metaContent("property", "og:title"), title);
  html = replace(html, metaContent("name", "twitter:title"), title);
  // The Portuguese home page keeps the short share text that is already in index.html.
  if (route !== "home" || lang !== "pt") {
    html = replace(html, metaContent("property", "og:description"), description);
    html = replace(html, metaContent("name", "twitter:description"), description);
  }
  // Every page exists in both languages: tell search engines and share previews about each version.
  const head = [
    ...LANGS.filter((other) => other !== lang).map(
      (other) => `<meta property="og:locale:alternate" content="${OG_LOCALE[other]}" />`,
    ),
    ...alternates(route).map((alt) => `<link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`),
  ];
  html = html.replace("</head>", () => `    ${head.join("\n    ")}\n  </head>`);
  // data-route tells main.tsx which page is in the HTML, so it only hydrates when it's the same one.
  return html.replace('<div id="root"></div>', () => `<div id="root" data-route="${pageKey(target)}">${render(target)}</div>`);
}

for (const target of PAGES) {
  const file = join(dist, routePath(target.route, target.lang), "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page(target));
  console.log(`prerendered: ${file.slice(root.length + 1)}`);
}

// Unknown path: GitHub Pages serves 404.html, which opens the app without entering search indexes.
const notFound = page({ route: "home", lang: "pt" }).replace("</title>", '</title>\n    <meta name="robots" content="noindex" />');
await writeFile(join(dist, "404.html"), notFound);
console.log("prerendered: dist/404.html");

// Old paths: a tiny page that sends visitors (keeping ?query and #hash) and search engines to the new address.
for (const [path, target] of Object.entries(LEGACY_PATHS)) {
  const to = href(target.route, target.lang);
  const url = pageUrl(target.route, target.lang);
  const html = `<!doctype html>
<html lang="${HREFLANG[target.lang]}">
  <head>
    <meta charset="UTF-8" />
    <meta name="robots" content="noindex" />
    <title>${escape(pageMeta(target).title)}</title>
    <link rel="canonical" href="${url}" />
    <meta http-equiv="refresh" content="0; url=${to}" />
    <script>location.replace(${JSON.stringify(to)} + location.search + location.hash)</script>
  </head>
  <body>
    <a href="${to}">${url}</a>
  </body>
</html>
`;
  const file = join(dist, path, "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
  console.log(`redirect: ${file.slice(root.length + 1)} → ${to}`);
}

// Sitemap with every page and, for each one, its alternates in every language.
const today = new Date().toISOString().slice(0, 10);
const urls = PAGES.map(({ route, lang }) => {
  const links = alternates(route)
    .map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`)
    .join("\n");
  return `  <url>\n    <loc>${pageUrl(route, lang)}</loc>\n    <lastmod>${today}</lastmod>\n${links}\n  </url>`;
});
await writeFile(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`,
);
console.log(`sitemap: dist/sitemap.xml (${PAGES.length} pages)`);

await rm(ssrDir, { recursive: true, force: true });
