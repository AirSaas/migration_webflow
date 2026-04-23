#!/usr/bin/env node
/**
 * Download every image referenced in docs/live-captures/{type}/{slug}.json
 * to public/assets/pages/{type}/{slug}/.
 *
 * Rewrites each capture JSON so every image gets a `localPath` field pointing
 * to the saved file (relative to the public/ root, so pages can reference
 * `/assets/pages/{type}/{slug}/{file}` directly).
 *
 * Usage:
 *   node scripts/download-page-images.mjs            # all captures present
 *   node scripts/download-page-images.mjs produit    # one type
 *   node scripts/download-page-images.mjs produit/budget  # one page
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import { extname, basename } from "node:path";
import { createHash } from "node:crypto";

const ROOT = process.cwd();
const CAPTURE_DIR = `${ROOT}/docs/live-captures`;
const OUT_ROOT = `${ROOT}/public/assets/pages`;

function filenameFromUrl(url) {
  try {
    const u = new URL(url);
    const raw = decodeURIComponent(basename(u.pathname)) || "image";
    // Strip querystring hash if name has none
    let name = raw.replace(/[^a-zA-Z0-9._-]/g, "-");
    if (!extname(name)) {
      const hash = createHash("md5").update(url).digest("hex").slice(0, 6);
      name = `${name}-${hash}.bin`;
    }
    return name;
  } catch {
    return `img-${createHash("md5").update(url).digest("hex").slice(0, 8)}.bin`;
  }
}

async function fetchBuffer(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (migration bot)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function downloadOne(url, destDir) {
  const fname = filenameFromUrl(url);
  const destPath = `${destDir}/${fname}`;
  if (existsSync(destPath) && statSync(destPath).size > 0) {
    return { fname, skipped: true };
  }
  const buf = await fetchBuffer(url);
  await writeFile(destPath, buf);
  return { fname, bytes: buf.length };
}

async function processCapture(type, slug) {
  const capPath = `${CAPTURE_DIR}/${type}/${slug}.json`;
  if (!existsSync(capPath)) {
    console.warn(`⚠️  ${type}/${slug}: no capture at ${capPath}`);
    return { ok: false, type, slug };
  }
  const cap = JSON.parse(await readFile(capPath, "utf8"));
  const destDir = `${OUT_ROOT}/${type}/${slug}`;
  await mkdir(destDir, { recursive: true });

  const unique = new Map();
  for (const img of cap.images) {
    if (!unique.has(img.src)) unique.set(img.src, img);
  }

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;
  const imagesOut = [];

  for (const [src, img] of unique) {
    try {
      const r = await downloadOne(src, destDir);
      if (r.skipped) skipped++;
      else downloaded++;
      imagesOut.push({
        ...img,
        localPath: `/assets/pages/${type}/${slug}/${r.fname}`,
      });
    } catch (e) {
      failed++;
      imagesOut.push({ ...img, localPath: null, error: e.message });
    }
  }

  cap.images = imagesOut;
  await writeFile(capPath, JSON.stringify(cap, null, 2));

  console.log(
    `✅ ${type}/${slug}  (${downloaded} new, ${skipped} cached, ${failed} failed)`,
  );
  return { ok: true, type, slug, downloaded, skipped, failed };
}

function listCaptures() {
  const { readdirSync } = require("node:fs");
  // Not available in ESM; use sync import workaround
}

async function main() {
  const { readdir } = await import("node:fs/promises");
  const arg = process.argv[2];
  const types = await readdir(CAPTURE_DIR).catch(() => []);
  const targets = [];
  for (const type of types) {
    const typePath = `${CAPTURE_DIR}/${type}`;
    const files = await readdir(typePath);
    for (const f of files) {
      if (!f.endsWith(".json")) continue;
      const slug = f.replace(/\.json$/, "");
      if (!arg) targets.push({ type, slug });
      else if (arg.includes("/")) {
        const [t, s] = arg.split("/");
        if (t === type && s === slug) targets.push({ type, slug });
      } else if (arg === type) targets.push({ type, slug });
    }
  }

  if (targets.length === 0) {
    console.error(`No capture matched filter: ${arg ?? "(all)"}`);
    process.exit(1);
  }

  console.log(`Downloading images for ${targets.length} capture(s)…`);
  let totalOk = 0;
  let totalKo = 0;
  for (const { type, slug } of targets) {
    const r = await processCapture(type, slug);
    if (r.ok) totalOk++;
    else totalKo++;
  }
  console.log(`\nDone. ${totalOk} ok, ${totalKo} failed.`);
  if (totalKo > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
