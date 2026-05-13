#!/usr/bin/env tsx
/**
 * Blog migration pipeline — CLI entry.
 *
 * Usage :
 *   npm run blog:migrate                                  # all 62 articles
 *   npm run blog:migrate -- --slugs=metier-pmo,pi-planning
 *   npm run blog:migrate -- --dry-run                     # no file writes
 *   npm run blog:migrate -- --limit=3                     # first N articles
 *
 * Env :
 *   LLM_COST_CAP_USD=100        # hard stop on cumulative spend
 *   REBUILD_BASE=...            # dev server URL (default localhost:3000)
 *
 * Pre-req : Next.js dev server running (npm run dev) — the renderer agent
 * hits localhost:3000 for each article. The pipeline does NOT start the
 * dev server itself; do it in a separate terminal.
 */

import { loadEnv } from "./utils/env.js";
import { listAllBlogSlugs } from "./utils/supabase.js";
import { runArticle, type ArticleResult, costSummary } from "./state.js";
import { closeBrowser } from "./agents/06-renderer.js";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { PATHS } from "./config.js";

loadEnv();

function parseArgs(argv: string[]) {
  const a = { slugs: null as string[] | null, dryRun: false, limit: 0 };
  for (const arg of argv.slice(2)) {
    if (arg === "--dry-run") a.dryRun = true;
    else if (arg.startsWith("--slugs=")) a.slugs = arg.slice("--slugs=".length).split(",").map((s) => s.trim()).filter(Boolean);
    else if (arg.startsWith("--limit=")) a.limit = parseInt(arg.slice("--limit=".length), 10);
  }
  return a;
}

async function pickSlugs(args: ReturnType<typeof parseArgs>): Promise<string[]> {
  if (args.slugs && args.slugs.length > 0) return args.slugs;
  const all = await listAllBlogSlugs();
  if (args.limit > 0) return all.slice(0, args.limit);
  return all;
}

function writeSummary(results: ArticleResult[]): void {
  const lines: string[] = [];
  lines.push("# Blog migration v8 — run summary");
  lines.push("");
  lines.push(`Generated : ${new Date().toISOString()}`);
  lines.push("");
  const pass = results.filter((r) => r.status === "pass").length;
  const dsGap = results.filter((r) => r.status === "escalated-ds-gap").length;
  const review = results.filter((r) => r.status === "escalated-review").length;
  const errs = results.filter((r) => r.status === "error").length;
  const capped = results.filter((r) => r.status === "cost-cap").length;
  const totalCost = results.reduce((s, r) => s + r.costUsd, 0);
  lines.push(`- Articles processed : ${results.length}`);
  lines.push(`- ✅ PASS : ${pass}`);
  lines.push(`- ⏭ DS-gap escalation : ${dsGap}`);
  lines.push(`- 🛑 Manual review : ${review}`);
  lines.push(`- ⚠️ Error : ${errs}`);
  lines.push(`- 💰 Cost cap : ${capped}`);
  lines.push(`- Total cost : $${totalCost.toFixed(3)}`);
  lines.push("");
  lines.push("## Per article");
  lines.push("");
  lines.push("| Slug | Status | Attempts | Cost | Report |");
  lines.push("|---|---|---|---|---|");
  for (const r of results) {
    lines.push(
      `| \`${r.slug}\` | ${r.status} | ${r.attempts} | $${r.costUsd.toFixed(3)} | ${r.reportPath ? `[link](${r.reportPath})` : "—"} |`,
    );
  }
  mkdirSync(PATHS.migrationDir, { recursive: true });
  writeFileSync(join(PATHS.migrationDir, "_summary.md"), lines.join("\n"));
  writeFileSync(
    join(PATHS.migrationDir, "_summary.json"),
    JSON.stringify({ generatedAt: new Date().toISOString(), totalCost, results }, null, 2),
  );
}

async function main() {
  const args = parseArgs(process.argv);
  const slugs = await pickSlugs(args);

  console.log(`[pipeline] starting — ${slugs.length} article(s)${args.dryRun ? " (DRY-RUN)" : ""}`);
  if (args.dryRun) {
    console.log("Slugs :", slugs.join(", "));
    return;
  }

  const results: ArticleResult[] = [];
  for (const [i, slug] of slugs.entries()) {
    console.log(`\n── [${i + 1}/${slugs.length}] ${slug} ──`);
    const result = await runArticle(slug);
    results.push(result);
    console.log(`→ ${result.status}  attempts=${result.attempts}  $${result.costUsd.toFixed(3)}`);
    console.log(`   [${costSummary()}]`);
    writeSummary(results); // write incremental — survives crash mid-run
    if (result.status === "cost-cap") {
      console.error("Cost cap reached — stopping");
      break;
    }
  }

  await closeBrowser();
  writeSummary(results);
  console.log(`\n[pipeline] done — ${costSummary()}`);
}

main().catch((e) => {
  console.error("Pipeline fatal error:", e);
  process.exit(1);
});
