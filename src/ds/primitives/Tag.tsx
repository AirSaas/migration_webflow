import { cn } from "@/ds/utils";

interface TagProps {
  children: React.ReactNode;
  variant?: "muted" | "success" | "warning";
  icon?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<NonNullable<TagProps["variant"]>, string> = {
  muted: "bg-primary-5 text-primary rounded-[1.5625rem]",
  success: "bg-success-10 text-foreground rounded-full",
  warning: "bg-bg-warning text-warning-text rounded-full",
};

const variantPadding: Record<NonNullable<TagProps["variant"]>, React.CSSProperties> = {
  muted: { padding: "0.1875rem 2rem 0.1875rem 2.375rem", fontSize: "1.2rem" },
  success: { padding: "0.125rem 1.875rem 0.125rem 0.8125rem", fontSize: "1.2rem" },
  warning: { padding: "0.125rem 1.875rem 0.125rem 0.8125rem", fontSize: "1.2rem" },
};

function CheckCircleIcon() {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M12.6068 17.6401C12.0361 18.2108 11.1541 18.2108 10.5834 17.6401L7.26287 14.3196C6.69216 13.7489 6.69216 12.8669 7.26287 12.2962C7.83358 11.7255 8.71558 11.7255 9.28629 12.2962L11.621 14.579L17.2243 8.9757C17.795 8.40499 18.677 8.40499 19.2477 8.9757C19.8185 9.54641 19.8185 10.4284 19.2477 10.9991L12.6068 17.6401ZM26.5632 13.282C26.5632 20.6493 20.5967 26.5639 13.2812 26.5639C5.91393 26.5639 -0.000687599 20.6493 -0.000687599 13.282C-0.000687599 5.96651 5.91393 1.74046e-05 13.2812 1.74046e-05C20.5967 1.74046e-05 26.5632 5.96651 26.5632 13.282ZM13.2812 2.49038C7.31475 2.49038 2.48968 7.36734 2.48968 13.282C2.48968 19.2485 7.31475 24.0735 13.2812 24.0735C19.1959 24.0735 24.0728 19.2485 24.0728 13.282C24.0728 7.36734 19.1959 2.49038 13.2812 2.49038Z"
        fill="url(#paint0_linear_tag)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_tag"
          x1="13.8328"
          y1="11.2207"
          x2="25.8225"
          y2="11.2219"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#03F875" />
          <stop offset="1" stopColor="#A1FC92" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Tag({
  children,
  variant = "muted",
  icon,
  className,
}: TagProps) {
  const showDefaultIcon = variant === "success" && icon === undefined;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-[0.5rem] font-normal",
        variantStyles[variant],
        className
      )}
      style={variantPadding[variant]}
    >
      {showDefaultIcon && <CheckCircleIcon />}
      {icon}
      {children}
    </span>
  );
}
