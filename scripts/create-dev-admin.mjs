#!/usr/bin/env node
/**
 * Creates the default development admin in Supabase Auth (email + password).
 *
 *   npm run seed:admin
 *
 * Needs real Supabase URL + service_role in .env.local, OR set them in the shell
 * (shell wins over placeholder lines in the file).
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const DEV_EMAIL = process.env.DEV_ADMIN_EMAIL?.trim() || "admin@gmail.com";
const DEV_PASSWORD = process.env.DEV_ADMIN_PASSWORD?.trim() || "";

if (!DEV_PASSWORD) {
  console.error("");
  console.error("seed:admin requires a password now (to avoid committing a known default).");
  console.error("");
  console.error("Set an env var and re-run:");
  console.error("  DEV_ADMIN_PASSWORD='your-strong-password' npm run seed:admin");
  console.error("Optional:");
  console.error("  DEV_ADMIN_EMAIL='admin@gmail.com' DEV_ADMIN_PASSWORD='...' npm run seed:admin");
  console.error("");
  process.exit(1);
}

function isPlaceholder(val) {
  if (val == null || String(val).trim() === "") return true;
  const s = String(val).trim();
  if (s.includes("YOUR_")) return true;
  if (/placeholder/i.test(s)) return true;
  return false;
}

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

function pickUrlAndServiceKey() {
  const fromEnv = {};
  const a = parseEnvFile(resolve(root, ".env"));
  const b = parseEnvFile(resolve(root, ".env.local"));
  Object.assign(fromEnv, a, b);

  const keys = ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"];

  const merged = {};
  for (const k of keys) {
    const shell = process.env[k];
    const file = fromEnv[k];
    // Prefer shell when it looks real; otherwise use file when it looks real
    if (!isPlaceholder(shell)) merged[k] = shell.trim();
    else if (!isPlaceholder(file)) merged[k] = String(file).trim();
    else merged[k] = (shell || file || "").trim();
  }

  return { url: merged.NEXT_PUBLIC_SUPABASE_URL, serviceKey: merged.SUPABASE_SERVICE_ROLE_KEY };
}

const { url, serviceKey } = pickUrlAndServiceKey();

const u = String(url ?? "").trim().replace(/\/$/, "");
const urlBad =
  !u ||
  isPlaceholder(u) ||
  !u.startsWith("https://") ||
  !u.includes(".supabase.co");

function isValidElevatedKey(k) {
  if (!k || isPlaceholder(k)) return false;
  if (k.startsWith("sb_secret_")) return k.length >= 20;
  if (k.startsWith("eyJ")) return k.length >= 100;
  return k.length >= 80;
}

const keyBad = !isValidElevatedKey(serviceKey);

if (urlBad || keyBad) {
  console.error("");
  console.error("seed:admin needs your real Supabase Project URL and elevated key.");
  console.error("");
  console.error("  Open: https://supabase.com/dashboard → Settings → API Keys");
  console.error("  Copy Project URL → NEXT_PUBLIC_SUPABASE_URL");
  console.error("  Copy Secret key (sb_secret_...) or legacy service_role JWT → SUPABASE_SERVICE_ROLE_KEY");
  console.error("");
  if (urlBad) {
    console.error("  Problem: NEXT_PUBLIC_SUPABASE_URL is missing or still a template (must be https://xxxx.supabase.co).");
  }
  if (keyBad) {
    console.error("  Problem: SUPABASE_SERVICE_ROLE_KEY is missing or invalid (use Secret sb_secret_... or legacy service_role JWT).");
  }
  console.error("");
  console.error("  Edit intelligence-tech-web/.env.local and replace the placeholder lines, then run npm run seed:admin again.");
  console.error("  Or export both vars in your shell and run npm run seed:admin (shell values override placeholders in the file).");
  console.error("");
  process.exit(1);
}

const admin = createClient(u, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { data, error } = await admin.auth.admin.createUser({
  email: DEV_EMAIL,
  password: DEV_PASSWORD,
  email_confirm: true,
});

if (error) {
  if (
    error.message?.includes("already been registered") ||
    error.code === "email_exists" ||
    error.message?.includes("already registered")
  ) {
    console.log(`User ${DEV_EMAIL} already exists — sign in to the admin app with that email/password.`);
    process.exit(0);
  }
  console.error(error.message);
  process.exit(1);
}

console.log(`Created admin user: ${data.user?.email}`);
console.log(`Ensure INTELTECH_ADMIN_EMAILS in .env.local includes: ${DEV_EMAIL}`);
