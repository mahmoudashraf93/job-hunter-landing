import assert from "node:assert/strict";
import test from "node:test";
import { articleDates, renderFigure, renderLinks, renderSection, safeHref } from "./guide-rendering.mjs";

test("rich sections escape text in every rendered content type", () => {
  const attack = '<img src=x onerror="alert(1)">';
  const html = renderSection({heading:attack,paragraphs:[attack],steps:[attack],bullets:[attack],checklist:[attack],table:{caption:attack,columns:[attack],rows:[[attack]]}});
  assert.ok(!html.includes("<img"));
  assert.ok(!html.includes('onerror="'));
  assert.ok(html.includes("&lt;img"));
  assert.ok(html.includes('<th scope="col">'));
  assert.ok(html.includes('<label><input type="checkbox"><span>'));
});

test("source and contextual links reject unsafe protocols and ambiguous origins", () => {
  for (const href of ["javascript:alert(1)","data:text/html,test","http://example.com","//example.com/","/\\example.com","https://user:secret@example.com/","https://example.com/\n"]) {
    assert.throws(() => safeHref(href));
  }
  assert.equal(safeHref("/guides/autofill-job-applications-iphone/"),"/guides/autofill-job-applications-iphone/");
  assert.ok(renderLinks([{label:'A & B',href:'https://example.com/?a=1&b=2'}]).includes('a=1&amp;b=2'));
});

test("an isolated refresh preserves publication date and untouched modification dates", () => {
  const defaults = {datePublished:"2026-05-28",dateModified:"2026-08-12"};
  assert.deepEqual(articleDates({},defaults),defaults);
  assert.deepEqual(articleDates({dateModified:"2026-10-18"},defaults),{datePublished:"2026-05-28",dateModified:"2026-10-18"});
  assert.throws(() => articleDates({dateModified:"2026-02-30"},defaults));
  assert.throws(() => articleDates({dateModified:"2026-05-27"},defaults));
});

test("tables fail generation when rows do not match their headings", () => {
  assert.throws(() => renderSection({heading:"Example",table:{caption:"Example",columns:["A","B"],rows:[["only one cell"]]}}));
});

test("optional figures can be omitted and figure attributes are escaped", () => {
  assert.equal(renderFigure(null),"");
  const html=renderFigure({src:"/images/example.png",alt:'Example "quoted"',caption:'A < B',width:390,height:844});
  assert.ok(html.includes('alt="Example &quot;quoted&quot;"'));
  assert.ok(html.includes('width="390" height="844"'));
  assert.ok(html.includes('A &lt; B'));
});
