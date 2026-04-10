import { cn } from "@/lib/utils";

interface ListCardProps {
  value: string | number;
  children: React.ReactNode;
  className?: string;
}

export function ListCard({
  value,
  children,
  className,
}: ListCardProps) {
  return (
    <article
      className={cn(
        "flex gap-[0.75rem] md:gap-[1.4375rem] items-start rounded-[1.25rem] md:rounded-[1.5625rem] border border-prevention-40 bg-white",
        className
      )}
      style={{ padding: "1.25rem 1rem 1.25rem 1.25rem" }}
    >
      <span
        className="shrink-0 font-bold bg-clip-text text-transparent"
        style={{
          fontSize: "4.8125rem",
          backgroundImage: "var(--gradient-orange)",
          WebkitBackgroundClip: "text",
          lineHeight: "normal",
        }}
      >
        {value}
      </span>

      <p
        className="flex-1 font-light text-foreground"
        style={{ fontSize: "var(--text-paragraph)", lineHeight: "1.4" }}
      >
        {children}
      </p>
    </article>
  );
}
