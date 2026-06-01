#!/usr/bin/env node
/**
 * Image optimisation script — elias-nijs.be
 *
 * Setup (once):   npm install
 * Run:            npm run optimise-images
 *
 * For every .jpg / .jpeg / .png / .webp found under assets/:
 *   - generates a .avif version  (quality 60 — great compression, modern browsers)
 *   - generates a .webp version  (quality 82 — fallback for older browsers)
 *
 * Files are skipped if the output already exists AND is newer than the source.
 * SVGs are ignored — they're already optimal as vectors.
 */

import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT       = join(dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS_DIR = join(ROOT, "assets");
const RASTER_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function findImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...await findImages(full));
    } else if (RASTER_EXT.has(extname(entry.name).toLowerCase())) {
      results.push(full);
    }
  }
  return results;
}

async function needsUpdate(src, dest) {
  try {
    const [s, d] = await Promise.all([stat(src), stat(dest)]);
    return s.mtimeMs > d.mtimeMs;
  } catch {
    return true; // dest does not exist yet
  }
}

async function processImage(srcPath) {
  const ext  = extname(srcPath).toLowerCase();
  const base = srcPath.slice(0, -ext.length);
  const rel  = srcPath.replace(ROOT + "/", "");

  const targets = [
    { outExt: ".avif", format: "avif", opts: { quality: 60 } },
    { outExt: ".webp", format: "webp", opts: { quality: 82 } },
  ].filter(t => t.outExt !== ext); // skip if source already in that format

  console.log(rel);
  for (const { outExt, format, opts } of targets) {
    const dest = base + outExt;
    if (!(await needsUpdate(srcPath, dest))) {
      console.log(`  skip   ${dest.replace(ROOT + "/", "")} (up to date)`);
      continue;
    }
    await sharp(srcPath)[format](opts).toFile(dest);
    console.log(`  wrote  ${dest.replace(ROOT + "/", "")}`);
  }
}

const images = await findImages(ASSETS_DIR);
console.log(`Found ${images.length} raster image(s) under assets/\n`);
for (const img of images) await processImage(img);
console.log("\nDone.");
