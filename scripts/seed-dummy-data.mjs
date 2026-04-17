#!/usr/bin/env node
/**
 * Pushes demo CMS data into Supabase (blogs, products, site_content) using the
 * service role key — same payloads as supabase/seed.sql.
 *
 * Prerequisites: run supabase/migrations/001_create_tables.sql first.
 *
 *   npm run seed:dummy
 *
 * Needs NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local
 * (same as seed:admin).
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function parseEnvFile(filePath) {
  const out = {};
  if (!existsSync(filePath)) return out;
  let raw = readFileSync(filePath, "utf8");
  if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);
  for (let line of raw.split(/\r?\n/)) {
    line = line.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

function isPlaceholder(val) {
  if (val == null || String(val).trim() === "") return true;
  const s = String(val).trim();
  if (s.includes("YOUR_")) return true;
  if (/placeholder/i.test(s)) return true;
  return false;
}

function pickUrlAndServiceKey() {
  const fromEnv = {};
  Object.assign(fromEnv, parseEnvFile(join(root, ".env")), parseEnvFile(join(root, ".env.local")));
  const keys = ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"];
  const merged = {};
  for (const k of keys) {
    const shell = process.env[k];
    const file = fromEnv[k];
    if (!isPlaceholder(shell)) merged[k] = shell.trim();
    else if (!isPlaceholder(file)) merged[k] = String(file).trim();
    else merged[k] = (shell || file || "").trim();
  }
  return { url: merged.NEXT_PUBLIC_SUPABASE_URL, serviceKey: merged.SUPABASE_SERVICE_ROLE_KEY };
}

function isValidElevatedKey(k) {
  if (!k || isPlaceholder(k)) return false;
  if (k.startsWith("sb_secret_")) return k.length >= 20;
  if (k.startsWith("eyJ")) return k.length >= 100;
  return k.length >= 80;
}

const { url, serviceKey } = pickUrlAndServiceKey();
const u = String(url ?? "").trim().replace(/\/$/, "");
const urlBad =
  !u || isPlaceholder(u) || !u.startsWith("https://") || !u.includes(".supabase.co");
const keyBad = !isValidElevatedKey(serviceKey);

if (urlBad || keyBad) {
  console.error("");
  console.error("seed:dummy needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local");
  console.error("");
  if (urlBad) console.error("  Fix: set a real https://xxxx.supabase.co project URL.");
  if (keyBad) console.error("  Fix: set Secret key (sb_secret_...) or legacy service_role JWT.");
  console.error("");
  process.exit(1);
}

const blogsPath = join(root, "scripts/seed-data/blogs.json");
const productsPath = join(root, "scripts/seed-data/products.json");
const siteContentPath = join(root, "scripts/seed-data/site-content.json");

for (const p of [blogsPath, productsPath, siteContentPath]) {
  if (!existsSync(p)) {
    console.error(`Missing seed file: ${p}`);
    console.error("Run: npm run seed:dummy:generate");
    process.exit(1);
  }
}

const blogs = JSON.parse(readFileSync(blogsPath, "utf8"));
const products = JSON.parse(readFileSync(productsPath, "utf8"));
const siteContent = JSON.parse(readFileSync(siteContentPath, "utf8"));

const supabase = createClient(u, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function main() {
  const { error: bErr } = await supabase.from("blogs").upsert(blogs, {
    onConflict: "slug",
    ignoreDuplicates: false,
  });
  if (bErr) throw new Error(`blogs: ${bErr.message}`);

  const { error: pErr } = await supabase.from("products").upsert(products, {
    onConflict: "slug",
    ignoreDuplicates: false,
  });
  if (pErr) throw new Error(`products: ${pErr.message}`);

  const { error: sErr } = await supabase.from("site_content").upsert(siteContent, {
    onConflict: "key",
    ignoreDuplicates: false,
  });
  if (sErr) throw new Error(`site_content: ${sErr.message}`);

  console.log(`Seeded: ${blogs.length} blogs, ${products.length} products, ${siteContent.length} site_content keys.`);
}

function hintIfMissingTables(msg) {
  if (!msg || typeof msg !== "string") return "";
  if (
    /schema cache|Could not find the table/i.test(msg) ||
    /relation .* does not exist/i.test(msg)
  ) {
    return (
      "\n\n→ Create tables first: Supabase Dashboard → SQL Editor → paste and run\n" +
      "  supabase/migrations/001_create_tables.sql\n" +
      "  Then run npm run seed:dummy again."
    );
  }
  return "";
}

main().catch((e) => {
  const msg = e.message || String(e);
  console.error(msg + hintIfMissingTables(msg));
  process.exit(1);
});
