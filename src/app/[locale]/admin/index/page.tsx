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

type LlmIssue = { severity: "P0" | "P1" | "P2" };
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

type Status = "PASS" | "WARN" | "BLOCK" | "—";
function statusFor(row: LlmRow | undefined): Status {
  if (!row) return "—";
  const issues = row.issues || [];
  const p0 = issues.filter((i) => i.severity === "P0").length;
  const p1 = issues.filter((i) => i.severity === "P1").length;
  if (p0 > 0) return "BLOCK";
  if (p1 > 1) return "WARN";
  return "PASS";
}

function p0CountFor(row: LlmRow | undefined): number {
  return (row?.issues || []).filter((i) => i.severity === "P0").length;
}

// Status badge color tokens — using DS semantic colors only (no Tailwind palette).
const STATUS_STYLES: Record<Status, string> = {
  PASS: "bg-success-10 text-success",
  WARN: "bg-prevention-20 text-terracotta",
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
  const p0 = p0CountFor(row);
  return (
    <li
      key={`${type}-${slug}`}
      className="flex items-center gap-[0.75rem] py-[0.5rem] border-b border-border last:border-b-0"
    >
      <span
        className={`inline-block min-w-[3.5rem] text-center text-xs font-mono font-semibold px-[0.5rem] py-[0.125rem] rounded ${STATUS_STYLES[status]}`}
      >
        {status === "BLOCK" ? `P0×${p0}` : status}
      </span>
      <Link
        href={href}
        className="text-primary hover:underline flex-1 truncate"
        target="_blank"
      >
        {title}
      </Link>
      <code className="text-xs text-text-muted font-mono">{href}</code>
    </li>
  );
}

function CountBadge({ pass, warn, block, total }: {
  pass: number;
  warn: number;
  block: number;
  total: number;
}) {
  return (
    <span className="text-sm text-text-muted font-mono">
      {total} pages · ✅ {pass} · ⚠️ {warn} · 🛑 {block}
    </span>
  );
}

function tally(items: { type: string; slug: string }[]) {
  let pass = 0, warn = 0, block = 0;
  for (const it of items) {
    const s = statusFor(llmData.get(`${it.type}/${it.slug}`));
    if (s === "PASS") pass++;
    else if (s === "WARN") warn++;
    else if (s === "BLOCK") block++;
  }
  return { pass, warn, block, total: items.length };
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

  return (
    <main className="flex min-h-screen flex-col bg-background px-[1.5rem] py-[3rem] md:px-[3rem] lg:px-[6rem]">
      <div className="max-w-[80rem] w-full mx-auto flex flex-col gap-[2rem]">
        <header className="flex flex-col gap-[0.75rem]">
          <Heading level={1} align="left">
            QA Index — toutes les pages
          </Heading>
          <Text size="md" align="left">
            {totals.total} pages QA-tracked · ✅ {totals.pass} PASS · ⚠️ {totals.warn} WARN · 🛑 {totals.block} BLOCK · plus 11 utilities ci-dessous.
          </Text>
          <Text size="sm" align="left" className="text-text-muted">
            Cliquer sur un lien ouvre la page dans un nouvel onglet. Les badges P0×N
            indiquent le nombre de bugs sémantiques détectés par qa-llm (Sonnet 4.6).
            Source : <code>docs/raw/qa-llm.json</code>.
          </Text>
        </header>

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
