/**
 * HTML cleaning helper shared by content extraction. Mirrors the existing
 * cleanHtmlForLlm logic in scripts/migrate/llm-parse-shared.mjs — kept here
 * to avoid an import boundary mismatch between .mjs and .ts modules.
 */

const MAX_HTML_CHARS = 100_000;

export function cleanHtmlForLlm(html: string): string {
  if (!html) return "";
  let body = html;
  const bodyMatch = body.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) body = bodyMatch[1];
  body = body.replace(/<svg\b[\s\S]*?<\/svg>/gi, "<svg/>");
  body = body.replace(/<script[\s\S]*?<\/script>/gi, "");
  body = body.replace(/<style[\s\S]*?<\/style>/gi, "");
  body = body.replace(/<noscript[\s\S]*?<\/noscript>/gi, "");
  body = body.replace(/<!--[\s\S]*?-->/g, "");
  body = body.replace(/\son[a-z]+="[^"]*"/gi, "");
  body = body.replace(/\sstyle="[^"]*"/gi, "");
  body = body.replace(/src="data:[^"]*"/gi, 'src=""');
  body = body.replace(/<nav\b[\s\S]*?<\/nav>/gi, "");
  body = body.replace(/<footer\b[\s\S]*?<\/footer>/gi, "");
  body = body.replace(/\s{2,}/g, " ").trim();
  if (body.length > MAX_HTML_CHARS) {
    body = body.slice(0, MAX_HTML_CHARS) + "\n<!-- TRUNCATED -->";
  }
  return body;
}

/**
 * Extract the article body container — same priority list as v6/v7's
 * blog-structural-hints.mjs. Returns the inner HTML or full body fallback.
 */
export function extractArticleBody(html: string): string {
  const containers = [
    /<div[^>]*class="[^"]*container__article__integrations__text[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/i,
    /<div[^>]*class="[^"]*blog-post-body[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/section>/i,
    /<div[^>]*class="[^"]*rich-text[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i,
    /<div[^>]*class="[^"]*post-body[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/section>/i,
    /<article[^>]*>([\s\S]*?)<\/article>/i,
  ];
  for (const re of containers) {
    const m = html.match(re);
    if (m && m[1].length > 500) return m[1];
  }
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch ? bodyMatch[1] : html;
}
