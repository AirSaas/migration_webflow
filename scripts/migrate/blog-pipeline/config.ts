/**
 * Pipeline-wide configuration.
 *
 * Single source of truth for paths, budgets, model selection, retry policy.
 * Tweak here, not inside agents.
 */
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = join(__dirname, "../../..");

// ─── Models ─────────────────────────────────────────────────────────────────
// Per CLAUDE.md : Opus 4.7 is the latest. Sonnet 4.6 is the workhorse.
export const MODELS = {
  // Extraction (Webflow HTML → typed blocks) — Sonnet is enough.
  extractor: "claude-sonnet-4-6",
  // Design mapping (apply YAML rules to blocks) — Opus for nuance.
  designer: "claude-opus-4-7",
  // Visual audit (screenshot vs Figma) — Opus vision.
  visualAuditor: "claude-opus-4-7",
} as const;

// Anthropic pricing (USD per token, as of 2026) — used by cost-tracker.
export const PRICING = {
  "claude-sonnet-4-6": { input: 3 / 1_000_000, output: 15 / 1_000_000, cacheRead: 0.3 / 1_000_000, cacheWrite: 3.75 / 1_000_000 },
  "claude-opus-4-7": { input: 15 / 1_000_000, output: 75 / 1_000_000, cacheRead: 1.5 / 1_000_000, cacheWrite: 18.75 / 1_000_000 },
} as const;

// ─── Budgets ────────────────────────────────────────────────────────────────
export const BUDGETS = {
  // Hard stop for the entire migration run (overrideable via LLM_COST_CAP_USD).
  totalUsd: Number(process.env.LLM_COST_CAP_USD ?? 100),
  // Soft warning threshold per article.
  perArticleUsd: 2.5,
  // Retries before escalation.
  maxRetriesPerArticle: 5,
  // Sequential — never parallel during migration to respect rate limits.
  concurrency: 1,
} as const;

// ─── Paths ──────────────────────────────────────────────────────────────────
export const PATHS = {
  rulesYaml: join(REPO_ROOT, "docs/blog-design-rules.yaml"),
  dsRegistry: join(REPO_ROOT, "docs/raw/ds-registry.json"),
  figmaDump: join(REPO_ROOT, "docs/raw/figma-dumps/blog-template-303-1015.tsx"),
  // Per-article outputs.
  migrationDir: join(REPO_ROOT, "docs/blog-migration"),
  // Final V3 data file (written when ALL articles pass).
  v3DataFile: join(REPO_ROOT, "src/data/blog-articles-v3.ts"),
  v3ContentJson: join(REPO_ROOT, "docs/raw/blog-articles-v3-content.json"),
  // Per-article in-progress data (committed at end as one).
  v3StagingDir: join(REPO_ROOT, "docs/blog-migration/_staging"),
} as const;

// ─── Webflow ────────────────────────────────────────────────────────────────
export const WEBFLOW = {
  apiToken: process.env.WEBFLOW_API_TOKEN ?? "",
  siteId: "609552290d93fd43ba0f0849",
  // Webflow CMS collection IDs are looked up lazily via the API.
  // Set via env if known to skip discovery: WEBFLOW_BLOG_COLLECTION_ID
  blogCollectionId: process.env.WEBFLOW_BLOG_COLLECTION_ID ?? null,
} as const;

// ─── Supabase ───────────────────────────────────────────────────────────────
// Reusing the existing creds from scripts/migrate/llm-parse-shared.mjs.
export const SUPABASE = {
  url: "https://ydudpmtbnvpxxenbnvab.supabase.co",
  anonKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkdWRwbXRibnZweHhlbmJudmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3ODgzMDEsImV4cCI6MjA4NTM2NDMwMX0.62_iMmq47ZUCLraNvMjW5qhT_hH6pfSfxBZH0y8mMfQ",
  table: "airsaas_pages_rebuild",
} as const;

// ─── Dev server (for visual auditor) ────────────────────────────────────────
export const DEV_SERVER = {
  url: process.env.REBUILD_BASE ?? "http://localhost:3000",
  // Seconds to wait after writing a data file for Next.js HMR to settle.
  hotReloadSettleMs: 2500,
} as const;
