const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const files = fs.readdirSync(root).filter(name => name.endsWith(".csv")).sort();

function parseCsvLine(line) {
  const fields = [];
  let value = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (quoted && line[i + 1] === '"') {
        value += '"';
        i++;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      fields.push(value);
      value = "";
    } else {
      value += char;
    }
  }
  fields.push(value);
  return fields;
}

function median(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function minimum(values) {
  return values.length ? values.reduce((min, value) => value < min ? value : min, Infinity) : null;
}

function maximum(values) {
  return values.length ? values.reduce((max, value) => value > max ? value : max, -Infinity) : null;
}

function round(value, places = 3) {
  if (value === null || value === undefined || !Number.isFinite(value)) return null;
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

function inspect(file) {
  const filePath = path.join(root, file);
  const buffer = fs.readFileSync(filePath);
  const source = new TextDecoder("utf-8", { fatal: true }).decode(buffer);
  const lines = source.trimEnd().split(/\r?\n/);
  const header = parseCsvLine(lines[0]);
  const rows = lines.slice(1).filter(Boolean).map(line => {
    const values = parseCsvLine(line);
    return Object.fromEntries(header.map((key, index) => [key, values[index] ?? ""]));
  });
  const result = {
    file,
    bytes: buffer.length,
    utf8: true,
    records: rows.length,
    columns: header,
    firstFiveLines: lines.slice(0, 5),
  };

  if (file.startsWith("isslive-telemetria-")) {
    const grouped = new Map();
    for (const row of rows) {
      if (!grouped.has(row.item)) grouped.set(row.item, []);
      grouped.get(row.item).push(row);
    }
    result.firstReceiptUtc = rows[0]?.instante_recebimento_utc ?? null;
    result.lastReceiptUtc = rows.at(-1)?.instante_recebimento_utc ?? null;
    result.items = [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([item, samples]) => {
      const values = samples.map(sample => Number(sample.valor_bruto)).filter(Number.isFinite);
      const times = samples.map(sample => Date.parse(sample.instante_recebimento_utc)).filter(Number.isFinite);
      const gaps = times.slice(1).map((time, index) => (time - times[index]) / 1000);
      return {
        item,
        count: samples.length,
        min: round(minimum(values), 6),
        median: round(median(values), 6),
        max: round(maximum(values), 6),
        medianGapSeconds: round(median(gaps), 3),
        maxGapSeconds: round(maximum(gaps), 3),
        firstReceiptUtc: samples[0]?.instante_recebimento_utc ?? null,
        lastReceiptUtc: samples.at(-1)?.instante_recebimento_utc ?? null,
      };
    });
    const feedTime = rows.filter(row => row.item === "TIME_000001");
    result.feedClockFirst = feedTime[0]?.valor_bruto ?? null;
    result.feedClockLast = feedTime.at(-1)?.valor_bruto ?? null;
    const candidateBaseMs = Date.parse("2026-01-01T00:00:00Z");
    const feedClockReceiptOffsetsSeconds = feedTime.map(row =>
      (candidateBaseMs + Number(row.valor_bruto) - 86400000 - Date.parse(row.instante_recebimento_utc)) / 1000
    ).filter(Number.isFinite);
    result.feedClockCandidateAfterSubtractingOneDay = {
      firstUtc: feedTime[0] ? new Date(candidateBaseMs + Number(feedTime[0].valor_bruto) - 86400000).toISOString() : null,
      lastUtc: feedTime.at(-1) ? new Date(candidateBaseMs + Number(feedTime.at(-1).valor_bruto) - 86400000).toISOString() : null,
      medianOffsetFromReceiptSeconds: round(median(feedClockReceiptOffsetsSeconds), 3),
      minOffsetFromReceiptSeconds: round(minimum(feedClockReceiptOffsetsSeconds), 3),
      maxOffsetFromReceiptSeconds: round(maximum(feedClockReceiptOffsetsSeconds), 3),
    };
  } else {
    const timestamps = rows.map(row => Date.parse(row.instante_recebimento_utc)).filter(Number.isFinite);
    const positions = rows.map(row => ({
      t: row.instante_recebimento_utc,
      lat: Number(row.latitude_deg),
      lon: Number(row.longitude_deg),
    })).filter(point => Number.isFinite(point.lat) && Number.isFinite(point.lon));
    const inSaa = point => point.lat >= -43 && point.lat <= -5 && point.lon >= -70 && point.lon <= -15;
    const passes = [];
    let active = null;
    for (const point of positions) {
      if (inSaa(point)) {
        if (!active) active = { firstUtc: point.t, lastUtc: point.t, records: 0 };
        active.lastUtc = point.t;
        active.records++;
      } else if (active) {
        passes.push(active);
        active = null;
      }
    }
    if (active) passes.push(active);
    result.firstReceiptUtc = timestamps.length ? new Date(minimum(timestamps)).toISOString() : null;
    result.lastReceiptUtc = timestamps.length ? new Date(maximum(timestamps)).toISOString() : null;
    result.positionRowsInSaaBox = positions.filter(inSaa).length;
    result.saaPasses = passes;
  }

  return result;
}

const reports = files.map(inspect);
process.stdout.write(`${JSON.stringify(reports, null, 2)}\n`);
