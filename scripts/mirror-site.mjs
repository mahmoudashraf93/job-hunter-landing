import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE_URL = "https://resume-maker-jobhunter.applanding.co";
const OUTPUT_DIR = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const ROUTES = ["/", "/privacy", "/terms"];

const textAssetExtensions = new Set([
  ".css",
  ".js",
  ".json",
  ".txt",
  ".map",
  ".html",
]);

const nextAssetPattern = /\/_next\/static\/[^"'`\s)\\]+/g;
const appleImagePattern = /https:\/\/is1-ssl\.mzstatic\.com\/[^"'`\s)\\]+/g;

const urlToLocalPath = new Map();
const downloadedAssets = new Set();

const routeToFilePath = (route) => {
  if (route === "/") return path.join(OUTPUT_DIR, "index.html");
  return path.join(OUTPUT_DIR, route.slice(1), "index.html");
};

const ensureParent = async (filePath) => {
  await mkdir(path.dirname(filePath), { recursive: true });
};

const fetchOrThrow = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return response;
};

const localPathForAppleImage = (urlString) => {
  if (urlToLocalPath.has(urlString)) return urlToLocalPath.get(urlString);

  const url = new URL(urlString);
  const hash = createHash("sha1").update(urlString).digest("hex").slice(0, 10);
  const ext = path.extname(url.pathname) || ".bin";
  const fileName = `${path.basename(url.pathname, ext)}-${hash}${ext}`;
  const localPath = `/images/${fileName}`;
  urlToLocalPath.set(urlString, localPath);
  return localPath;
};

const replaceAppleImageUrls = (content) =>
  content.replaceAll(appleImagePattern, (matchedUrl) => localPathForAppleImage(matchedUrl));

const extractMatches = (content, pattern) => {
  const matches = content.match(pattern);
  return matches ? [...new Set(matches)] : [];
};

const downloadBinaryAsset = async (assetUrl, localPath) => {
  if (downloadedAssets.has(localPath)) return;
  downloadedAssets.add(localPath);

  const response = await fetchOrThrow(assetUrl);
  const buffer = Buffer.from(await response.arrayBuffer());
  const outputPath = path.join(OUTPUT_DIR, localPath.replace(/^\//, ""));
  await ensureParent(outputPath);
  await writeFile(outputPath, buffer);
};

const queue = [];
const queued = new Set();

const enqueueTextAsset = (assetUrl, localPath) => {
  if (queued.has(localPath)) return;
  queued.add(localPath);
  queue.push({ assetUrl, localPath });
};

const processTextAsset = async ({ assetUrl, localPath }) => {
  if (downloadedAssets.has(localPath)) return;
  downloadedAssets.add(localPath);

  const response = await fetchOrThrow(assetUrl);
  let content = await response.text();

  for (const appleUrl of extractMatches(content, appleImagePattern)) {
    const localApplePath = localPathForAppleImage(appleUrl);
    await downloadBinaryAsset(appleUrl, localApplePath);
  }

  content = replaceAppleImageUrls(content);

  for (const nextAsset of extractMatches(content, nextAssetPattern)) {
    const ext = path.extname(nextAsset);
    const absoluteUrl = new URL(nextAsset, BASE_URL).toString();
    if (textAssetExtensions.has(ext)) {
      enqueueTextAsset(absoluteUrl, nextAsset);
    } else {
      await downloadBinaryAsset(absoluteUrl, nextAsset);
    }
  }

  const outputPath = path.join(OUTPUT_DIR, localPath.replace(/^\//, ""));
  await ensureParent(outputPath);
  await writeFile(outputPath, content);
};

for (const route of ROUTES) {
  const routeUrl = new URL(route, BASE_URL).toString();
  const response = await fetchOrThrow(routeUrl);
  let html = await response.text();

  for (const appleUrl of extractMatches(html, appleImagePattern)) {
    const localApplePath = localPathForAppleImage(appleUrl);
    await downloadBinaryAsset(appleUrl, localApplePath);
  }

  html = replaceAppleImageUrls(html);

  for (const nextAsset of extractMatches(html, nextAssetPattern)) {
    const ext = path.extname(nextAsset);
    const absoluteUrl = new URL(nextAsset, BASE_URL).toString();
    if (textAssetExtensions.has(ext)) {
      enqueueTextAsset(absoluteUrl, nextAsset);
    } else {
      await downloadBinaryAsset(absoluteUrl, nextAsset);
    }
  }

  const outputPath = routeToFilePath(route);
  await ensureParent(outputPath);
  await writeFile(outputPath, html);
}

while (queue.length > 0) {
  await processTextAsset(queue.shift());
}

console.log(`Mirrored ${ROUTES.length} routes into ${OUTPUT_DIR}`);
