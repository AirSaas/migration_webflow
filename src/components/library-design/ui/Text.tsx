import { cn } from "@/lib/utils";

interface TextProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  align?: "center" | "left";
  maxWidth?: string;
  className?: string;
}

const sizeClasses: Record<NonNullable<TextProps["size"]>, string> = {
  sm: "leading-relaxed",
  md: "leading-[1.4] font-light",
  lg: "leading-[1.4] font-light",
};

const sizeFontSize: Record<NonNullable<TextProps["size"]>, string> = {
  sm: "var(--text-small)",
  md: "var(--text-paragraph)",
  lg: "clamp(1.25rem, 2vw, 1.75rem)",
};

export function Text({
  children,
  size = "md",
  align = "left",
  maxWidth,
  className,
}: TextProps) {
  return (
    <p
      className={cn(
        "text-foreground",
        sizeClasses[size],
        align === "center" && "text-center",
        className
      )}
      style={{
        fontSize: sizeFontSize[size],
        ...(maxWidth ? { maxWidth } : {}),
      }}
    >
      {children}
    </p>
  );
}
