import { cn } from "@/lib/utils";

interface FloatProps {
  children: React.ReactNode;
  /** Animation variant — different amplitude and direction */
  variant?: 1 | 2 | 3;
  /** Duration in seconds */
  duration?: number;
  /** Delay in seconds */
  delay?: number;
  className?: string;
}

const variantKeyframes: Record<1 | 2 | 3, string> = {
  1: "float-y-1",
  2: "float-y-2",
  3: "float-y-3",
};

/**
 * Float
 *
 * @purpose    Continuously bobs its child up and down with a subtle looping animation.
 * @useWhen    Floating decorative cards, icons, or illustrations around a hero (e.g. <FloatingCard> satellites).
 * @dontUse    For one-shot entrance animations — use <AnimateOnScroll>. For critical UI that needs a stable position, skip entirely.
 *
 * @limits
 *   - variant: 1 | 2 | 3 (different keyframes — pick different variants to desync neighbouring floats)
 *   - duration / delay: seconds
 */
export function Float({
  children,
  variant = 1,
  duration = 4,
  delay = 0,
  className,
}: FloatProps) {
  return (
    <div
      className={cn("motion-reduce:!animate-none", className)}
      style={{
        animation: `${variantKeyframes[variant]} ${duration}s ease-in-out ${delay}s infinite`,
      }}
    >
      {children}
    </div>
  );
}
