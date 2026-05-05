"use client";

import { cn } from "@/lib/utils";
import {
  assertMaxLength,
  assertNoClassNameOverride,
} from "@/lib/ds-validators";

/**
 * Button
 *
 * @purpose    Canonical interactive element for all CTAs, links-as-buttons, and actions.
 *             Renders `<a>` if `href` is provided, `<button>` otherwise.
 * @useWhen    Any actionable element — primary CTA, secondary CTA, quiet link-button.
 * @dontUse    For navigation inside a text paragraph (use an inline `<a>` with text-primary
 *             instead). For toggle chips / filters (use `<Tag>` if non-interactive).
 *
 * @limits
 *   - children label: max 30 chars (longer breaks responsive layouts on mobile)
 *   - icon + label combined: keep under ~24 chars
 *
 * @forbidden
 *   - Do NOT pass className overriding color / padding / fontSize — use `variant` + `size`
 *   - Do NOT pass `disabled` on an `<a>`-rendered button (use `href={undefined}` instead)
 *
 * @figma node-id 117-12841
 */

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost";
export type ButtonSize = "xs" | "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  /** Only applies when rendered as `<button>` (no `href`). Defaults to "button". */
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
  className?: string;
}

const baseStyles =
  "inline-flex items-center justify-center rounded-full font-normal transition-all duration-200 hover:scale-[1.02] hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:scale-100 disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed aria-disabled:opacity-60 aria-disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary border border-primary-10 text-white hover:bg-foreground",
  secondary: "bg-orange-bright text-white hover:brightness-110",
  tertiary:
    "bg-white border border-primary text-primary hover:bg-primary hover:text-white hover:border-primary",
  ghost: "bg-primary-5 text-primary hover:bg-primary hover:text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: "px-[0.875rem] py-[0.375rem]",
  sm: "px-[1.5rem] py-[0.75rem]",
  md: "px-[2.1875rem] py-[1.25rem]",
  lg: "px-[2.75rem] py-[1.5rem]",
};

const sizeFontSize: Record<ButtonSize, string> = {
  xs: "0.8125rem",
  sm: "var(--text-small)",
  md: "var(--text-paragraph)",
  lg: "var(--text-paragraph)",
};

function Spinner() {
  return (
    <svg
      className="animate-spin mr-[0.5rem]"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="32"
        strokeDashoffset="20"
        opacity="0.3"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  disabled = false,
  loading = false,
  type = "button",
  "aria-label": ariaLabel,
  className,
}: ButtonProps) {
  if (typeof children === "string") {
    assertMaxLength("Button", "children", children, 30);
  }
  assertNoClassNameOverride("Button", className, [
    "bg-",
    "text-",
    "font-",
    "p-",
    "px-",
    "py-",
    "rounded-",
  ]);

  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeClasses[size],
    className,
  );
  const style = { fontSize: sizeFontSize[size] };
  const content = loading ? (
    <>
      <Spinner />
      {children}
    </>
  ) : (
    children
  );

  if (href) {
    // aria-disabled on <a> since <a> doesn't accept `disabled`
    return (
      <a
        href={disabled || loading ? undefined : href}
        aria-disabled={disabled || loading || undefined}
        aria-label={ariaLabel}
        className={classes}
        style={style}
        onClick={(e) => {
          if (disabled || loading) e.preventDefault();
        }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      className={classes}
      style={style}
    >
      {content}
    </button>
  );
}
