import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const SITE_URL = "https://appjobhunter.com";
const APP_STORE_URL = "https://apps.apple.com/app/apple-store/id6645735955?pt=120006398&ct=lanlanding&mt=8";
const APP_ICON = `${SITE_URL}/images/app-icon.png`;
const ROOT = process.cwd();
const TEXT_EXTENSIONS = new Set([".html", ".js", ".css", ".txt", ".xml", ".json", ".map"]);
const SKIP_DIRS = new Set([".git", ".venv", "node_modules"]);
const LEGACY_ORIGIN = ["https://mahmoudashraf93", "github", "io"].join(".");
const LEGACY_PATH = ["", "job-hunter-landing"].join("/");
const LEGACY_PATH_WITH_SLASH = `${LEGACY_PATH}/`;
const LEGACY_BRAND = ["Resume Maker", "JobHunter"].join(": ");
const LEGACY_PRIVACY_CLAIM = ["Your data", "never leaves your device"].join(" ");
const LEGACY_PRIVACY_REMAINS = ["your data", "remains on your device"].join(" ");

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (TEXT_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
};

const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: "JobHunter",
  alternateName: "Resume Maker: JobHunter",
  applicationCategory: "BusinessApplication",
  operatingSystem: "iOS",
  url: SITE_URL,
  downloadUrl: APP_STORE_URL,
  image: APP_ICON,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock"
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.2",
    ratingCount: "5"
  },
  publisher: {
    "@type": "Organization",
    name: "JobHunter",
    url: SITE_URL,
    sameAs: [
      APP_STORE_URL,
      "https://github.com/mahmoudashraf93/job-hunter-landing"
    ]
  }
};

const guideStrip = `<section id="seo-guide-strip" style="background:#f6f8fb;color:#14213d;padding:56px 24px;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:1120px;margin:0 auto">
    <p style="margin:0 0 10px;color:#2364aa;font-size:13px;font-weight:800;letter-spacing:.08em;text-transform:uppercase">JobHunter Guides</p>
    <h2 style="margin:0 0 14px;font-size:clamp(28px,4vw,44px);line-height:1.08;letter-spacing:0">Practical guides for faster job applications</h2>
    <p style="max-width:720px;margin:0 0 26px;color:#526173;font-size:18px;line-height:1.65">Learn how to autofill job applications on iPhone, prepare ATS-friendly resumes, and review AI cover letters before you submit.</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px">
      <a href="/guides/autofill-job-applications-iphone/" style="display:block;padding:18px;border:1px solid #d9e1ea;border-radius:8px;background:white;text-decoration:none;color:#14213d"><strong>Autofill job applications</strong><br><span style="color:#526173">Save repeat typing on iPhone forms.</span></a>
      <a href="/guides/ats-friendly-resume-checklist/" style="display:block;padding:18px;border:1px solid #d9e1ea;border-radius:8px;background:white;text-decoration:none;color:#14213d"><strong>Resume builder workflow</strong><br><span style="color:#526173">Use cleaner resumes for online forms.</span></a>
      <a href="/guides/ai-cover-letter-generator-review-checklist/" style="display:block;padding:18px;border:1px solid #d9e1ea;border-radius:8px;background:white;text-decoration:none;color:#14213d"><strong>AI cover letters</strong><br><span style="color:#526173">Draft faster and review before sending.</span></a>
      <a href="/guides/" style="display:block;padding:18px;border:1px solid #d9e1ea;border-radius:8px;background:#14213d;text-decoration:none;color:white"><strong>View all guides</strong><br><span style="color:#d9e1ea">15 in-depth job search guides.</span></a>
    </div>
  </div>
</section>`;

const patchCommon = (input) =>
  input
    .replaceAll(`${LEGACY_ORIGIN}${LEGACY_PATH}`, SITE_URL)
    .replaceAll(LEGACY_ORIGIN, SITE_URL)
    .replaceAll(LEGACY_PATH_WITH_SLASH, "/")
    .replaceAll(LEGACY_PATH, "")
    .replaceAll(LEGACY_BRAND, "JobHunter")
    .replaceAll(LEGACY_PRIVACY_CLAIM, "Your saved profile and application details stay on your device")
    .replaceAll(
      LEGACY_PRIVACY_REMAINS,
      "your saved profile and application details stay on your device"
    );

const patchHomepage = (input) => {
  let html = input;
  html = html.replace(
    /<title>.*?<\/title>/,
    "<title>JobHunter | Autofill Job Applications, Resumes, and AI Cover Letters</title>"
  );
  html = html.replace(
    /<meta name="description" content="[^"]*"\/>/,
    '<meta name="description" content="JobHunter helps iPhone job seekers autofill applications, attach resumes, build reusable profile details, and draft AI cover letters faster."/>'
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\/>/,
    '<meta property="og:title" content="JobHunter | Autofill Job Applications Faster"/>'
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\/>/,
    '<meta property="og:description" content="Autofill job applications from your iPhone, attach resumes, and draft AI cover letters with JobHunter."/>'
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\/>/,
    '<meta name="twitter:title" content="JobHunter | Autofill Job Applications Faster"/>'
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\/>/,
    '<meta name="twitter:description" content="Autofill job applications from your iPhone, attach resumes, and draft AI cover letters with JobHunter."/>'
  );
  html = html.replace(
    /<script type="application\/ld\+json">.*?<\/script>/,
    `<script type="application/ld+json">${JSON.stringify(homepageSchema)}</script>`
  );
  html = html.replace(
    /<h1([^>]*)>JobHunter<\/h1><p class="text-lg sm:text-xl md:text-2xl mb-6 leading-snug"[^>]*>Mahmoud Ashraf<\/p>/,
    "<h1$1>JobHunter</h1>"
  );
  html = html.replace(
    /<h1([^>]*)>JobHunter<\/h1><p class="text-lg sm:text-xl md:text-2xl mb-6 leading-snug"[^>]*>Mahmoud Ashraf<\/p>/,
    "<h1$1>JobHunter</h1>"
  );
  html = html.replace(new RegExp(`<script>\\(function\\(\\)\\{function ${["update", "Hero"].join("")}\\(\\).*?<\\/script>`), "");
  if (
    !html.includes('id="seo-guide-strip"') &&
    !html.includes('class="section guide-section"')
  ) {
    html = html.replace("<footer", `${guideStrip}<footer`);
  }
  return html;
};

const legalPage = ({ title, description, pathname, body }) => {
  const canonical = `${SITE_URL}${pathname}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="noindex,follow">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${APP_ICON}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${APP_ICON}">
  <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png">
  <link rel="stylesheet" href="/guides/guide.css">
</head>
<body>
  <header class="site-header">
    <a class="brand" href="/" aria-label="JobHunter home"><img src="/images/app-icon.png" alt="" width="40" height="40"><span>JobHunter</span></a>
    <nav aria-label="Primary"><a href="/guides/">Guides</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a><a class="download-link" href="${APP_STORE_URL}">Download</a></nav>
  </header>
  <main class="article-shell">
    <article class="article">
      ${body}
    </article>
  </main>
  <footer class="site-footer">
    <p>JobHunter helps iPhone job seekers autofill applications, attach resumes, and draft AI cover letters faster.</p>
    <nav aria-label="Footer"><a href="/">Home</a><a href="/guides/">Guides</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></nav>
  </footer>
</body>
</html>
`;
};

const writeLegalPages = async () => {
  const privacy = legalPage({
    title: "Privacy Policy | JobHunter",
    description:
      "Read the JobHunter privacy policy, including how saved profile details, resume information, purchases, and diagnostics are handled.",
    pathname: "/privacy/",
    body: `<p class="eyebrow">Last updated May 28, 2026</p>
      <h1>Privacy Policy</h1>
      <p class="intro">JobHunter is designed to help you apply faster while keeping your application workflow under your control.</p>
      <section>
        <h2>Saved application information</h2>
        <p>Profile details, resume information, and reusable job application answers you save in JobHunter are used to help autofill applications and prepare application materials.</p>
        <p>Your saved profile and application details are intended for your use in the app and extension workflow. Review every application before submitting it to an employer.</p>
      </section>
      <section>
        <h2>Apple and purchase information</h2>
        <p>Apple may provide purchase, subscription, diagnostic, or attribution information needed for App Store functionality, in-app purchases, analytics, or fraud prevention. Apple's App Store privacy disclosures may describe identifiers or purchase history associated with these platform features.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>For privacy questions or support, use the contact option inside the app.</p>
      </section>`
  });
  const terms = legalPage({
    title: "Terms of Service | JobHunter",
    description:
      "Read the JobHunter terms for using the iPhone app, Safari extension workflow, resume tools, and AI cover letter features.",
    pathname: "/terms/",
    body: `<p class="eyebrow">Last updated May 28, 2026</p>
      <h1>Terms of Service</h1>
      <p class="intro">These terms explain the basic conditions for using JobHunter's app, Safari extension workflow, resume tools, and AI cover letter features.</p>
      <section>
        <h2>Use of the app</h2>
        <p>JobHunter helps with job application workflows, including autofilling repeat fields, attaching resumes, and drafting cover letters. You are responsible for reviewing all information before submitting an application to an employer.</p>
      </section>
      <section>
        <h2>No employment guarantee</h2>
        <p>JobHunter does not guarantee interviews, offers, employment outcomes, or employer responses. Job search results depend on many factors outside the app.</p>
      </section>
      <section>
        <h2>Subscriptions and purchases</h2>
        <p>In-app purchases and subscriptions are handled through Apple. Apple's standard terms and App Store purchase rules apply to billing, cancellation, and refunds where applicable.</p>
      </section>
      <section>
        <h2>Acceptable use</h2>
        <p>Use JobHunter only for lawful job search activity and do not submit false, misleading, or unauthorized information in job applications.</p>
      </section>`
  });
  await mkdir(path.join(ROOT, "privacy"), { recursive: true });
  await mkdir(path.join(ROOT, "terms"), { recursive: true });
  await writeFile(path.join(ROOT, "privacy", "index.html"), privacy);
  await writeFile(path.join(ROOT, "terms", "index.html"), terms);

  const legacyPrivacy = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JobHunter Privacy Policy</title>
  <meta name="robots" content="noindex,follow">
  <link rel="canonical" href="${SITE_URL}/privacy/">
  <meta http-equiv="refresh" content="0; url=${SITE_URL}/privacy/">
</head>
<body>
  <p>The JobHunter privacy policy has moved to <a href="${SITE_URL}/privacy/">${SITE_URL}/privacy/</a>.</p>
  <script>location.replace(${JSON.stringify(`${SITE_URL}/privacy/`)});</script>
</body>
</html>
`;
  await mkdir(path.join(ROOT, "privacypolicy"), { recursive: true });
  await writeFile(path.join(ROOT, "privacypolicy", "index.html"), legacyPrivacy);
};

for (const file of await walk(ROOT)) {
  const original = await readFile(file, "utf8");
  let patched = patchCommon(original);
  if (path.basename(file) === "index.html" && path.dirname(file) === ROOT) {
    patched = patchHomepage(patched);
  }
  if (patched !== original) {
    await writeFile(file, patched);
  }
}

await writeLegalPages();

console.log("Applied canonical, asset path, homepage, and legal-page SEO patches.");
