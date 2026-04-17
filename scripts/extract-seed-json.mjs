#!/usr/bin/env node
/**
 * One-off helper: extracts site_content JSON blobs from supabase/seed.sql
 * into scripts/seed-data/site-content.json (array of { key, value }).
 *
 *   node scripts/extract-seed-json.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const sqlPath = join(root, "supabase/seed.sql");
const outDir = join(root, "scripts/seed-data");
const outPath = join(outDir, "site-content.json");

const sql = readFileSync(sqlPath, "utf8");

const keys = ["hero", "about", "nav_links", "footer", "contact_info", "privacy_policy"];
const out = [];

for (const key of keys) {
  const re = new RegExp(
    `\\('${key}',\\s*'([\\s\\S]*?)'::jsonb`,
    "m",
  );
  const m = sql.match(re);
  if (!m) {
    console.error(`Could not extract key: ${key}`);
    process.exit(1);
  }
  let jsonStr = m[1];
  jsonStr = jsonStr.replace(/''/g, "'");
  try {
    out.push({ key, value: JSON.parse(jsonStr) });
  } catch (e) {
    console.error(`JSON parse failed for ${key}:`, e.message);
    process.exit(1);
  }
}

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, JSON.stringify(out, null, 2), "utf8");
console.log(`Wrote ${out.length} site_content rows to ${outPath}`);
