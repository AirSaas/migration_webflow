import { join } from "node:path";
import { mkdirSync } from "node:fs";
import { PATHS, BUDGETS } from "./config.js";
import { ArticleLogger } from "./utils/logger.js";
import { getPerArticleUsd, summary as costSummary, CostCapExceededError } from "./utils/cost-tracker.js";
import { runContentExtractor } from "./agents/01-content-extractor.js";
import { runCmsTogglesReader } from "./agents/02-cms-toggles-reader.js";
import { runContentValidator } from "./agents/03-content-validator.js";
import { runDesignMapper } from "./agents/04-design-mapper.js";
import { runDsConformanceValidator } from "./agents/05-ds-conformance-validator.js";
import { runRenderer } from "./agents/06-renderer.js";
import { runVisualAuditor } from "./agents/07-visual-auditor.js";
import { runDecisionRouter, type DecisionRouterOutput } from "./agents/08-decision-router.js";

/**
 * Per-article state machine. Orchestrates the 8 agents in a retry loop.
 *
 * Workflow :
 *   1. Content Extractor    (LLM)
 *   2. CMS Toggles Reader   (Webflow API)
 *   3. Content Validator    (deterministic) — re-loops to 1 (rare)
 *   ┌── attempt loop ──────────────────────────────────────────┐
 *   4. Design Mapper        (LLM, may receive feedback)
 *   5. DS Conformance       (deterministic — hard-fail → escalate)
 *   6. Renderer             (deterministic + screenshot)
 *   7. Visual Auditor       (LLM + deterministic checks)
 *   8. Decision Router      → pass | retry (back to 4) | escalate
 *   └──────────────────────────────────────────────────────────┘
 */

export type ArticleStatus = "pass" | "escalated-review" | "escalated-ds-gap" | "error" | "cost-cap";

export interface ArticleResult {
  slug: string;
  status: ArticleStatus;
  attempts: number;
  costUsd: number;
  reportPath?: string;
  error?: string;
}

export async function runArticle(slug: string): Promise<ArticleResult> {
  const outDir = join(PATHS.migrationDir, slug);
  mkdirSync(outDir, { recursive: true });
  const logger = new ArticleLogger(slug, 0);

  try {
    // ── Step 1: content extraction ────────────────────────────
    logger.setAttempt(0);
    const content = await runContentExtractor({ slug }, logger);

    // ── Step 2: CMS toggles ───────────────────────────────────
    const cmsToggles = await runCmsTogglesReader({ slug }, logger);

    // ── Step 3: content validation ────────────────────────────
    const cv = await runContentValidator({ slug, content }, logger);
    if (!cv.passed) {
      // Content validator failures are warnings here — we forward the
      // hints info to the Design Mapper as feedback rather than retrying
      // extraction (cheaper, and the Designer can usually compensate).
      logger.warn(
        "state",
        `content validation reported ${cv.issues.length} issue(s) — forwarding to Designer as feedback`,
      );
    }

    // ── Attempt loop : steps 4-8 ──────────────────────────────
    let feedback: DecisionRouterOutput["feedback"] | undefined = cv.passed
      ? undefined
      : {
          attempt: 0,
          issues: cv.issues.map((i) => ({
            blockType: i.blockType,
            severity: i.severity,
            details: `Source has ${i.expected} ${i.blockType} blocks but extractor emitted ${i.actual}`,
            fixHint: i.fixHint,
          })),
        };

    for (let attempt = 1; attempt <= BUDGETS.maxRetriesPerArticle; attempt++) {
      logger.setAttempt(attempt);

      // 4. Design Mapper
      const spec = await runDesignMapper({ slug, content, cmsToggles, feedback }, logger);

      // 5. DS Conformance Validator (hard-fail = stop early)
      const dsResult = await runDsConformanceValidator({ slug, spec, outDir }, logger);
      if (dsResult.hardFail) {
        logger.error("state", `DS gap — escalating, NOT retrying`);
        return {
          slug,
          status: "escalated-ds-gap",
          attempts: attempt,
          costUsd: getPerArticleUsd(slug),
          reportPath: dsResult.gapReportPath,
        };
      }

      // 6. Renderer
      const rendered = await runRenderer({ slug, spec }, logger);

      // 7. Visual Auditor
      const verdict = await runVisualAuditor(
        {
          slug,
          spec,
          cmsToggles,
          renderedUrl: rendered.renderedUrl,
          screenshotBase64: rendered.screenshotBase64,
          attempt,
        },
        logger,
      );

      // 8. Decision Router
      const decision = runDecisionRouter({ slug, verdict, attempt, outDir }, logger);
      if (decision.action === "pass") {
        return {
          slug,
          status: "pass",
          attempts: attempt,
          costUsd: getPerArticleUsd(slug),
        };
      }
      if (decision.action === "escalate") {
        return {
          slug,
          status: "escalated-review",
          attempts: attempt,
          costUsd: getPerArticleUsd(slug),
          reportPath: decision.reviewReportPath,
        };
      }
      // retry — wire feedback into next iteration
      feedback = decision.feedback;
      logger.info("state", `looping — attempt ${attempt + 1} starting`);
    }

    // Shouldn't reach (router escalates at maxRetries) — defensive.
    return {
      slug,
      status: "escalated-review",
      attempts: BUDGETS.maxRetriesPerArticle,
      costUsd: getPerArticleUsd(slug),
    };
  } catch (e) {
    if (e instanceof CostCapExceededError) {
      logger.error("state", `cost cap exceeded: ${e.message}`);
      return {
        slug,
        status: "cost-cap",
        attempts: 0,
        costUsd: getPerArticleUsd(slug),
        error: e.message,
      };
    }
    const msg = (e as Error).message ?? String(e);
    logger.error("state", `unhandled error : ${msg}`);
    return { slug, status: "error", attempts: 0, costUsd: getPerArticleUsd(slug), error: msg };
  }
}

export { costSummary };
