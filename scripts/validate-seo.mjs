import { readFile, stat } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import {
  guidePlans,
  guideRedirects,
  retainedGuideSlugs,
  SITE_MODIFIED,
  PAGE_MODIFIED
} from "../content/seo-plan.mjs";
import { auditInternalLinks } from "./seo-links.mjs";

const ROOT = process.cwd();
const SITE_URL = "https://appjobhunter.com";
const FIXED_INDEXABLE_PATHS = [
  "/",
  "/tools/",
  "/tools/free-resume-maker/",
  "/tools/free-cover-letter-generator/",
  "/guides/"
];
const INDEXABLE_PATHS = [
  ...FIXED_INDEXABLE_PATHS,
  ...retainedGuideSlugs.map((slug) => `/guides/${slug}/`)
];
const BRANDED_PATHS = [...INDEXABLE_PATHS, "/privacy/", "/terms/"];
const EXPECTED_URLS = INDEXABLE_PATHS.map((pathname) => `${SITE_URL}${pathname}`);
const APP_ICON_URL = `${SITE_URL}/images/app-icon.png`;
const STALE_ICON_PATHS = [
  "/images/512x512bb-2c184703c8.jpg",
  "/images/100x100bb-ed35c7b432.jpg",
  "/images/60x60bb-4a7d0f083e.jpg"
];

const exists = async (filePath) => {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
};

const fileForPath = (pathname) => {
  if (pathname === "/") return path.join(ROOT, "index.html");
  return path.join(ROOT, pathname.replace(/^\/+|\/+$/g, ""), "index.html");
};

const textFromHtml = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:nbsp|amp|quot|#39);/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const oneMatch = (html, pattern, label, pathname) => {
  const matches = [...html.matchAll(pattern)];
  if (matches.length !== 1) {
    throw new Error(`${pathname} has ${matches.length} ${label} values`);
  }
  return matches[0][1];
};

const sitemap = await readFile(path.join(ROOT, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => match[1]
);

if (sitemapUrls.length !== EXPECTED_URLS.length) {
  throw new Error(`Expected ${EXPECTED_URLS.length} sitemap URLs, found ${sitemapUrls.length}`);
}

if (sitemap.includes("<priority>") || sitemap.includes("<changefreq>")) {
  throw new Error("Sitemap contains ignored priority or changefreq fields");
}

if (
  sitemapUrls.some((url) => !EXPECTED_URLS.includes(url)) ||
  EXPECTED_URLS.some((url) => !sitemapUrls.includes(url))
) {
  throw new Error("Sitemap membership does not match the canonical URL set");
}

const sitemapDates = new Map([...sitemap.matchAll(/<url>\s*<loc>(.*?)<\/loc>\s*<lastmod>(.*?)<\/lastmod>/g)].map(([, url, date]) => [url, date]));
for (const pathname of FIXED_INDEXABLE_PATHS) {
  const expectedDate = pathname === "/guides/"
    ? guidePlans.map((plan) => plan.dateModified ?? SITE_MODIFIED).sort().at(-1)
    : PAGE_MODIFIED[pathname] ?? SITE_MODIFIED;
  if (sitemapDates.get(`${SITE_URL}${pathname}`) !== expectedDate) {
    throw new Error(`${pathname} has an incorrect sitemap modification date`);
  }
}

const seenTitles = new Map();
const seenDescriptions = new Map();
const seenH1s = new Map();
const pages = new Map();

for (const pathname of INDEXABLE_PATHS) {
  const filePath = fileForPath(pathname);
  if (!(await exists(filePath))) throw new Error(`Missing indexable file: ${pathname}`);
  const html = await readFile(filePath, "utf8");
  pages.set(pathname, html);
  const canonical = oneMatch(
    html,
    /<link rel="canonical" href="([^"]+)"/g,
    "canonical",
    pathname
  );
  const expectedCanonical = `${SITE_URL}${pathname}`;
  if (canonical !== expectedCanonical) {
    throw new Error(`${pathname} canonical points to ${canonical}`);
  }
  if (/<meta name="robots" content="[^"]*noindex/i.test(html)) {
    throw new Error(`${pathname} is accidentally noindex`);
  }
  if (!html.includes(`<meta property="og:image" content="${APP_ICON_URL}">`)) {
    throw new Error(`${pathname} does not use the current app icon for social previews`);
  }
  if (!html.includes('href="/images/favicon-32x32.png"')) {
    throw new Error(`${pathname} does not use the current favicon`);
  }
  if (!html.includes('href="/images/apple-touch-icon.png"')) {
    throw new Error(`${pathname} does not use the current Apple touch icon`);
  }
  if (STALE_ICON_PATHS.some((asset) => html.includes(asset))) {
    throw new Error(`${pathname} still references a retired app icon`);
  }

  const title = oneMatch(html, /<title>([^<]+)<\/title>/g, "title", pathname);
  const description = oneMatch(
    html,
    /<meta name="description" content="([^"]+)"/g,
    "description",
    pathname
  );
  const h1 = oneMatch(html, /<h1[^>]*>([\s\S]*?)<\/h1>/g, "H1", pathname);

  for (const [value, label, seen] of [
    [title, "title", seenTitles],
    [description, "description", seenDescriptions],
    [textFromHtml(h1), "H1", seenH1s]
  ]) {
    if (seen.has(value)) {
      throw new Error(`${pathname} duplicates ${label} from ${seen.get(value)}`);
    }
    seen.set(value, pathname);
  }

  const schemas = [
    ...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)
  ];
  if (!schemas.length) throw new Error(`${pathname} has no JSON-LD`);
  for (const schema of schemas) {
    try {
      JSON.parse(schema[1]);
    } catch (error) {
      throw new Error(`${pathname} contains invalid JSON-LD: ${error.message}`);
    }
  }

  for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
    const href = match[1];
    const targetPath = href.split(/[?#]/)[0];
    if (!targetPath || targetPath === "/") continue;
    if (guideRedirects[targetPath]) {
      throw new Error(`${pathname} links to retired guide ${targetPath}`);
    }
    if (!(await exists(fileForPath(targetPath)))) {
      const assetPath = path.join(ROOT, targetPath.replace(/^\//, ""));
      if (!(await exists(assetPath))) {
        throw new Error(`${pathname} has broken internal link ${href}`);
      }
    }
  }
}

for (const plan of guidePlans) {
  const pathname = `/guides/${plan.slug}/`;
  const html = await readFile(fileForPath(pathname), "utf8");
  const article = html.match(/<article class="article">([\s\S]*?)<\/article>/)?.[1];
  if (!article) throw new Error(`${pathname} is missing article content`);
  if (!textFromHtml(article)) throw new Error(`${pathname} has empty article content`);
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])["@graph"];
  const metadata = graph.find((item) => item["@type"] === "Article");
  const modified = plan.dateModified ?? SITE_MODIFIED;
  if (metadata?.dateModified !== modified || sitemapDates.get(`${SITE_URL}${pathname}`) !== modified ||
      !article.includes(`Published <time datetime="${metadata.datePublished}">`) ||
      !article.includes(`Updated <time datetime="${modified}">`)) {
    throw new Error(`${pathname} has inconsistent visible, structured or sitemap dates`);
  }
  if (!html.includes("Frequently asked questions")) {
    throw new Error(`${pathname} is missing visible FAQs`);
  }
  if (plan.screenshot && !html.includes(plan.screenshot.src)) {
    throw new Error(`${pathname} is missing its planned screenshot`);
  }
}

for (const pathname of [
  "/tools/free-resume-maker/",
  "/tools/free-cover-letter-generator/"
]) {
  const html = await readFile(fileForPath(pathname), "utf8");
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1];
  if (!main || !textFromHtml(main)) throw new Error(`${pathname} has empty main content`);
  if (!html.includes("Frequently asked questions")) {
    throw new Error(`${pathname} is missing visible FAQs`);
  }
}

for (const pathname of ["/privacy/", "/terms/"]) {
  const html = await readFile(fileForPath(pathname), "utf8");
  pages.set(pathname, html);
  if (!/<meta name="robots" content="noindex,follow">/.test(html)) {
    throw new Error(`${pathname} must be noindex,follow`);
  }
  if (sitemapUrls.includes(`${SITE_URL}${pathname}`)) {
    throw new Error(`${pathname} must not appear in the sitemap`);
  }
}

const links = auditInternalLinks(pages, INDEXABLE_PATHS, {
  origin: SITE_URL,
  redirects: { ...guideRedirects, "/privacypolicy/": "/privacy/" }
});
for (const { from, to } of links.references) {
  if (!(await exists(fileForPath(to))) && !(await exists(path.join(ROOT, to.replace(/^\//, ""))))) {
    throw new Error(`${from} has broken internal link ${to}`);
  }
}

for (const pathname of BRANDED_PATHS) {
  const html = await readFile(fileForPath(pathname), "utf8");
  if (!html.includes(`<meta name="twitter:image" content="${APP_ICON_URL}">`)) {
    throw new Error(`${pathname} does not use the current app icon for Twitter previews`);
  }
  if (!html.includes('<img src="/images/app-icon.png"')) {
    throw new Error(`${pathname} does not use the current app icon in its header`);
  }
  if (STALE_ICON_PATHS.some((asset) => html.includes(asset))) {
    throw new Error(`${pathname} still references a retired app icon`);
  }
}

for (const [source, target] of Object.entries(guideRedirects)) {
  if (!INDEXABLE_PATHS.includes(target)) {
    throw new Error(`Redirect target is not canonical: ${source} -> ${target}`);
  }
  if (await exists(fileForPath(source))) {
    throw new Error(`Retired guide directory still exists: ${source}`);
  }
}

const legacyPrivacy = await readFile(
  path.join(ROOT, "privacypolicy", "index.html"),
  "utf8"
);
if (!legacyPrivacy.includes(`${SITE_URL}/privacy/`)) {
  throw new Error("Legacy privacy page does not point to the canonical policy");
}

const expectedAssets = [
  "images/app-icon.png",
  "images/favicon-32x32.png",
  "images/apple-touch-icon.png",
  "favicon.ico",
  "tools/tool.css",
  "tools/free-resume-maker/tool.js",
  "tools/free-cover-letter-generator/tool.js",
  "guides/guide.css",
  "public/ios/iphone/1125x2436/en/03-device-bottom.png",
  "public/ios/iphone/1125x2436/en/04-device-top.png",
  "public/ios/iphone/1125x2436/en/05-device-bottom.png",
  "public/ios/iphone/1125x2436/en/06-two-devices.png",
  "public/ios/iphone/1125x2436/en/07-device-top.png"
];

for (const asset of expectedAssets) {
  if (!(await exists(path.join(ROOT, asset)))) {
    throw new Error(`Missing expected asset: ${asset}`);
  }
}

for (const script of [
  "src/worker.js",
  "tools/free-resume-maker/tool.js",
  "tools/free-cover-letter-generator/tool.js"
]) {
  const result = spawnSync(process.execPath, ["--check", path.join(ROOT, script)], {
    encoding: "utf8"
  });
  if (result.status !== 0) {
    throw new Error(`${script} failed syntax check:\n${result.stderr || result.stdout}`);
  }
}

console.log(
  `Validated ${INDEXABLE_PATHS.length} canonical URLs, ${guidePlans.length} guides, ${Object.keys(guideRedirects).length} redirects, and ${expectedAssets.length} assets. All indexable pages are reachable; maximum depth: ${links.maxDepth} clicks.`
);
