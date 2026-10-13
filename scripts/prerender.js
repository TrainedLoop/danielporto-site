// Gera o HTML estático de cada rota depois do build, para buscadores e para quem abre sem JavaScript.
// Usa os componentes de verdade (src/entry-server.ts, compilado em dist-ssr/) e o dist/index.html
// como molde: dist/index.html, dist/historia/index.html, dist/curriculo/index.html etc.
// Também cria o dist/404.html (a home), para o GitHub Pages abrir o app em caminhos desconhecidos.
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssrDir = join(root, "dist-ssr");

const { render, pages, ROUTES, routePath, SITE_URL } = await import(
  pathToFileURL(join(ssrDir, "entry-server.js")).href
);
const template = await readFile(join(dist, "index.html"), "utf8");

const escape = (text) =>
  text.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

/** Troca um atributo de uma tag do molde; falha o build se a tag sumir do index.html. */
function replace(html, pattern, value) {
  if (!pattern.test(html)) throw new Error(`Não achei ${pattern} no index.html`);
  return html.replace(pattern, (_, start, end) => `${start}${escape(value)}${end}`);
}

const metaContent = (attribute, name) =>
  new RegExp(`(<meta\\s+${attribute}="${name}"\\s+content=")[^"]*("\\s*\\/?>)`);

function page(route) {
  const { title, description } = pages[route];
  const url = `${SITE_URL}${routePath(route)}`;
  let html = template;
  html = replace(html, /(<title>)[^<]*(<\/title>)/, title);
  html = replace(html, metaContent("name", "description"), description);
  html = replace(html, /(<link\s+rel="canonical"\s+href=")[^"]*(")/, url);
  html = replace(html, metaContent("property", "og:url"), url);
  html = replace(html, metaContent("property", "og:title"), title);
  html = replace(html, metaContent("name", "twitter:title"), title);
  // A home mantém o texto curto de compartilhamento que já está no index.html.
  if (route !== "home") {
    html = replace(html, metaContent("property", "og:description"), description);
    html = replace(html, metaContent("name", "twitter:description"), description);
  }
  // data-route diz ao main.tsx qual página está no HTML, para só hidratar quando for a mesma.
  return html.replace('<div id="root"></div>', () => `<div id="root" data-route="${route}">${render(route)}</div>`);
}

for (const route of ROUTES) {
  const file = join(dist, routePath(route), "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page(route));
  console.log(`pré-renderizado: ${file.slice(root.length + 1)}`);
}

// Caminho desconhecido: o GitHub Pages devolve o 404.html, que abre a home sem entrar no índice dos buscadores.
const notFound = page("home").replace("</title>", '</title>\n    <meta name="robots" content="noindex" />');
await writeFile(join(dist, "404.html"), notFound);
console.log("pré-renderizado: dist/404.html");

await rm(ssrDir, { recursive: true, force: true });
