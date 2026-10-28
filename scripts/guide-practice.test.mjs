import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import test from "node:test";

test("file practice uses metadata without reading or transmitting a document", async () => {
  const code = (await readFile(new URL("./guide-practice.mjs", import.meta.url), "utf8"))
    .replaceAll("export const ", "const ");
  const events = {};
  const filename = '<img src=x onerror="alert(1)">.pdf';
  const prohibited = () => { throw new Error("The practice accessed file content or a network API"); };
  const file = { name: filename, size: 900_000, text: prohibited, arrayBuffer: prohibited, stream: prohibited };
  const input = { disabled: true, files: [file], value: "selected", addEventListener: (name, fn) => { events[name] = fn; } };
  const status = { textContent: "", set innerHTML(_) { throw new Error("A filename was rendered as HTML"); } };
  const clear = { hidden: true, addEventListener: (_, fn) => { events.clear = fn; } };
  const practice = { querySelector: (selector) => ({ "input[type=file]": input, "[data-file-status]": status, "[data-file-clear]": clear })[selector] };
  vm.runInNewContext(code, {
    document: { querySelectorAll: () => [practice] },
    fetch: prohibited, XMLHttpRequest: prohibited, FileReader: prohibited,
    localStorage: { setItem: prohibited }, sessionStorage: { setItem: prohibited }
  });
  assert.equal(input.disabled, false);
  assert.equal(clear.hidden, false);
  events.change();
  assert.ok(status.textContent.includes(filename), "Filename must be plain text, including unusual characters");
  assert.match(status.textContent, /0\.90 MB \(900,000 bytes\)/);
  events.clear();
  assert.equal(input.value, "");
  assert.equal(status.textContent, "No file selected.");
  input.files = [];
  events.change();
  assert.equal(status.textContent, "No file selected.");
});
