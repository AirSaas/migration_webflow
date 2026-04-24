import { cn } from "@/lib/utils";
import { Tag } from "@/components/library-design/ui/Tag";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { GradientText } from "@/components/library-design/ui/GradientText";
import {
  Button,
  type ButtonVariant,
} from "@/components/library-design/ui/Button";
import {
  assertArrayBounds,
  assertMaxLength,
  assertNoClassNameOverride,
} from "@/lib/ds-validators";

export interface RelatedSolution {
  /** Landscape screenshot / illustration URL (16/10 aspect ratio). */
  imageSrc: string;
  /** Required alt text. Pass empty string `""` only for purely decorative images. */
  imageAlt: string;
  /** Card heading (H4). */
  title: string;
  /** One-to-two-line description under the title. */
  description: string;
  /** Destination URL for the card — title and explicit link share the same href. */
  href: string;
}

/**
 * RelatedSolutionsFrame
 *
 * @purpose    Cross-sell grid — 3 image-first cards each linking to a related
 *             solution or product. Rendered at the bottom (or top) of LP,
 *             Produit, and Solution pages to surface "other relevant
 *             features". Grid locked at 3 columns on desktop; optional
 *             collection CTA below links to the full platform directory.
 * @useWhen    Surfacing 3 related solutions/products with a screenshot +
 *             title + short description + "Voir plus" link. Typical footer
 *             cross-sell on landing / product / solution pages.
 * @dontUse    For icon-first feature grids (use <ValuePropositionFrame> +
 *             <FeatureCard>). For blog-style previews with author bylines
 *             (use <BlogCard>). For quick CTA choices with only a button
 *             (use <CtaFrame> + <CardCta>).
 *
 * @limits
 *   - tag: max 24 chars
 *   - titleHighlight: max 40 chars
 *   - title: max 80 chars
 *   - subtitle: max 260 chars
 *   - solutions: exactly 3 items (grid locked to 3 columns on desktop)
 *   - solution.title: max 40 chars
 *   - solution.description: max 120 chars
 *   - solution.imageAlt: required (empty `""` only for decorative)
 *   - linkLabel: max 18 chars
 *   - collectionCtaLabel: max 36 chars
 *
 * @forbidden
 *   - Do NOT pass className with bg / text / font / padding overrides
 *   - Do NOT hardcode linkLabel / collectionCtaLabel locale copy — pass via i18n
 *   - Do NOT nest another RelatedSolutionsFrame inside a card
 *   - Do NOT pass fewer or more than 3 solutions (grid breaks)
 */

interface RelatedSolutionsFrameProps {
  variant?: "light" | "tinted";
  tag?: string;
  /** Primary-gradient portion of the title (rendered FIRST). */
  titleHighlight?: string;
  /** Dark-to-primary gradient portion of the title (rendered AFTER highlight). */
  title: string;
  subtitle?: string;
  solutions: RelatedSolution[];
  /**
   * Label for the per-card "View more" link. Default "View more" (English
   * fallback) — pass translated via next-intl for production locales.
   */
  linkLabel?: string;
  /**
   * Label for the optional CTA below the grid that links to the full
   * collection / directory. When both label + href are provided, the CTA is
   * shown; otherwise it is omitted. Locale-driven — no default, pass i18n.
   */
  collectionCtaLabel?: string;
  /** Destination URL for the collection CTA. */
  collectionCtaHref?: string;
  /** Visual style for the collection CTA. Default "tertiary" (outline). */
  collectionCtaVariant?: ButtonVariant;
  className?: string;
}

export function RelatedSolutionsFrame({
  variant = "light",
  tag,
  titleHighlight,
  title,
  subtitle,
  solutions,
  linkLabel = "View more",
  collectionCtaLabel,
  collectionCtaHref,
  collectionCtaVariant = "tertiary",
  className,
}: RelatedSolutionsFrameProps) {
  if (tag) assertMaxLength("RelatedSolutionsFrame", "tag", tag, 24);
  if (titleHighlight)
    assertMaxLength(
      "RelatedSolutionsFrame",
      "titleHighlight",
      titleHighlight,
      40,
    );
  assertMaxLength("RelatedSolutionsFrame", "title", title, 80);
  if (subtitle)
    assertMaxLength("RelatedSolutionsFrame", "subtitle", subtitle, 260);
  assertArrayBounds("RelatedSolutionsFrame", "solutions", solutions, 3, 3);
  solutions.forEach((s, i) => {
    assertMaxLength(
      "RelatedSolutionsFrame",
      `solutions[${i}].title`,
      s.title,
      40,
    );
    assertMaxLength(
      "RelatedSolutionsFrame",
      `solutions[${i}].description`,
      s.description,
      120,
    );
  });
  assertMaxLength("RelatedSolutionsFrame", "linkLabel", linkLabel, 18);
  if (collectionCtaLabel)
    assertMaxLength(
      "RelatedSolutionsFrame",
      "collectionCtaLabel",
      collectionCtaLabel,
      36,
    );
  assertNoClassNameOverride("RelatedSolutionsFrame", className, [
    "bg-",
    "text-",
    "font-",
    "p-",
  ]);

  const isTinted = variant === "tinted";
  const showCta = Boolean(collectionCtaLabel && collectionCtaHref);

  return (
    <section
      className={cn(
        "flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:gap-[2.5rem] md:px-[3rem] md:py-[4rem] lg:gap-[3.125rem] lg:px-[10rem] lg:py-[6.25rem]",
        isTinted ? "bg-primary-2" : "bg-white",
        className,
      )}
    >
      {tag && <Tag variant="muted">{tag}</Tag>}

      <div className="flex flex-col items-center gap-[1rem] md:gap-[1.25rem] text-center">
        <Heading level={2} gradient="none" align="center">
          {titleHighlight && (
            <GradientText gradient="primary">{titleHighlight}</GradientText>
          )}
          {titleHighlight && " "}
          <GradientText gradient="dark-to-primary">{title}</GradientText>
        </Heading>

        {subtitle && (
          <Text size="md" align="center" maxWidth="60rem">
            {subtitle}
          </Text>
        )}
      </div>

      <div className="grid w-full grid-cols-1 items-stretch gap-[1.5rem] md:grid-cols-2 lg:grid-cols-3">
        {solutions.map((s, i) => (
          <SolutionCard key={i} solution={s} linkLabel={linkLabel} />
        ))}
      </div>

      {showCta && (
        <Button
          variant={collectionCtaVariant}
          size="md"
          href={collectionCtaHref}
        >
          {collectionCtaLabel}
        </Button>
      )}
    </section>
  );
}

function SolutionCard({
  solution,
  linkLabel,
}: {
  solution: RelatedSolution;
  linkLabel: string;
}) {
  const isDecorative = solution.imageAlt === "";

  return (
    <article className="flex h-full flex-col gap-[0.9375rem] overflow-hidden rounded-[1.25rem] border border-secondary-10 bg-white p-[1.5625rem] transition-shadow duration-300 hover:shadow-card-hover">
      <div className="relative w-full overflow-hidden rounded-[0.625rem] aspect-[16/10]">
        <img
          src={solution.imageSrc}
          alt={solution.imageAlt}
          loading="lazy"
          {...(isDecorative ? { "aria-hidden": true as const } : {})}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-[0.5rem]">
        <Heading level={4} gradient="none" align="left">
          <a
            href={solution.href}
            className="transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none"
          >
            {solution.title}
          </a>
        </Heading>

        <Text size="sm" align="left">
          {solution.description}
        </Text>
      </div>

      <a
        href={solution.href}
        className="mt-auto inline-flex items-center gap-[0.375rem] pt-[0.5rem] text-primary transition-colors hover:text-primary-dark focus-visible:text-primary-dark focus-visible:outline-none"
      >
        <span className="font-bold text-micro-xl">{linkLabel}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 6L15 12L9 18"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </article>
  );
}
