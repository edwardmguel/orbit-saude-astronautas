const fs = require("node:fs");
const path = require("node:path");

const outputDir = path.resolve(__dirname, "..");
const retrievedAt = new Date();
const day = retrievedAt.toISOString().slice(0, 10);
const startDay = new Date(retrievedAt.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
const manifest = [];

async function saveJson(name, url) {
  const response = await fetch(url, { headers: { "User-Agent": "Orbit-Saude-prototype-data-collector/1.0" } });
  const body = await response.text();
  if (!response.ok) throw new Error(`${name}: HTTP ${response.status} ${body.slice(0, 300)}`);
  let parsed;
  try { parsed = JSON.parse(body); }
  catch { throw new Error(`${name}: a resposta não é JSON válido`); }
  const filePath = path.join(outputDir, name);
  const serialized = JSON.stringify(parsed, null, 2);
  const fileContents = `${serialized}\n`;
  fs.writeFileSync(filePath, fileContents, "utf8");
  const first = Array.isArray(parsed) ? parsed[0] : parsed;
  const fields = first && typeof first === "object" ? Object.keys(first) : [];
  manifest.push({
    arquivo: name,
    url,
    recuperadoEmUtc: new Date().toISOString(),
    statusHttp: response.status,
    bytes: Buffer.byteLength(fileContents, "utf8"),
    registros: Array.isArray(parsed) ? parsed.length : null,
    camposDoPrimeiroRegistro: fields
  });
  process.stdout.write(`${name}: HTTP ${response.status}, ${Array.isArray(parsed) ? parsed.length : "objeto"} registros, ${manifest.at(-1).bytes} bytes\n`);
}

async function main() {
  const noaa = [
    ["noaa-integral-protons-7-day.json", "https://services.swpc.noaa.gov/json/goes/primary/integral-protons-7-day.json"],
    ["noaa-planetary-k-index-1m.json", "https://services.swpc.noaa.gov/json/planetary_k_index_1m.json"],
    ["noaa-alerts.json", "https://services.swpc.noaa.gov/products/alerts.json"],
    ["noaa-scales-snapshot.json", "https://services.swpc.noaa.gov/products/noaa-scales.json"]
  ];
  for (const [name, url] of noaa) await saveJson(name, url);

  const base = "https://ccmc.gsfc.nasa.gov/DONKI-API/get";
  const firstEnd = new Date(new Date(`${startDay}T00:00:00Z`).getTime() + 45 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const secondStart = new Date(new Date(`${firstEnd}T00:00:00Z`).getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const ranges = [[startDay, firstEnd], [secondStart, day]];
  for (const eventType of ["FLR", "SEP", "CME", "GST"]) {
    for (const [rangeStart, rangeEnd] of ranges) {
      const url = `${base}/${eventType}?startDate=${rangeStart}&endDate=${rangeEnd}&api_key=DEMO_KEY`;
      await saveJson(`donki-${eventType.toLowerCase()}-${rangeStart}-to-${rangeEnd}.json`, url);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  const manifestPath = path.join(outputDir, `manifest-fontes-${day}.json`);
  fs.writeFileSync(manifestPath, `${JSON.stringify({ periodoDonki: { inicio: startDay, fim: day }, recuperadoEmUtc: retrievedAt.toISOString(), arquivos: manifest }, null, 2)}\n`, "utf8");
  process.stdout.write(`manifesto: ${path.basename(manifestPath)}\n`);
}

main().catch(error => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
