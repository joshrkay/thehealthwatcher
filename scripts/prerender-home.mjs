/**
 * Prerender the React homepage to static HTML inside dist/index.html.
 *
 * Vite ships a client-only SPA, so without this step the homepage's content
 * and SEO metadata only exist after JavaScript runs. This script renders the
 * App to an HTML string at build time and bakes it — plus the canonical/OG/
 * Twitter/JSON-LD head tags from src/seo-data.js — into dist/index.html, so the
 * page is fully crawlable without executing JavaScript. The client then
 * hydrates the prerendered markup (see src/main.jsx).
 *
 * Runs automatically after `vite build` via the postbuild npm script.
 */

import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const INDEX = join(ROOT, "dist", "index.html");

const escAttr = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// Escape "<" so a "</script>" inside JSON-LD can't terminate the script tag.
const escJson = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

function buildHeadTags({ homeMetaTags, homeLinkTags, homeJsonLd }) {
  const metas = homeMetaTags
    // The base index.html already ships <title> and <meta name="description">,
    // so skip description here to avoid emitting a duplicate tag.
    .filter(({ selector }) => selector !== 'meta[name="description"]')
    .map(({ attrs }) => {
      const attrStr = Object.entries(attrs)
        .map(([k, v]) => `${k}="${escAttr(v)}"`)
        .join(" ");
      return `    <meta ${attrStr} />`;
    });

  const links = homeLinkTags.map(({ attrs }) => {
    const attrStr = Object.entries(attrs)
      .map(([k, v]) => `${k}="${escAttr(v)}"`)
      .join(" ");
    return `    <link ${attrStr} />`;
  });

  const jsonLd = homeJsonLd.map(
    ({ id, data }) =>
      `    <script id="${id}" type="application/ld+json">${escJson(data)}</script>`,
  );

  return [...metas, ...links, ...jsonLd].join("\n");
}

async function main() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "warn",
  });

  try {
    const { default: App } = await vite.ssrLoadModule("/src/App.jsx");
    const seo = await vite.ssrLoadModule("/src/seo-data.js");

    const appHtml = renderToString(createElement(App));
    const headTags = buildHeadTags(seo);

    let html = await readFile(INDEX, "utf8");

    if (!html.includes('<div id="root"></div>')) {
      throw new Error('Could not find <div id="root"></div> in dist/index.html');
    }

    html = html
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
      .replace("</head>", `${headTags}\n  </head>`);

    await writeFile(INDEX, html, "utf8");
    console.log("Prerendered homepage into dist/index.html");
  } finally {
    await vite.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
