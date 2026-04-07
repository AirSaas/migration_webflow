import { cn } from "@/ds/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "ghost";
  size?: "sm" | "md";
  href?: string;
  onClick?: () => void;
  className?: string;
}

const baseStyles =
  "inline-flex items-center justify-center rounded-full font-normal transition-all duration-200 hover:scale-[1.02] hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:scale-100";

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-primary border border-primary-10 text-white hover:bg-foreground",
  secondary:
    "bg-orange-bright text-white hover:brightness-110",
  tertiary:
    "bg-white border border-primary text-primary hover:bg-primary hover:text-white hover:border-primary",
  ghost:
    "bg-primary-5 text-primary hover:bg-primary hover:text-white",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-[1.5rem] py-[0.75rem]",
  md: "px-[2.1875rem] py-[1.25rem]",
};

const sizeFontSize: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "var(--text-small)",
  md: "var(--text-paragraph)",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className,
}: ButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], sizeClasses[size], className);
  const style = { fontSize: sizeFontSize[size] };

  if (href) {
    return (
      <a href={href} className={classes} style={style}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} style={style}>
      {children}
    </button>
  );
}
