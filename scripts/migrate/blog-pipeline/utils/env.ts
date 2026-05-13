import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { REPO_ROOT } from "../config.js";

/**
 * Load .env.local into process.env at startup. Same convention as the
 * existing scripts/migrate/llm-parse-shared.mjs loader. Idempotent — safe
 * to call multiple times.
 */
let loaded = false;
export function loadEnv(): void {
  if (loaded) return;
  const envPath = join(REPO_ROOT, ".env.local");
  if (!existsSync(envPath)) {
    console.error("ERROR: .env.local missing");
    process.exit(1);
  }
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !(m[1] in process.env)) {
      process.env[m[1]] = m[2].trim();
    }
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ERROR: ANTHROPIC_API_KEY missing in .env.local");
    process.exit(1);
  }
  if (!process.env.WEBFLOW_API_TOKEN) {
    console.error("ERROR: WEBFLOW_API_TOKEN missing in .env.local");
    process.exit(1);
  }
  loaded = true;
}
