import { writeFileSync, mkdirSync, appendFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { PATHS } from "../config.js";

/**
 * Per-article structured logger. Each call appends one JSON line to
 * `docs/blog-migration/<slug>/run.log` and a human-readable line to
 * `run.md`. Used by every agent to leave a trail for debug + escalation.
 */

export interface LogContext {
  slug: string;
  attempt: number;
  agent?: string;
}

export class ArticleLogger {
  private dir: string;
  private logPath: string;
  private mdPath: string;

  constructor(public slug: string, public attempt: number = 0) {
    this.dir = join(PATHS.migrationDir, slug);
    mkdirSync(this.dir, { recursive: true });
    this.logPath = join(this.dir, "run.log");
    this.mdPath = join(this.dir, "run.md");
    if (!existsSync(this.mdPath)) {
      writeFileSync(this.mdPath, `# Migration run — ${slug}\n\n`);
    }
  }

  log(level: "info" | "warn" | "error", agent: string, msg: string, data?: unknown): void {
    const at = new Date().toISOString();
    const entry = { at, slug: this.slug, attempt: this.attempt, agent, level, msg, data };
    appendFileSync(this.logPath, JSON.stringify(entry) + "\n");
    const symbol = level === "error" ? "✗" : level === "warn" ? "⚠" : "·";
    appendFileSync(this.mdPath, `${symbol} [${agent}] ${msg}\n`);
    const tag = `[${this.slug}#${this.attempt}|${agent}]`;
    if (level === "error") console.error(`${symbol} ${tag} ${msg}`);
    else if (level === "warn") console.warn(`${symbol} ${tag} ${msg}`);
    else console.log(`${symbol} ${tag} ${msg}`);
  }

  info(agent: string, msg: string, data?: unknown) { this.log("info", agent, msg, data); }
  warn(agent: string, msg: string, data?: unknown) { this.log("warn", agent, msg, data); }
  error(agent: string, msg: string, data?: unknown) { this.log("error", agent, msg, data); }

  setAttempt(n: number): void {
    this.attempt = n;
    appendFileSync(this.mdPath, `\n## Attempt ${n}\n\n`);
  }

  writeReport(name: string, body: string): string {
    const p = join(this.dir, name);
    writeFileSync(p, body);
    return p;
  }
}
