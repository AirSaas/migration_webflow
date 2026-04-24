import { cn } from "@/lib/utils";
import { Tag } from "@/components/library-design/ui/Tag";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { GradientText } from "@/components/library-design/ui/GradientText";

export interface IconRowItem {
  /** Pre-rendered icon node — typically an <IconBadge> */
  icon: React.ReactNode;
  /** Short label rendered below the icon */
  label: string;
}

/**
 * IconRowFrame
 *
 * @purpose    Horizontal row of icon + label pairs (integrations, tech stack,
 *             trusted-by logos rendered as iconography). Icons sit above labels.
 * @useWhen    Displaying 4–8 tools / integrations / ecosystems on a single
 *             visual strip (e.g. "Ils s'intègrent à votre stack").
 * @dontUse    For brand logos (use <LogosBar>). For a grid with richer content
 *             per item (use <ValuePropositionFrame> + <FeatureCard>).
 *
 * @limits
 *   - titleHighlight / title: max 40 / 80 chars
 *   - singleTitle: max 80 chars (alternative to titleHighlight + title)
 *   - subtitle: max 260 chars
 *   - items: 3–8 (below 3 the row looks sparse; past 8 it wraps awkwardly on tablet)
 *   - item.label: max 24 chars
 *   - tag: max 24 chars
 *
 * @forbidden
 *   - Do NOT mix singleTitle with titleHighlight/title — pick one strategy
 *   - Do NOT use emoji as item.icon — use <IconBadge> for consistency
 */
interface IconRowFrameProps {
  variant?: "light" | "dark";
  tag?: string;
  /** First part of the title — rendered in primary gradient (light) or white (dark) */
  titleHighlight?: string;
  /** Second part of the title — rendered in dark-to-primary gradient (light) or white (dark) */
  title?: string;
  /** Optional single-string title (rendered entirely in primary gradient).
   *  Use this OR titleHighlight + title. */
  singleTitle?: string;
  subtitle?: string;
  items: IconRowItem[];
  /** Optional DOM id on the root <section> — scroll-spy target for TabsFrame / TocSidebar. */
  id?: string;
  className?: string;
}

export function IconRowFrame({
  variant = "light",
  tag,
  titleHighlight,
  title,
  singleTitle,
  subtitle,
  items,
  id,
  className,
}: IconRowFrameProps) {
  const isDark = variant === "dark";

  return (
    <section
      id={id}
      className={cn(
        "flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:gap-[2.5rem] md:px-[3rem] md:py-[4rem] lg:gap-[3.75rem] lg:px-[10rem] lg:py-[6.25rem]",
        isDark ? "bg-primary-70" : "bg-white",
        className,
      )}
    >
      {tag && <Tag variant="muted">{tag}</Tag>}

      <div className="flex flex-col items-center gap-[1rem] md:gap-[1.25rem] text-center">
        {singleTitle ? (
          isDark ? (
            <Heading
              level={2}
              gradient="none"
              align="center"
              className="text-white"
            >
              {singleTitle}
            </Heading>
          ) : (
            <Heading level={2} gradient="primary" align="center">
              {singleTitle}
            </Heading>
          )
        ) : isDark ? (
          <Heading
            level={2}
            gradient="none"
            align="center"
            className="text-white"
          >
            {titleHighlight && <>{titleHighlight} </>}
            {title}
          </Heading>
        ) : (
          <Heading level={2} gradient="none" align="center">
            {titleHighlight && <GradientText gradient="primary">{titleHighlight}</GradientText>}
            {titleHighlight && title && " "}
            {title && <GradientText gradient="dark-to-primary">{title}</GradientText>}
          </Heading>
        )}

        {subtitle && (
          <Text
            size="md"
            align="center"
            maxWidth="60rem"
            className={isDark ? "text-white" : undefined}
          >
            {subtitle}
          </Text>
        )}
      </div>

      {/* Zigzag icon row — alternating vertical offset on lg+ */}
      <style>{`
        .icon-row-zigzag {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          width: 100%;
          column-gap: 2rem;
          row-gap: 2.5rem;
        }
        .icon-row-zigzag > .icon-row-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          min-width: 6.5rem;
        }
        @media (min-width: 1024px) {
          .icon-row-zigzag > .icon-row-item:nth-child(even) {
            transform: translateY(2.25rem);
          }
        }
      `}</style>
      <div className="icon-row-zigzag">
        {items.map((item, i) => (
          <div key={i} className="icon-row-item">
            {item.icon}
            <span
              className={cn(
                "font-normal text-center",
                isDark ? "text-white" : "text-primary",
              )}
              style={{ fontSize: "1.0625rem", lineHeight: 1.3 }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
