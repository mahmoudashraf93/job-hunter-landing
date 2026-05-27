const form = document.querySelector("#cover-form");
const output = document.querySelector("#cover-output");
const copyButton = document.querySelector("#copy-cover-letter");
const downloadButton = document.querySelector("#download-cover-pdf");

const value = (name) => new FormData(form).get(name)?.toString().trim() || "";

const sentence = (text, fallback) => (text || fallback).replace(/[.\s]+$/, "");

const focusedTemplate = () => {
  const manager = value("manager") || "Hiring Manager";
  const name = value("name") || "Your Name";
  const jobTitle = value("jobTitle") || "the open role";
  const company = value("company") || "your company";
  const experience = sentence(value("experience"), "my background aligns with the responsibilities in the posting");
  const strengths = sentence(value("strengths"), "clear communication, ownership, and practical problem solving");
  const reason = sentence(value("reason"), "the role is a strong match for the kind of work I want to do next");
  const contact = [value("email"), value("phone")].filter(Boolean).join(" | ");
  return "Dear " + manager + ",\n\n" +
    "I am excited to apply for the " + jobTitle + " role at " + company + ". I bring " + experience + ", and I am confident I can contribute quickly to the team.\n\n" +
    "In my recent work, I have built strengths in " + strengths + ". Those strengths match the needs of this role because " + reason + ".\n\n" +
    "I would welcome the chance to discuss how my background can support " + company + "'s goals. Thank you for your time and consideration.\n\n" +
    "Sincerely,\n" + name + (contact ? "\n" + contact : "");
};

const careerChangeTemplate = () => {
  const manager = value("manager") || "Hiring Manager";
  const name = value("name") || "Your Name";
  const jobTitle = value("jobTitle") || "the open role";
  const company = value("company") || "your company";
  const experience = sentence(value("experience"), "experience that connects closely to the role's responsibilities");
  const strengths = sentence(value("strengths"), "communication, follow-through, learning quickly, and solving practical problems");
  const reason = sentence(value("reason"), "the role gives me a strong way to apply my transferable experience in a focused direction");
  const contact = [value("email"), value("phone")].filter(Boolean).join(" | ");
  return "Dear " + manager + ",\n\n" +
    "I am applying for the " + jobTitle + " role at " + company + " because it connects strongly with the direction of my career. While my path may not be a traditional one, I bring " + experience + ".\n\n" +
    "My strongest transferable skills are " + strengths + ". I am especially interested in this opportunity because " + reason + ".\n\n" +
    "I would appreciate the opportunity to discuss how my background and motivation can add value to " + company + ". Thank you for considering my application.\n\n" +
    "Sincerely,\n" + name + (contact ? "\n" + contact : "");
};

const render = () => {
  output.value = value("template") === "career-change" ? careerChangeTemplate() : focusedTemplate();
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
  const pageIds = [];

  for (const commands of pages) {
    const stream = commands.join("\n");
    const contentId = addObject("<< /Length " + stream.length + " >>\nstream\n" + stream + "\nendstream");
    const pageId = addObject("<< /Type /Page /Parent " + pagesId + " 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 " + regularFontId + " 0 R >> >> /Contents " + contentId + " 0 R >>");
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

const buildCoverLetterPdf = () => {
  const pages = [[]];
  let y = 738;
  const margin = 72;
  const maxChars = 82;
  const current = () => pages[pages.length - 1];
  const newPage = () => {
    pages.push([]);
    y = 738;
  };
  const addLine = (line) => {
    if (y < 72) newPage();
    current().push("BT /F1 12 Tf 1 0 0 1 " + margin + " " + y.toFixed(1) + " Tm (" + pdfEscape(line) + ") Tj ET");
    y -= 18;
  };
  output.value.split("\n").forEach((paragraph) => {
    if (!paragraph.trim()) {
      y -= 12;
      return;
    }
    wrapText(paragraph, maxChars).forEach(addLine);
    y -= 10;
  });
  return createPdf(pages);
};

form.addEventListener("input", render);
copyButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText(output.value);
  copyButton.textContent = "Copied";
  setTimeout(() => { copyButton.textContent = "Copy letter"; }, 1200);
});
downloadButton.addEventListener("click", () => downloadPdf("jobhunter-cover-letter.pdf", buildCoverLetterPdf()));
render();
