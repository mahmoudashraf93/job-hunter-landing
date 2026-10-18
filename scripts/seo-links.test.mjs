import assert from "node:assert/strict";
import test from "node:test";
import { auditInternalLinks, extractAnchors } from "./seo-links.mjs";

const origin = "https://appjobhunter.com";
const run = (pages, redirects = {}) => auditInternalLinks(new Map(Object.entries(pages)), Object.keys(pages), { origin, redirects });

test("relative and absolute HTML links make a page reachable without JavaScript", () => {
  const report = run({ "/": '<a href="/guides/">Guides</a>', "/guides/": `<a href='${origin}/guides/example/'>Example guide</a>`, "/guides/example/": '<a href="../">All guides</a>' });
  assert.equal(report.maxDepth, 2);
});

test("a disconnected pair cannot hide an orphaned section", () => {
  assert.throws(() => run({ "/": "Home", "/a/": '<a href="/b/">Guide B</a>', "/b/": '<a href="/a/">Guide A</a>' }), /unreachable/);
});

test("script examples, comments and nofollow links do not establish reachability", () => {
  for (const html of ['<script>const example=\'<a href="/a/">Guide A</a>\';</script>', '<!-- <a href="/a/">Guide A</a> -->', '<a rel="nofollow" href="/a/">Guide A</a>']) {
    assert.throws(() => run({ "/": html, "/a/": "Guide" }), /unreachable/);
  }
});

test("empty and generic link labels fail, while descriptive image alt is usable", () => {
  for (const label of ["", "Click here", "Read more"]) {
    assert.throws(() => run({ "/": `<a href="/a/">${label}</a>`, "/a/": "Guide" }), /anchor text/);
  }
  assert.equal(run({ "/": '<a href="/a/"><img src="/example.png" alt="Resume checklist"></a>', "/a/": "Guide" }).maxDepth, 1);
});

test("encoded fragments resolve to real IDs and stale fragments fail", () => {
  const pages = { "/": '<a href="/a/#r%C3%A9sum%C3%A9">Resume section</a>', "/a/": '<h2 id="résumé">Resume</h2>' };
  assert.equal(run(pages).maxDepth, 1);
  assert.throws(() => run({ ...pages, "/a/": '<h2 id="other">Other</h2>' }), /missing fragment/);
  assert.throws(() => run({ ...pages, "/a/": '<h2 data-id="résumé">Resume</h2>' }), /missing fragment/);
});

test("links to retired URLs fail even when written as absolute URLs", () => {
  assert.throws(() => run({ "/": `<a href="${origin}/old/">Old guide</a>` }, { "/old/": "/guides/" }), /retired page/);
});

test("entity decoding preserves meaningful anchor text and href queries", () => {
  assert.deepEqual(extractAnchors('<a href="/a/?x=1&amp;y=2">Resume &amp; cover letter</a>')[0], { href: "/a/?x=1&y=2", label: "Resume & cover letter", nofollow: false });
});

test("same-site HTTP links fail instead of hiding as external links", () => {
  assert.throws(() => run({ "/": '<a href="http://appjobhunter.com/a/">Guide A</a>', "/a/": "Guide" }), /noncanonical internal origin/);
});
