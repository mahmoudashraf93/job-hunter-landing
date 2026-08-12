import { writeFile } from "node:fs/promises";
import path from "node:path";

const SITE_URL = "https://appjobhunter.com";
const APP_STORE_URL = "https://apps.apple.com/app/apple-store/id6645735955?pt=120006398&ct=lanlanding&mt=8";
const APP_ICON = `${SITE_URL}/images/512x512bb-2c184703c8.jpg`;
const HERO_SCREENSHOT = "/public/ios/iphone/1125x2436/en/02-hero.png";
const SCREENSHOTS = [
  {
    src: HERO_SCREENSHOT,
    alt: "JobHunter iPhone application autofill screenshot"
  },
  {
    src: "/public/ios/iphone/1125x2436/en/03-device-bottom.png",
    alt: "JobHunter saved profile and application answers screenshot"
  },
  {
    src: "/public/ios/iphone/1125x2436/en/04-device-top.png",
    alt: "JobHunter resume maker screenshot"
  },
  {
    src: "/public/ios/iphone/1125x2436/en/05-device-bottom.png",
    alt: "JobHunter resume attachment workflow screenshot"
  },
  {
    src: "/public/ios/iphone/1125x2436/en/06-two-devices.png",
    alt: "JobHunter iPhone job search workflow screenshot"
  },
  {
    src: "/public/ios/iphone/1125x2436/en/07-device-top.png",
    alt: "JobHunter AI cover letter workflow screenshot"
  }
];

const schema = {
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
      "https://apps.apple.com/app/apple-store/id6645735955",
      "https://github.com/mahmoudashraf93/job-hunter-landing"
    ]
  }
};

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JobHunter | Autofill Job Applications, Resumes, and AI Cover Letters</title>
  <meta name="description" content="JobHunter helps iPhone job seekers autofill applications, attach resumes, build reusable profile details, and draft AI cover letters faster.">
  <link rel="canonical" href="${SITE_URL}/">
  <meta name="apple-itunes-app" content="app-id=6645735955">
  <meta property="og:type" content="website">
  <meta property="og:title" content="JobHunter | Autofill Job Applications Faster">
  <meta property="og:description" content="Autofill job applications from your iPhone, attach resumes, and draft AI cover letters with JobHunter.">
  <meta property="og:url" content="${SITE_URL}/">
  <meta property="og:image" content="${APP_ICON}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="JobHunter | Autofill Job Applications Faster">
  <meta name="twitter:description" content="Autofill job applications from your iPhone, attach resumes, and draft AI cover letters with JobHunter.">
  <meta name="twitter:image" content="${APP_ICON}">
  <link rel="icon" href="/images/512x512bb-2c184703c8.jpg">
  <link rel="apple-touch-icon" href="/images/512x512bb-2c184703c8.jpg">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <style>
    :root {
      color-scheme: light;
      --ink: #102033;
      --muted: #526173;
      --blue: #0b1c49;
      --bright-blue: #2364aa;
      --teal: #2a9d8f;
      --gold: #f0b429;
      --paper: #ffffff;
      --soft: #f6f8fb;
      --line: #d9e1ea;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--ink);
      background: var(--paper);
      line-height: 1.6;
    }
    a { color: inherit; }
    .hero {
      position: relative;
      min-height: 88vh;
      overflow: hidden;
      background: #0b1c49;
      color: white;
      display: flex;
      align-items: center;
    }
    .hero::before {
      content: "";
      position: absolute;
      inset: 0;
      background:
        linear-gradient(90deg, rgba(11, 28, 73, 0.96) 0%, rgba(11, 28, 73, 0.86) 46%, rgba(11, 28, 73, 0.58) 100%),
        url("${HERO_SCREENSHOT}") right 8% center / min(34vw, 380px) auto no-repeat;
    }
    .hero-inner {
      position: relative;
      z-index: 1;
      width: min(1120px, calc(100% - 40px));
      margin: 0 auto;
      padding: 82px 0 76px;
    }
    .topbar {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
      width: min(1120px, calc(100% - 40px));
      padding: 22px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
    }
    .brand {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      font-weight: 800;
    }
    .brand img { border-radius: 10px; }
    .topbar nav {
      display: flex;
      align-items: center;
      gap: 18px;
      flex-wrap: wrap;
    }
    .topbar nav a {
      color: rgba(255, 255, 255, 0.82);
      font-weight: 700;
      text-decoration: none;
    }
    .download-pill {
      background: white;
      color: var(--blue) !important;
      border-radius: 8px;
      padding: 9px 14px;
    }
    .hero-copy {
      max-width: 650px;
      padding-top: 58px;
    }
    .eyebrow {
      color: #9de2d9;
      font-size: 0.82rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin: 0 0 12px;
    }
    h1 {
      font-size: clamp(3rem, 8vw, 6.6rem);
      line-height: 0.95;
      letter-spacing: 0;
      margin: 0 0 22px;
    }
    .hero-copy p {
      color: rgba(255, 255, 255, 0.78);
      font-size: clamp(1.05rem, 2vw, 1.35rem);
      max-width: 590px;
      margin: 0 0 30px;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      align-items: center;
    }
    .primary-button,
    .secondary-button {
      display: inline-flex;
      align-items: center;
      min-height: 46px;
      border-radius: 8px;
      padding: 0 18px;
      font-weight: 800;
      text-decoration: none;
    }
    .primary-button {
      background: white;
      color: var(--blue);
    }
    .secondary-button {
      border: 1px solid rgba(255, 255, 255, 0.34);
      color: white;
    }
    .section {
      padding: 68px 24px;
    }
    .inner {
      max-width: 1120px;
      margin: 0 auto;
    }
    .section h2 {
      font-size: clamp(2rem, 4vw, 3.6rem);
      line-height: 1.03;
      letter-spacing: 0;
      margin: 0 0 18px;
    }
    .section-intro {
      color: var(--muted);
      max-width: 720px;
      font-size: 1.1rem;
      margin: 0 0 30px;
    }
    .feature-grid,
    .guide-grid,
    .review-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }
    .feature,
    .guide-card,
    .review {
      border: 1px solid var(--line);
      border-radius: 8px;
      background: var(--paper);
      padding: 22px;
    }
    .feature { display: block; color: inherit; text-decoration: none; }
    .feature strong,
    .guide-card strong {
      display: block;
      font-size: 1.1rem;
      line-height: 1.25;
      margin-bottom: 10px;
    }
    .feature p,
    .guide-card p,
    .review p {
      color: var(--muted);
      margin: 0;
    }
    .guide-section {
      background: var(--soft);
    }
    .guide-card {
      min-height: 178px;
      text-decoration: none;
    }
    .guide-card span {
      display: block;
      color: var(--teal);
      font-size: 0.78rem;
      font-weight: 800;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .screens {
      background: #12285d;
      color: white;
    }
    .screens .section-intro { color: rgba(255, 255, 255, 0.72); }
    .screen-row {
      display: flex;
      gap: 18px;
      overflow-x: auto;
      padding-bottom: 10px;
    }
    .screen-row img {
      width: min(44vw, 250px);
      min-width: 180px;
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.24);
    }
    .review {
      background: #fffaf0;
      border-color: #f4d98a;
    }
    .faq {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 18px;
    }
    .faq h3 {
      margin: 0 0 8px;
      font-size: 1.08rem;
    }
    .faq p { color: var(--muted); margin: 0; }
    .final-cta {
      background: linear-gradient(135deg, var(--bright-blue), var(--teal));
      color: white;
      text-align: center;
    }
    .final-cta p {
      color: rgba(255, 255, 255, 0.82);
      max-width: 650px;
      margin: 0 auto 24px;
    }
    footer {
      max-width: 1120px;
      margin: 0 auto;
      padding: 28px 24px 40px;
      color: var(--muted);
      display: flex;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
      border-top: 1px solid var(--line);
    }
    footer nav {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }
    footer a { text-decoration: none; font-weight: 700; }
    @media (max-width: 760px) {
      .hero { min-height: auto; }
      .hero::before {
        background:
          linear-gradient(180deg, rgba(11, 28, 73, 0.96) 0%, rgba(11, 28, 73, 0.86) 58%, rgba(11, 28, 73, 0.72) 100%),
          url("${HERO_SCREENSHOT}") right 24px bottom 18px / 156px auto no-repeat;
      }
      .topbar {
        position: relative;
        left: auto;
        transform: none;
        width: auto;
        margin: 0 20px;
      }
      .topbar nav { gap: 12px; }
      .hero {
        display: block;
      }
      .hero-inner {
        width: auto;
        margin: 0 20px;
        padding: 38px 0 210px;
      }
      .hero-copy { padding-top: 12px; }
      .section { padding: 52px 20px; }
    }
  </style>
</head>
<body>
  <header class="topbar">
    <a class="brand" href="/" aria-label="JobHunter home">
      <img src="/images/60x60bb-4a7d0f083e.jpg" width="40" height="40" alt="">
      <span>JobHunter</span>
    </a>
    <nav aria-label="Primary">
      <a href="/tools/">Tools</a>
      <a href="/guides/">Guides</a>
      <a href="#features">Features</a>
      <a href="#faq">FAQ</a>
      <a class="download-pill" href="${APP_STORE_URL}">Download</a>
    </nav>
  </header>

  <main>
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-copy">
          <p class="eyebrow">iPhone job application autofill</p>
          <h1>JobHunter</h1>
          <p>Autofill job applications from your iPhone, attach the right resume, and draft AI cover letters while keeping final review in your hands.</p>
          <div class="actions">
            <a class="primary-button" href="${APP_STORE_URL}">Download on the App Store</a>
            <a class="secondary-button" href="/guides/">Read job search guides</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="features">
      <div class="inner">
        <p class="eyebrow">Built for repeated applications</p>
        <h2>Spend less time typing the same profile.</h2>
        <p class="section-intro">JobHunter focuses on the repeat work that slows down job seekers: matched job discovery, profile fields, resume attachment, and cover letter drafts.</p>
        <div class="feature-grid">
          <a class="feature" href="/guides/review-job-matches-faster/"><strong>Find matched jobs</strong><p>Review active roles by title, company, work mode, and fit before you apply.</p></a>
          <a class="feature" href="/guides/autofill-job-applications-iphone/"><strong>Autofill application fields</strong><p>Save profile details once and use them to complete repetitive application forms faster.</p></a>
          <a class="feature" href="/guides/attach-resume-from-iphone-safari/"><strong>Attach resumes from iPhone</strong><p>Keep resume versions ready so you can choose the right file while applying on mobile.</p></a>
          <a class="feature" href="/guides/ai-cover-letter-generator-review-checklist/"><strong>Draft AI cover letters</strong><p>Create a quick draft, then review and tailor it before adding it to an application.</p></a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="inner">
        <p class="eyebrow">Free tools</p>
        <h2>Make a resume or cover letter in your browser.</h2>
        <p class="section-intro">Start with a free classic resume template or a practical cover letter draft, then use the app for AI, more templates, matched jobs, and iPhone autofill.</p>
        <div class="guide-grid">
          <a class="guide-card" href="/tools/free-resume-maker/"><span>Resume tool</span><strong>Free Resume Maker</strong><p>Create a clean classic resume and save it as a PDF from your browser.</p></a>
          <a class="guide-card" href="/tools/free-cover-letter-generator/"><span>Cover letter tool</span><strong>Free Cover Letter Generator</strong><p>Generate a template-based cover letter and copy it into an application.</p></a>
          <a class="guide-card" href="/tools/"><span>All tools</span><strong>View free JobHunter tools</strong><p>Use browser tools, then download the app for more workflows.</p></a>
        </div>
      </div>
    </section>

    <section class="section screens">
      <div class="inner">
        <p class="eyebrow">Screenshots</p>
        <h2>Made for the mobile job search.</h2>
        <p class="section-intro">Use JobHunter where applications often start: on your phone, in Safari, while the role is still fresh.</p>
        <div class="screen-row" aria-label="JobHunter app screenshots">
          ${SCREENSHOTS.map((screenshot) => `<img src="${screenshot.src}" alt="${screenshot.alt}" loading="lazy">`).join("\n          ")}
        </div>
      </div>
    </section>

    <section class="section guide-section" id="guides">
      <div class="inner">
        <p class="eyebrow">JobHunter Guides</p>
        <h2>Practical guides for better job matches and faster applications.</h2>
        <p class="section-intro">Learn how to find matched jobs, review remote roles, compare hiring companies, autofill applications on iPhone, prepare ATS-friendly resumes, and review AI cover letters before submitting.</p>
        <div class="guide-grid">
          <a class="guide-card" href="/guides/find-top-remote-jobs-iphone/"><span>Job matching</span><strong>How to Find Top Remote Jobs on iPhone</strong><p>Review remote roles by fit, location rules, and application readiness.</p></a>
          <a class="guide-card" href="/guides/highest-hiring-companies-job-search/"><span>Job matching</span><strong>How to Find Companies Hiring for Many Roles</strong><p>Use company hiring volume as a discovery signal without applying blindly.</p></a>
          <a class="guide-card" href="/guides/autofill-job-applications-iphone/"><span>Autofill</span><strong>How to Autofill Job Applications on iPhone</strong><p>Save repeat typing and review every field before submitting.</p></a>
          <a class="guide-card" href="/guides/ats-friendly-resume-checklist/"><span>Resume</span><strong>ATS-Friendly Resume Checklist</strong><p>Prepare resumes that parse cleanly in online forms.</p></a>
          <a class="guide-card" href="/guides/ai-cover-letter-generator-review-checklist/"><span>Cover letters</span><strong>AI Cover Letter Review Checklist</strong><p>Use AI drafts without sending generic or inaccurate letters.</p></a>
          <a class="guide-card" href="/guides/"><span>All guides</span><strong>View 15 in-depth job search guides</strong><p>Browse consolidated job matching, autofill, resume, and cover letter resources.</p></a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="inner">
        <p class="eyebrow">Reviews</p>
        <h2>Job seekers are already saving time.</h2>
        <div class="review-grid">
          <div class="review"><p>"Great extension, has saved me tons of hours. Thank you so much"</p><strong>Belwariars</strong></div>
          <div class="review"><p>"Really helped me apply to many jobs, very helpful"</p><strong>Lowanmarie</strong></div>
        </div>
      </div>
    </section>

    <section class="section" id="faq">
      <div class="inner">
        <p class="eyebrow">FAQ</p>
        <h2>Common questions</h2>
        <div class="faq">
          <div><h3>Is JobHunter free?</h3><p>The app is free to download, with optional in-app purchases for premium features.</p></div>
          <div><h3>Does JobHunter auto-submit applications?</h3><p>No. Use it to move faster through repeat work, then review the application before submitting.</p></div>
          <div><h3>Can it help with cover letters?</h3><p>Yes. JobHunter can draft AI cover letters that you can edit for the specific role.</p></div>
          <div><h3>Is it only for iPhone?</h3><p>JobHunter is focused on iPhone and Safari job application workflows.</p></div>
        </div>
      </div>
    </section>

    <section class="section final-cta">
      <div class="inner">
        <h2>Apply faster today.</h2>
        <p>Save your profile once, autofill repeat fields, attach resumes, and draft cover letters from your iPhone.</p>
        <a class="primary-button" href="${APP_STORE_URL}">Download JobHunter</a>
      </div>
    </section>
  </main>

  <footer>
    <p>© 2026 JobHunter. All rights reserved.</p>
    <nav aria-label="Footer">
      <a href="/tools/">Tools</a>
      <a href="/guides/">Guides</a>
      <a href="/privacy/">Privacy</a>
      <a href="/terms/">Terms</a>
      <a href="${APP_STORE_URL}">App Store</a>
    </nav>
  </footer>
</body>
</html>
`;

await writeFile(path.join(process.cwd(), "index.html"), html);
console.log("Built static homepage.");
