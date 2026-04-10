import { cn } from "@/lib/utils";

interface HeadingProps {
  level?: 1 | 2 | 3;
  children: React.ReactNode;
  gradient?: "dark-to-primary" | "primary" | "none";
  align?: "center" | "left";
  className?: string;
}

const levelClasses: Record<1 | 2 | 3, string> = {
  1: "font-black leading-[0.95]",
  2: "font-black leading-tight",
  3: "font-black leading-[1.18]",
};

const levelFontSize: Record<1 | 2 | 3, string> = {
  1: "var(--text-h1)",
  2: "var(--text-h2)",
  3: "var(--text-h3)",
};

const gradientMap: Record<string, string> = {
  "dark-to-primary": "var(--gradient-dark-to-primary)",
  primary: "var(--gradient-primary)",
};

export function Heading({
  level = 2,
  children,
  gradient = "dark-to-primary",
  align = "center",
  className,
}: HeadingProps) {
  const Tag = `h${level}` as const;
  const useGradient = gradient !== "none";

  return (
    <Tag
      className={cn(
        levelClasses[level],
        align === "center" ? "text-center" : "text-left",
        !useGradient && "text-foreground",
        className
      )}
      style={{
        fontSize: levelFontSize[level],
        ...(useGradient
          ? {
              backgroundImage: gradientMap[gradient],
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }
          : {}),
      }}
    >
      {children}
    </Tag>
  );
}
