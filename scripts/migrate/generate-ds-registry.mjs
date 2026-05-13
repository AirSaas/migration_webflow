#!/usr/bin/env node
/**
 * generate-ds-registry.mjs
 *
 * Parse docs/ds-components-reference.md → docs/raw/ds-registry.json.
 * The registry is consumed by the blog migration pipeline (Phase 2) so the
 * DS Conformance Validator and Design Mapper agents can enforce:
 *   - which components exist
 *   - which variants are allowed for each component
 *   - documented limits per prop (assertMaxLength bounds, etc.)
 *
 * The reference doc is itself derived from JSDoc contracts in source files
 * (see scripts/generate-ds-reference.py for the source-of-truth generator).
 * This script does NOT introspect TSX files — it trusts the markdown.
 *
 * Usage : node scripts/migrate/generate-ds-registry.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "../..");

const SRC_PATH = join(REPO_ROOT, "docs/ds-components-reference.md");
const OUT_PATH = join(REPO_ROOT, "docs/raw/ds-registry.json");

/**
 * Markdown layout per component (loose — we tolerate small drift) :
 *
 * ### `<ComponentName>`
 *
 * 📄 [path]
 * 🎨 Figma `node-id ...` (optional)
 *
 * **Purpose** — ...
 * **Use when** — ...
 * **Don't use** — ... (optional)
 *
 * **Limits:**
 * - thing
 * - thing
 *
 * **Forbidden:**  (optional)
 * - thing
 *
 * ---
 */

function parseComponentBlock(block) {
  const nameMatch = block.match(/###\s+`<([A-Za-z0-9]+)>`/);
  if (!nameMatch) return null;
  const name = nameMatch[1];

  const get = (label) => {
    const re = new RegExp(`\\*\\*${label}\\*\\*\\s*[—-]\\s*([\\s\\S]*?)(?=\\n\\*\\*|\\n---|$)`, "i");
    const m = block.match(re);
    return m ? m[1].trim().replace(/\s+/g, " ") : null;
  };
  const getBullets = (label) => {
    const re = new RegExp(`\\*\\*${label}:\\*\\*\\s*\\n([\\s\\S]*?)(?=\\n\\*\\*|\\n---|$)`, "i");
    const m = block.match(re);
    if (!m) return [];
    return m[1]
      .split("\n")
      .map((l) => l.replace(/^\s*-\s*/, "").trim())
      .filter(Boolean);
  };

  const figmaMatch = block.match(/Figma\s+`node-id\s+([0-9:-]+)`/);
  const pathMatch = block.match(/📄\s*\[`([^`]+)`\]/);

  const limits = getBullets("Limits");
  const forbidden = getBullets("Forbidden");

  // Extract variants from limits lines that look like : "variant: 'a' | 'b'..."
  const variants = extractVariants(limits);
  // Extract documented props with max-length / bounds hints.
  const props = extractProps(limits);

  return {
    name,
    sourcePath: pathMatch?.[1] ?? null,
    figmaNodeId: figmaMatch?.[1] ?? null,
    purpose: get("Purpose"),
    useWhen: get("Use when"),
    dontUse: get("Don't use") ?? get("Dont use"),
    limits,
    forbidden,
    variants,
    props,
  };
}

function extractVariants(limits) {
  const variants = {};
  for (const line of limits) {
    // Patterns like : `variant: "a" | "b" | "c"` OR `variant: a | b | c`
    const m = line.match(/^([a-zA-Z][a-zA-Z0-9]*)\s*:\s*(.+)$/);
    if (!m) continue;
    const prop = m[1];
    const rest = m[2];
    const values = [...rest.matchAll(/"([^"]+)"|'([^']+)'|`([^`]+)`/g)].map((mm) => mm[1] ?? mm[2] ?? mm[3]);
    if (values.length >= 2) {
      variants[prop] = values;
    } else {
      // Try unquoted enum like `level: 1 | 2 | 3 | 4`
      const unquoted = rest.split(/\s*\|\s*/).map((s) => s.replace(/[()].*$/, "").trim()).filter(Boolean);
      if (unquoted.length >= 2 && unquoted.every((v) => /^[a-z0-9-]+$/i.test(v))) {
        variants[prop] = unquoted;
      }
    }
  }
  return variants;
}

function extractProps(limits) {
  const props = [];
  for (const line of limits) {
    // Patterns like : `propName: max XX chars` / `max ~N chars` / `2-6 items` / `clamp ...`
    const propMatch = line.match(/^([a-zA-Z][a-zA-Z0-9]*)\s*:\s*(.+)$/);
    if (!propMatch) continue;
    const propName = propMatch[1];
    const rest = propMatch[2];

    const maxCharsMatch = rest.match(/max\s*~?\s*(\d+)\s*chars?/i);
    const minMaxItemsMatch = rest.match(/(\d+)\s*[–-]\s*(\d+)\s+items?/i);
    const clampMatch = rest.match(/clamp\s+([\d.]+)\s*[→-]\s*([\d.]+)\s*(px|rem)/i);

    const constraint = {};
    if (maxCharsMatch) constraint.maxChars = parseInt(maxCharsMatch[1], 10);
    if (minMaxItemsMatch) {
      constraint.minItems = parseInt(minMaxItemsMatch[1], 10);
      constraint.maxItems = parseInt(minMaxItemsMatch[2], 10);
    }
    if (clampMatch) constraint.clamp = { from: clampMatch[1], to: clampMatch[2], unit: clampMatch[3] };

    if (Object.keys(constraint).length > 0) {
      // Don't duplicate variants here — variants live in their own bucket.
      props.push({ name: propName, raw: rest, ...constraint });
    }
  }
  return props;
}

function splitBlocks(md) {
  // Split on lines that are exactly `---`.
  const parts = md.split(/\n---\n/);
  // We only want blocks that contain a component header.
  return parts.filter((p) => /^###\s+`<[A-Z]/m.test(p));
}

function main() {
  if (!existsSync(SRC_PATH)) {
    console.error(`Source not found: ${SRC_PATH}`);
    process.exit(1);
  }
  const md = readFileSync(SRC_PATH, "utf8");
  const blocks = splitBlocks(md);

  const components = [];
  for (const block of blocks) {
    const parsed = parseComponentBlock(block);
    if (parsed) components.push(parsed);
  }

  // Index by name for fast lookup.
  const byName = Object.fromEntries(components.map((c) => [c.name, c]));

  const registry = {
    generatedAt: new Date().toISOString(),
    sourceDoc: "docs/ds-components-reference.md",
    componentCount: components.length,
    componentsByName: byName,
    components: components.map((c) => c.name).sort(),
  };

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(registry, null, 2));

  console.log(`[ds-registry] parsed ${components.length} components`);
  const withVariants = components.filter((c) => Object.keys(c.variants).length > 0);
  console.log(`[ds-registry] components with variant enums : ${withVariants.length}`);
  for (const c of withVariants.slice(0, 10)) {
    const vstr = Object.entries(c.variants)
      .map(([k, v]) => `${k}=[${v.join("|")}]`)
      .join(", ");
    console.log(`  ${c.name}: ${vstr}`);
  }
  console.log(`\n[ds-registry] written → ${OUT_PATH}`);
}

main();
