const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const file = path.join(root, "manifest-fontes-2026-11-15.json");
const manifest = JSON.parse(fs.readFileSync(file, "utf8"));
for (const entry of manifest.arquivos) {
  entry.bytes = fs.statSync(path.join(root, entry.arquivo)).size;
}
fs.writeFileSync(file, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
