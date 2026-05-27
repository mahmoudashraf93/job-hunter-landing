const form = document.querySelector("#resume-form");
const preview = document.querySelector("#resume-preview");
const downloadButton = document.querySelector("#download-resume-pdf");
let currentHtml = "";

const escapeHtml = (value) => String(value || "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

const field = (name) => new FormData(form).get(name)?.toString().trim() || "";
const lines = (name) => field(name).split(/\n+/).map((line) => line.trim()).filter(Boolean);

const section = (title, body, className = "") => body.trim()
  ? '<section class="section ' + className + '"><h2 class="section-title">' + title + '</h2>' + body + '</section>'
  : "";

const resumeDocument = () => {
  const contact = [field("email"), field("phone"), field("location"), field("link")].filter(Boolean).map(escapeHtml).join(" | ");
  const skills = field("skills").split(",").map((skill) => skill.trim()).filter(Boolean).map(escapeHtml).join(" * ");
  const bullets = lines("bullets").map((bullet) => "<li>" + escapeHtml(bullet) + "</li>").join("");
  const experienceTitle = [field("role"), field("company")].filter(Boolean).map(escapeHtml).join(" - ");
  const experienceMeta = [field("jobLocation"), [field("startDate"), field("endDate")].filter(Boolean).join(" - ")].filter(Boolean).map(escapeHtml).join(" | ");
  const educationTitle = [field("degree"), field("school")].filter(Boolean).map(escapeHtml).join(" - ");
  const projectName = field("projectName");
  const projectSummary = field("projectSummary");
  const content = [
    '<header class="header">' +
      (field("name") ? '<h1 class="name">' + escapeHtml(field("name")) + '</h1>' : '') +
      (field("title") ? '<div class="title">' + escapeHtml(field("title")) + '</div>' : '') +
      (contact ? '<div class="contact">' + contact + '</div>' : '') +
    '</header>',
    section("Summary", field("summary") ? "<p>" + escapeHtml(field("summary")) + "</p>" : "", "summary"),
    section("Skills", skills ? '<p class="skills">' + skills + '</p>' : "", "skills"),
    section("Experience", experienceTitle || experienceMeta || bullets ? '<div class="entry"><div class="entry-header">' +
      (experienceTitle ? '<div class="entry-title">' + experienceTitle + '</div>' : '') +
      (experienceMeta ? '<div class="entry-meta">' + experienceMeta + '</div>' : '') +
      '</div>' + (bullets ? '<ul>' + bullets + '</ul>' : '') + '</div>' : "", "experience"),
    section("Education", educationTitle || field("educationDates") ? '<div class="entry"><div class="entry-header">' +
      (educationTitle ? '<div class="entry-title">' + educationTitle + '</div>' : '') +
      (field("educationDates") ? '<div class="entry-meta">' + escapeHtml(field("educationDates")) + '</div>' : '') +
      '</div></div>' : "", "education"),
    section("Projects", projectName || projectSummary ? '<div class="entry">' +
      (projectName ? '<div class="entry-header"><div class="entry-title">' + escapeHtml(projectName) + '</div></div>' : '') +
      (projectSummary ? '<p>' + escapeHtml(projectSummary) + '</p>' : '') +
      '</div>' : "", "projects")
  ].join("\n");

  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>' +
    escapeHtml(field("name") || "Resume") +
    '</title><style>:root{--font:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;--text:#111;--muted:#555;--rule:#d6d6d6;--font-scale:1}*{box-sizing:border-box}body{font-family:var(--font);color:var(--text);font-size:calc(12.5pt * var(--font-scale));line-height:1.4;margin:0;background:#fff}.page{max-width:760px;padding:28px;width:100%;margin:0 auto;overflow:hidden}.header{margin-bottom:12px}.name{font-size:calc(22pt * var(--font-scale));font-weight:700;margin:0;color:#111}.title{font-size:calc(12.5pt * var(--font-scale));color:var(--muted);margin-top:2px}.contact{font-size:calc(10.5pt * var(--font-scale));color:var(--muted);margin-top:6px}.section{margin-top:16px}.section-title{font-size:calc(11pt * var(--font-scale));text-transform:uppercase;letter-spacing:.08em;border-bottom:1px solid var(--rule);padding-bottom:3px;margin:0 0 6px;color:#111}.entry{margin-bottom:10px}.entry-header{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}.entry-title{font-weight:600}.entry-meta{color:var(--muted);font-size:calc(10.5pt * var(--font-scale))}ul{margin:6px 0 0 18px;padding:0}li{margin-bottom:4px}.skills{margin:0}@media print{.page{max-width:none}}</style></head><body class="classic"><div class="page">' +
    content +
    '</div></body></html>';
};

const render = () => {
  currentHtml = resumeDocument();
  preview.srcdoc = currentHtml;
};

const pdfEscape = (value) => String(value || "")
  .normalize("NFKD")
  .replace(/[^\x09\x0a\x0d\x20-\x7e]/g, "")
  .replaceAll(String.fromCharCode(92), String.fromCharCode(92) + String.fromCharCode(92))
  .replaceAll("(", String.fromCharCode(92) + "(")
  .replaceAll(")", String.fromCharCode(92) + ")")
  .replaceAll(String.fromCharCode(13), " ")
  .replaceAll(String.fromCharCode(10), " ");

const wrapText = (text, maxChars) => {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    if (!line) {
      line = word;
    } else if ((line + " " + word).length <= maxChars) {
      line += " " + word;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
};

const createPdf = (pages) => {
  const objects = [];
  const addObject = (body) => {
    objects.push(body);
    return objects.length;
  };
  const catalogId = addObject("<< /Type /Catalog /Pages 2 0 R >>");
  const pagesId = addObject("");
  const regularFontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const boldFontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  const pageIds = [];

  for (const commands of pages) {
    const stream = commands.join("\n");
    const contentId = addObject("<< /Length " + stream.length + " >>\nstream\n" + stream + "\nendstream");
    const pageId = addObject("<< /Type /Page /Parent " + pagesId + " 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 " + regularFontId + " 0 R /F2 " + boldFontId + " 0 R >> >> /Contents " + contentId + " 0 R >>");
    pageIds.push(pageId);
  }

  objects[pagesId - 1] = "<< /Type /Pages /Kids [" + pageIds.map((id) => id + " 0 R").join(" ") + "] /Count " + pageIds.length + " >>";

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += index + 1 + " 0 obj\n" + object + "\nendobj\n";
  });

  const xrefOffset = pdf.length;
  pdf += "xref\n0 " + (objects.length + 1) + "\n0000000000 65535 f \n";
  offsets.slice(1).forEach((offset) => {
    pdf += String(offset).padStart(10, "0") + " 00000 n \n";
  });
  pdf += "trailer\n<< /Size " + (objects.length + 1) + " /Root " + catalogId + " 0 R >>\nstartxref\n" + xrefOffset + "\n%%EOF";
  return pdf;
};

const downloadPdf = (filename, pdf) => {
  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

const buildResumePdf = () => {
  const pages = [[]];
  let y = 742;
  const margin = 54;
  const maxWidth = 504;
  const current = () => pages[pages.length - 1];
  const newPage = () => {
    pages.push([]);
    y = 742;
  };
  const textWidth = (text, size) => String(text || "").length * size * 0.48;
  const addLine = (text, options = {}) => {
    const size = options.size || 11;
    const font = options.bold ? "F2" : "F1";
    const x = options.center ? Math.max(margin, (612 - textWidth(text, size)) / 2) : margin + (options.indent || 0);
    if (y < 54) newPage();
    current().push("BT /" + font + " " + size + " Tf 1 0 0 1 " + x.toFixed(1) + " " + y.toFixed(1) + " Tm (" + pdfEscape(text) + ") Tj ET");
    y -= options.gap || Math.round(size * 1.45);
  };
  const addWrapped = (text, options = {}) => {
    const size = options.size || 11;
    const indent = options.indent || 0;
    const maxChars = Math.max(26, Math.floor((maxWidth - indent) / (size * 0.48)));
    wrapText(text, maxChars).forEach((line) => addLine(line, options));
    y -= options.after || 2;
  };
  const addSection = (title) => {
    y -= 7;
    addLine(title.toUpperCase(), { size: 10, bold: true, gap: 12 });
    current().push("0.65 w " + margin + " " + (y + 7).toFixed(1) + " m " + (612 - margin) + " " + (y + 7).toFixed(1) + " l S");
  };
  const name = field("name") || "Resume";
  const contact = [field("email"), field("phone"), field("location"), field("link")].filter(Boolean).join(" | ");
  addLine(name, { size: 22, bold: true, center: true, gap: 25 });
  if (field("title")) addLine(field("title"), { size: 12, center: true, gap: 16 });
  if (contact) addWrapped(contact, { size: 9.5, center: true, after: 8 });
  if (field("summary")) {
    addSection("Summary");
    addWrapped(field("summary"));
  }
  if (field("skills")) {
    addSection("Skills");
    addWrapped(field("skills").split(",").map((skill) => skill.trim()).filter(Boolean).join(" * "));
  }
  const experienceTitle = [field("role"), field("company")].filter(Boolean).join(" - ");
  const experienceMeta = [field("jobLocation"), [field("startDate"), field("endDate")].filter(Boolean).join(" - ")].filter(Boolean).join(" | ");
  if (experienceTitle || experienceMeta || lines("bullets").length) {
    addSection("Experience");
    if (experienceTitle) addLine(experienceTitle, { bold: true, gap: 14 });
    if (experienceMeta) addLine(experienceMeta, { size: 10, gap: 13 });
    lines("bullets").forEach((bullet) => addWrapped("- " + bullet, { indent: 12, after: 0 }));
  }
  const educationTitle = [field("degree"), field("school")].filter(Boolean).join(" - ");
  if (educationTitle || field("educationDates")) {
    addSection("Education");
    if (educationTitle) addLine(educationTitle, { bold: true, gap: 14 });
    if (field("educationDates")) addLine(field("educationDates"), { size: 10, gap: 13 });
  }
  if (field("projectName") || field("projectSummary")) {
    addSection("Projects");
    if (field("projectName")) addLine(field("projectName"), { bold: true, gap: 14 });
    if (field("projectSummary")) addWrapped(field("projectSummary"));
  }
  return createPdf(pages);
};

form.addEventListener("input", render);
downloadButton.addEventListener("click", () => downloadPdf("jobhunter-classic-resume.pdf", buildResumePdf()));
render();
