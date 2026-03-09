#!/usr/bin/env node

/**
 * Download all Webflow assets to public/assets/
 *
 * Usage: node scripts/download-assets.mjs [--dry-run] [--filter=svg,png]
 *
 * Reads from public/assets/manifest.json and downloads each file.
 * Organizes into subdirectories based on file type:
 *   - icons/     → SVG files
 *   - images/    → PNG, JPG, JPEG, WebP, GIF
 *   - lottie/    → JSON (Lottie animations)
 *   - docs/      → PDF
 */

import { readFileSync, mkdirSync, existsSync, writeFileSync } from "fs";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");
const ASSETS_DIR = join(ROOT, "public", "assets");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const filterArg = args.find((a) => a.startsWith("--filter="));
const allowedExts = filterArg
  ? filterArg.split("=")[1].split(",").map((e) => `.${e}`)
  : null;

function getSubdir(filename) {
  const ext = extname(filename).toLowerCase();
  if (ext === ".svg") return "icons";
  if ([".png", ".jpg", ".jpeg", ".webp", ".gif"].includes(ext)) return "images";
  if (ext === ".json") return "lottie";
  if (ext === ".pdf") return "docs";
  return "other";
}

async function downloadFile(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  writeFileSync(destPath, buffer);
  return buffer.length;
}

async function main() {
  const manifestPath = join(ASSETS_DIR, "manifest.json");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));

  console.log(`Found ${manifest.length} assets in manifest`);
  if (dryRun) console.log("DRY RUN — no files will be downloaded\n");

  // Create subdirectories
  for (const dir of ["icons", "images", "lottie", "docs", "other"]) {
    const p = join(ASSETS_DIR, dir);
    if (!existsSync(p)) mkdirSync(p, { recursive: true });
  }

  let downloaded = 0;
  let skipped = 0;
  let errors = 0;
  const CONCURRENCY = 10;

  // Filter assets
  const assets = allowedExts
    ? manifest.filter((a) => allowedExts.includes(extname(a.name).toLowerCase()))
    : manifest;

  console.log(`Downloading ${assets.length} assets (concurrency: ${CONCURRENCY})...\n`);

  // Process in batches
  for (let i = 0; i < assets.length; i += CONCURRENCY) {
    const batch = assets.slice(i, i + CONCURRENCY);
    const results = await Promise.allSettled(
      batch.map(async (asset) => {
        const subdir = getSubdir(asset.name);
        const destPath = join(ASSETS_DIR, subdir, asset.name);

        if (existsSync(destPath)) {
          skipped++;
          return;
        }

        if (dryRun) {
          console.log(`  [DRY] ${subdir}/${asset.name}`);
          return;
        }

        try {
          const size = await downloadFile(asset.url, destPath);
          downloaded++;
          if (downloaded % 50 === 0) {
            console.log(`  Downloaded ${downloaded}/${assets.length}...`);
          }
        } catch (err) {
          errors++;
          console.error(`  ERROR: ${asset.name} — ${err.message}`);
        }
      })
    );
  }

  console.log(`\nDone!`);
  console.log(`  Downloaded: ${downloaded}`);
  console.log(`  Skipped (exists): ${skipped}`);
  console.log(`  Errors: ${errors}`);
}

main().catch(console.error);
