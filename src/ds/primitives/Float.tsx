import { cn } from "@/ds/utils";

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
