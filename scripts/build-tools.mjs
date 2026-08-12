import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SITE_URL = "https://appjobhunter.com";
const APP_STORE_URL = "https://apps.apple.com/app/apple-store/id6645735955?pt=120006398&ct=lanlanding&mt=8";
const APP_ICON = `${SITE_URL}/images/app-icon.png`;
const OUTPUT_DIR = process.cwd();

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const absoluteUrl = (pathname) => `${SITE_URL}${pathname}`;

const write = async (pathname, html) => {
  const filePath = path.join(OUTPUT_DIR, pathname.replace(/^\/|\/$/g, ""), "index.html");
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, html);
};

const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data)}</script>`;

const resumeFaqs = [
  {
    question: "Does the free resume maker upload my resume data?",
    answer: "No. The form, preview, and PDF generation run in your browser. Your information leaves the page only if you later attach the exported file to an employer's application."
  },
  {
    question: "Is the classic template ATS-friendly?",
    answer: "It uses a simple single-column structure and standard headings designed for readable exports, but you should still test the PDF in the employer's application parser."
  },
  {
    question: "Can I create different resume versions?",
    answer: "Yes. Export a separate PDF for each role family and use clear filenames so you can choose the right version from iPhone Safari."
  }
];

const coverFaqs = [
  {
    question: "Is the free cover letter generator using AI?",
    answer: "No. The browser tool uses transparent templates. JobHunter on iPhone offers AI-assisted drafts that you review and edit before using."
  },
  {
    question: "Does the tool send my details to a server?",
    answer: "No. The template is generated locally in your browser. Copying or downloading the result stays under your control."
  },
  {
    question: "Should I send the generated letter without editing it?",
    answer: "No. Verify names and claims, add a specific result, explain genuine interest in the role, and make the final wording sound like you."
  }
];

const renderFaqs = (faqs) => `<section class="tool-content faq-content">
  <h2>Frequently asked questions</h2>
  ${faqs
    .map(
      (faq) => `<details><summary>${escapeHtml(faq.question)}</summary><p>${escapeHtml(faq.answer)}</p></details>`
    )
    .join("\n  ")}
</section>`;

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
  <link rel="stylesheet" href="/tools/tool.css">
  ${jsonLd(schema)}
</head>`;
};

const header = `<header class="site-header">
  <a class="brand" href="/" aria-label="JobHunter home">
    <img src="/images/app-icon.png" alt="" width="40" height="40">
    <span>JobHunter</span>
  </a>
  <nav aria-label="Primary">
    <a href="/tools/">Tools</a>
    <a href="/guides/">Guides</a>
    <a href="/privacy/">Privacy</a>
    <a class="download-link" href="${APP_STORE_URL}">Download</a>
  </nav>
</header>`;

const footer = `<footer class="site-footer">
  <p>JobHunter helps iPhone job seekers find matched jobs, autofill applications, attach resumes, and draft AI cover letters faster.</p>
  <nav aria-label="Footer">
    <a href="/">Home</a>
    <a href="/tools/">Tools</a>
    <a href="/guides/">Guides</a>
    <a href="/privacy/">Privacy</a>
    <a href="/terms/">Terms</a>
  </nav>
</footer>`;

const toolSchema = (name, description, pathname, faqs) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: absoluteUrl(pathname),
      description,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
      },
      publisher: {
        "@type": "Organization",
        name: "JobHunter",
        url: SITE_URL
      }
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer }
      }))
    }
  ]
});

const toolsIndex = () => `${renderHead({
  title: "Free Job Search Tools | JobHunter",
  description:
    "Use free browser tools from JobHunter: a simple resume maker and a free cover letter generator for job applications.",
  pathname: "/tools/",
  schema: {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free JobHunter Tools",
    url: `${SITE_URL}/tools/`
  }
})}
<body>
${header}
<main class="tools-shell">
  <section class="hero">
    <p class="eyebrow">Free tools</p>
    <h1>Make a resume or cover letter in your browser</h1>
    <p>Use these free tools for a quick first draft. For AI writing, more resume templates, job matching, and iPhone application autofill, download JobHunter.</p>
  </section>
  <section class="tool-grid" aria-label="Free JobHunter tools">
    <a class="tool-card" href="/tools/free-resume-maker/">
      <span>Resume</span>
      <strong>Free Resume Maker</strong>
      <p>Create a clean classic resume with sections for summary, skills, experience, education, and projects, then save it as a PDF.</p>
    </a>
    <a class="tool-card" href="/tools/free-cover-letter-generator/">
      <span>Cover letter</span>
      <strong>Free Cover Letter Generator</strong>
      <p>Generate a practical cover letter from a template, then copy it into an application or document.</p>
    </a>
  </section>
  <section class="app-cta">
    <div>
      <p class="eyebrow">More in the app</p>
      <h2>Use AI, more templates, and matched jobs on iPhone.</h2>
      <p>JobHunter adds AI cover letters, premium resume templates, job matching, application autofill, and tracking.</p>
    </div>
    <a href="${APP_STORE_URL}">Download the app now</a>
  </section>
</main>
${footer}
</body>
</html>
`;

const resumeTool = () => `${renderHead({
  title: "Free Resume Maker | Classic Resume Template | JobHunter",
  description:
    "Create a free classic resume in your browser, preview it instantly, and save the resume as a PDF.",
  pathname: "/tools/free-resume-maker/",
  schema: toolSchema(
    "Free Resume Maker",
    "Create a free classic resume in your browser and save it as a PDF.",
    "/tools/free-resume-maker/",
    resumeFaqs
  )
})}
<body>
${header}
<main class="tool-shell">
  <section class="tool-hero">
    <p class="eyebrow">Free resume maker</p>
    <h1>Build a clean classic resume</h1>
    <p>This browser tool uses JobHunter's free classic resume structure. The iPhone app includes more templates and guided resume tools.</p>
    <a class="inline-cta" href="${APP_STORE_URL}">Download the app for more templates</a>
  </section>

  <section class="workspace resume-workspace">
    <form class="tool-form" id="resume-form">
      <fieldset>
        <legend>Basics</legend>
        <label>Full name <input name="name" autocomplete="name" value="Alex Johnson"></label>
        <label>Professional title <input name="title" autocomplete="organization-title" value="Customer Success Specialist"></label>
        <label>Email <input name="email" type="email" autocomplete="email" value="alex@example.com"></label>
        <label>Phone <input name="phone" autocomplete="tel" value="(555) 010-2030"></label>
        <label>Location <input name="location" autocomplete="address-level2" value="Austin, TX"></label>
        <label>LinkedIn or portfolio <input name="link" autocomplete="url" value="linkedin.com/in/alexjohnson"></label>
      </fieldset>

      <fieldset>
        <legend>Profile</legend>
        <label>Summary <textarea name="summary" rows="4">Customer success specialist with 4 years of experience helping SaaS customers onboard, adopt new workflows, and resolve account issues quickly.</textarea></label>
        <label>Skills <input name="skills" autocomplete="off" value="Customer onboarding, CRM, Account management, Support operations, Documentation"></label>
      </fieldset>

      <fieldset>
        <legend>Experience</legend>
        <label>Role <input name="role" autocomplete="organization-title" value="Customer Success Specialist"></label>
        <label>Company <input name="company" autocomplete="organization" value="Northwind Labs"></label>
        <label>Location <input name="jobLocation" autocomplete="address-level2" value="Remote"></label>
        <div class="split">
          <label>Start <input name="startDate" autocomplete="off" value="2022"></label>
          <label>End <input name="endDate" autocomplete="off" value="Present"></label>
        </div>
        <label>Bullets <textarea name="bullets" rows="5">Onboarded 60+ customer accounts and improved time-to-first-value with clearer setup checklists.
Built support macros and documentation that reduced repeated customer questions.
Partnered with product and sales teams to surface adoption risks and expansion opportunities.</textarea></label>
      </fieldset>

      <fieldset>
        <legend>Education and project</legend>
        <label>Degree <input name="degree" autocomplete="off" value="B.A. Business Administration"></label>
        <label>School <input name="school" autocomplete="off" value="State University"></label>
        <label>Education dates <input name="educationDates" autocomplete="off" value="2018 - 2022"></label>
        <label>Project name <input name="projectName" autocomplete="off" value="Customer Help Center Refresh"></label>
        <label>Project summary <textarea name="projectSummary" rows="3">Reorganized help center articles around the most common onboarding questions and support workflows.</textarea></label>
      </fieldset>
    </form>

    <aside class="preview-panel">
      <div class="preview-actions">
        <button type="button" id="download-resume-pdf">Download as PDF</button>
      </div>
      <iframe id="resume-preview" title="Resume preview"></iframe>
    </aside>
  </section>

  <section class="tool-content">
    <p class="eyebrow">Resume guide</p>
    <h2>Build a resume that works in online applications</h2>
    <p>Begin with accurate source information. Use your real name, current contact details, consistent employment dates, and official education information. The example values in the form demonstrate the layout; replace every example before exporting. Keep a private master resume with all verified experience, then create shorter role-family versions from that source.</p>
    <p>The classic template uses standard sections and a single-column reading order. That makes the document easier to scan and reduces common applicant-tracking-system problems caused by floating text boxes, decorative charts, tables, and information stored only inside images. A simple format cannot guarantee how every employer's parser behaves, so test the exported PDF in a real application and compare each imported field with the document.</p>
    <h2>Write evidence-focused experience bullets</h2>
    <p>A useful bullet explains what you did, where or for whom you did it, and what changed. Replace vague phrases such as “responsible for customer service” with accurate scope and outcomes: “Onboarded 60 customer accounts and created setup checklists that reduced repeated questions,” for example. Use numbers only when you can explain where they came from.</p>
    <p>Put the strongest relevant bullets first. A customer-success resume might lead with onboarding, product adoption, account communication, and renewal-risk work. A support-operations version might prioritize documentation, ticket workflows, quality, and process improvement. The underlying jobs and dates remain the same even when the emphasis changes.</p>
    <h2>Review the PDF before applying</h2>
    <p>Download the PDF, open it on the same iPhone you use for applications, and inspect every page. Check that no heading is stranded at the bottom, no line is clipped, links are readable, and the filename is professional. Select and copy text from the PDF to confirm that headings and experience appear in a sensible order.</p>
    <p>Save active files with clear role-family names, such as Alex-Johnson-Customer-Success-Resume.pdf. Move old versions out of the active folder so the iOS file picker does not tempt you to attach a stale document. Record which version you send with each application.</p>
    <h2>Use JobHunter when the form opens in Safari</h2>
    <p>The free maker is useful for a quick browser-based classic resume. JobHunter adds more templates, resume imports, matched jobs, reusable profile information, and an iPhone application workflow. After exporting, use the <a href="/guides/ats-friendly-resume-checklist/">ATS-friendly resume checklist</a>, learn how to <a href="/guides/attach-resume-from-iphone-safari/">attach the correct resume from Safari</a>, and keep <a href="/guides/multiple-resume-versions-different-roles/">multiple role-family versions</a> organized.</p>
  </section>

  ${renderFaqs(resumeFaqs)}

  <section class="app-cta">
    <div>
      <p class="eyebrow">Need more templates?</p>
      <h2>Use Classic, Minimal, Modern, and Elegant templates in JobHunter.</h2>
      <p>The app also helps with resume imports, job matching, autofill, and AI cover letters from iPhone.</p>
    </div>
    <a href="${APP_STORE_URL}">Download the app now</a>
  </section>
</main>
${footer}
<script src="/tools/free-resume-maker/tool.js"></script>
</body>
</html>
`;

const coverLetterTool = () => `${renderHead({
  title: "Free Cover Letter Generator | JobHunter",
  description:
    "Generate a free cover letter from a browser template by entering the job title, company, strengths, and reason for applying.",
  pathname: "/tools/free-cover-letter-generator/",
  schema: toolSchema(
    "Free Cover Letter Generator",
    "Generate a free cover letter from a browser template and copy it into your job application.",
    "/tools/free-cover-letter-generator/",
    coverFaqs
  )
})}
<body>
${header}
<main class="tool-shell">
  <section class="tool-hero">
    <p class="eyebrow">Free cover letter generator</p>
    <h1>Create a cover letter from a practical template</h1>
    <p>This free tool uses browser templates. For AI cover letters tailored from your profile and job details, use JobHunter on iPhone.</p>
    <a class="inline-cta" href="${APP_STORE_URL}">Use AI in the app</a>
  </section>

  <section class="workspace cover-workspace">
    <form class="tool-form" id="cover-form">
      <fieldset>
        <legend>Your details</legend>
        <label>Your name <input name="name" autocomplete="name" value="Alex Johnson"></label>
        <label>Your email <input name="email" type="email" autocomplete="email" value="alex@example.com"></label>
        <label>Your phone <input name="phone" autocomplete="tel" value="(555) 010-2030"></label>
      </fieldset>

      <fieldset>
        <legend>Target role</legend>
        <label>Job title <input name="jobTitle" autocomplete="organization-title" value="Customer Success Specialist"></label>
        <label>Company <input name="company" autocomplete="organization" value="Northwind Labs"></label>
        <label>Hiring manager <input name="manager" autocomplete="name" placeholder="Hiring Manager"></label>
      </fieldset>

      <fieldset>
        <legend>Letter content</legend>
        <label>Relevant experience <textarea name="experience" rows="3">4 years helping SaaS customers onboard, adopt new workflows, and resolve account issues quickly</textarea></label>
        <label>Top strengths <textarea name="strengths" rows="3">customer onboarding, account management, support operations, documentation, and cross-functional communication</textarea></label>
        <label>Why this company or role <textarea name="reason" rows="3">the role connects customer problem solving with process improvement and long-term customer success</textarea></label>
        <label>Template
          <select name="template">
            <option value="focused">Focused and direct</option>
            <option value="career-change">Career change or transferable skills</option>
          </select>
        </label>
      </fieldset>
    </form>

    <aside class="letter-panel">
      <div class="preview-actions">
        <button type="button" id="copy-cover-letter">Copy letter</button>
        <button type="button" id="download-cover-pdf">Download as PDF</button>
      </div>
      <textarea id="cover-output" rows="24" aria-label="Generated cover letter"></textarea>
    </aside>
  </section>

  <section class="tool-content">
    <p class="eyebrow">Cover letter guide</p>
    <h2>Turn the template into a specific application</h2>
    <p>The generated letter is a starting structure, not a finished claim about your background. Replace the example identity, employer, role, experience, strengths, and motivation before copying or downloading. Read the job description again and choose one central responsibility that you can support with real evidence.</p>
    <p>A focused letter usually needs three ideas: why this role makes sense, proof that you can contribute, and why this company or problem interests you. The form turns those inputs into a readable draft, but only you can verify whether the facts are true and the motivation is genuine.</p>
    <h2>Choose evidence instead of adjectives</h2>
    <p>Words such as passionate, dynamic, and hardworking are easy to generate and difficult to verify. Use a concrete example instead. Describe the customer group, project, process, or result that demonstrates the required capability. If the role values onboarding, explain the onboarding work you actually completed. If it values documentation, mention the material you created and how people used it.</p>
    <p>For entry-level applications, evidence can come from an internship, project, coursework, volunteering, or transferable customer-facing work. For a career change, translate the action and result into the new employer's language without pretending you already held the target title.</p>
    <h2>Make the company paragraph real</h2>
    <p>Review the official job page and company website. Mention an accurate product, customer, responsibility, or problem that connects to your direction. Avoid claims about culture, growth, or mission that you cannot verify. A single precise sentence is stronger than a paragraph of generic praise.</p>
    <p>Remove the company name as a test. If the whole letter could be sent unchanged to any employer, add one specific connection and confirm that the selected experience supports this particular role.</p>
    <h2>Run an accuracy and privacy review</h2>
    <p>Check the employer name, role title, hiring-manager name, dates, tools, years, results, and every number. Delete anything you would not be comfortable explaining in an interview. Do not include passwords, identification numbers, medical details, private account information, or confidential information from a current employer.</p>
    <p>The browser generator performs its template work locally and does not submit an application. You decide whether to copy the letter, download it, edit it elsewhere, or discard it. The employer receives it only when you add it to an application yourself.</p>
    <h2>Continue with a review-first workflow</h2>
    <p>Use the <a href="/guides/write-cover-letter-fast/">fast cover-letter guide</a> to prepare reusable evidence, follow the <a href="/guides/ai-cover-letter-generator-review-checklist/">AI draft review checklist</a> for generated wording, and use the <a href="/guides/career-change-cover-letter-structure/">career-change structure</a> when your previous title does not tell the whole story.</p>
  </section>

  ${renderFaqs(coverFaqs)}

  <section class="app-cta">
    <div>
      <p class="eyebrow">Want a tailored AI draft?</p>
      <h2>Use AI cover letters in JobHunter.</h2>
      <p>The app can draft cover letters from your saved profile and the role context, then you review and edit before sending.</p>
    </div>
    <a href="${APP_STORE_URL}">Download the app now</a>
  </section>
</main>
${footer}
<script src="/tools/free-cover-letter-generator/tool.js"></script>
</body>
</html>
`;

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
  line-height: 1.55;
}
a { color: inherit; }
.site-header,
.site-footer {
  max-width: 1180px;
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
.inline-cta,
.app-cta a,
button {
  background: var(--ink);
  color: #fff;
  min-height: 42px;
  padding: 0 16px;
  border-radius: 8px;
  border: 0;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  cursor: pointer;
}
.tools-shell,
.tool-shell {
  max-width: 1180px;
  margin: 0 auto;
  padding: 40px 24px 72px;
}
.hero,
.tool-hero {
  max-width: 820px;
  padding: 28px 0 30px;
}
.eyebrow {
  color: var(--blue);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0 0 10px;
}
h1 {
  font-size: clamp(2.25rem, 5vw, 4.75rem);
  line-height: 1.03;
  letter-spacing: 0;
  margin: 0 0 18px;
}
h2 {
  font-size: clamp(1.45rem, 3vw, 2.5rem);
  line-height: 1.12;
  letter-spacing: 0;
  margin: 0 0 12px;
}
p { margin: 0 0 18px; }
.hero p,
.tool-hero p,
.app-cta p,
.tool-card p {
  color: var(--muted);
  font-size: 1.04rem;
}
.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin: 26px 0 46px;
}
.tool-card {
  display: block;
  min-height: 210px;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 22px;
  background: var(--soft);
  text-decoration: none;
}
.tool-card span {
  display: block;
  color: var(--green);
  font-size: 0.78rem;
  font-weight: 800;
  margin-bottom: 10px;
  text-transform: uppercase;
}
.tool-card strong {
  display: block;
  font-size: 1.18rem;
  line-height: 1.25;
  margin-bottom: 10px;
}
.workspace {
  display: grid;
  grid-template-columns: minmax(300px, 420px) minmax(0, 1fr);
  gap: 24px;
  align-items: start;
  margin-top: 20px;
}
.tool-form {
  display: grid;
  gap: 18px;
}
fieldset {
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 18px;
  margin: 0;
  background: #fff;
}
legend {
  padding: 0 6px;
  font-weight: 800;
}
label {
  display: grid;
  gap: 7px;
  color: var(--ink);
  font-size: 0.92rem;
  font-weight: 700;
  margin: 0 0 13px;
}
input,
textarea,
select {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 10px 12px;
  font: inherit;
  color: var(--ink);
  background: #fff;
}
textarea { resize: vertical; }
.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.preview-panel,
.letter-panel {
  position: sticky;
  top: 18px;
}
.preview-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
#resume-preview {
  width: 100%;
  min-height: 780px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fff;
}
#cover-output {
  min-height: 680px;
  line-height: 1.6;
}
.app-cta {
  margin-top: 46px;
  border-left: 6px solid var(--gold);
  background: #fff8e7;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
}
.tool-content {
  max-width: 820px;
  margin-top: 54px;
}
.tool-content h2 { margin-top: 34px; }
.tool-content a { color: var(--blue); font-weight: 800; }
.faq-content details {
  border-top: 1px solid var(--line);
  padding: 16px 0;
}
.faq-content details:last-child { border-bottom: 1px solid var(--line); }
.faq-content summary { cursor: pointer; font-weight: 800; }
.faq-content details p { color: var(--muted); margin: 12px 0 0; }
.app-cta p:last-child { margin-bottom: 0; }
@media (max-width: 860px) {
  .site-header,
  .site-footer,
  .app-cta {
    align-items: flex-start;
    flex-direction: column;
  }
  .workspace {
    grid-template-columns: 1fr;
  }
  .preview-panel,
  .letter-panel {
    position: static;
  }
  #resume-preview {
    min-height: 620px;
  }
}
`;

const resumeJs = `const form = document.querySelector("#resume-form");
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
const lines = (name) => field(name).split(/\\n+/).map((line) => line.trim()).filter(Boolean);

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
  ].join("\\n");

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
  .replace(/[^\\x09\\x0a\\x0d\\x20-\\x7e]/g, "")
  .replaceAll(String.fromCharCode(92), String.fromCharCode(92) + String.fromCharCode(92))
  .replaceAll("(", String.fromCharCode(92) + "(")
  .replaceAll(")", String.fromCharCode(92) + ")")
  .replaceAll(String.fromCharCode(13), " ")
  .replaceAll(String.fromCharCode(10), " ");

const wrapText = (text, maxChars) => {
  const words = String(text || "").split(/\\s+/).filter(Boolean);
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
    const stream = commands.join("\\n");
    const contentId = addObject("<< /Length " + stream.length + " >>\\nstream\\n" + stream + "\\nendstream");
    const pageId = addObject("<< /Type /Page /Parent " + pagesId + " 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 " + regularFontId + " 0 R /F2 " + boldFontId + " 0 R >> >> /Contents " + contentId + " 0 R >>");
    pageIds.push(pageId);
  }

  objects[pagesId - 1] = "<< /Type /Pages /Kids [" + pageIds.map((id) => id + " 0 R").join(" ") + "] /Count " + pageIds.length + " >>";

  let pdf = "%PDF-1.4\\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += index + 1 + " 0 obj\\n" + object + "\\nendobj\\n";
  });

  const xrefOffset = pdf.length;
  pdf += "xref\\n0 " + (objects.length + 1) + "\\n0000000000 65535 f \\n";
  offsets.slice(1).forEach((offset) => {
    pdf += String(offset).padStart(10, "0") + " 00000 n \\n";
  });
  pdf += "trailer\\n<< /Size " + (objects.length + 1) + " /Root " + catalogId + " 0 R >>\\nstartxref\\n" + xrefOffset + "\\n%%EOF";
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
`;

const coverJs = `const form = document.querySelector("#cover-form");
const output = document.querySelector("#cover-output");
const copyButton = document.querySelector("#copy-cover-letter");
const downloadButton = document.querySelector("#download-cover-pdf");

const value = (name) => new FormData(form).get(name)?.toString().trim() || "";

const sentence = (text, fallback) => (text || fallback).replace(/[.\\s]+$/, "");

const focusedTemplate = () => {
  const manager = value("manager") || "Hiring Manager";
  const name = value("name") || "Your Name";
  const jobTitle = value("jobTitle") || "the open role";
  const company = value("company") || "your company";
  const experience = sentence(value("experience"), "my background aligns with the responsibilities in the posting");
  const strengths = sentence(value("strengths"), "clear communication, ownership, and practical problem solving");
  const reason = sentence(value("reason"), "the role is a strong match for the kind of work I want to do next");
  const contact = [value("email"), value("phone")].filter(Boolean).join(" | ");
  return "Dear " + manager + ",\\n\\n" +
    "I am excited to apply for the " + jobTitle + " role at " + company + ". I bring " + experience + ", and I am confident I can contribute quickly to the team.\\n\\n" +
    "In my recent work, I have built strengths in " + strengths + ". Those strengths match the needs of this role because " + reason + ".\\n\\n" +
    "I would welcome the chance to discuss how my background can support " + company + "'s goals. Thank you for your time and consideration.\\n\\n" +
    "Sincerely,\\n" + name + (contact ? "\\n" + contact : "");
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
  return "Dear " + manager + ",\\n\\n" +
    "I am applying for the " + jobTitle + " role at " + company + " because it connects strongly with the direction of my career. While my path may not be a traditional one, I bring " + experience + ".\\n\\n" +
    "My strongest transferable skills are " + strengths + ". I am especially interested in this opportunity because " + reason + ".\\n\\n" +
    "I would appreciate the opportunity to discuss how my background and motivation can add value to " + company + ". Thank you for considering my application.\\n\\n" +
    "Sincerely,\\n" + name + (contact ? "\\n" + contact : "");
};

const render = () => {
  output.value = value("template") === "career-change" ? careerChangeTemplate() : focusedTemplate();
};

const pdfEscape = (value) => String(value || "")
  .normalize("NFKD")
  .replace(/[^\\x09\\x0a\\x0d\\x20-\\x7e]/g, "")
  .replaceAll(String.fromCharCode(92), String.fromCharCode(92) + String.fromCharCode(92))
  .replaceAll("(", String.fromCharCode(92) + "(")
  .replaceAll(")", String.fromCharCode(92) + ")")
  .replaceAll(String.fromCharCode(13), " ")
  .replaceAll(String.fromCharCode(10), " ");

const wrapText = (text, maxChars) => {
  const words = String(text || "").split(/\\s+/).filter(Boolean);
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
    const stream = commands.join("\\n");
    const contentId = addObject("<< /Length " + stream.length + " >>\\nstream\\n" + stream + "\\nendstream");
    const pageId = addObject("<< /Type /Page /Parent " + pagesId + " 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 " + regularFontId + " 0 R >> >> /Contents " + contentId + " 0 R >>");
    pageIds.push(pageId);
  }

  objects[pagesId - 1] = "<< /Type /Pages /Kids [" + pageIds.map((id) => id + " 0 R").join(" ") + "] /Count " + pageIds.length + " >>";

  let pdf = "%PDF-1.4\\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += index + 1 + " 0 obj\\n" + object + "\\nendobj\\n";
  });

  const xrefOffset = pdf.length;
  pdf += "xref\\n0 " + (objects.length + 1) + "\\n0000000000 65535 f \\n";
  offsets.slice(1).forEach((offset) => {
    pdf += String(offset).padStart(10, "0") + " 00000 n \\n";
  });
  pdf += "trailer\\n<< /Size " + (objects.length + 1) + " /Root " + catalogId + " 0 R >>\\nstartxref\\n" + xrefOffset + "\\n%%EOF";
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
  output.value.split("\\n").forEach((paragraph) => {
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
`;

await write("/tools/", toolsIndex());
await write("/tools/free-resume-maker/", resumeTool());
await write("/tools/free-cover-letter-generator/", coverLetterTool());
await writeFile(path.join(OUTPUT_DIR, "tools", "tool.css"), css);
await writeFile(path.join(OUTPUT_DIR, "tools", "free-resume-maker", "tool.js"), resumeJs);
await writeFile(path.join(OUTPUT_DIR, "tools", "free-cover-letter-generator", "tool.js"), coverJs);

console.log("Built free tool pages.");
