// File selection is local. Read metadata only; never read or transmit contents.
export const describeFile = (file) => file
  ? `Selected: ${file.name}. Size: ${(file.size / 1_000_000).toFixed(2)} MB (${file.size.toLocaleString("en-US")} bytes). Compare it with the employer’s file requirements.`
  : "No file selected.";

export const enhanceFilePickers = (root) => {
  for (const practice of root.querySelectorAll("[data-file-practice]")) {
    const input = practice.querySelector("input[type=file]");
    const status = practice.querySelector("[data-file-status]");
    const clear = practice.querySelector("[data-file-clear]");
    if (!input || !status || !clear) continue;
    input.disabled = false;
    clear.hidden = false;
    const update = () => { status.textContent = describeFile(input.files?.[0]); };
    input.addEventListener("change", update);
    clear.addEventListener("click", () => {
      input.value = "";
      status.textContent = describeFile(null);
    });
    update();
  }
};

if (typeof document !== "undefined") enhanceFilePickers(document);
