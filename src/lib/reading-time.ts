import type { BlogArticleBlock } from "@/types/blog";
import type { BlockV3 } from "@/types/blog-v3";

const WORDS_PER_MINUTE = 200;

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/gi, " ");
}

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

export function estimateReadingTime(blocks: (BlogArticleBlock | BlockV3)[]): string {
  const total = blocks.reduce((sum, block) => {
    switch (block.type) {
      case "paragraph":
        return sum + countWords(stripHtml(
          (block as { html?: string; text?: string }).html ?? (block as { text?: string }).text ?? "",
        ));
      case "insight-callout":
        return sum + countWords(stripHtml(block.html));
      case "heading":
        return sum + countWords(block.text);
      case "list":
        return sum + block.items.reduce((s, item) => s + countWords(stripHtml(item)), 0);
      case "quote":
        return sum + countWords(block.text) + countWords(block.author || "");
      case "table":
        return (
          sum +
          block.headers.reduce((s, h) => s + countWords(h), 0) +
          block.rows.reduce(
            (rowSum, row) => rowSum + row.reduce((cs, c) => cs + countWords(c), 0),
            0,
          )
        );
      case "figure":
        return sum + countWords(block.alt) + countWords(block.caption || "");
      case "inline-cta":
        // V3 shape uses ctaLabel; V2 uses label.
        return sum + countWords(
          (block as { ctaLabel?: string }).ctaLabel ?? (block as { label?: string }).label ?? "",
        );
      case "hubspot-cta":
        return sum + countWords((block as { label?: string }).label ?? "");
      default:
        return sum;
    }
  }, 0);
  const minutes = Math.max(1, Math.round(total / WORDS_PER_MINUTE));
  return `${minutes} min de lecture`;
}
