import type Anthropic from "@anthropic-ai/sdk";
import { PRICING, BUDGETS } from "../config.js";

/**
 * Singleton cost tracker for the whole run. Records every Anthropic usage
 * stat, computes USD, enforces the global cap.
 *
 * Use `recordUsage(model, usage)` after every Anthropic call. The tracker
 * throws `CostCapExceededError` once the cumulative cost crosses the cap —
 * the state machine should catch it and stop the pipeline gracefully.
 */

type ModelId = keyof typeof PRICING;

interface UsageRecord {
  model: ModelId;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  costUsd: number;
  at: string;
  slug?: string;
}

export class CostCapExceededError extends Error {
  constructor(public totalUsd: number, public cap: number) {
    super(`Cost cap exceeded: $${totalUsd.toFixed(3)} ≥ $${cap.toFixed(2)}`);
  }
}

const records: UsageRecord[] = [];

export function recordUsage(
  model: ModelId,
  usage: Anthropic.Usage,
  slug?: string,
): UsageRecord {
  const price = PRICING[model];
  const input = usage.input_tokens ?? 0;
  const output = usage.output_tokens ?? 0;
  const cacheRead = usage.cache_read_input_tokens ?? 0;
  const cacheWrite = usage.cache_creation_input_tokens ?? 0;
  const costUsd =
    input * price.input +
    output * price.output +
    cacheRead * price.cacheRead +
    cacheWrite * price.cacheWrite;
  const rec: UsageRecord = {
    model,
    inputTokens: input,
    outputTokens: output,
    cacheReadTokens: cacheRead,
    cacheWriteTokens: cacheWrite,
    costUsd,
    at: new Date().toISOString(),
    slug,
  };
  records.push(rec);
  if (getTotalUsd() >= BUDGETS.totalUsd) {
    throw new CostCapExceededError(getTotalUsd(), BUDGETS.totalUsd);
  }
  return rec;
}

export function getTotalUsd(): number {
  return records.reduce((s, r) => s + r.costUsd, 0);
}

export function getPerArticleUsd(slug: string): number {
  return records.filter((r) => r.slug === slug).reduce((s, r) => s + r.costUsd, 0);
}

export function summary(): string {
  const total = getTotalUsd();
  const byModel = new Map<string, number>();
  for (const r of records) byModel.set(r.model, (byModel.get(r.model) ?? 0) + r.costUsd);
  const parts = [...byModel.entries()].map(([m, v]) => `${m}=$${v.toFixed(3)}`);
  return `total=$${total.toFixed(3)} (${parts.join(", ")}) — calls=${records.length}`;
}

export function snapshotForArticle(slug: string): {
  callCount: number;
  costUsd: number;
  records: UsageRecord[];
} {
  const filtered = records.filter((r) => r.slug === slug);
  return {
    callCount: filtered.length,
    costUsd: filtered.reduce((s, r) => s + r.costUsd, 0),
    records: filtered,
  };
}
