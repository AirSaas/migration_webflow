import { cn } from "@/ds/utils";

interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  subtitle,
  description,
  className,
}: FeatureCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col justify-start gap-[0.9375rem] rounded-[1.5625rem] border border-primary-20 bg-primary-2 p-[2.1875rem] transition-shadow duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.05)]",
        className
      )}
    >
      {icon && (
        <div className="shrink-0" style={{ fontSize: "2.8rem" }}>
          {icon}
        </div>
      )}

      <p
        className="font-bold bg-clip-text text-transparent"
        style={{
          fontSize: "2.5rem",
          lineHeight: "3rem",
          backgroundImage: "var(--gradient-primary)",
          WebkitBackgroundClip: "text",
        }}
      >
        {title}
      </p>

      {subtitle && (
        <p
          className="font-bold bg-clip-text text-transparent"
          style={{
            fontSize: "1.8rem",
            lineHeight: "1.9rem",
            backgroundImage: "var(--gradient-primary)",
            WebkitBackgroundClip: "text",
          }}
        >
          {subtitle}
        </p>
      )}

      {description && (
        <p
          className="font-light text-foreground"
          style={{ fontSize: "1.4rem", lineHeight: "1.42" }}
        >
          {description}
        </p>
      )}
    </article>
  );
}
