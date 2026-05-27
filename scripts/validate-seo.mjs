import { readFile, stat } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";

const ROOT = process.cwd();
const SITE_URL = "https://appjobhunter.com";
const BAD_PATTERNS = [
  ["mahmoudashraf93", "github", "io"].join("."),
  ["", "job-hunter-landing", ""].join("/")
];

const exists = async (filePath) => {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
};

const fileForUrl = (url) => {
  const parsed = new URL(url);
  if (parsed.origin !== SITE_URL) {
    throw new Error(`Non-canonical sitemap URL: ${url}`);
  }
  if (parsed.pathname === "/") return path.join(ROOT, "index.html");
  return path.join(ROOT, parsed.pathname.replace(/^\/|\/$/g, ""), "index.html");
};

const sitemap = await readFile(path.join(ROOT, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

if (urls.length !== 47) {
  throw new Error(`Expected 47 sitemap URLs, found ${urls.length}`);
}

const textFiles = [
  "index.html",
  "privacy/index.html",
  "terms/index.html",
  "robots.txt",
  "sitemap.xml",
  "tools/index.html",
  "tools/free-resume-maker/index.html",
  "tools/free-cover-letter-generator/index.html",
  "guides/index.html",
  "guides/autofill-job-applications-iphone/index.html",
  "guides/find-top-remote-jobs-iphone/index.html",
  "guides/highest-hiring-companies-job-search/index.html",
  "guides/set-up-job-matching-profile/index.html",
  "guides/ats-friendly-resume-checklist/index.html",
  "guides/ai-cover-letter-generator-review-checklist/index.html"
];

for (const relativePath of textFiles) {
  const content = await readFile(path.join(ROOT, relativePath), "utf8");
  for (const pattern of BAD_PATTERNS) {
    if (content.includes(pattern)) {
      throw new Error(`${relativePath} still contains ${pattern}`);
    }
  }
}

for (const url of urls) {
  const filePath = fileForUrl(url);
  if (!(await exists(filePath))) {
    throw new Error(`Missing file for sitemap URL: ${url}`);
  }
  const html = await readFile(filePath, "utf8");
  const canonicalMatches = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)];
  if (canonicalMatches.length !== 1) {
    throw new Error(`${url} has ${canonicalMatches.length} canonical tags`);
  }
  if (canonicalMatches[0][1] !== url) {
    throw new Error(`${url} canonical points to ${canonicalMatches[0][1]}`);
  }
  if (!/<h1[\s>]/.test(html)) {
    throw new Error(`${url} is missing an H1`);
  }
}

const expectedAssets = [
  "images/512x512bb-2c184703c8.jpg",
  "images/60x60bb-4a7d0f083e.jpg",
  "tools/tool.css",
  "tools/free-resume-maker/tool.js",
  "tools/free-cover-letter-generator/tool.js",
  "guides/guide.css",
  "_next/static/chunks/f215fe74447fe0b9.css",
  "_next/static/chunks/66a8c16702b8a250.js"
];

for (const asset of expectedAssets) {
  if (!(await exists(path.join(ROOT, asset)))) {
    throw new Error(`Missing expected asset: ${asset}`);
  }
}

for (const script of [
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

console.log(`Validated ${urls.length} sitemap URLs and ${expectedAssets.length} representative assets.`);
