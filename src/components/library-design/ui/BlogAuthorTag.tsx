import { cn } from "@/lib/utils";
import { Text } from "@/components/library-design/ui/Text";
import {
  assertMaxLength,
  assertNoClassNameOverride,
} from "@/lib/ds-validators";

/**
 * BlogAuthorTag
 *
 * @purpose    Author attribution block for blog articles: "Publié par" label +
 *             green pill with avatar + author name + "dans [category]" link +
 *             publication date.
 * @useWhen    Blog article heros (<BlogHero>), blog card bylines, author
 *             attribution strips. Anywhere a blog post needs to surface author
 *             + category + date as a grouped meta block.
 * @dontUse    For testimonial attribution (use <TestimonialCard>).
 *             For client / team cards (use <ClientCard>).
 *             For a plain metadata row with no author pill (use raw <Text>
 *             blocks).
 *
 * @limits
 *   - name: max 40 chars (longer breaks the pill on 2 lines)
 *   - categoryLabel: max 40 chars
 *   - publishedDate: caller passes a pre-formatted string (i18n done upstream)
 *   - avatarAlt: required if avatarSrc is provided; "" allowed for decorative
 *
 * @forbidden
 *   - Do NOT pass className with bg / text color / font / rounding overrides —
 *     the green pill + grey meta colors are part of the component contract
 *   - Do NOT nest this inside <Tag> — this IS a composed tag+meta block
 *   - Do NOT pass a hex color for the pill; the pill uses --color-success-text
 *
 * @figma node-id 303-1655
 */

interface BlogAuthorTagProps {
  /** Author name shown inside the green pill. */
  name: string;
  /** Optional avatar image URL. When absent, renders a white/30 placeholder dot. */
  avatarSrc?: string;
  /** Required when avatarSrc is provided. Pass "" for decorative avatars. */
  avatarAlt?: string;
  /** Optional category label (e.g. "Gestion de projets"), shown in primary color. */
  categoryLabel?: string;
  /** Optional href for the category link. When absent renders a non-link span. */
  categoryHref?: string;
  /** Pre-formatted publication date (e.g. "25/2/2026"). */
  publishedDate?: string;
  /**
   * Label rendered above the pill (e.g. "Publié par" / "Published by").
   * Locale-driven — default English fallback ("Published by"), pass translated
   * via next-intl for production.
   */
  publishedByLabel?: string;
  /**
   * Preposition joining pill to category (e.g. "dans" / "in").
   * Default English fallback ("in"), pass translated via next-intl.
   */
  inLabel?: string;
  /**
   * Prefix before the date (e.g. "Le" / "On").
   * Default English fallback ("On"), pass translated via next-intl.
   */
  datePrefix?: string;
  /** Layout-only className override (no color / typography allowed). */
  className?: string;
}

export function BlogAuthorTag({
  name,
  avatarSrc,
  avatarAlt,
  categoryLabel,
  categoryHref,
  publishedDate,
  publishedByLabel = "Published by",
  inLabel = "in",
  datePrefix = "On",
  className,
}: BlogAuthorTagProps) {
  assertMaxLength("BlogAuthorTag", "name", name, 40);
  if (categoryLabel)
    assertMaxLength("BlogAuthorTag", "categoryLabel", categoryLabel, 40);
  assertNoClassNameOverride("BlogAuthorTag", className, [
    "bg-",
    "text-",
    "font-",
    "rounded-",
    "p-",
    "px-",
    "py-",
  ]);

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-[0.375rem]",
        className,
      )}
    >
      <Text size="sm" align="center" className="text-text-secondary">
        {publishedByLabel}
      </Text>

      <span
        className="inline-flex items-center gap-[0.5rem] rounded-full px-[1rem] py-[0.375rem] text-white"
        style={{ backgroundColor: "var(--color-success-text)" }}
      >
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={avatarAlt ?? ""}
            loading="lazy"
            className="h-[1.6875rem] w-[1.6875rem] rounded-full object-cover shrink-0"
          />
        ) : (
          <span
            aria-hidden="true"
            className="h-[1.6875rem] w-[1.6875rem] rounded-full bg-white/30 shrink-0"
          />
        )}
        <span className="font-bold leading-none">{name}</span>
      </span>

      {(categoryLabel || publishedDate) && (
        <div className="flex flex-col items-center gap-[0.125rem]">
          {categoryLabel && (
            <Text size="sm" align="center" className="text-text-secondary">
              {inLabel}{" "}
              {categoryHref ? (
                <a
                  href={categoryHref}
                  className="text-primary hover:underline focus-visible:underline focus-visible:outline-none"
                >
                  {categoryLabel}
                </a>
              ) : (
                <span className="text-primary">{categoryLabel}</span>
              )}
            </Text>
          )}
          {publishedDate && (
            <Text size="sm" align="center" className="text-text-secondary">
              {datePrefix} {publishedDate}
            </Text>
          )}
        </div>
      )}
    </div>
  );
}
