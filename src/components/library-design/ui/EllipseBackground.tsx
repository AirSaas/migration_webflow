import { cn } from "@/lib/utils";

interface EllipseBackgroundProps {
  size?: number;
  className?: string;
}

/**
 * EllipseBackground
 *
 * @purpose    Decorative thick-bordered circle used as a soft halo behind hero illustrations and key sections.
 * @useWhen    Hero sections or landing blocks that need a large primary-tinted accent ring behind the content.
 * @dontUse    As a content container — it's purely decorative (`aria-hidden`) and positioned absolutely. For actual circles around content, use a bordered <div>.
 *
 * @limits
 *   - size: pixel value (default 1250) — render scales from this
 */
export function EllipseBackground({
  size = 1250,
  className,
}: EllipseBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute rounded-full border-[105px] border-primary-5/30",
        className,
      )}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}
