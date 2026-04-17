#!/usr/bin/env node
/**
 * Extracts product rows from supabase/seed.sql into scripts/seed-data/products.json
 *
 *   node scripts/extract-products-json.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const sqlPath = join(root, "supabase/seed.sql");
const outDir = join(root, "scripts/seed-data");
const outPath = join(outDir, "products.json");

const sql = readFileSync(sqlPath, "utf8");

const block = sql.match(
  /insert into public\.products\s*\([^)]+\)\s*values\s*([\s\S]*?)\s*on conflict \(slug\) do nothing;/i,
);
if (!block) {
  console.error("Could not find products INSERT block (expected ... values ... on conflict (slug) do nothing;)");
  process.exit(1);
}

const body = block[1].trim();

const rowStrings = [];
let depth = 0;
let start = -1;
for (let i = 0; i < body.length; i++) {
  const c = body[i];
  if (c === "(" && depth === 0) {
    start = i;
    depth = 1;
    continue;
  }
  if (start >= 0) {
    if (c === "(") depth++;
    else if (c === ")") {
      depth--;
      if (depth === 0) {
        rowStrings.push(body.slice(start + 1, i));
        start = -1;
      }
    }
  }
}

/** Index of `{` that opens the page_content JSON (after `, '` with optional newlines). */
function findJsonbOpenBraceIndex(row) {
  let braceIdx = -1;
  for (const m of row.matchAll(/,\s*'\s*\{/g)) braceIdx = m.index + m[0].length - 1;
  return braceIdx;
}

function extractJsonbPayload(row) {
  const empty = row.match(/,\s*'\{\}'::jsonb\s*$/);
  if (empty) {
    return { page_content: {}, rest: row.slice(0, empty.index).trim() };
  }
  const openBraceIdx = findJsonbOpenBraceIndex(row);
  if (openBraceIdx === -1) throw new Error("No jsonb field");
  const tail = row.slice(openBraceIdx);
  let d = 0;
  let j = 0;
  for (; j < tail.length; j++) {
    if (tail[j] === "{") d++;
    else if (tail[j] === "}") {
      d--;
      if (d === 0) {
        let jsonStr = tail.slice(0, j + 1);
        jsonStr = jsonStr.replace(/''/g, "'");
        const page_content = JSON.parse(jsonStr);
        const rest = row
          .slice(0, openBraceIdx)
          .replace(/,\s*'\s*$/s, "")
          .trim();
        return { page_content, rest };
      }
    }
  }
  throw new Error("Unbalanced braces in jsonb");
}

const products = [];
for (const raw of rowStrings) {
  const s = raw.trim();
  let rest;
  let page_content;
  try {
    const r = extractJsonbPayload(s);
    rest = r.rest;
    page_content = r.page_content;
  } catch (e) {
    console.error("Row parse error:", e.message);
    console.error(s.slice(0, 200));
    process.exit(1);
  }

  let i = 0;
  const parts = [];
  for (let n = 0; n < 6; n++) {
    while (i < rest.length && rest[i] !== "'") i++;
    if (i >= rest.length) {
      console.error("Expected 6 quoted SQL fields before featured/order");
      process.exit(1);
    }
    i++;
    let field = "";
    while (i < rest.length) {
      if (rest[i] === "'" && rest[i + 1] === "'") {
        field += "'";
        i += 2;
        continue;
      }
      if (rest[i] === "'") {
        i++;
        break;
      }
      field += rest[i];
      i++;
    }
    parts.push(field);
    while (i < rest.length && /[\s,]/.test(rest[i])) i++;
  }
  const tail = rest.slice(i).trim();
  const tm = tail.match(/^(true|false)\s*,\s*(\d+)\s*,?\s*$/);
  if (!tm) {
    console.error("Bad featured/order tail:", JSON.stringify(tail));
    process.exit(1);
  }
  const [name, slug, description, category, status, icon] = parts;
  products.push({
    name,
    slug,
    description,
    category,
    status,
    icon,
    featured: tm[1] === "true",
    featured_order: parseInt(tm[2], 10) || 0,
    logo_url: null,
    page_content,
  });
}

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, JSON.stringify(products, null, 2), "utf8");
console.log(`Wrote ${products.length} products to ${outPath}`);
