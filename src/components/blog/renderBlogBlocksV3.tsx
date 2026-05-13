import { Fragment } from "react";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { Quote } from "@/components/library-design/ui/Quote";
import { ListInline } from "@/components/library-design/ui/ListInline";
import { TableFrame } from "@/components/library-design/ui/TableFrame";
import { InlineCta } from "@/components/library-design/ui/InlineCta";
import { InsightCallout } from "@/components/library-design/ui/InsightCallout";
import { IllustrationFrame } from "@/components/library-design/ui/IllustrationFrame";
import type { BlockV3 } from "@/types/blog-v3";

/**
 * Passive renderer for V3 blocks. Every design decision (variant, gradient,
 * widthMode, etc.) is read from the block itself — no hardcoded "if heading
 * level 3 then this" logic. The Design Mapper (pipeline agent 4) owns the
 * decisions; this renderer applies them verbatim.
 */

function RichSpan({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

function normalizeText(html: string): string {
  return html.replace(/<br\s*\/?>(\s*)/g, "<br/>").trim();
}

function BulletList({ ordered, items }: { ordered: boolean; items: string[] }) {
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

function renderBlock(block: BlockV3, index: number): React.ReactNode {
  switch (block.type) {
    case "heading":
      return (
        <Heading
          key={index}
          level={block.level}
          align="left"
          gradient={block.gradient}
        >
          {block.text}
        </Heading>
      );

    case "paragraph": {
      const html = normalizeText(block.html);
      if (!html) return null;
      return (
        <Text key={index} size="md" align="left">
          <RichSpan html={html} />
        </Text>
      );
    }

    case "list":
      if (!block.items.length) return null;
      return <BulletList key={index} ordered={block.ordered} items={block.items} />;

    case "figure": {
      if (!block.src) return null;
      return (
        <IllustrationFrame
          key={index}
          tone={block.tone}
          widthMode={block.widthMode}
          src={block.src}
          alt={block.alt || ""}
          caption={block.caption ?? undefined}
        />
      );
    }

    case "quote": {
      if (!block.text) return null;
      return (
        <Quote
          key={index}
          variant={block.variant}
          align={block.align}
          author={block.author ?? undefined}
          authorAvatar={block.authorAvatar ?? undefined}
        >
          <RichSpan html={block.text} />
        </Quote>
      );
    }

    case "table": {
      const { headers, rows } = block;
      if (!rows.length) return null;
      const columns = headers.length ? headers : rows[0].map((_, i) => `Col ${i + 1}`);
      const normalized = rows
        .map((row) => {
          if (row.length === columns.length) return row;
          if (row.length < columns.length) {
            return [...row, ...Array(columns.length - row.length).fill("")];
          }
          return row.slice(0, columns.length);
        })
        .slice(0, 20);
      if (columns.length < 2 || columns.length > 6) return null;
      return <TableFrame key={index} columns={columns} rows={normalized} />;
    }

    case "insight-callout": {
      const html = normalizeText(block.html);
      if (!html) return null;
      const bulletMatches = html.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
      const items = bulletMatches
        ? bulletMatches
            .map((li) => li.replace(/^<li[^>]*>/i, "").replace(/<\/li>\s*$/i, "").trim())
            .filter(Boolean)
            .slice(0, 6)
        : [html.replace(/^<p[^>]*>|<\/p>$/gi, "").trim()].filter(Boolean);
      if (items.length === 0) return null;
      const title = block.label?.trim() || "À retenir";
      return (
        <InsightCallout
          key={index}
          title={title.length > 40 ? title.slice(0, 40) : title}
          variant={block.variant}
          items={items.map((h, i) => <RichSpan key={i} html={h} />)}
        />
      );
    }

    case "inline-cta":
      return (
        <InlineCta
          key={index}
          text={block.text}
          ctaLabel={block.ctaLabel}
          ctaHref={block.ctaHref}
        />
      );

    default:
      return null;
  }
}

export function renderBlogBlocksV3(blocks: BlockV3[]): React.ReactNode {
  return (
    <>
      {blocks.map((block, index) => (
        <Fragment key={index}>{renderBlock(block, index)}</Fragment>
      ))}
    </>
  );
}
