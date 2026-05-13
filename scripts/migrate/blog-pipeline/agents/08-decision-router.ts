import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import type { AuditVerdict } from "../../../../src/types/blog-v3.js";
import { PATHS, BUDGETS } from "../config.js";
import type { ArticleLogger } from "../utils/logger.js";

/**
 * Agent 8 — Decision Router (deterministic)
 *
 * Reads the AuditVerdict from agent 7 + current retry count. Returns
 * the next action :
 *   - "pass"     → article done, commit + move to next
 *   - "retry"    → loop back to Design Mapper with feedback
 *   - "escalate" → 5 retries reached, write needs-review.md
 *
 * Feedback construction : we extract the failed rules' suggestedFix
 * (or evidence) and shape them into a feedback array the Designer can
 * apply directly.
 */

export interface DecisionRouterInput {
  slug: string;
  verdict: AuditVerdict;
  attempt: number;
  outDir: string;
}

export type DecisionAction = "pass" | "retry" | "escalate";

export interface DecisionRouterOutput {
  action: DecisionAction;
  /** When action="retry", the feedback to pass to the Designer. */
  feedback?: {
    attempt: number;
    issues: Array<{
      ruleId?: string;
      blockType?: string;
      severity: string;
      details: string;
      fixHint?: string;
    }>;
  };
  /** When action="escalate", the path of the needs-review report. */
  reviewReportPath?: string;
}

export function runDecisionRouter(
  input: DecisionRouterInput,
  logger: ArticleLogger,
): DecisionRouterOutput {
  if (input.verdict.passed) {
    logger.info("decision-router", `PASS at attempt ${input.attempt}`);
    return { action: "pass" };
  }

  const failedBlocking = input.verdict.rules.filter(
    (r) => r.status === "fail" && (r.severity === "P0" || r.severity === "P1"),
  );

  // Max retries reached — escalate.
  if (input.attempt >= BUDGETS.maxRetriesPerArticle) {
    const lines: string[] = [];
    lines.push("# Needs human review — blog migration v8");
    lines.push("");
    lines.push(`Article : \`${input.slug}\``);
    lines.push(`Attempts exhausted : ${input.attempt}/${BUDGETS.maxRetriesPerArticle}`);
    lines.push(`Generated : ${new Date().toISOString()}`);
    lines.push("");
    lines.push("The pipeline could not bring this article to 100% PASS within the retry budget. Manual review needed.");
    lines.push("");
    lines.push(`Total cost on this article : $${input.verdict.totalCostUsd.toFixed(3)}`);
    lines.push("");
    lines.push("## Last attempt failures (P0/P1)");
    lines.push("");
    for (const r of failedBlocking) {
      lines.push(`### [${r.severity}] \`${r.ruleId}\``);
      lines.push("");
      if (r.evidence) lines.push(`- Evidence : ${r.evidence}`);
      if (r.suggestedFix) {
        lines.push(`- Suggested fix : ${r.suggestedFix.action} on \`${r.suggestedFix.target}\` ${r.suggestedFix.hint ?? ""}`);
      }
      lines.push("");
    }
    lines.push("## How to unblock");
    lines.push("");
    lines.push("Options :");
    lines.push("1. **Adjust the YAML rule** in `docs/blog-design-rules.yaml` if the rule is too strict — then re-run `npm run blog:migrate -- --slugs=" + input.slug + "`.");
    lines.push("2. **Manually patch the spec** at `docs/blog-migration/_staging/" + input.slug + ".json` and re-run with `--use-staging`.");
    lines.push("3. **Edit the source HTML** in Supabase (rare — only for genuine source-side bugs).");
    lines.push("4. **Mark the article skip=true** in the staging JSON if the article should not ship.");
    lines.push("");
    const reportPath = join(input.outDir, "needs-review.md");
    mkdirSync(input.outDir, { recursive: true });
    writeFileSync(reportPath, lines.join("\n"));
    logger.error("decision-router", `ESCALATE — ${failedBlocking.length} blocking failure(s) → ${reportPath}`);
    return { action: "escalate", reviewReportPath: reportPath };
  }

  // Retry — build feedback for Designer.
  const issues = failedBlocking.map((r) => ({
    ruleId: r.ruleId,
    severity: r.severity,
    details: r.evidence ?? "(no evidence)",
    fixHint: r.suggestedFix ? `${r.suggestedFix.action} on ${r.suggestedFix.target}` : undefined,
  }));
  logger.warn(
    "decision-router",
    `RETRY (attempt ${input.attempt + 1}/${BUDGETS.maxRetriesPerArticle}) — ${issues.length} blocking issue(s)`,
  );
  return {
    action: "retry",
    feedback: { attempt: input.attempt, issues },
  };
}
