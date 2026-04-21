import { cn } from "@/lib/utils";

interface ListInlineProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

function CheckCircleIcon() {
  return (
    <span
      aria-hidden="true"
      className="shrink-0 text-center bg-clip-text text-transparent"
      style={{
        fontFamily: '"Font Awesome 6 Pro"',
        fontWeight: 400,
        fontSize: "1.2rem",
        lineHeight: "1.56",
        backgroundImage: "var(--gradient-green)",
        WebkitBackgroundClip: "text",
      }}
    >
      {"\uF058"}
    </span>
  );
}

export function ListInline({
  children,
  icon,
  className,
}: ListInlineProps) {
  return (
    <div
      className={cn("flex items-center gap-[0.4rem]", className)}
    >
      {icon ?? <CheckCircleIcon />}
      <span
        className="flex-1 font-light text-foreground"
        style={{ fontSize: "1.2rem" }}
      >
        {children}
      </span>
    </div>
  );
}
