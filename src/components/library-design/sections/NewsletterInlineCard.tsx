import { cn } from "@/lib/utils";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { Button } from "@/components/library-design/ui/Button";
import {
  assertMaxLength,
  assertNoClassNameOverride,
} from "@/lib/ds-validators";

/**
 * NewsletterInlineCard
 *
 * @purpose    Inline blog newsletter signup — primary-tinted card with title +
 *             subtitle + email field + submit button + optional privacy line.
 *             Inserted between the article body and the closing CTA on long-form
 *             editorial pages to capture lead intent mid-read.
 * @useWhen    Blog article pages with substantial body length. Pass content via
 *             props (locale-driven). One per page.
 * @dontUse    As a top-of-page hero (use <Hero>). As a footer signup (the
 *             marketing footer already has an inline form). On non-blog pages.
 *
 * @limits
 *   - title: max 80 chars
 *   - subtitle: max 200 chars
 *   - placeholder: max 60 chars
 *   - ctaLabel: max 30 chars
 *   - privacyText: max 200 chars
 *
 * @forbidden
 *   - The form is non-functional in v0 (no submit handler) — caller MUST wire
 *     onSubmit when integrating with HubSpot / Mailchimp / Strapi. Do NOT ship
 *     to production without a real handler.
 *   - Do NOT pass className with bg / text / padding overrides — the lavender
 *     surface + primary border are part of the contract.
 *   - Do NOT render multiple newsletter cards inline within the same article.
 */
interface NewsletterInlineCardProps {
  title: string;
  subtitle?: string;
  placeholder?: string;
  ctaLabel: string;
  privacyText?: string;
  /**
   * Layout-only className override. No bg / text / padding allowed (DS contract).
   */
  className?: string;
}

export function NewsletterInlineCard({
  title,
  subtitle,
  placeholder = "votre@email.com",
  ctaLabel,
  privacyText,
  className,
}: NewsletterInlineCardProps) {
  assertMaxLength("NewsletterInlineCard", "title", title, 80);
  if (subtitle) assertMaxLength("NewsletterInlineCard", "subtitle", subtitle, 200);
  assertMaxLength("NewsletterInlineCard", "placeholder", placeholder, 60);
  assertMaxLength("NewsletterInlineCard", "ctaLabel", ctaLabel, 30);
  if (privacyText)
    assertMaxLength("NewsletterInlineCard", "privacyText", privacyText, 200);
  assertNoClassNameOverride("NewsletterInlineCard", className, [
    "bg-",
    "text-",
    "p-",
    "px-",
    "py-",
  ]);

  return (
    <aside
      className={cn(
        "w-full rounded-[1.5625rem] border border-primary-40 bg-primary-2 px-[1.5rem] py-[2rem] md:px-[2.5rem] md:py-[2.5rem] flex flex-col items-center gap-[1rem] md:gap-[1.25rem]",
        className,
      )}
    >
      <Heading level={3} gradient="none" align="center">
        {title}
      </Heading>
      {subtitle && (
        <Text size="md" align="center" maxWidth="42rem">
          {subtitle}
        </Text>
      )}
      <form
        className="flex flex-col gap-[0.625rem] w-full max-w-[34rem] sm:flex-row sm:gap-[0.75rem]"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="flex-1">
          <span className="sr-only">{placeholder}</span>
          <input
            type="email"
            required
            placeholder={placeholder}
            className="w-full rounded-[1.25rem] border border-primary-20 bg-white px-[1rem] py-[0.75rem] text-foreground placeholder:text-text-muted focus-visible:outline-none focus-visible:border-primary"
          />
        </label>
        <Button type="submit" variant="primary" size="md">
          {ctaLabel}
        </Button>
      </form>
      {privacyText && (
        <Text size="sm" align="center" className="text-text-muted">
          {privacyText}
        </Text>
      )}
    </aside>
  );
}
