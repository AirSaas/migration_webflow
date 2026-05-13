import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { RenderingSpec, type RenderingSpec as RenderingSpecT } from "../../../../src/types/blog-v3.js";
import { PATHS } from "../config.js";
import type { ArticleLogger } from "../utils/logger.js";

/**
 * Agent 5 — DS Conformance Validator (deterministic)
 *
 * Validates the RenderingSpec from agent 4 against :
 *   - Zod schema (already enforced upstream — re-run for belt-and-suspenders)
 *   - DS Registry constraints (variants exist on the components)
 *   - Hard-coded DS contract limits (Quote variants ∈ {card, pull}, etc.)
 *
 * If a rendering decision references a variant the DS doesn't support, the
 * agent STOPS — generating a ds-extension report and bubbling a HARD_FAIL
 * up to the Decision Router (which then escalates to human review).
 *
 * No LLM — pure schema + lookup.
 */

interface DsRegistry {
  componentsByName: Record<string, { variants?: Record<string, string[]> }>;
}

let dsRegistry: DsRegistry | null = null;
function getRegistry(): DsRegistry {
  if (dsRegistry) return dsRegistry;
  dsRegistry = JSON.parse(readFileSync(PATHS.dsRegistry, "utf8")) as DsRegistry;
  return dsRegistry;
}

/**
 * Hand-curated overrides : the markdown-derived registry has noise/gaps
 * (BlogCard "authors" extracted incorrectly, Heading variants empty even
 * though level/gradient are real). We override the few keys that matter
 * for the blog pipeline.
 */
const KNOWN_VARIANTS: Record<string, Record<string, string[]>> = {
  Quote: { variant: ["card", "pull"], align: ["left", "center"] },
  Heading: { level: ["2", "3", "4"], gradient: ["none", "primary", "dark-to-primary"] },
  IllustrationFrame: {
    tone: ["neutral", "warm"],
    shape: ["open-bottom", "contained"],
    widthMode: ["reading", "breakout"],
  },
  InsightCallout: { variant: ["primary", "success", "warning"] },
  TableFrame: {},
  InlineCta: {},
  TableOfContentsFrame: {},
};

export interface DsConformanceIssue {
  kind: "ds-gap" | "ds-contract";
  blockIndex?: number;
  blockType?: string;
  component: string;
  prop: string;
  value: string;
  severity: "P0" | "P1";
  detail: string;
}

export interface DsConformanceOutput {
  passed: boolean;
  hardFail: boolean;
  issues: DsConformanceIssue[];
  gapReportPath?: string;
}

function blockComponent(blockType: string): { component: string; variantProp?: string } | null {
  switch (blockType) {
    case "heading": return { component: "Heading" };
    case "paragraph": return { component: "Text" };
    case "list": return { component: "ListInline" };
    case "figure": return { component: "IllustrationFrame" };
    case "quote": return { component: "Quote" };
    case "table": return { component: "TableFrame" };
    case "insight-callout": return { component: "InsightCallout" };
    case "inline-cta": return { component: "InlineCta" };
    default: return null;
  }
}

function allowedValues(component: string, prop: string): string[] | null {
  if (KNOWN_VARIANTS[component]?.[prop]) return KNOWN_VARIANTS[component][prop];
  const reg = getRegistry().componentsByName[component];
  if (reg?.variants?.[prop]) return reg.variants[prop];
  return null;
}

export interface DsConformanceInput {
  slug: string;
  spec: RenderingSpecT;
  outDir: string;
}

export async function runDsConformanceValidator(
  input: DsConformanceInput,
  logger: ArticleLogger,
): Promise<DsConformanceOutput> {
  // Belt-and-suspenders Zod check.
  const parsed = RenderingSpec.safeParse(input.spec);
  if (!parsed.success) {
    logger.error("ds-conformance-validator", "Zod re-check failed", parsed.error.flatten());
    return {
      passed: false,
      hardFail: true,
      issues: [
        {
          kind: "ds-contract",
          component: "RenderingSpec",
          prop: "(root)",
          value: "(invalid)",
          severity: "P0",
          detail: `Zod failure: ${parsed.error.message}`,
        },
      ],
    };
  }

  const issues: DsConformanceIssue[] = [];

  input.spec.blocks.forEach((b, i) => {
    const map = blockComponent(b.type);
    if (!map) return;

    // Generic variant/prop scan : look at every block prop and if the
    // component declares allowed values, verify.
    const checks: Array<{ prop: string; value?: unknown }> = [];
    if ("variant" in b) checks.push({ prop: "variant", value: (b as { variant?: unknown }).variant });
    if ("gradient" in b) checks.push({ prop: "gradient", value: (b as { gradient?: unknown }).gradient });
    if ("level" in b) checks.push({ prop: "level", value: (b as { level?: unknown }).level });
    if ("tone" in b) checks.push({ prop: "tone", value: (b as { tone?: unknown }).tone });
    if ("widthMode" in b) checks.push({ prop: "widthMode", value: (b as { widthMode?: unknown }).widthMode });
    if ("align" in b) checks.push({ prop: "align", value: (b as { align?: unknown }).align });

    for (const c of checks) {
      if (c.value === undefined || c.value === null) continue;
      const allowed = allowedValues(map.component, c.prop);
      if (!allowed) continue;
      if (!allowed.map(String).includes(String(c.value))) {
        issues.push({
          kind: "ds-gap",
          blockIndex: i,
          blockType: b.type,
          component: map.component,
          prop: c.prop,
          value: String(c.value),
          severity: "P0",
          detail: `blocks[${i}] (${b.type}) requests <${map.component} ${c.prop}="${c.value}"> — DS allows only [${allowed.join(", ")}]`,
        });
      }
    }
  });

  // Hard fail if any P0 issue — escalation needed.
  const hardFail = issues.some((i) => i.severity === "P0");

  let gapReportPath: string | undefined;
  if (hardFail) {
    const lines: string[] = [];
    lines.push("# DS extension needed — blog migration v8");
    lines.push("");
    lines.push(`Article : \`${input.slug}\``);
    lines.push(`Generated : ${new Date().toISOString()}`);
    lines.push("");
    lines.push("The Design Mapper produced a RenderingSpec that requests DS variants/props the current DS doesn't support. The article migration is paused. Extend the DS, re-run `npm run blog:audit-ds-gaps`, then re-run migration on this slug only.");
    lines.push("");
    lines.push("## Gaps");
    lines.push("");
    for (const i of issues) {
      lines.push(`- [${i.severity}] ${i.detail}`);
    }
    gapReportPath = join(input.outDir, "needs-ds-extension.md");
    writeFileSync(gapReportPath, lines.join("\n"));
    logger.error("ds-conformance-validator", `${issues.length} DS gap(s) — escalation written → ${gapReportPath}`);
  } else {
    logger.info("ds-conformance-validator", `PASS — ${input.spec.blocks.length} blocks conform`);
  }

  return { passed: !hardFail, hardFail, issues, gapReportPath };
}
