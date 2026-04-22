import { cn } from "@/lib/utils";
import { BullseyeIcon } from "@/components/library-design/ui/icons/floating-card-icons";

interface FloatingCardProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
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
 * @purpose    Small rounded white card with soft elevation, used as a decorative satellite around hero illustrations.
 * @useWhen    Floating mini-cards that orbit a hero visual (KPI snippets, status pills, feature teasers) — typically wrapped in <Float>.
 * @dontUse    As a real content card — it's `aria-hidden` and decorative. For interactive/readable cards, use <FeatureCard> or a section-level card.
 *
 * @limits
 *   - children: optional — when omitted, a placeholder (icon + 2 skeleton bars) renders
 *   - icon: only used by the placeholder; ignored when `children` is provided
 */
export function FloatingCard({ children, icon, className, style }: FloatingCardProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-white rounded-[1.2435rem]",
        className,
      )}
      style={{ boxShadow: "var(--shadow-elevation-md)", ...style }}
    >
      {children ?? <PlaceholderContent icon={icon} />}
    </div>
  );
}
