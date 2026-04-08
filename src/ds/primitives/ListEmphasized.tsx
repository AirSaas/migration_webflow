import { cn } from "@/ds/utils";

interface ListEmphasizedProps {
  /** Array of text items to display */
  items: string[];
  className?: string;
}

export function ListEmphasized({ items, className }: ListEmphasizedProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[1.25rem] md:flex-row md:items-start md:gap-[1.5625rem] w-full max-w-[91.25rem]",
        className,
      )}
    >
      {items.map((text, i) => (
        <div
          key={i}
          className="flex-1"
          style={{ borderLeft: "2px solid var(--color-orange-bright, #ff922b)", paddingLeft: "0.9375rem" }}
        >
          <p
            className="font-normal text-primary-70"
            style={{ fontSize: "1.2rem", lineHeight: "1.4" }}
          >
            {text}
          </p>
        </div>
      ))}
    </div>
  );
}
