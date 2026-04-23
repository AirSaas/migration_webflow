import { cn } from "@/lib/utils";
import { BullseyeIcon } from "@/components/library-design/ui/icons/floating-card-icons";

interface FloatingCardProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  /**
   * When `true` (default), the card is marked `aria-hidden` and made
   * `pointer-events-none` — correct for satellite cards orbiting a hero
   * illustration (decorative only, must never compete with the readable
   * content underneath).
   * Pass `false` when the card wraps real, user-facing content (e.g. the
   * Footer copyright card) so screen readers announce it and text inside
   * remains selectable.
   */
  decorative?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function PlaceholderContent({ icon }: { icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-[0.888rem] p-[0.9375rem]">
      <div className="grid h-[3.198rem] w-[3.198rem] shrink-0 place-items-center rounded-[0.888rem] bg-primary-5">
        {icon ?? <BullseyeIcon />}
      </div>
      <div className="flex w-[7.9375rem] flex-col gap-[0.5625rem]">
        <div className="h-[0.6875rem] w-full rounded-full bg-border" />
        <div className="h-[0.6875rem] w-[5rem] rounded-full bg-bg-alt" />
      </div>
    </div>
  );
}

/**
 * FloatingCard
 *
 * @purpose    Small rounded white card with soft elevation, used as a
 *             decorative satellite around hero illustrations or as a
 *             content-bearing pill (Footer copyright).
 * @useWhen    Floating mini-cards that orbit a hero visual (KPI snippets,
 *             status pills, feature teasers — typically wrapped in
 *             <Float>). Also as a standalone content pill when the
 *             elevated white chrome is the desired affordance (pass
 *             `decorative={false}`).
 * @dontUse    As a large content card with headings + body — use
 *             <FeatureCard> or a section-level card for that. For plain
 *             cards without shadow, use inline markup.
 *
 * @limits
 *   - children: optional — when omitted, a placeholder (icon + 2 skeleton
 *     bars) renders
 *   - icon: only used by the placeholder; ignored when `children` is
 *     provided
 *   - decorative: true (default — aria-hidden + pointer-events-none, so
 *     the card never obstructs reading / interaction with the text
 *     underneath) | false (real content — announced by screen readers and
 *     keeps pointer events)
 *
 * @forbidden
 *   - Do NOT pass `decorative={true}` when the card contains real text
 *     the user needs to read or select (aria-hidden hides it from screen
 *     readers)
 *   - Do NOT rely on `decorative={true}` cards for click / hover
 *     interactions — they have pointer-events-none
 */
export function FloatingCard({
  children,
  icon,
  decorative = true,
  className,
  style,
}: FloatingCardProps) {
  return (
    <div
      {...(decorative ? { "aria-hidden": true as const } : {})}
      className={cn(
        "bg-white rounded-[1.2435rem]",
        decorative && "pointer-events-none",
        className,
      )}
      style={{ boxShadow: "var(--shadow-elevation-md)", ...style }}
    >
      {children ?? <PlaceholderContent icon={icon} />}
    </div>
  );
}
