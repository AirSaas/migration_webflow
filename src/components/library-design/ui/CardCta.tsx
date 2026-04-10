import { cn } from "@/lib/utils";
import { Button } from "@/components/library-design/ui/Button";

interface CardCtaProps {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref?: string;
  className?: string;
}

export function CardCta({
  title,
  description,
  ctaLabel,
  ctaHref = "#",
  className,
}: CardCtaProps) {
  return (
    <article
      className={cn(
        "flex flex-col gap-[0.75rem] md:gap-[0.9375rem] items-center justify-center rounded-[1.25rem] md:rounded-[1.5625rem] border border-primary-40 bg-white transition-shadow duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.05)]",
        className
      )}
      style={{ padding: "1.5rem 1.5rem", minHeight: "auto" }}
    >
      <p
        className="font-bold bg-clip-text text-transparent text-center w-full"
        style={{
          fontSize: "var(--text-h4)",
          backgroundImage: "var(--gradient-primary)",
          WebkitBackgroundClip: "text",
        }}
      >
        {title}
      </p>

      <p
        className="font-light text-foreground text-center w-full"
        style={{ fontSize: "var(--text-paragraph)", lineHeight: "1.559" }}
      >
        {description}
      </p>

      <Button variant="primary" size="sm" href={ctaHref}>
        {ctaLabel}
      </Button>
    </article>
  );
}
