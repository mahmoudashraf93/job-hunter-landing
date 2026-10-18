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
  const additions = [bullets, steps, checklist, table, section.image && renderFigure(section.image), section.links && renderLinks(section.links)].filter(Boolean);
  return `<section>
      <h2>${escapeHtml(section.heading)}</h2>
      ${paragraphs}${additions.length ? `\n      ${additions.join("\n      ")}` : ""}
    </section>`;
};
