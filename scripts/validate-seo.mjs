import { readFile, stat } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import {
  guidePlans,
  guideRedirects,
  retainedGuideSlugs
} from "../content/seo-plan.mjs";

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
const EXPECTED_URLS = INDEXABLE_PATHS.map((pathname) => `${SITE_URL}${pathname}`);

const exists = async (filePath) => {
  try {
    await stat(filePath);
    return true;
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

const wordCount = (html) =>
  textFromHtml(html).split(/\s+/).filter(Boolean).length;

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

if (sitemapUrls.length !== 20) {
  throw new Error(`Expected 20 sitemap URLs, found ${sitemapUrls.length}`);
}

if (sitemap.includes("<priority>") || sitemap.includes("<changefreq>")) {
  throw new Error("Sitemap contains ignored priority or changefreq fields");
}

if (
  sitemapUrls.some((url) => !EXPECTED_URLS.includes(url)) ||
  EXPECTED_URLS.some((url) => !sitemapUrls.includes(url))
) {
  throw new Error("Sitemap membership does not match the 20 canonical URLs");
}

const seenTitles = new Map();
const seenDescriptions = new Map();
const seenH1s = new Map();

for (const pathname of INDEXABLE_PATHS) {
  const filePath = fileForPath(pathname);
  if (!(await exists(filePath))) throw new Error(`Missing indexable file: ${pathname}`);
  const html = await readFile(filePath, "utf8");
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
  const words = wordCount(article);
  if (words < 700) {
    throw new Error(`${pathname} has ${words} article words; expected at least 700`);
  }
  if (!html.includes("Frequently asked questions")) {
    throw new Error(`${pathname} is missing visible FAQs`);
  }
  if (!html.includes(plan.screenshot.src)) {
    throw new Error(`${pathname} is missing its planned screenshot`);
  }
}

for (const pathname of [
  "/tools/free-resume-maker/",
  "/tools/free-cover-letter-generator/"
]) {
  const html = await readFile(fileForPath(pathname), "utf8");
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1];
  const words = wordCount(main ?? "");
  if (words < 600) {
    throw new Error(`${pathname} has ${words} visible words; expected at least 600`);
  }
  if (!html.includes("Frequently asked questions")) {
    throw new Error(`${pathname} is missing visible FAQs`);
  }
}

for (const pathname of ["/privacy/", "/terms/"]) {
  const html = await readFile(fileForPath(pathname), "utf8");
  if (!/<meta name="robots" content="noindex,follow">/.test(html)) {
    throw new Error(`${pathname} must be noindex,follow`);
  }
  if (sitemapUrls.includes(`${SITE_URL}${pathname}`)) {
    throw new Error(`${pathname} must not appear in the sitemap`);
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
  "images/512x512bb-2c184703c8.jpg",
  "images/60x60bb-4a7d0f083e.jpg",
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
  `Validated ${INDEXABLE_PATHS.length} canonical URLs, ${guidePlans.length} substantial guides, ${Object.keys(guideRedirects).length} redirects, and ${expectedAssets.length} assets.`
);
