const fs = require("node:fs");
const path = require("node:path");
const Ls = require("lightstreamer-client-node");

const outputDir = path.resolve(__dirname, "..");
const startedAt = new Date();
const runId = startedAt.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
const telemetryPath = path.join(outputDir, `isslive-telemetria-${runId}.csv`);
const positionPath = path.join(outputDir, `iss-posicao-${runId}.csv`);
const minutes = Number(process.argv[2] || process.env.ISS_RECORD_MINUTES || 120);
const durationMs = Math.max(1, minutes) * 60 * 1000;
const positionIntervalMs = 60 * 1000;
const items = [
  "USLAB000053", "USLAB000054", "USLAB000055", "USLAB000058",
  "USLAB000059", "USLAB000060", "USLAB000061",
  "NODE3000001", "NODE3000002", "NODE3000003", "NODE3000004",
  "NODE3000005", "NODE3000006", "NODE3000007", "NODE3000008",
  "NODE3000009", "NODE3000010", "NODE3000011", "NODE3000012",
  "NODE3000013", "TIME_000001", "TIME_000002"
];

function csv(value) {
  const raw = value === undefined || value === null ? "" : String(value);
  return `"${raw.replace(/"/g, '""')}"`;
}

function appendCsv(file, values) {
  fs.appendFileSync(file, `${values.map(csv).join(",")}\r\n`, "utf8");
}

fs.writeFileSync(telemetryPath, "instante_recebimento_utc,item,valor_bruto,tempo_feed_bruto,ano_feed_bruto\r\n", "utf8");
fs.writeFileSync(positionPath, "instante_recebimento_utc,instante_origem_utc,timestamp_origem_epoch_s,latitude_deg,longitude_deg,altitude_km,velocidade_kmh,visibilidade,footprint_km,unidades_origem\r\n", "utf8");

let latestFeedTime = "";
let latestFeedYear = "";
let positionFailures = 0;
let finishing = false;

function log(message) {
  process.stdout.write(`${new Date().toISOString()} ${message}\n`);
}

async function recordPosition() {
  const receivedAt = new Date().toISOString();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544", { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const p = await response.json();
    const originUtc = Number.isFinite(Number(p.timestamp))
      ? new Date(Number(p.timestamp) * 1000).toISOString()
      : "";
    appendCsv(positionPath, [
      receivedAt, originUtc, p.timestamp, p.latitude, p.longitude, p.altitude,
      p.velocity, p.visibility, p.footprint, p.units
    ]);
  } catch (error) {
    positionFailures += 1;
    log(`posição indisponível: ${error.message}`);
  } finally {
    clearTimeout(timeout);
  }
}

function finish(reason) {
  if (finishing) return;
  finishing = true;
  clearInterval(positionTimer);
  clearTimeout(stopTimer);
  log(`encerrando: ${reason}`);
  try { client.disconnect(); } catch (error) { log(`desconexão: ${error.message}`); }
  log(`arquivos: ${path.basename(telemetryPath)}, ${path.basename(positionPath)}; falhas de posição=${positionFailures}`);
  setTimeout(() => process.exit(0), 1000).unref();
}

const client = new Ls.LightstreamerClient("https://push.lightstreamer.com", "ISSLIVE");
client.addListener({
  onStatusChange: status => log(`status Lightstreamer=${status}`),
  onServerError: (code, message) => log(`erro de servidor ${code}: ${message}`)
});

const subscription = new Ls.Subscription("MERGE", items, ["Value"]);
subscription.setRequestedSnapshot("yes");
subscription.addListener({
  onSubscription: () => log(`assinatura aceita para ${items.length} itens`),
  onSubscriptionError: (code, message) => log(`erro de assinatura ${code}: ${message}`),
  onItemUpdate: update => {
    const item = update.getItemName();
    const value = update.getValue("Value");
    if (item === "TIME_000001") latestFeedTime = value ?? "";
    if (item === "TIME_000002") latestFeedYear = value ?? "";
    appendCsv(telemetryPath, [new Date().toISOString(), item, value, latestFeedTime, latestFeedYear]);
  }
});

const positionTimer = setInterval(recordPosition, positionIntervalMs);
const stopTimer = setTimeout(() => finish("duração concluída"), durationMs);
process.on("SIGINT", () => finish("interrupção solicitada"));
process.on("SIGTERM", () => finish("processo encerrado"));
recordPosition();
client.subscribe(subscription);
client.connect();
log(`gravação iniciada por ${minutes} minutos; itens=${items.join(" ")}`);
