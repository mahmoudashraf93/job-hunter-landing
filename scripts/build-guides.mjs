import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { articles as baseArticles, clusterLabels } from "../content/articles.mjs";
import { jobMatchingArticles } from "../content/job-matching-articles.mjs";
import { guidePlans, SITE_MODIFIED, PAGE_MODIFIED } from "../content/seo-plan.mjs";
import { articleDates, escapeHtml, outlineSections, readingMinutes, renderFigure, renderLinks, renderSection, safeHref } from "./guide-rendering.mjs";

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
    sections: plan.sections ?? [
      ...base.sections,
      ...absorbedSections,
      ...plan.editorialSections
    ],
    ...articleDates(plan, { datePublished: DATE_PUBLISHED, dateModified: SITE_MODIFIED })
  };
});

const absoluteUrl = (pathname) => `${SITE_URL}${pathname}`;

const articlePath = (article) => `/guides/${article.slug}/`;

const pageFilePath = (pathname) => {
  if (pathname === "/") return path.join(OUTPUT_DIR, "index.html");
  return path.join(OUTPUT_DIR, pathname.replace(/^\/|\/$/g, ""), "index.html");
};

const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data)}</script>`;

const renderHead = ({ title, description, pathname, schema, practice = false }) => {
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
  <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/guides/guide.css?v=20261031">
  <script src="/guides/guide.js" defer></script>
  ${practice ? '<script type="module" src="/guides/practice.js"></script>' : ""}
  ${jsonLd(schema)}
</head>`;
};

const siteHeader = `<a class="skip-link" href="#main-content">Skip to content</a>
<header class="site-header"><div class="container header-inner">
  <a class="brand" href="/" aria-label="JobHunter home">
    <img src="/images/app-icon.png" alt="" width="40" height="40">
    <span>JobHunter</span>
  </a>
  <nav aria-label="Primary">
    <a href="/guides/">Guides</a>
    <a href="/tools/">Free tools</a>
  </nav>
</div></header>`;

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
      image: article.screenshot ? absoluteUrl(article.screenshot.src) : APP_ICON,
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

const displayDate = (date) => new Intl.DateTimeFormat("en-US", {
  month: "short", day: "numeric", year: "numeric", timeZone: "UTC"
}).format(new Date(`${date}T00:00:00Z`));

const renderRelated = (related, sidebar = false) => related.map((item) =>
  `<a class="${sidebar ? "sidebar-guide" : "guide-card"}" href="${articlePath(item)}">
    ${sidebar ? '<img src="/images/ui/file-text.svg" alt="" width="24" height="28">' : ""}
    <div><span class="card-category">${escapeHtml(clusterLabels[item.cluster])}</span>
    <strong>${escapeHtml(item.title)}</strong>
    <p>${escapeHtml(item.description)}</p></div>
  </a>`).join("\n");

const renderArticle = (article) => {
  const pathname = articlePath(article);
  const related = getRelated(article);
  const sections = outlineSections(article.sections);
  const outline = [
    { id: "short-version", heading: "The short version" }, ...sections,
    { id: "frequently-asked-questions", heading: "Frequently asked questions" },
    ...(article.sources?.length ? [{ id: "sources", heading: "Sources and further reading" }] : [])
  ];
  const toc = (label, limit = outline.length) => {
    const links = outline.map((item, index) =>
      `<a href="${pathname}#${item.id}" data-section="${item.id}"${index === 0 ? ' aria-current="location"' : ""}>${escapeHtml(item.heading)}</a>`);
    return `<nav class="toc" aria-label="${label}">${links.slice(0, limit).join("\n")}${links.length > limit
      ? `<details class="toc-more"><summary>${links.length - limit} more sections</summary>${links.slice(limit).join("\n")}</details>` : ""}</nav>`;
  };
  const summary = article.summary ?? article.description;
  return `${renderHead({
    title: `${article.title} | JobHunter Guides`,
    description: article.description,
    pathname,
    schema: articleSchema(article, pathname),
    practice: article.sections.some((section) => section.practice)
  })}
<body>
${siteHeader}
<main id="main-content" tabindex="-1">
  <article class="article">
    <header class="article-hero"><div class="container">
      <p class="eyebrow">${escapeHtml(article.eyebrow ?? clusterLabels[article.cluster])}</p>
      <h1>${escapeHtml(article.h1)}</h1>
      <p class="intro">${escapeHtml(article.intro)}</p>
      <p class="byline"><span>By the JobHunter team</span><span>Updated <time datetime="${article.dateModified}">${displayDate(article.dateModified)}</time></span><span>Published <time datetime="${article.datePublished}">${displayDate(article.datePublished)}</time></span><span>${readingMinutes(article)} min read</span></p>
    </div></header>
    <div class="container article-layout">
      <div class="article-content">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/guides/">All guides</a><span aria-hidden="true">/</span><span>${escapeHtml(clusterLabels[article.cluster])}</span></nav>
        <details class="mobile-contents"><summary>On this page</summary>${toc("Article sections")}</details>
        <section class="short-version" id="short-version" tabindex="-1">
          <img src="/images/ui/notes.svg" alt="" width="42" height="46">
          <div><h2>The short version</h2><p>${escapeHtml(summary)}</p></div>
        </section>
        ${sections.map((section, index) => renderSection(section) + (index === 0 && article.imagePlacement !== "inline" ? renderFigure(article.screenshot) : "")).join("\n")}
    <section class="faq-section" id="frequently-asked-questions" tabindex="-1">
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
        ${article.sources?.length ? `<section class="sources" id="sources" tabindex="-1"><h2>Sources and further reading</h2>${renderLinks(article.sources)}</section>` : ""}
        ${article.editorialNote ? `<details class="editorial-note"><summary>How this guide was prepared</summary><p>${escapeHtml(article.editorialNote)}</p></details>` : ""}
        <aside class="cta" aria-label="Optional application tool">
          <p class="eyebrow">Optional tool</p>
          <h2>JobHunter for repeated applications</h2>
          <p>JobHunter offers saved profiles, supported-field autofill and AI cover-letter drafts on iPhone. The steps above work without it. If you use it, review the filled fields and generated text, then submit the application yourself.</p>
          ${article.optionalTools?.length ? `<p>Optional browser tools:</p><ul>${article.optionalTools.map((tool) => `<li><a href="${safeHref(tool.href)}">${escapeHtml(tool.label)}</a> — ${escapeHtml(tool.description)}</li>`).join("")}</ul>` : ""}
          <a href="${APP_STORE_URL}">View JobHunter on the App Store</a>
        </aside>
      </div>
      <aside class="reading-sidebar" aria-label="Reading companion"><div class="sidebar-inner">
        <h2>On this page</h2>${toc("On this page", 6)}
        <div class="sidebar-related"><h2>Related guides</h2>${renderRelated(related, true)}</div>
      </div></aside>
    </div>
  </article>
  <section class="related container">
    <p class="eyebrow">Keep going</p>
    <h2>Related guides</h2>
    <div class="related-grid">${renderRelated(related)}</div>
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
      "Practical advice for finding jobs, applying from iPhone, uploading resumes, checking ATS formatting, and writing cover letters.",
    url: absoluteUrl(pathname)
  };
  return `${renderHead({
    title: "Job Matching, Resume, and Application Guides | JobHunter",
    description:
      "Practical advice for finding jobs, applying from iPhone, uploading resumes, checking ATS formatting, and writing cover letters.",
    pathname,
    schema
  }).replace('property="og:type" content="article"', 'property="og:type" content="website"')}
<body>
${siteHeader}
<main id="main-content" class="index-shell" tabindex="-1">
  <section class="article-hero index-hero"><div class="container">
    <p class="eyebrow">JobHunter Guides</p>
    <h1>Find jobs and prepare applications from iPhone</h1>
    <p>Find remote roles, compare job openings, prepare resumes and cover letters, and check each application before you submit it. Each guide includes practical steps, examples and sources.</p>
    <p class="index-meta">${articles.length} practical guides · AI-assisted drafting and editorial review</p>
  </div></section>
  <div class="container index-body">
  <nav class="category-nav" aria-label="Guide topics">${grouped.map((group) => `<a href="/guides/#${group.cluster}">${escapeHtml(group.label)} <span>${group.items.length}</span></a>`).join("")}</nav>
  ${grouped
    .map(
      (group) => `<section class="cluster" id="${group.cluster}" tabindex="-1">
    <p class="eyebrow">JobHunter field notes</p>
    <h2>${escapeHtml(group.label)}</h2>
    <div class="card-grid">
      ${group.items
        .map(
          (article) => `<a class="guide-card" href="${articlePath(article)}">
        <span class="card-category">${escapeHtml(group.label)} · ${readingMinutes(article)} min read</span>
        <strong>${escapeHtml(article.title)}</strong>
        <p>${escapeHtml(article.description)}</p>
      </a>`
        )
        .join("\n")}
    </div>
  </section>`
    )
    .join("\n")}
  </div>
</main>
${siteFooter}
</body>
</html>
`;
};

const css = await readFile(new URL("../content/guides.css", import.meta.url), "utf8");
const interactions = await readFile(new URL("./guide-interactions.js", import.meta.url), "utf8");
const practiceInteractions = await readFile(new URL("./guide-practice.mjs", import.meta.url), "utf8");

const write = async (pathname, html) => {
  const filePath = pageFilePath(pathname);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, html.replace(/[\t ]+$/gm, ""));
};

const sitemapUrls = [
  { loc: `${SITE_URL}/`, lastmod: PAGE_MODIFIED["/"] ?? SITE_MODIFIED },
  { loc: `${SITE_URL}/tools/`, lastmod: SITE_MODIFIED },
  { loc: `${SITE_URL}/tools/free-resume-maker/`, lastmod: SITE_MODIFIED },
  { loc: `${SITE_URL}/tools/free-cover-letter-generator/`, lastmod: SITE_MODIFIED },
  { loc: `${SITE_URL}/guides/`, lastmod: articles.reduce((latest, article) => article.dateModified > latest ? article.dateModified : latest, SITE_MODIFIED) },
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
await writeFile(path.join(OUTPUT_DIR, "guides", "guide.js"), interactions);
await writeFile(path.join(OUTPUT_DIR, "guides", "practice.js"), practiceInteractions);
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
