import { cn } from "@/lib/utils";
import { ListInline } from "@/components/library-design/ui/ListInline";
import { assertArrayBounds } from "@/lib/ds-validators";

interface CheckListProps {
  /** List items — plain strings or rich ReactNode (bold, links, etc.) */
  items: Array<string | React.ReactNode>;
  /** Vertical gap between items. Defaults to "gap-[0.625rem]" to match
   *  FeatureFrame's internal checklist spacing. */
  gapClassName?: string;
  className?: string;
}

/**
 * CheckList
 *
 * @purpose    Vertical list where each item is prefixed by a green gradient circle-check icon.
 * @useWhen    Standalone bullet lists of benefits/features outside a FeatureFrame. Visually matches the checklist used inside <FeatureFrame>.
 * @dontUse    Inside a FeatureFrame — the frame already renders its own checklist from `checklistItems`. For a single inline check item, use <ListInline> directly.
 *
 * @limits
 *   - items: 1–12 (past 12, the list stretches the section disproportionately;
 *     prefer two columns via the consumer layout or split the content)
 *   - items: plain strings or rich ReactNode (bold, links, etc.)
 */
export function CheckList({
  items,
  gapClassName = "gap-[0.625rem]",
  className,
}: CheckListProps) {
  assertArrayBounds("CheckList", "items", items, 1, 12);
  return (
    <div
      className={cn(
        "flex flex-col w-full text-left mb-[1.25rem] md:mb-[1.5rem]",
        gapClassName,
        className,
      )}
    >
      {items.map((item, i) => (
        <ListInline key={i} className="items-start">
          {item}
        </ListInline>
      ))}
    </div>
  );
}
