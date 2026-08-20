/**
 * Give each route its own HTML file.
 *
 * The app is one bundle behind one index.html, so every route shipped the
 * homepage's title, description and share card. Googlebot runs the JavaScript
 * and eventually sees the corrected head — but the crawler's first pass does
 * not, and the scrapers behind LinkedIn, Facebook, Slack and X never run it at
 * all. Sharing /boxing showed the homepage card.
 *
 * So after the build, each route gets a copy of index.html with its own tags
 * substituted in. Same bundle, same hashed asset names, correct head before a
 * line of JavaScript runs. vercel.json points the route at its file.
 *
 * Run automatically as npm's postbuild step.
 */
import fs from "node:fs";
import path from "node:path";

import meta from "../src/data/RouteMetaData.json" with { type: "json" };

const BUILD = path.resolve("build");
const SITE = "https://www.saadaoui.it.com";

const escape = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Replace the content of a meta/link tag already present in index.html. */
function set(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`prerender: no tag matched ${pattern}`);
  return html.replace(pattern, replacement);
}

const template = fs.readFileSync(path.join(BUILD, "index.html"), "utf8");

for (const [route, page] of Object.entries(meta.routes)) {
  // "/" is already index.html — the template is its own output.
  if (route === "/") continue;

  const url = `${SITE}${route}`;
  const title = escape(page.title);
  const description = escape(page.description);

  let html = template;
  html = set(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`);
  html = set(html, /<meta name="description" content="[^"]*" ?\/>/,
    `<meta name="description" content="${description}" />`);
  html = set(html, /<link rel="canonical" href="[^"]*" ?\/>/,
    `<link rel="canonical" href="${url}" />`);
  html = set(html, /<meta property="og:title" content="[^"]*" ?\/>/,
    `<meta property="og:title" content="${title}" />`);
  html = set(html, /<meta property="og:description" content="[^"]*" ?\/>/,
    `<meta property="og:description" content="${description}" />`);
  html = set(html, /<meta property="og:url" content="[^"]*" ?\/>/,
    `<meta property="og:url" content="${url}" />`);
  html = set(html, /<meta name="twitter:title" content="[^"]*" ?\/>/,
    `<meta name="twitter:title" content="${title}" />`);
  html = set(html, /<meta name="twitter:description" content="[^"]*" ?\/>/,
    `<meta name="twitter:description" content="${description}" />`);

  const file = `${route.replace(/^\//, "")}.html`;
  fs.writeFileSync(path.join(BUILD, file), html);
  console.log(`prerendered ${route} -> build/${file}`);
}
