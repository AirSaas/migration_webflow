import { cn } from "@/ds/utils";

interface ListInlineProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

function CheckCircleIcon() {
  return (
    <span
      aria-hidden="true"
      className="shrink-0 text-center"
      style={{
        fontFamily: '"Font Awesome 6 Pro"',
        fontWeight: 400,
        fontSize: "1.66rem",
        lineHeight: "1.56",
        background: "linear-gradient(90deg, #03F875 0%, #A1FC92 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
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
      className={cn("flex items-center gap-[0.553rem]", className)}
    >
      {icon ?? <CheckCircleIcon />}
      <span
        className="flex-1 font-light text-foreground"
        style={{ fontSize: "1.5rem" }}
      >
        {children}
      </span>
    </div>
  );
}
