# JobHunter Landing Site

Production website for [JobHunter](https://appjobhunter.com/), an iPhone job
search and application assistant with matched jobs, Safari autofill, resume
tools, cover-letter support, and application tracking.

## Development

The repository contains source content and generated static HTML served by a
Cloudflare Worker. Regenerate and validate the site with:

```sh
node scripts/build-homepage.mjs
node scripts/build-tools.mjs
node scripts/build-guides.mjs
node scripts/apply-seo-patches.mjs
node scripts/validate-seo.mjs
node --test scripts/*.test.mjs
```

Production deploys from the `master` branch to
[appjobhunter.com](https://appjobhunter.com/). GitHub Pages also serves the
repository so legacy App Store links can redirect to the canonical site.

## SEO publishing standard

Before an article is ready for review:

- Choose one reader task and search intent. Refresh the existing canonical guide when it answers that intent; create a new URL only for a meaningfully different task. Search Console queries are incomplete observations of our own visibility, not market-wide keyword volume.
- Answer the question early, then provide useful steps, original examples or tested product evidence. Verify app claims against a published version, label fictional examples and controlled tests, and cite primary sources where they substantiate advice. Length follows the task; there is no minimum SEO word count.
- Link to the guide from a relevant existing page and the guide index. Add links beside advice where the next resource helps the reader, using concise, descriptive anchor text. Keep the related-guide cards useful. There is no fixed target number of links; avoid forcing unrelated links or keywords.
- Use ordinary HTML anchors pointing directly to canonical URLs. Preserve existing URLs and redirects. Check titles, descriptions, headings, indexability, sitemap membership, image descriptions and structured data against the actual page.
- Keep the original publication date; set actual publication and modification dates explicitly for new guides. Set `dateModified` only after a substantive article change. Fixed-page modification overrides live in `PAGE_MODIFIED`; unchanged pages retain their dates. Visible dates, Article markup and sitemap dates must agree.
- Structured data must accurately describe visible, verifiable information. Do not add star ratings without a maintained, visible source. Keep FAQs useful for readers; Google's FAQ rich result was retired in May 2026, so do not promise FAQ search enhancements.
- Regenerate and run the commands above, review desktop and mobile layouts, and test changed controls and contextual links. Technical validation cannot assess originality, factual accuracy or whether an article actually solves the reader's task; those require editorial review. Keep credentials and raw analytics outside Git.

The validator checks crawlable reachability from the homepage, broken/retired internal URLs, empty or generic internal anchor text, fragment targets, canonical metadata and date consistency. It reports navigation depth without treating a particular click count as a Google ranking rule.

The Website SEO GitHub workflow runs the generators, validator and tests on pull requests and pushes to `master`. It also fails when regenerated output differs from the committed files. Editorial quality still requires human review.

After publication, inspect affected canonical URLs and compare equivalent Search Console periods once data is available. Check indexing, relevant impressions/clicks and available real-user Core Web Vitals; a passing build alone establishes none of those outcomes.

Primary references: [Google link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable), [helpful content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), [sitemap dates](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), and [FAQ feature retirement](https://developers.google.com/search/updates#may-2026).
