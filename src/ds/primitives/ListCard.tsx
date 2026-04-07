import { cn } from "@/ds/utils";

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
        "flex gap-[1.4375rem] items-start rounded-[1.5625rem] border border-prevention-40 bg-white",
        className
      )}
      style={{ padding: "1.6875rem 1.375rem 1.6875rem 1.8125rem" }}
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
