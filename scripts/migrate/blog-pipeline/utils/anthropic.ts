import Anthropic from "@anthropic-ai/sdk";
import { recordUsage } from "./cost-tracker.js";
import { MODELS } from "../config.js";

/**
 * Thin wrapper around the Anthropic SDK that :
 *   - reuses one client instance
 *   - threads through cost tracking on every call
 *   - extracts the first tool-use block from the response (matches the
 *     `tool_use` extraction pattern we use across all LLM agents)
 */

let cached: Anthropic | null = null;
export function getClient(): Anthropic {
  if (cached) return cached;
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY missing — run loadEnv() before using anthropic client");
  }
  cached = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  return cached;
}

export type ModelId = keyof typeof MODELS;

/**
 * Call Anthropic with a forced tool_use response. The model MUST return
 * exactly one tool_use block whose `input` matches `inputSchema`. We
 * parse + return the input as a typed value.
 *
 * Reusing the same pattern as scripts/migrate/llm-parse-shared.mjs but
 * typed and integrated with cost tracking.
 */
export async function callToolUse<T>(opts: {
  model: ModelId | "claude-sonnet-4-6" | "claude-opus-4-7";
  systemPrompt: string;
  userPrompt: string;
  toolName: string;
  toolDescription: string;
  inputSchema: Record<string, unknown>;
  maxTokens?: number;
  slug?: string;
  cacheSystem?: boolean;
}): Promise<{ output: T; usage: Anthropic.Usage }> {
  const client = getClient();
  const modelId = typeof opts.model === "string" ? opts.model : MODELS[opts.model];
  const systemBlocks = opts.cacheSystem
    ? [{ type: "text" as const, text: opts.systemPrompt, cache_control: { type: "ephemeral" as const } }]
    : [{ type: "text" as const, text: opts.systemPrompt }];
  // Always stream so long generations (>10 min wall-clock) don't trip the
  // Anthropic non-streaming hard timeout. The SDK accumulates the message
  // server-side and we receive the final result via `finalMessage()`.
  const stream = client.messages.stream({
    model: modelId,
    max_tokens: opts.maxTokens ?? 16000,
    system: systemBlocks,
    tools: [
      {
        name: opts.toolName,
        description: opts.toolDescription,
        input_schema: opts.inputSchema as Anthropic.Tool.InputSchema,
      },
    ],
    tool_choice: { type: "tool", name: opts.toolName },
    messages: [{ role: "user", content: opts.userPrompt }],
  });
  const res = await stream.finalMessage();
  recordUsage(modelId as "claude-sonnet-4-6" | "claude-opus-4-7", res.usage, opts.slug);
  const toolUse = res.content.find((c): c is Anthropic.ToolUseBlock => c.type === "tool_use");
  if (!toolUse) throw new Error(`No tool_use block in response (stop_reason=${res.stop_reason})`);
  return { output: toolUse.input as T, usage: res.usage };
}

/**
 * Multimodal call : image + text prompt → tool_use structured output.
 * Used by the Visual Auditor agent to compare screenshots and emit a
 * structured AuditVerdict.
 */
export async function callVisionToolUse<T>(opts: {
  model: ModelId | "claude-opus-4-7";
  systemPrompt: string;
  images: Array<{ media_type: "image/png" | "image/jpeg"; data: string }>;
  userPrompt: string;
  toolName: string;
  toolDescription: string;
  inputSchema: Record<string, unknown>;
  maxTokens?: number;
  slug?: string;
}): Promise<{ output: T; usage: Anthropic.Usage }> {
  const client = getClient();
  const modelId = typeof opts.model === "string" ? opts.model : MODELS[opts.model];
  const content: Anthropic.ContentBlockParam[] = [
    ...opts.images.map((img) => ({
      type: "image" as const,
      source: { type: "base64" as const, media_type: img.media_type, data: img.data },
    })),
    { type: "text" as const, text: opts.userPrompt },
  ];
  const stream = client.messages.stream({
    model: modelId,
    max_tokens: opts.maxTokens ?? 8000,
    system: opts.systemPrompt,
    tools: [
      {
        name: opts.toolName,
        description: opts.toolDescription,
        input_schema: opts.inputSchema as Anthropic.Tool.InputSchema,
      },
    ],
    tool_choice: { type: "tool", name: opts.toolName },
    messages: [{ role: "user", content }],
  });
  const res = await stream.finalMessage();
  recordUsage(modelId as "claude-opus-4-7", res.usage, opts.slug);
  const toolUse = res.content.find((c): c is Anthropic.ToolUseBlock => c.type === "tool_use");
  if (!toolUse) throw new Error(`No tool_use block in vision response (stop_reason=${res.stop_reason})`);
  return { output: toolUse.input as T, usage: res.usage };
}
