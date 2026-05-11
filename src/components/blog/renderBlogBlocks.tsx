import { Fragment } from "react";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { Quote } from "@/components/library-design/ui/Quote";
import { ListInline } from "@/components/library-design/ui/ListInline";
import { TableFrame } from "@/components/library-design/ui/TableFrame";
import { InlineCta } from "@/components/library-design/ui/InlineCta";
import { InsightCallout } from "@/components/library-design/ui/InsightCallout";
import { IllustrationFrame } from "@/components/library-design/ui/IllustrationFrame";
import type { BlogArticleBlock } from "@/types/blog";

/**
 * Render parsed Webflow blog blocks into DS primitives.
 * Used as children of <BlogArticleBody> inside <BlogPostPage>.
 *
 * Each block maps to one DS primitive:
 *   heading        → <Heading level>
 *   paragraph      → <Text> with inner HTML preserved
 *   list           → <ListInline> repeated
 *   figure         → next/image + optional <Text size="sm"> caption
 *   quote          → <Quote variant="pull" align="left">
 *   table          → <TableFrame>
 *   insight-callout → <InsightCallout>
 *   inline-cta     → <InlineCta>
 *   hubspot-cta    → fallback <Button> inline
 */

function RichSpan({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

function BulletList({
  ordered,
  items,
}: {
  ordered: boolean;
  items: string[];
}) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className="flex flex-col gap-[0.5rem] list-none p-0 m-0">
      {items.map((item, i) => (
        <li key={i} className="list-none">
          <ListInline bullet="circle-primary">
            <RichSpan html={item} />
          </ListInline>
        </li>
      ))}
    </Tag>
  );
}

function normalizeText(html: string): string {
  // Strip outer tag markers we may have leaked in
  return html.replace(/<br\s*\/?>(\s*)/g, "<br/>").trim();
}

/**
 * For alert-callouts converted from `<blockquote>⚠️ <strong>Label.</strong> body…`,
 * drop the leading emoji + first <strong> phrase since the label is shown
 * as the InsightCallout title. Falls through unchanged otherwise.
 */
function stripCalloutLead(html: string): string {
  return html
    .replace(
      /^\s*(?:<p[^>]*>\s*)?(?:⚠️|💡|✨|📌|🚨|❗|🔔|✅|💬)?\s*<strong[^>]*>[^<]{1,80}<\/strong>\s*:?\s*/i,
      "",
    )
    .replace(/^\s*<p[^>]*>\s*(?:⚠️|💡|✨|📌|🚨|❗|🔔|✅|💬)\s*/i, "")
    .trim();
}

function inferCalloutVariant(
  title: string,
  html: string,
): "primary" | "success" | "warning" {
  const head = `${title} ${html}`.slice(0, 120);
  if (/⚠️|🚨|❗|Attention|Méfions|Alerte/i.test(head)) return "warning";
  if (/✅|Bon à savoir|En résumé|Pro tip|Astuce/i.test(head)) return "success";
  return "primary";
}

function renderBlock(block: BlogArticleBlock, index: number): React.ReactNode {
  switch (block.type) {
    case "heading": {
      // Editorial body downshift: H2 source → DS level=3, H3+ → level=4.
      // DS Heading H2 is marketing-section size (32-72px) — too big for body
      // article context. The downshift keeps a readable hierarchy (24-40px).
      const sourceLevel = block.level;
      const dsLevel = (sourceLevel <= 2 ? 3 : 4) as 3 | 4;
      return (
        <Heading
          key={index}
          level={dsLevel}
          align="left"
          gradient="none"
        >
          {block.text}
        </Heading>
      );
    }
    case "paragraph": {
      const raw = block.html ?? block.text ?? "";
      const html = normalizeText(raw);
      if (!html) return null;
      return (
        <Text key={index} size="md" align="left">
          <RichSpan html={html} />
        </Text>
      );
    }
    case "list":
      if (!block.items.length) return null;
      return (
        <BulletList
          key={index}
          ordered={block.ordered}
          items={block.items}
        />
      );
    case "figure": {
      if (!block.src) return null;
      return (
        <IllustrationFrame
          key={index}
          tone="warm"
          src={block.src}
          alt={block.alt || ""}
          caption={block.caption ?? undefined}
        />
      );
    }
    case "quote": {
      if (!block.text) return null;
      // R18 audit Marisella : Opus prompt v5 emits <strong>/<em>/<a> tags
      // inside quote text. Render via RichSpan so HTML is interpreted, not
      // shown as literal text.
      return (
        <Quote
          key={index}
          variant="pull"
          align="left"
          author={block.author || undefined}
          authorAvatar={block.authorAvatar || undefined}
        >
          <RichSpan html={block.text} />
        </Quote>
      );
    }
    case "table": {
      const { headers, rows } = block;
      if (!rows.length) return null;
      // TableFrame requires columns + rows with matching length
      const columns = headers.length
        ? headers
        : rows[0].map((_, i) => `Col ${i + 1}`);
      const normalizedRows = rows
        .map((row) => {
          if (row.length === columns.length) return row;
          if (row.length < columns.length) {
            return [...row, ...Array(columns.length - row.length).fill("")];
          }
          return row.slice(0, columns.length);
        })
        .slice(0, 20); // TableFrame @limits max 20 rows
      // TableFrame @limits max 6 columns
      if (columns.length > 6 || columns.length < 2) return null;
      return (
        <TableFrame
          key={index}
          columns={columns}
          rows={normalizedRows}
        />
      );
    }
    case "insight-callout": {
      const html = normalizeText(block.html);
      if (!html) return null;
      // Split into bullet items when the html has <li>s, else a single item.
      // Preserve inline HTML (<strong>/<em>/<a>) via RichSpan — earlier
      // versions stripped all tags which lost emphasis and links.
      const bulletMatches = html.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
      const innerHtmlList = bulletMatches
        ? bulletMatches
            .map((li) => li.replace(/^<li[^>]*>/i, "").replace(/<\/li>\s*$/i, "").trim())
            .filter(Boolean)
            .slice(0, 6)
        : [stripCalloutLead(html)].filter(Boolean);
      if (innerHtmlList.length === 0) return null;
      const title = block.label?.trim() || "À retenir";
      return (
        <InsightCallout
          key={index}
          title={title.length > 40 ? title.slice(0, 40) : title}
          variant={inferCalloutVariant(title, html)}
          items={innerHtmlList.map((h, i) => <RichSpan key={i} html={h} />)}
        />
      );
    }
    case "inline-cta":
      if (!block.label) return null;
      return (
        <InlineCta
          key={index}
          text={block.label}
          ctaLabel="En savoir plus"
          ctaHref={block.href}
        />
      );
    case "hubspot-cta":
      // If only `html` is provided (raw embed iframe), skip — too risky.
      // Renderer requires label + href (visible CTA). Skip raw embeds.
      if (!block.href || !block.label) return null;
      return (
        <div key={index} className="flex justify-center my-[1rem]">
          <a
            href={block.href}
            className="inline-flex items-center justify-center rounded-full px-[1.5rem] py-[0.75rem] bg-primary text-white font-medium hover:bg-foreground transition-colors"
          >
            {block.label}
          </a>
        </div>
      );
    default:
      return null;
  }
}

export function renderBlogBlocks(blocks: BlogArticleBlock[]): React.ReactNode {
  return (
    <>
      {blocks.map((block, index) => (
        <Fragment key={index}>{renderBlock(block, index)}</Fragment>
      ))}
    </>
  );
}
