import { cn } from "@/ds/utils";

interface EllipseBackgroundProps {
  size?: number;
  className?: string;
}

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
