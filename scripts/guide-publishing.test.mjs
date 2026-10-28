import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import worker from "../src/worker.js";
import { guidePlans, guideRedirects } from "../content/seo-plan.mjs";

test("consolidated and older alias URLs redirect directly to their retained guide", async () => {
  const examples = new Map([
    ["apply-to-matched-jobs-iphone", "ten-minute-job-application-workflow"],
    ["track-matched-jobs-after-applying", "ten-minute-job-application-workflow"],
    ["write-cover-letter-fast", "ai-cover-letter-generator-review-checklist"],
    ["short-cover-letter-examples", "ai-cover-letter-generator-review-checklist"],
    ["entry-level-internship-cover-letter", "ai-cover-letter-generator-review-checklist"],
    ["review-job-matches-faster", "ten-minute-job-application-workflow"],
    ["set-up-job-matching-profile", "ten-minute-job-application-workflow"],
    ["multiple-resume-versions-different-roles", "tailor-resume-to-job-description-iphone"],
    ["daily-job-match-routine", "ten-minute-job-application-workflow"],
    ["salary-signals-in-job-matches", "ten-minute-job-application-workflow"],
    ["fresh-job-feed-application-strategy", "ten-minute-job-application-workflow"],
    ["best-skills-for-job-matches", "ten-minute-job-application-workflow"],
    ["find-tech-jobs-that-match-resume", "ten-minute-job-application-workflow"],
    ["job-matching-for-career-change", "ten-minute-job-application-workflow"]
  ]);
  const env = { ASSETS: { fetch: () => { throw new Error("A retired URL reached static assets"); } } };
  for (const [source, destination] of examples) {
    assert.equal(guideRedirects[`/guides/${source}/`], `/guides/${destination}/`);
  }
  for (const [sourcePath, destinationPath] of Object.entries(guideRedirects)) {
    const source = sourcePath.split("/")[2];
    const destination = destinationPath.split("/")[2];
    for (const suffix of ["", "/"]) {
      const response = await worker.fetch(new Request(`https://appjobhunter.com/guides/${source}${suffix}`), env);
      assert.equal(response.status, 301);
      assert.equal(response.headers.get("location"), `https://appjobhunter.com/guides/${destination}/`);
      assert.ok(!guideRedirects[`/guides/${destination}/`], "Redirect must not introduce a chain");
    }
  }
});

test("retained guide routes reach assets rather than being redirected", async () => {
  for (const guide of guidePlans) {
    const expected = `https://appjobhunter.com/guides/${guide.slug}/`;
    const response = await worker.fetch(new Request(expected), {
      ASSETS: { fetch: (request) => {
        assert.equal(request.url, expected);
        return new Response("Retained article", { status: 200 });
      } }
    });
    assert.equal(response.status, 200);
  }
});

test("guide advice stands alone and the optional product block follows FAQs and sources", async () => {
  const refreshedDestinations = new Set([
    "autofill-job-applications-iphone", "attach-resume-from-iphone-safari",
    "ats-friendly-resume-checklist", "ten-minute-job-application-workflow",
    "ai-cover-letter-generator-review-checklist"
  ]);
  for (const guide of guidePlans) {
    const advice = { intro: guide.intro, summary: guide.summary, description: guide.description, sections: guide.sections, faqs: guide.faqs, sources: guide.sources };
    assert.doesNotMatch(JSON.stringify(advice), /jobhunter/i, `${guide.slug} depends on the product inside its advice`);
    if (refreshedDestinations.has(guide.slug)) {
      assert.equal(guide.datePublished, "2026-05-28", "Keep the original publication date");
    }
    const html = await readFile(new URL(`../guides/${guide.slug}/index.html`, import.meta.url), "utf8");
    assert.doesNotMatch(html.split("</header>")[0], /apps\.apple\.com|Get JobHunter/, `${guide.slug} promotes the app above the advice`);
    const body = html.split('<div class="article-content">')[1].split('<aside class="reading-sidebar"')[0];
    const optional = body.indexOf('<aside class="cta"');
    assert.ok(optional > body.indexOf('id="frequently-asked-questions"'));
    assert.ok(optional > body.indexOf('id="sources"'));
    assert.doesNotMatch(body.slice(0, optional), /jobhunter/i, `${guide.slug} renders a product plug before the end`);
    assert.doesNotMatch(body.slice(0, optional), /href="\/tools\//i, `${guide.slug} promotes a site tool inside its instructional body`);
    assert.match(body.slice(optional), /Optional tool/);
    assert.match(body.slice(optional), /steps above work without it/);
    assert.equal((body.match(/<aside class="cta"/g) ?? []).length, 1);
  }
});
