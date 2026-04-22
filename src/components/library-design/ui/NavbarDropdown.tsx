import { cn } from "@/lib/utils";

export interface NavbarDropdownItem {
  /** Icon element */
  icon: React.ReactNode;
  /** Bold title */
  title: string;
  /** Light subtitle */
  subtitle: string;
  /** Link destination */
  href?: string;
}

interface NavbarDropdownProps {
  items: NavbarDropdownItem[];
  className?: string;
}

/**
 * NavbarDropdown
 *
 * @purpose    Floating menu panel containing a vertical list of icon + title + subtitle links — the reusable body of navbar mega-menus.
 * @useWhen    Desktop navbar dropdown panels (Solutions, Produit, Ressources…) where each entry needs an icon, bold title, and light subtitle.
 * @dontUse    For mobile navigation — use a dedicated mobile drawer. For plain anchor lists (footer columns), use simple <a> lists.
 *
 * @limits
 *   - items: each entry must provide { icon, title, subtitle }; `href` defaults to "#" when omitted
 */
export function NavbarDropdown({ items, className }: NavbarDropdownProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[0.5625rem] p-[0.5625rem] min-w-[16.95rem]",
        "rounded-[0.9375rem] border border-border bg-white",
        className,
      )}
      style={{ boxShadow: "var(--shadow-floating)" }}
    >
      {items.map((item, i) => (
        <a
          key={i}
          href={item.href ?? "#"}
          className={cn(
            "flex items-center gap-[0.75rem] p-[0.375rem] rounded-[0.375rem]",
            "transition-colors duration-150 hover:bg-primary-2",
            "no-underline",
          )}
        >
          {/* Icon — 22×22 */}
          <div className="flex h-[1.375rem] w-[1.375rem] shrink-0 items-center justify-center">
            {item.icon}
          </div>

          {/* Text column */}
          <div className="flex flex-col gap-0">
            <span
              className="font-bold text-foreground leading-normal"
              style={{ fontSize: "0.825rem" }}
            >
              {item.title}
            </span>
            <span
              className="font-light text-foreground leading-normal"
              style={{ fontSize: "0.675rem" }}
            >
              {item.subtitle}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
