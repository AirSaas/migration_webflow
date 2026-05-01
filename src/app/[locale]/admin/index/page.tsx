import type { Metadata } from "next";
import Link from "next/link";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { PAGES as LP_PAGES } from "@/data/landings-v2/lp";
import { PAGES as PRODUIT_PAGES } from "@/data/landings-v2/produit";
import { PAGES as SOLUTION_PAGES } from "@/data/landings-v2/solutions";
import { PAGES as EQUIPE_PAGES } from "@/data/landings-v2/equipes";
import { ACTIVE_BLOG_ARTICLES_V2 } from "@/data/blog-articles-v2";
import { LEGAL_PAGES } from "@/data/legal-pages";
import { MARKETING_STUBS } from "@/data/marketing-stubs";

/**
 * QA index — clickable list of every rebuild route grouped by type.
 *
 * Used for manual review : open in browser, click each link, verify rendering.
 * Status badges (PASS / WARN / BLOCK) come from the latest qa-llm.json.
 */

export const metadata: Metadata = {
  title: "QA Index — toutes les pages",
  description: "Liste cliquable de toutes les pages du rebuild pour review manuel.",
  robots: { index: false, follow: false },
};

type LlmIssue = {
  severity: "P0" | "P1" | "P2";
  type?: string;
  location?: string;
  description?: string;
};
type LlmRow = { slug: string; type: string; issues?: LlmIssue[] };

function loadLlmData(): Map<string, LlmRow> {
  const path = join(process.cwd(), "docs/raw/qa-llm.json");
  if (!existsSync(path)) return new Map();
  try {
    const arr: LlmRow[] = JSON.parse(readFileSync(path, "utf8"));
    return new Map(arr.map((r) => [`${r.type}/${r.slug}`, r]));
  } catch {
    return new Map();
  }
}

type DesignerGateEntry = {
  type: string;
  slug: string;
  verdict: string;
  verifyFlags: number;
  fabricatedSamples: string[];
  rebuildHref: string;
  liveHref: string;
};

function liveUrlFor(type: string, slug: string): string {
  const base = "https://www.airsaas.io";
  if (type === "lp") return `${base}/fr/lp/${slug}`;
  if (type === "produit") return `${base}/fr/produit/${slug}`;
  if (type === "solution") return `${base}/fr/solution/${slug}`;
  if (type === "equipe") return `${base}/fr/equipes/${slug}`;
  if (type === "blog") return `${base}/fr/gestion-de-projet/${slug}`;
  return base;
}

function rebuildHrefFor(type: string, slug: string): string {
  if (type === "lp") return `/fr/lp/${slug}`;
  if (type === "produit") return `/fr/produit/${slug}`;
  if (type === "solution") return `/fr/solutions/${slug}`;
  if (type === "equipe") return `/fr/equipes/${slug}`;
  if (type === "blog") return `/fr/blog/${slug}`;
  return `/fr/${slug}`;
}

function loadDesignerGate(): DesignerGateEntry[] {
  const verifyDir = join(process.cwd(), "docs/raw/llm-verify");
  const auditDir = join(process.cwd(), "docs/raw/llm-audit");
  if (!existsSync(verifyDir) || !existsSync(auditDir)) return [];

  const fs = require("node:fs") as typeof import("node:fs");
  const verifyFiles = fs.readdirSync(verifyDir).filter((f) => f.endsWith(".json"));
  const entries: DesignerGateEntry[] = [];

  for (const f of verifyFiles) {
    try {
      const verify = JSON.parse(fs.readFileSync(join(verifyDir, f), "utf8"));
      const auditPath = join(auditDir, f);
      const audit = existsSync(auditPath)
        ? JSON.parse(fs.readFileSync(auditPath, "utf8"))
        : null;
      const verdict = audit?.audit?.globalVerdict || "—";
      const verifyFlags = verify.flagsCount || 0;
      // Flagged only if verify caught something OR audit non-FAITHFUL
      if (verifyFlags === 0 && verdict === "FAITHFUL") continue;
      const fabricatedSamples = (verify.flags || [])
        .slice(0, 3)
        .map((flag: { type: string; sample: string }) => `[${flag.type}] ${flag.sample.slice(0, 80)}`);
      entries.push({
        type: verify.type,
        slug: verify.slug,
        verdict,
        verifyFlags,
        fabricatedSamples,
        rebuildHref: rebuildHrefFor(verify.type, verify.slug),
        liveHref: liveUrlFor(verify.type, verify.slug),
      });
    } catch {
      // ignore malformed
    }
  }
  return entries.sort((a, b) => b.verifyFlags - a.verifyFlags);
}

// Status tiers reflect REAL severity for human review:
// - PASS  : 0 P0, 0-1 P1 (clean or minor polish only)
// - WARN  : 0 P0, 2-3 P1 (a few visible polish issues)
// - HEAVY : 0 P0, ≥4 P1 (lots of visible issues — almost as bad as BLOCK)
// - BLOCK : ≥1 P0 (broken sections, missing content, placeholder leaks)
type Status = "PASS" | "WARN" | "HEAVY" | "BLOCK" | "—";

function statusFor(row: LlmRow | undefined): Status {
  if (!row) return "—";
  const issues = row.issues || [];
  const p0 = issues.filter((i) => i.severity === "P0").length;
  const p1 = issues.filter((i) => i.severity === "P1").length;
  if (p0 > 0) return "BLOCK";
  if (p1 >= 4) return "HEAVY";
  if (p1 > 1) return "WARN";
  return "PASS";
}

function counts(row: LlmRow | undefined) {
  const issues = row?.issues || [];
  return {
    p0: issues.filter((i) => i.severity === "P0").length,
    p1: issues.filter((i) => i.severity === "P1").length,
    p2: issues.filter((i) => i.severity === "P2").length,
  };
}

// Status badge color tokens — DS semantic colors only.
const STATUS_STYLES: Record<Status, string> = {
  PASS: "bg-success-10 text-success",
  WARN: "bg-prevention-20 text-terracotta",
  HEAVY: "bg-prevention-30 text-terracotta",
  BLOCK: "bg-warning-10 text-warning",
  "—": "bg-secondary-5 text-text-muted",
};

const llmData = loadLlmData();

function renderRow(
  type: string,
  slug: string,
  href: string,
  title: string,
): React.ReactNode {
  const row = llmData.get(`${type}/${slug}`);
  const status = statusFor(row);
  const c = counts(row);
  const issues = row?.issues || [];
  // Sort P0 first, then P1, then P2 ; show all so the user has the full picture.
  const sorted = [...issues].sort((a, b) =>
    a.severity === b.severity ? 0 : a.severity === "P0" ? -1 : b.severity === "P0" ? 1 : a.severity === "P1" ? -1 : 1,
  );
  const issueCountLabel =
    c.p0 + c.p1 + c.p2 === 0 ? "—" : `P0×${c.p0} P1×${c.p1} P2×${c.p2}`;
  return (
    <li
      key={`${type}-${slug}`}
      className="flex flex-col gap-[0.5rem] py-[0.5rem] border-b border-border last:border-b-0"
    >
      <div className="flex items-center gap-[0.75rem]">
        <span
          className={`inline-block min-w-[4.5rem] text-center text-xs font-mono font-semibold px-[0.5rem] py-[0.125rem] rounded ${STATUS_STYLES[status]}`}
        >
          {status}
        </span>
        <span className="inline-block min-w-[8rem] text-xs font-mono text-text-muted">
          {issueCountLabel}
        </span>
        <Link
          href={href}
          className="text-primary hover:underline flex-1 truncate"
          target="_blank"
        >
          {title}
        </Link>
        <code className="text-xs text-text-muted font-mono">{href}</code>
      </div>
      {sorted.length > 0 ? (
        <details className="ml-[12rem]">
          <summary className="cursor-pointer text-xs text-text-muted hover:text-foreground">
            {sorted.length} issue{sorted.length > 1 ? "s" : ""} — voir détails
          </summary>
          <ul className="mt-[0.5rem] flex flex-col gap-[0.5rem] pl-[1rem] border-l-2 border-border">
            {sorted.slice(0, 8).map((iss, i) => (
              <li key={i} className="text-xs text-foreground">
                <span
                  className={`inline-block min-w-[2rem] text-center font-mono font-semibold px-[0.25rem] mr-[0.5rem] rounded ${
                    iss.severity === "P0"
                      ? "bg-warning-10 text-warning"
                      : iss.severity === "P1"
                        ? "bg-prevention-20 text-terracotta"
                        : "bg-secondary-5 text-text-muted"
                  }`}
                >
                  {iss.severity}
                </span>
                {iss.location ? (
                  <strong className="text-text-secondary">
                    {iss.location} —{" "}
                  </strong>
                ) : null}
                <span className="text-text-p">{iss.description}</span>
              </li>
            ))}
            {sorted.length > 8 ? (
              <li className="text-xs text-text-muted italic">
                … +{sorted.length - 8} autres issues
              </li>
            ) : null}
          </ul>
        </details>
      ) : null}
    </li>
  );
}

function CountBadge({ pass, warn, heavy, block, total }: {
  pass: number;
  warn: number;
  heavy: number;
  block: number;
  total: number;
}) {
  return (
    <span className="text-sm text-text-muted font-mono">
      {total} pages · ✅ {pass} · ⚠️ {warn} · ⚠️⚠️ {heavy} · 🛑 {block}
    </span>
  );
}

function tally(items: { type: string; slug: string }[]) {
  let pass = 0, warn = 0, heavy = 0, block = 0;
  for (const it of items) {
    const s = statusFor(llmData.get(`${it.type}/${it.slug}`));
    if (s === "PASS") pass++;
    else if (s === "WARN") warn++;
    else if (s === "HEAVY") heavy++;
    else if (s === "BLOCK") block++;
  }
  return { pass, warn, heavy, block, total: items.length };
}

export default function AdminIndexRoute() {
  const lpItems = LP_PAGES.map((p) => ({ type: "lp", slug: p.slug, title: p.meta.title, href: `/fr/lp/${p.slug}` }));
  const produitItems = PRODUIT_PAGES.map((p) => ({ type: "produit", slug: p.slug, title: p.meta.title, href: `/fr/produit/${p.slug}` }));
  const solutionItems = SOLUTION_PAGES.map((p) => ({ type: "solution", slug: p.slug, title: p.meta.title, href: `/fr/solutions/${p.slug}` }));
  const equipeItems = EQUIPE_PAGES.map((p) => ({ type: "equipe", slug: p.slug, title: p.meta.title, href: `/fr/equipes/${p.slug}` }));
  const blogItems = ACTIVE_BLOG_ARTICLES_V2.map((a) => ({ type: "blog", slug: a.slug, title: a.meta.title, href: `/fr/blog/${a.slug}` }));

  const legalRoutes = [
    { slug: "cookies", title: "Politique de cookies", href: "/fr/legal/cookies" },
    { slug: "mentions-legales", title: "Mentions légales", href: "/fr/mentions-legales" },
    { slug: "plan-du-site", title: "Plan du site", href: "/fr/plan-du-site" },
  ];

  const conversionRoutes = [
    { slug: "temoignages", title: "Témoignages clients", href: "/fr/temoignages" },
    { slug: "meetings-pages", title: "Réservez votre démo", href: "/fr/meetings-pages" },
  ];

  const marketingItems = MARKETING_STUBS.map((s) => ({
    slug: s.slug,
    title: s.title,
    href: `/fr/${s.slug}`,
  }));

  const allLandings = [...lpItems, ...produitItems, ...solutionItems, ...equipeItems];
  const totals = tally([...allLandings, ...blogItems]);
  const designerGate = loadDesignerGate();

  return (
    <main className="flex min-h-screen flex-col bg-background px-[1.5rem] py-[3rem] md:px-[3rem] lg:px-[6rem]">
      <div className="max-w-[80rem] w-full mx-auto flex flex-col gap-[2rem]">
        <header className="flex flex-col gap-[0.75rem]">
          <Heading level={1} align="left">
            QA Index — toutes les pages
          </Heading>
          <Text size="md" align="left">
            {totals.total} pages QA-tracked · ✅ {totals.pass} PASS · ⚠️ {totals.warn} WARN · ⚠️⚠️ {totals.heavy} HEAVY · 🛑 {totals.block} BLOCK · plus 11 utilities ci-dessous.
          </Text>
          <Text size="sm" align="left" className="text-text-muted">
            <strong>PASS</strong> = clean. <strong>WARN</strong> = 2-3 issues visibles. <strong>HEAVY</strong> = ≥4 issues visibles (presque cassée). <strong>BLOCK</strong> = ≥1 P0 (sections vides, contenu manquant). Cliquer sur "voir détails" pour lire les descriptions exactes des issues. Source : <code>docs/raw/qa-llm.json</code>.
          </Text>
        </header>

        {designerGate.length > 0 ? (
          <section className="flex flex-col gap-[1rem]">
            <div className="flex items-baseline justify-between gap-[1rem]">
              <Heading level={2} align="left">
                Designer Gate — pages flaggées ({designerGate.length})
              </Heading>
              <Text size="sm" className="text-text-muted">
                Verify flags + audit non-FAITHFUL · ouvrir rebuild + live côte à côte
              </Text>
            </div>
            <ul className="bg-white rounded-[0.5rem] border border-warning-30 px-[1rem] py-[0.5rem]">
              {designerGate.map((entry) => (
                <li
                  key={`${entry.type}-${entry.slug}`}
                  className="flex flex-col gap-[0.5rem] py-[0.75rem] border-b border-border last:border-b-0"
                >
                  <div className="flex flex-wrap items-center gap-[0.75rem]">
                    <span className="inline-block min-w-[7rem] text-center text-xs font-mono font-semibold px-[0.5rem] py-[0.125rem] rounded bg-warning-10 text-warning">
                      {entry.verdict}
                    </span>
                    <span className="inline-block min-w-[5rem] text-xs font-mono text-text-muted">
                      {entry.verifyFlags} verify
                    </span>
                    <span className="font-medium flex-1 truncate">
                      {entry.type}/{entry.slug}
                    </span>
                    <Link
                      href={entry.rebuildHref}
                      className="text-primary hover:underline text-sm"
                      target="_blank"
                    >
                      Rebuild ↗
                    </Link>
                    <Link
                      href={entry.liveHref}
                      className="text-primary hover:underline text-sm"
                      target="_blank"
                    >
                      Live ↗
                    </Link>
                  </div>
                  {entry.fabricatedSamples.length > 0 ? (
                    <details className="ml-[7rem]">
                      <summary className="cursor-pointer text-xs text-text-muted hover:text-foreground">
                        {entry.fabricatedSamples.length} fabricated sample
                        {entry.fabricatedSamples.length > 1 ? "s" : ""} — voir
                      </summary>
                      <ul className="mt-[0.5rem] flex flex-col gap-[0.25rem] pl-[1rem] border-l-2 border-border">
                        {entry.fabricatedSamples.map((sample, i) => (
                          <li
                            key={i}
                            className="text-xs text-text-p font-mono"
                          >
                            {sample}
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="flex flex-col gap-[1rem]">
          <div className="flex items-baseline justify-between gap-[1rem]">
            <Heading level={2} align="left">
              Landings — LP ({lpItems.length})
            </Heading>
            <CountBadge {...tally(lpItems)} />
          </div>
          <ul className="bg-white rounded-[0.5rem] border border-border px-[1rem] py-[0.5rem]">
            {lpItems.map((it) => renderRow(it.type, it.slug, it.href, it.title))}
          </ul>
        </section>

        <section className="flex flex-col gap-[1rem]">
          <div className="flex items-baseline justify-between gap-[1rem]">
            <Heading level={2} align="left">
              Landings — Produit ({produitItems.length})
            </Heading>
            <CountBadge {...tally(produitItems)} />
          </div>
          <ul className="bg-white rounded-[0.5rem] border border-border px-[1rem] py-[0.5rem]">
            {produitItems.map((it) => renderRow(it.type, it.slug, it.href, it.title))}
          </ul>
        </section>

        <section className="flex flex-col gap-[1rem]">
          <div className="flex items-baseline justify-between gap-[1rem]">
            <Heading level={2} align="left">
              Landings — Solutions ({solutionItems.length})
            </Heading>
            <CountBadge {...tally(solutionItems)} />
          </div>
          <ul className="bg-white rounded-[0.5rem] border border-border px-[1rem] py-[0.5rem]">
            {solutionItems.map((it) => renderRow(it.type, it.slug, it.href, it.title))}
          </ul>
        </section>

        <section className="flex flex-col gap-[1rem]">
          <div className="flex items-baseline justify-between gap-[1rem]">
            <Heading level={2} align="left">
              Landings — Équipes ({equipeItems.length})
            </Heading>
            <CountBadge {...tally(equipeItems)} />
          </div>
          <ul className="bg-white rounded-[0.5rem] border border-border px-[1rem] py-[0.5rem]">
            {equipeItems.map((it) => renderRow(it.type, it.slug, it.href, it.title))}
          </ul>
        </section>

        <section className="flex flex-col gap-[1rem]">
          <div className="flex items-baseline justify-between gap-[1rem]">
            <Heading level={2} align="left">
              Blog ({blogItems.length})
            </Heading>
            <CountBadge {...tally(blogItems)} />
          </div>
          <ul className="bg-white rounded-[0.5rem] border border-border px-[1rem] py-[0.5rem]">
            {blogItems.map((it) => renderRow(it.type, it.slug, it.href, it.title))}
          </ul>
        </section>

        <section className="flex flex-col gap-[1rem]">
          <Heading level={2} align="left">
            Legal & utilitaires ({legalRoutes.length})
          </Heading>
          <ul className="bg-white rounded-[0.5rem] border border-border px-[1rem] py-[0.5rem]">
            {legalRoutes.map((it) => (
              <li key={it.slug} className="flex items-center gap-[0.75rem] py-[0.5rem] border-b border-border last:border-b-0">
                <span className="inline-block min-w-[3.5rem] text-center text-xs font-mono font-semibold px-[0.5rem] py-[0.125rem] rounded bg-primary-10 text-primary">
                  LEGAL
                </span>
                <Link href={it.href} target="_blank" className="text-primary hover:underline flex-1 truncate">
                  {it.title}
                </Link>
                <code className="text-xs text-text-muted font-mono">{it.href}</code>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-[1rem]">
          <Heading level={2} align="left">
            Conversion ({conversionRoutes.length})
          </Heading>
          <ul className="bg-white rounded-[0.5rem] border border-border px-[1rem] py-[0.5rem]">
            {conversionRoutes.map((it) => (
              <li key={it.slug} className="flex items-center gap-[0.75rem] py-[0.5rem] border-b border-border last:border-b-0">
                <span className="inline-block min-w-[3.5rem] text-center text-xs font-mono font-semibold px-[0.5rem] py-[0.125rem] rounded bg-primary-10 text-primary">
                  CTA
                </span>
                <Link href={it.href} target="_blank" className="text-primary hover:underline flex-1 truncate">
                  {it.title}
                </Link>
                <code className="text-xs text-text-muted font-mono">{it.href}</code>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-[1rem]">
          <Heading level={2} align="left">
            Marketing stubs ({marketingItems.length})
          </Heading>
          <Text size="sm" align="left" className="text-text-muted">
            Stubs avec hero + CTA → page complète sur airsaas.io. À remplacer par des landings DS-natives en Phase 7+ follow-up.
          </Text>
          <ul className="bg-white rounded-[0.5rem] border border-border px-[1rem] py-[0.5rem]">
            {marketingItems.map((it) => (
              <li key={it.slug} className="flex items-center gap-[0.75rem] py-[0.5rem] border-b border-border last:border-b-0">
                <span className="inline-block min-w-[3.5rem] text-center text-xs font-mono font-semibold px-[0.5rem] py-[0.125rem] rounded bg-prevention-20 text-terracotta">
                  STUB
                </span>
                <Link href={it.href} target="_blank" className="text-primary hover:underline flex-1 truncate">
                  {it.title}
                </Link>
                <code className="text-xs text-text-muted font-mono">{it.href}</code>
              </li>
            ))}
          </ul>
        </section>

        <footer className="flex flex-col gap-[0.5rem] pt-[2rem] border-t border-border">
          <Text size="sm" align="left" className="text-text-muted">
            Status data : <code>docs/raw/qa-llm.json</code> · Re-run via{" "}
            <code>node scripts/qa-llm.mjs</code> (~7 min, ~$2).
          </Text>
          <Text size="sm" align="left" className="text-text-muted">
            Total tracked : {totals.total + 11} routes · indexed at{" "}
            <code>/fr/admin/index</code>
          </Text>
        </footer>
      </div>
    </main>
  );
}
