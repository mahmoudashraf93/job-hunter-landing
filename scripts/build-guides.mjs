import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { articles as baseArticles, clusterLabels } from "../content/articles.mjs";
import { jobMatchingArticles } from "../content/job-matching-articles.mjs";
import { guidePlans, SITE_MODIFIED } from "../content/seo-plan.mjs";

const SITE_URL = "https://appjobhunter.com";
const APP_NAME = "JobHunter";
const APP_STORE_URL = "https://apps.apple.com/app/apple-store/id6645735955?pt=120006398&ct=lanlanding&mt=8";
const APP_ICON = `${SITE_URL}/images/app-icon.png`;
const DATE_PUBLISHED = "2026-05-28";
const OUTPUT_DIR = process.cwd();
const sourceArticles = [...baseArticles, ...jobMatchingArticles];
const sourceBySlug = new Map(sourceArticles.map((article) => [article.slug, article]));
const articles = guidePlans.map((plan) => {
  const base = sourceBySlug.get(plan.slug);
  if (!base) throw new Error(`Missing source article: ${plan.slug}`);

  const absorbedSections = plan.redirectFrom.flatMap((slug) => {
    const source = sourceBySlug.get(slug);
    if (!source) throw new Error(`Missing redirected source article: ${slug}`);
    return [
      { heading: source.h1, paragraphs: [source.intro] },
      ...source.sections
    ];
  });

  return {
    ...base,
    ...plan,
    sections: [
      ...base.sections,
      ...absorbedSections,
      ...plan.editorialSections
    ],
    datePublished: DATE_PUBLISHED,
    dateModified: SITE_MODIFIED
  };
});

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const absoluteUrl = (pathname) => `${SITE_URL}${pathname}`;

const articlePath = (article) => `/guides/${article.slug}/`;

const pageFilePath = (pathname) => {
  if (pathname === "/") return path.join(OUTPUT_DIR, "index.html");
  return path.join(OUTPUT_DIR, pathname.replace(/^\/|\/$/g, ""), "index.html");
};

const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data)}</script>`;

const renderHead = ({ title, description, pathname, schema }) => {
  const canonical = absoluteUrl(pathname);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="article">
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
  ${jsonLd(schema)}
</head>`;
};

const siteHeader = `<header class="site-header">
  <a class="brand" href="/" aria-label="JobHunter home">
    <img src="/images/app-icon.png" alt="" width="40" height="40">
    <span>JobHunter</span>
  </a>
  <nav aria-label="Primary">
    <a href="/tools/">Tools</a>
    <a href="/guides/">Guides</a>
    <a href="/privacy/">Privacy</a>
    <a href="/terms/">Terms</a>
    <a class="download-link" href="${APP_STORE_URL}">Download</a>
  </nav>
</header>`;

const siteFooter = `<footer class="site-footer">
  <p>JobHunter helps iPhone job seekers find matched jobs, autofill applications, attach resumes, and draft AI cover letters faster.</p>
  <nav aria-label="Footer">
    <a href="/">Home</a>
    <a href="/tools/">Tools</a>
    <a href="/guides/">Guides</a>
    <a href="/privacy/">Privacy</a>
    <a href="/terms/">Terms</a>
  </nav>
</footer>`;

const articleSchema = (article, pathname) => {
  const graph = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Guides",
          item: `${SITE_URL}/guides/`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: article.h1,
          item: absoluteUrl(pathname)
        }
      ]
    },
    {
      "@type": "Article",
      headline: article.h1,
      description: article.description,
      image: absoluteUrl(article.screenshot.src),
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      author: {
        "@type": "Organization",
        name: APP_NAME,
        url: SITE_URL
      },
      publisher: {
        "@type": "Organization",
        name: APP_NAME,
        logo: {
          "@type": "ImageObject",
          url: APP_ICON
        }
      },
      mainEntityOfPage: absoluteUrl(pathname)
    },
    {
      "@type": "FAQPage",
      mainEntity: article.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    }
  ];
  return { "@context": "https://schema.org", "@graph": graph };
};

const getRelated = (article) =>
  article.relatedSlugs.map((slug) => {
    const related = articles.find((candidate) => candidate.slug === slug);
    if (!related) throw new Error(`Missing related guide ${slug} for ${article.slug}`);
    return related;
  });

const renderArticle = (article) => {
  const pathname = articlePath(article);
  const related = getRelated(article);
  return `${renderHead({
    title: `${article.title} | JobHunter Guides`,
    description: article.description,
    pathname,
    schema: articleSchema(article, pathname)
  })}
<body>
${siteHeader}
<main class="article-shell">
  <a class="breadcrumb" href="/guides/">Guides</a>
  <article class="article">
    <p class="eyebrow">${escapeHtml(clusterLabels[article.cluster])}</p>
    <h1>${escapeHtml(article.h1)}</h1>
    <p class="intro">${escapeHtml(article.intro)}</p>
    <p class="byline">Published ${article.datePublished} · Updated ${article.dateModified} · By the JobHunter team</p>
    <figure class="article-image">
      <img src="${article.screenshot.src}" alt="${escapeHtml(article.screenshot.alt)}" width="1125" height="2436">
      <figcaption>${escapeHtml(article.screenshot.alt)}</figcaption>
    </figure>
    ${article.sections
      .map((section) => {
        const paragraphs = (section.paragraphs || [])
          .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
          .join("\n      ");
        const bullets = section.bullets
          ? `<ul>${section.bullets
              .map((bullet) => `<li>${escapeHtml(bullet)}</li>`)
              .join("")}</ul>`
          : "";
        return `<section>
      <h2>${escapeHtml(section.heading)}</h2>
      ${paragraphs}${bullets ? `\n      ${bullets}` : ""}
    </section>`;
      })
      .join("\n")}
    <aside class="cta">
      <h2>Apply faster from your iPhone</h2>
      <p>Save your profile once, autofill repeat fields, attach resumes, and draft cover letters with JobHunter.</p>
      <a href="${APP_STORE_URL}">Download JobHunter on the App Store</a>
    </aside>
    <section class="faq-section">
      <h2>Frequently asked questions</h2>
      ${article.faqs
        .map(
          (faq) => `<details>
        <summary>${escapeHtml(faq.question)}</summary>
        <p>${escapeHtml(faq.answer)}</p>
      </details>`
        )
        .join("\n")}
    </section>
  </article>
  <section class="related">
    <h2>Related guides</h2>
    <div class="related-grid">
      ${related
        .map(
          (item) => `<a href="${articlePath(item)}">
        <span>${escapeHtml(clusterLabels[item.cluster])}</span>
        <strong>${escapeHtml(item.title)}</strong>
      </a>`
        )
        .join("\n")}
    </div>
  </section>
</main>
${siteFooter}
</body>
</html>
`;
};

const renderGuideIndex = () => {
  const grouped = Object.keys(clusterLabels).map((cluster) => ({
    cluster,
    label: clusterLabels[cluster],
    items: articles.filter((article) => article.cluster === cluster)
  }));
  const pathname = "/guides/";
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "JobHunter Job Application Guides",
    description:
      "Practical guides for matched jobs, remote jobs, autofilling applications, building resumes, and writing cover letters faster from iPhone.",
    url: absoluteUrl(pathname)
  };
  return `${renderHead({
    title: "Job Matching, Resume, and Application Guides | JobHunter",
    description:
      "Practical guides for JobHunter job matching, remote jobs, application autofill, iPhone resume workflows, ATS-friendly resumes, and AI cover letters.",
    pathname,
    schema
  }).replace('property="og:type" content="article"', 'property="og:type" content="website"')}
<body>
${siteHeader}
<main class="index-shell">
  <section class="hero">
    <p class="eyebrow">JobHunter Guides</p>
    <h1>Find better jobs and apply faster from iPhone</h1>
    <p>Use these guides to review matched jobs, find remote roles, compare hiring companies, autofill applications, prepare ATS-friendly resumes, and draft cover letters without losing control of the final submission.</p>
  </section>
  ${grouped
    .map(
      (group) => `<section class="cluster">
    <h2>${escapeHtml(group.label)}</h2>
    <div class="card-grid">
      ${group.items
        .map(
          (article) => `<a class="guide-card" href="${articlePath(article)}">
        <span>${escapeHtml(group.label)}</span>
        <strong>${escapeHtml(article.title)}</strong>
        <p>${escapeHtml(article.description)}</p>
      </a>`
        )
        .join("\n")}
    </div>
  </section>`
    )
    .join("\n")}
</main>
${siteFooter}
</body>
</html>
`;
};

const css = `:root {
  color-scheme: light;
  --ink: #14213d;
  --muted: #526173;
  --line: #d9e1ea;
  --paper: #ffffff;
  --soft: #f6f8fb;
  --blue: #2364aa;
  --green: #2a9d8f;
  --gold: #f0b429;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: var(--ink);
  background: var(--paper);
  line-height: 1.65;
}
a { color: inherit; }
.site-header,
.site-footer {
  max-width: 1120px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.site-header { border-bottom: 1px solid var(--line); }
.site-footer { border-top: 1px solid var(--line); color: var(--muted); }
.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  text-decoration: none;
}
.brand img { border-radius: 10px; }
nav { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
nav a { color: var(--muted); font-weight: 700; text-decoration: none; }
.download-link,
.cta a {
  background: var(--ink);
  color: #fff;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  display: inline-flex;
  font-weight: 800;
}
.index-shell,
.article-shell {
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 24px 72px;
}
.hero {
  max-width: 760px;
  padding: 36px 0 28px;
}
.eyebrow,
.breadcrumb {
  color: var(--blue);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.breadcrumb {
  display: inline-flex;
  margin-bottom: 22px;
  text-decoration: none;
}
h1 {
  font-size: clamp(2.25rem, 5vw, 4.5rem);
  line-height: 1.04;
  letter-spacing: 0;
  margin: 0 0 18px;
}
h2 {
  font-size: clamp(1.35rem, 2.4vw, 2rem);
  line-height: 1.18;
  letter-spacing: 0;
  margin: 0 0 12px;
}
p { margin: 0 0 18px; }
.intro,
.hero p {
  color: var(--muted);
  font-size: 1.16rem;
}
.byline {
  color: var(--muted);
  font-size: 0.92rem;
  margin-bottom: 26px;
}
.article-image {
  margin: 30px 0 40px;
  max-width: 420px;
}
.article-image img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 24px;
  border: 1px solid var(--line);
  box-shadow: 0 20px 50px rgba(20, 33, 61, 0.14);
}
.article-image figcaption {
  color: var(--muted);
  font-size: 0.85rem;
  margin-top: 10px;
}
.cluster { margin-top: 46px; }
.card-grid,
.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
.guide-card,
.related a {
  display: block;
  min-height: 180px;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 20px;
  text-decoration: none;
  background: var(--soft);
}
.guide-card span,
.related span {
  display: block;
  color: var(--green);
  font-size: 0.78rem;
  font-weight: 800;
  margin-bottom: 10px;
  text-transform: uppercase;
}
.guide-card strong,
.related strong {
  display: block;
  font-size: 1.08rem;
  line-height: 1.25;
  margin-bottom: 10px;
}
.guide-card p { color: var(--muted); font-size: 0.95rem; }
.article {
  max-width: 760px;
}
.article section {
  margin-top: 38px;
}
ul {
  margin: 0 0 18px;
  padding-left: 24px;
}
li { margin: 8px 0; }
.cta {
  margin: 44px 0;
  border-left: 6px solid var(--gold);
  background: #fff8e7;
  padding: 24px;
  border-radius: 8px;
}
.cta p { color: var(--muted); }
.related {
  margin-top: 54px;
}
.faq-section details {
  border-top: 1px solid var(--line);
  padding: 16px 0;
}
.faq-section details:last-child { border-bottom: 1px solid var(--line); }
.faq-section summary { cursor: pointer; font-weight: 800; }
.faq-section details p { color: var(--muted); margin: 12px 0 0; }
@media (max-width: 720px) {
  .site-header,
  .site-footer {
    align-items: flex-start;
    flex-direction: column;
  }
  .site-header nav,
  .site-footer nav {
    gap: 12px;
  }
  .index-shell,
  .article-shell {
    padding-top: 26px;
  }
}
`;

const write = async (pathname, html) => {
  const filePath = pageFilePath(pathname);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, html);
};

const sitemapUrls = [
  { loc: `${SITE_URL}/`, lastmod: SITE_MODIFIED },
  { loc: `${SITE_URL}/tools/`, lastmod: SITE_MODIFIED },
  { loc: `${SITE_URL}/tools/free-resume-maker/`, lastmod: SITE_MODIFIED },
  { loc: `${SITE_URL}/tools/free-cover-letter-generator/`, lastmod: SITE_MODIFIED },
  { loc: `${SITE_URL}/guides/`, lastmod: SITE_MODIFIED },
  ...articles.map((article) => ({
    loc: absoluteUrl(articlePath(article)),
    lastmod: article.dateModified
  }))
];

await rm(path.join(OUTPUT_DIR, "guides"), { recursive: true, force: true });
await write("/guides/", renderGuideIndex());

for (const article of articles) {
  await write(articlePath(article), renderArticle(article));
}

await writeFile(path.join(OUTPUT_DIR, "guides", "guide.css"), css);
await writeFile(
  path.join(OUTPUT_DIR, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>
`
);

await writeFile(
  path.join(OUTPUT_DIR, "robots.txt"),
  `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
);

console.log(`Built ${articles.length} guide pages and sitemap.`);
