/**
 * Generates scripts/seed-data/blogs.json from DUMMY_BLOGS (single source of truth).
 *
 *   npx tsx scripts/generate-seed-json.ts
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { DUMMY_BLOGS } from "../src/components/blog/dummyPosts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "seed-data");
const outFile = join(outDir, "blogs.json");

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const rows = DUMMY_BLOGS.map((b) => ({
  title: b.title,
  slug: b.slug,
  content: b.content,
  meta_title: b.meta_title,
  meta_description: b.meta_description,
  featured_image: b.featured_image,
  tags: b.tags,
  category: b.category,
  published: true,
}));

writeFileSync(outFile, JSON.stringify(rows, null, 2), "utf8");
console.log(`Wrote ${rows.length} blog rows to ${outFile}`);
