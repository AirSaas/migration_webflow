import { cn } from "@/ds/utils";

interface IconIllustrationProps {
  children: React.ReactNode;
  variant?: "dark" | "light";
  size?: "sm" | "md";
  className?: string;
}

const sizeMap = {
  sm: { container: "h-[1.578rem] w-[2.171rem]", icon: "w-[2rem] h-[1.2rem]", shadow: "h-[0.152rem]", blur: "h-[1rem] w-[1rem]", fontSize: "1.48rem" },
  md: { container: "h-[3.5rem] w-[4.8125rem]", icon: "w-[4.478rem] h-[2.713rem]", shadow: "h-[0.336rem]", blur: "h-[2.261rem] w-[1.995rem]", fontSize: "3.28rem" },
};

const variantMap = {
  dark: {
    iconColor: "var(--color-primary)",
    dropShadow: "var(--color-primary-20)",
    baseShadow: "var(--color-primary-40)",
    blurBg: "var(--color-primary-40)",
  },
  light: {
    iconColor: "white",
    dropShadow: "var(--color-primary)",
    baseShadow: "var(--color-primary)",
    blurBg: "var(--color-primary)",
  },
};

export function IconIllustration({
  children,
  variant = "dark",
  size = "md",
  className,
}: IconIllustrationProps) {
  const s = sizeMap[size];
  const v = variantMap[variant];

  return (
    <div
      className={cn("relative", s.container, className)}
      aria-hidden="true"
    >
      {/* Blur glow behind icon */}
      <div
        className={cn("absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50", s.blur)}
        style={{ backgroundColor: v.blurBg, filter: "blur(3.5rem)" }}
      />

      {/* Icon + shadow base */}
      <div className={cn("absolute bottom-0 left-0 flex flex-col items-start gap-[0.219rem]", s.icon)}>
        {/* Icon content */}
        <div
          className="flex-1 flex items-end"
          style={{
            color: v.iconColor,
            fontSize: s.fontSize,
            filter: `drop-shadow(0.064rem 0.064rem 0px ${v.dropShadow})`,
          }}
        >
          {children}
        </div>

        {/* Shadow ellipse base */}
        <div
          className={cn("w-full rounded-full", s.shadow)}
          style={{ backgroundColor: v.baseShadow }}
        />
      </div>
    </div>
  );
}
