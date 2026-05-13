import { readFileSync } from "node:fs";
import yaml from "js-yaml";
import type { RenderingSpec, AuditVerdict, RuleVerdict, CmsToggles } from "../../../../src/types/blog-v3.js";
import { PATHS } from "../config.js";
import { callVisionToolUse } from "../utils/anthropic.js";
import { getPerArticleUsd } from "../utils/cost-tracker.js";
import type { ArticleLogger } from "../utils/logger.js";
import { chromium } from "playwright";

/**
 * Agent 7 — Visual Auditor (Opus vision + deterministic DOM checks)
 *
 * Input  : RenderingSpec + rendered screenshot (base64) + rendered URL
 * Output : AuditVerdict — per-rule pass/fail with severity + fix hints
 *
 * Mixes two evaluation strategies :
 *   - Deterministic (DOM / cross-ref / data) rules — run via Playwright DOM
 *     inspection or direct spec checks. Fast, free, repeatable.
 *   - LLM-as-judge (visual) rules — Opus vision over the rendered screenshot
 *     with a focused prompt per rule.
 *
 * The Decision Router (agent 8) reads AuditVerdict.passed.
 */

interface DesignRule {
  id: string;
  description: string;
  severity: "P0" | "P1" | "P2";
  source?: string;
  check?: {
    type: "dom" | "visual" | "cross-ref" | "data";
    [k: string]: unknown;
  };
  autofix?: unknown;
}

interface DesignRulesFile {
  version: number;
  generatedAt: string;
  figmaTemplateNodeId: string;
  acceptanceBar: { block: string[]; warn: string[] };
  rules: DesignRule[];
}

let rulesCache: DesignRulesFile | null = null;
function loadRules(): DesignRulesFile {
  if (rulesCache) return rulesCache;
  const raw = readFileSync(PATHS.rulesYaml, "utf8");
  rulesCache = yaml.load(raw) as DesignRulesFile;
  return rulesCache;
}

export interface VisualAuditorInput {
  slug: string;
  spec: RenderingSpec;
  cmsToggles: CmsToggles;
  renderedUrl: string;
  /** Base64 PNG screenshot (full-page). */
  screenshotBase64: string;
  attempt: number;
}

export type VisualAuditorOutput = AuditVerdict;

// ─── Deterministic rule runners ─────────────────────────────────────────────

interface DomCheck {
  selector: string;
  assert?: Record<string, unknown>;
}

async function runDomRule(
  rule: DesignRule,
  renderedUrl: string,
): Promise<RuleVerdict> {
  const check = rule.check as unknown as { type: "dom" } & DomCheck;
  const browser = await chromium.launch({ headless: true });
  try {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto(renderedUrl, { waitUntil: "networkidle" });
    const result = await page.evaluate(
      ({ selector, assert }) => {
        const els = Array.from(document.querySelectorAll(selector));
        if (els.length === 0) {
          return { found: 0, evidence: `selector "${selector}" matched zero elements` };
        }
        const issues: string[] = [];
        const assertObj = (assert ?? {}) as Record<string, unknown>;
        for (const el of els) {
          if (typeof assertObj.hasClass === "string") {
            const wantedAll = (assertObj.hasClass as string).split(/\s+/);
            for (const w of wantedAll) {
              if (!el.classList.contains(w)) {
                issues.push(`element missing class "${w}" (has ${el.className})`);
              }
            }
          }
          if (typeof assertObj.srcDoesNotMatch === "string") {
            const re = new RegExp((assertObj.srcDoesNotMatch as string).replace(/^\/|\/[gimsuy]*$/g, ""), "i");
            const src = (el as HTMLImageElement).src ?? "";
            if (re.test(src)) issues.push(`src "${src}" matches forbidden pattern`);
          }
          if (typeof assertObj.textDoesNotMatch === "string") {
            const re = new RegExp((assertObj.textDoesNotMatch as string).replace(/^\/|\/[gimsuy]*$/g, ""), "i");
            const t = el.textContent ?? "";
            if (re.test(t)) issues.push(`text matches forbidden pattern`);
          }
          const cs = (assertObj.computedStyle ?? {}) as Record<string, string>;
          if (Object.keys(cs).length > 0) {
            const style = getComputedStyle(el as HTMLElement);
            for (const [k, want] of Object.entries(cs)) {
              const got = (style as unknown as Record<string, string>)[k];
              if (got && got.toLowerCase() !== want.toLowerCase()) {
                issues.push(`computedStyle.${k} = "${got}" (want "${want}")`);
              }
            }
          }
        }
        return { found: els.length, evidence: issues.join("; ") };
      },
      { selector: check.selector, assert: check.assert ?? {} },
    );
    const passed = result.found > 0 && !result.evidence;
    return {
      ruleId: rule.id,
      status: passed ? "pass" : "fail",
      severity: rule.severity,
      evidence: passed ? `${result.found} match(es)` : result.evidence,
    };
  } finally {
    await browser.close();
  }
}

function runDataRule(rule: DesignRule, spec: RenderingSpec): RuleVerdict {
  // Coarse implementation : we only support a few well-known assertion
  // strings hand-rolled here. Extend as needed.
  const assertion = String((rule.check as { assertion?: string })?.assertion ?? "");
  let passed = true;
  let evidence = "";

  if (/no spec\.blocks where type=quote.*alert pattern/.test(assertion)) {
    const offenders = spec.blocks.filter(
      (b) => b.type === "quote" && /^[\s\S]*(?:⚠️|💡|✨|📌|🚨|❗|🔔|✅|💬|<strong[^>]*>\s*(?:À retenir|À noter|Bon à savoir|En résumé|Le saviez-vous|Astuce|Pro tip|Méfions))/.test((b as { text?: string }).text ?? ""),
    );
    if (offenders.length > 0) {
      passed = false;
      evidence = `${offenders.length} alert-pattern blockquote(s) still emitted as quote (should be insight-callout)`;
    }
  } else if (/no spec\.blocks where type=heading && level=1/.test(assertion)) {
    const offenders = spec.blocks.filter((b) => b.type === "heading" && (b as { level?: number }).level === 1);
    if (offenders.length > 0) {
      passed = false;
      evidence = `${offenders.length} heading(s) at level=1 (must be 2-4)`;
    }
  } else if (/no spec\.blocks where type=hubspot-cta-embed remains/.test(assertion)) {
    const offenders = spec.blocks.filter((b) => (b as { type: string }).type === "hubspot-cta-embed" as never);
    if (offenders.length > 0) {
      passed = false;
      evidence = `${offenders.length} hubspot-cta-embed(s) remained — should be converted to inline-cta`;
    }
  } else if (/every spec\.blocks where type=heading && level=4 has gradient=none/.test(assertion)) {
    const offenders = spec.blocks.filter(
      (b) => b.type === "heading" && (b as { level?: number }).level === 4 && (b as { gradient?: string }).gradient !== "none",
    );
    if (offenders.length > 0) {
      passed = false;
      evidence = `${offenders.length} level=4 heading(s) with non-none gradient`;
    }
  } else {
    // Unsupported data assertion : skip with pass to avoid blocking.
    return { ruleId: rule.id, status: "skip", severity: rule.severity, evidence: "data assertion not implemented" };
  }
  return { ruleId: rule.id, status: passed ? "pass" : "fail", severity: rule.severity, evidence };
}

function runCrossRefRule(
  rule: DesignRule,
  spec: RenderingSpec,
  toggles: CmsToggles,
): RuleVerdict {
  const a = String((rule.check as { assertion?: string })?.assertion ?? "");
  let passed = true;
  let evidence = "";
  if (/rendered\.hasNewsletterCard == cmsToggles\.showNewsletter/.test(a)) {
    if (spec.toggles.showNewsletter !== toggles.showNewsletter) {
      passed = false;
      evidence = `spec.toggles.showNewsletter=${spec.toggles.showNewsletter} but cmsToggles=${toggles.showNewsletter}`;
    }
  } else if (/rendered\.hasClosingCta == cmsToggles\.showCta/.test(a)) {
    if (spec.toggles.showCta !== toggles.showCta) {
      passed = false;
      evidence = `spec.toggles.showCta=${spec.toggles.showCta} but cmsToggles=${toggles.showCta}`;
    }
  } else if (/spec\.customCta deep-equals cmsToggles\.customCta/.test(a)) {
    const eq = JSON.stringify(spec.customCta) === JSON.stringify(toggles.customCta);
    if (!eq) {
      passed = false;
      evidence = `spec.customCta differs from cmsToggles.customCta`;
    }
  } else if (/no rendered faq item matches a hidden index/.test(a)) {
    // We trust the Designer applied filtering; verify visible FAQ items.
    if (spec.faq.some((f) => f.hidden)) {
      passed = false;
      evidence = `spec.faq still includes ${spec.faq.filter((f) => f.hidden).length} hidden item(s)`;
    }
  } else if (/target >= source/.test(a)) {
    // Heading coverage handled by ContentValidator (agent 3) — skip here.
    return { ruleId: rule.id, status: "skip", severity: rule.severity, evidence: "delegated to ContentValidator" };
  } else {
    return { ruleId: rule.id, status: "skip", severity: rule.severity, evidence: "cross-ref assertion not implemented" };
  }
  return { ruleId: rule.id, status: passed ? "pass" : "fail", severity: rule.severity, evidence };
}

// ─── LLM-as-judge for visual rules ──────────────────────────────────────────

async function runVisualRulesBatch(
  visualRules: DesignRule[],
  screenshotBase64: string,
  slug: string,
): Promise<RuleVerdict[]> {
  if (visualRules.length === 0) return [];
  const TOOL_SCHEMA = {
    type: "object",
    required: ["verdicts"],
    properties: {
      verdicts: {
        type: "array",
        items: {
          type: "object",
          required: ["ruleId", "status", "severity"],
          properties: {
            ruleId: { type: "string" },
            status: { type: "string", enum: ["pass", "fail", "skip"] },
            severity: { type: "string", enum: ["P0", "P1", "P2"] },
            evidence: { type: "string" },
            suggestedFix: {
              type: "object",
              properties: {
                target: { type: "string" },
                action: { type: "string" },
                hint: { type: "string" },
              },
            },
          },
        },
      },
    },
  };
  const prompt = `You are auditing a rendered AirSaas blog article screenshot against a set of visual rules.

For EACH rule below, decide pass | fail | skip and return the verdict.

Rules to evaluate :
${visualRules
  .map((r) => `- id="${r.id}" severity=${r.severity} : ${r.description}`)
  .join("\n")}

Inspect the full screenshot carefully. For "fail" status include precise evidence (what's wrong and where, e.g. "the H3 'La méthode' is rendered in solid black, expected primary blue gradient"). For ambiguous cases (e.g. a rule that targets something not present in the article) return "skip".

If you can recommend a fix, populate suggestedFix.target/action/hint — those guide the Design Mapper on the next attempt.`;

  const { output } = await callVisionToolUse<{ verdicts: RuleVerdict[] }>({
    model: "claude-opus-4-7",
    systemPrompt: "You are a meticulous visual QA reviewer for the AirSaas blog migration.",
    images: [{ media_type: "image/png", data: screenshotBase64 }],
    userPrompt: prompt,
    toolName: "emit_visual_verdicts",
    toolDescription: "Emit a pass/fail verdict for each visual design rule",
    inputSchema: TOOL_SCHEMA,
    maxTokens: 4000,
    slug,
  });
  return output.verdicts;
}

// ─── Main runner ────────────────────────────────────────────────────────────

export async function runVisualAuditor(
  input: VisualAuditorInput,
  logger: ArticleLogger,
): Promise<VisualAuditorOutput> {
  const rules = loadRules().rules;
  const out: RuleVerdict[] = [];

  // Group rules by check type for efficient batching.
  const visualRules: DesignRule[] = [];
  for (const r of rules) {
    if (!r.check) {
      out.push({ ruleId: r.id, status: "skip", severity: r.severity, evidence: "no check defined" });
      continue;
    }
    if (r.check.type === "visual") {
      visualRules.push(r);
      continue;
    }
    if (r.check.type === "data") {
      out.push(runDataRule(r, input.spec));
      continue;
    }
    if (r.check.type === "cross-ref") {
      out.push(runCrossRefRule(r, input.spec, input.cmsToggles));
      continue;
    }
    if (r.check.type === "dom") {
      // DOM checks need a Playwright pass — run them serially (simple).
      out.push(await runDomRule(r, input.renderedUrl));
      continue;
    }
    out.push({ ruleId: r.id, status: "skip", severity: r.severity, evidence: `unknown check type ${r.check.type}` });
  }

  // Visual rules in one batched Opus call.
  const visualVerdicts = await runVisualRulesBatch(visualRules, input.screenshotBase64, input.slug);
  out.push(...visualVerdicts);

  const fails = out.filter((v) => v.status === "fail");
  const blocking = fails.filter((v) => v.severity === "P0" || v.severity === "P1");
  const passed = blocking.length === 0;

  logger.info(
    "visual-auditor",
    `verdicts : ${out.filter((v) => v.status === "pass").length} pass, ${fails.length} fail (${blocking.length} blocking)`,
  );

  return {
    slug: input.slug,
    attempt: input.attempt,
    rules: out,
    passed,
    totalCostUsd: getPerArticleUsd(input.slug),
  };
}
