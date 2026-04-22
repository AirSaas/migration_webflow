import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import { Heading } from "./Heading";
import { Text } from "./Text";
import { Button, type ButtonVariant } from "./Button";
import { assertMaxLength } from "@/lib/ds-validators";

/**
 * EmptyState
 *
 * @purpose    Friendly placeholder rendered when a collection (search results,
 *             filter output, list of items) has zero entries.
 * @useWhen    Client-side filtering returns no results; a blog tag has no posts;
 *             a search query finds nothing.
 * @dontUse    For loading (use <Skeleton>). For errors (use <ErrorBoundary> or
 *             pass your own error UI). For static content where empty shouldn't
 *             happen in prod.
 *
 * @limits
 *   - title: max 60 chars
 *   - description: max 240 chars
 *   - ctaLabel: max 24 chars (when provided, both ctaLabel + ctaHref|onClick required)
 *
 * @forbidden
 *   - Do NOT use as a generic "page not found" — use a dedicated 404 page
 *   - Do NOT use as a loading placeholder — use <Skeleton>
 */

interface EmptyStateProps {
  /** Optional illustration / icon (inline SVG or emoji). */
  icon?: ReactNode;
  title: string;
  description?: string;
  /** Optional action CTA. Provide either ctaHref or onCtaClick. */
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  ctaVariant?: ButtonVariant;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  ctaLabel,
  ctaHref,
  onCtaClick,
  ctaVariant = "primary",
  className,
}: EmptyStateProps) {
  assertMaxLength("EmptyState", "title", title, 60);
  if (description) assertMaxLength("EmptyState", "description", description, 240);
  if (ctaLabel) assertMaxLength("EmptyState", "ctaLabel", ctaLabel, 24);

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-[1rem] text-center",
        "px-[1.5rem] py-[3rem] md:py-[4rem]",
        className,
      )}
      role="status"
    >
      {icon && (
        <div className="text-secondary-40" style={{ fontSize: "3rem" }} aria-hidden="true">
          {icon}
        </div>
      )}
      <Heading level={4} gradient="none" align="center">
        {title}
      </Heading>
      {description && (
        <Text size="md" align="center" maxWidth="40rem">
          {description}
        </Text>
      )}
      {ctaLabel && (ctaHref || onCtaClick) && (
        <Button
          variant={ctaVariant}
          size="sm"
          href={ctaHref}
          onClick={onCtaClick}
          className="mt-[0.5rem]"
        >
          {ctaLabel}
        </Button>
      )}
    </div>
  );
}
