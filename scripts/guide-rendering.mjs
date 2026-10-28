const SITE_URL = "https://appjobhunter.com";

export const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

export const safeHref = (href) => {
  if (typeof href !== "string" || /[\s\\]/.test(href)) throw new Error(`Invalid guide link: ${href}`);
  const url = new URL(href, SITE_URL);
  if (url.protocol !== "https:" || url.username || url.password ||
      (!href.startsWith("https://") && (!href.startsWith("/") || href.startsWith("//")))) {
    throw new Error(`Unsafe guide link: ${href}`);
  }
  return escapeHtml(href);
};

export const articleDates = (article, defaults) => {
  const dates = {
    datePublished: article.datePublished ?? defaults.datePublished,
    dateModified: article.dateModified ?? defaults.dateModified
  };
  for (const value of Object.values(dates)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) ||
        new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) !== value) {
      throw new Error(`Invalid article date: ${value}`);
    }
  }
  if (dates.dateModified < dates.datePublished) throw new Error("Article modification predates publication");
  return dates;
};

export const renderLinks = (links) => `<ul>${links.map(({ label, href }) =>
  `<li><a href="${safeHref(href)}">${escapeHtml(label)}</a></li>`).join("")}</ul>`;

export const renderFigure = (image) => image ? `<figure class="article-image${image.wide ? " article-image-wide" : ""}">
      <img src="${safeHref(image.src)}" alt="${escapeHtml(image.alt)}" width="${Number(image.width ?? 1125)}" height="${Number(image.height ?? 2436)}" loading="lazy">
      <figcaption>${escapeHtml(image.caption ?? image.alt)}</figcaption>
    </figure>` : "";

// Keep the outline and rendered headings in sync, including repeated headings
// from consolidated guides. Reserve IDs used by the surrounding article layout.
export const outlineSections = (sections) => {
  const used = new Set(["main-content", "short-version", "sources", "frequently-asked-questions"]);
  return sections.map((section) => {
    const base = section.heading.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
    let id = base;
    let suffix = 2;
    while (used.has(id)) id = `${base}-${suffix++}`;
    used.add(id);
    return { ...section, id };
  });
};

export const readingMinutes = (article) => {
  // Count editorial copy rather than object keys, URLs or presentation metadata.
  const text = [article.intro, ...article.sections.flatMap((section) => [
    section.heading, ...(section.paragraphs ?? []), ...(section.steps ?? []),
    ...(section.bullets ?? []), ...(section.checklist ?? []),
    ...(section.table?.columns ?? []), ...(section.table?.rows.flat() ?? [])
  ]), ...article.faqs.flatMap((faq) => [faq.question, faq.answer])].join(" ");
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 220));
};

export const renderSection = (section) => {
  const paragraphs = (section.paragraphs || [])
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n      ");
  const bullets = section.bullets ? `<ul>${section.bullets
    .map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>` : "";
  const steps = section.steps ? `<ol>${section.steps
    .map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>` : "";
  const checklist = section.checklist ? `<ul class="review-checklist">${section.checklist
    .map((item) => `<li><label><input type="checkbox"><span>${escapeHtml(item)}</span></label></li>`).join("")}</ul>` : "";
  let table = "";
  if (section.table) {
    const { caption, columns, rows } = section.table;
    if (!columns.length || rows.some((row) => row.length !== columns.length)) throw new Error("Guide table has mismatched columns");
    table = `<p class="table-hint">Scroll across the table to see all columns.</p><div class="table-scroll" role="region" aria-label="${escapeHtml(caption)}" tabindex="0"><table>
        <caption>${escapeHtml(caption)}</caption>
        <thead><tr>${columns.map((column) => `<th scope="col">${escapeHtml(column)}</th>`).join("")}</tr></thead>
        <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
      </table></div>`;
  }
  let practice = "";
  if (section.practice) {
    if (section.practice !== "file-picker") throw new Error("Unknown guide practice: " + section.practice);
    const id = escapeHtml("practice-" + (section.id ?? "file-picker"));
    practice = `<div class="practice-card" data-file-practice>
        <p id="${id}-help">Practice only: this page shows the filename and size. It does not upload the file or check employer compatibility.</p>
        <label for="${id}">Choose a practice file</label>
        <input id="${id}" type="file" disabled aria-describedby="${id}-help ${id}-status">
        <p id="${id}-status" role="status" data-file-status>No file selected.</p>
        <button type="button" data-file-clear hidden>Clear file selection</button>
        <noscript><p>JavaScript is needed for this optional exercise. The upload instructions above remain available.</p></noscript>
      </div>`;
  }
  const additions = [bullets, steps, checklist, table, practice, section.image && renderFigure(section.image), section.links && renderLinks(section.links)].filter(Boolean);
  return `<section${section.id ? ` id="${escapeHtml(section.id)}" tabindex="-1"` : ""}>
      <h2>${escapeHtml(section.heading)}</h2>
      ${paragraphs}${additions.length ? `\n      ${additions.join("\n      ")}` : ""}
    </section>`;
};
