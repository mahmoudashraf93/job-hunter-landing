# Field Notes blog redesign — design QA

Selected direction: option 3, Field Notes. Review date: 2026-10-19.

## Visual truth and normalization

- Source: `/Users/mahmoud/.codex/generated_images/01a15089-3532-7e70-b8e1-586341eb736a/exec-08acc929-e31b-440a-81bf-baf2e7b012a6.png`.
- Implementation: `http://127.0.0.1:8765/guides/autofill-job-applications-iphone/`.
- Evidence directory: `/Users/mahmoud/.codex/visualizations/2026/10/19/jobhunter-blog-redesign/qa/` (outside public assets).
- Source pixels: 1487 × 1058. Browser CSS viewport: 1487 × 1058. Implementation capture: 1487 × 1058 pixels, effective capture density 1 image pixel per CSS pixel. No rescaling or browser chrome in either image.
- State: light article body, navy masthead, page top, contents in its initial state. The reference supplies a desktop article; the index and smaller breakpoints extend that same design rather than claiming an exact source match.
- Final implementation: `article-desktop-final.jpg`.
- Full-view comparison: `comparison-final.jpg`, source and implementation together at equal size, source left.
- Focused comparisons: `header-final.jpg`, `summary-final.jpg`, `sidebar-final.jpg`. These make headline wrapping, metadata, icon scale, callout padding and navigation text readable without relying on a reduced full-page image.

## Findings and comparison history

1. **Initial result: blocked.** `comparison-v1.jpg`, `header-v1.jpg`, `reading-v1.jpg`.
   - [P2] Intro, byline and body type were too small; masthead ended about 10px too low. Updated headline/intro sizes, line height, margins, metadata and body type. The final masthead ends at 438.75px versus approximately 437px in the reference.
   - [P2] Redundant summary copy made the callout too tall. Removed the repeated sentence from that summary; the submission distinction remains explicit in the editorial steps and FAQs. Adjusted icon scale and padding to match the reference's two-line callout.
   - Evidence after fixes: `comparison-v2.jpg`, `summary-v2.jpg`.
2. **Second result: blocked.** `sidebar-v2.jpg`, `article-mobile-320.jpg`.
   - [P2] A fixed-height contents list clipped a heading mid-line. Replaced the clipped viewport with six complete entries and a native “more sections” disclosure. Every heading remains a real anchor, including without JavaScript. The active section opens the disclosure when necessary.
   - [P2] Wrapped phone metadata could start a line with an orphan separator. Removed separators at phone sizes and increased metadata to 12px.
   - [P2] The document icons were undersized and the sidebar text was too small. Increased real Tabler icon display sizes and related-link type.
   - Evidence after fixes: `article-desktop-v3.jpg`, final focused comparisons, `article-mobile-final.jpg`.
3. **Accessibility correction before final capture.**
   - [P2] White CTA text on the initial teal measured 4.11:1. Changed the background to `#087f88`, giving 4.77:1. The hover state is darker. No marketing copy or date changes were needed.
   - Rebuilt and captured `article-desktop-final.jpg`; re-compared in `comparison-final.jpg`, `header-final.jpg`, `summary-final.jpg` and `sidebar-final.jpg`.
4. **Final comparison: passed.** No actionable P0/P1/P2 findings remain.

## Required fidelity surfaces

- **Fonts and typography:** self-hosted Inter variable font loaded in the browser; 68px/750 desktop headline, 22px intro, 18px body, and responsive phone type. The headline uses the same two-line break as the reference. Human-readable dates retain ISO `datetime` values. The five-minute estimate is calculated from the real article rather than copying the mock's six-minute label. Minor generated-font differences are acceptable.
- **Spacing and layout rhythm:** 1210px centered container, reading column and divided right rail align with the reference. The navy masthead, breadcrumb, teal summary and section dividers follow its hierarchy. Longer original editorial paragraphs make the first section taller than the illustrative mock; preserving the published advice is intentional. All 15 guides were checked at 320px with no document overflow.
- **Colors and tokens:** retained the site's `#14213d` navy, white paper, muted slate, blue links and pale teal summary. Solid fills replace the mock's subtle generated texture. CTA contrast is 4.77:1; body/link contrast exceeds 4.5:1. Browser JPEG color-management differences are not treated as CSS-token drift.
- **Image and asset quality:** existing JobHunter logo and existing product/demo images retained. Official Tabler icons are external SVG assets with original library paths, not custom drawings. Inter and icon licenses are included. The controlled autofill figure keeps its fictional-example caption and native aspect ratio, with lazy loading. No raster illustration or stock-image asset is implied by the selected layout, so none was generated.
- **Copy and content:** canonical titles, URLs, article sections, source links, FAQs, redirects and date metadata retained. The autofill hero keeps the reference's concise intro; submission control remains explicit throughout the article. Sidebar descriptions use real guide descriptions and keep the configured related-guide order. The contents includes all real headings, including ones omitted from the mock.

## Browser verification

- In-app browser desktop: 1487 × 1058, phone: 390 × 844 and 320 × 740, tablet: 768 × 1024.
- Evidence: `article-mobile-final.jpg`, `article-mobile-320.jpg`, `article-mobile-table-final.jpg`, `article-tablet.jpg`, `index-desktop.jpg`, `index-mobile-320.jpg`.
- All 15 guide routes: one H1, no horizontal document overflow at 320px, loaded logo, valid contents targets and hidden desktop sidebar on phones. The guides index contains all 15 crawlable cards and four topic anchors.
- Desktop contents jump: hash and keyboard focus moved to the requested section at a 24px top offset; active state updated. Expanded “more sections” and jumped to final review successfully.
- Phone contents: opened, selected an example section, menu closed, focus and hash moved correctly. Contents remains native HTML when the enhancement script is absent.
- Review checklist: checked an item successfully. FAQ: expanded the submission answer and verified the answer appeared.
- Table: its labeled, keyboard-focusable region contained the horizontal overflow; two ArrowRight presses scrolled it 80px without causing document overflow.
- Topic navigation: AI Cover Letters jumped to the matching group with its 20px scroll margin. Primary Guides navigation reached the index. A related-guide card reached the ATS checklist, Free tools reached the tools index, and the skip link moved keyboard focus to `main-content`.
- Console: no warnings or errors in tested routes/states.
- Private Tailscale HTTPS preview returned the redesigned article successfully.

## Technical validation

- Full four-generator build passed; SEO validator passed for 20 canonical URLs, 15 guides and 25 redirects. All indexable pages remain reachable within two clicks.
- All 15 Node tests passed, including unique section IDs, reading estimates and existing escaping/link/date tests.
- `git diff --check` passed. Sitemap and article dates remain unchanged by the visual redesign.

## Open questions and follow-up polish

No blocking questions. The mock is an illustrative desktop design, so it does not define phone navigation, expanded disclosures, tables, checklist states or the guides index; these have been implemented and browser-checked. This is not a real-device Safari or assistive-technology audit, and no production Core Web Vitals claim is made.

## Implementation checklist

- [x] Recreate the selected navy reading layout and index.
- [x] Keep source content, canonical URLs, internal links and dates.
- [x] Fix findings, recapture, and compare source and result together.
- [x] Check responsive layouts, core controls and browser console.
- [x] Run generators, SEO validation, tests and whitespace checks.
- [x] Keep QA evidence outside public assets and the preview running.

final result: passed

# Landing page option 3 — design QA (2026-10-31)

Source: `/Users/mahmoud/.codex/generated_images/01a1917b-ae83-7f93-a1c6-36ed3c354194/exec-1e767caf-502f-40df-8696-b113a73cd495.png`. Implementation: `http://127.0.0.1:8877/`. Full-page comparison: `/Users/mahmoud/.codex/visualizations/2026/10/31/01a1917b-ae83-7f93-a1c6-36ed3c354194/comparison-final.jpg`, source left; both normalized to 720 pixels wide. Desktop implementation was captured at 1440 CSS pixels, 1x; source is a generated long-page concept rather than a fixed viewport. Mobile capture at 390px: `mobile-final.jpg` in the same evidence directory. A further 320px screenshot was inspected in the browser.

## Findings and fixes

- P2: First browser pass showed the SEO patch adding a redundant guides section. Updated the patch to recognize the new guide-section class regardless of additional classes; verified the duplicate is gone.
- P2: At 390px the header links wrapped and a hidden line break joined words in the guides heading. Shortened the CTA and preserved whitespace. At 320px adjusted the hero heading and CTA so they fit without overflow.
- P2: The first desktop capture showed a disproportionately small phone group and excess whitespace in the featured guide. Increased the product image and featured image. Compared the subsequent full-page capture against the reference and checked the hero and guide areas at readable size.
- P2: Initial button teal had 4.29:1 contrast against white. Darkened it to #007f95 (4.70:1).

## Fidelity and validation

- Typography: self-hosted Inter matches the existing site; large, tightly spaced navy display type and readable body copy follow the reference. Exact generated font metrics differ.
- Layout: centered hero, three-phone image, four-step journey, featured guide plus two stacked guides and final CTA follow the chosen direction. A free-tools section is retained because it is an existing user journey. The page uses the existing canonical guide titles and descriptions rather than invented dates from the mock.
- Color: white, pale blue, navy and accessible teal follow the reference. The mock's decorative background curves are omitted; the three-phone illustration has a white background.
- Images: generated guide illustrations and a generated product illustration based on actual JobHunter screenshots replace the mock's illustrative assets. The product image is explicitly described as an illustration; exact screen text may differ from the app.
- Interaction: featured guide opened the intended article in the in-app browser. Navigation, App Store and tool destinations are ordinary links. At 320px the document had no horizontal overflow and all images loaded; desktop browser console had no warnings/errors. Real-device and assistive-technology testing were not performed.
- Site SEO validation passed (15 canonical URLs, 10 guides, 30 redirects; all pages reachable), and all 19 Node tests passed. `git diff --check` passed.

Checklist: [x] selected reference compared to implementation; [x] mobile fit checked; [x] guide links retained; [x] build and validation passed. No remaining P0/P1/P2 findings in the reviewed scope.

final result: passed
