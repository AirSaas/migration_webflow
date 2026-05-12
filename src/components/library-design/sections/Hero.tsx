import { cn } from "@/lib/utils";
import { Tag } from "@/components/library-design/ui/Tag";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { Button } from "@/components/library-design/ui/Button";
import { FloatingCard } from "@/components/library-design/ui/FloatingCard";
import { IllustrationFrame } from "@/components/library-design/ui/IllustrationFrame";
import { GradientBackground } from "@/components/library-design/ui/GradientBackground";
import { Navbar } from "@/components/library-design/ui/Navbar";
import { BullseyeIcon, BriefcaseIcon, CalendarIcon } from "@/components/library-design/ui/icons/floating-card-icons";
import { Float } from "@/components/library-design/ui/Float";
import { GradientText } from "@/components/library-design/ui/GradientText";
import { HeroTabbedMedia, type HeroMediaTab } from "./HeroTabbedMedia";

export type { HeroMediaTab } from "./HeroTabbedMedia";

interface HeroButton {
  label: string;
  href: string;
}

interface HeroTag {
  label: string;
  variant?: "muted" | "success";
}

interface NavItem {
  label: string;
  href?: string;
  hasDropdown?: boolean;
}

/**
 * Hero
 *
 * @purpose    First section of a page: navbar + title + subtitle + CTAs + illustration.
 *             Supports a static screenshot (`imageSrc`) OR an animated tabbed
 *             dashboard switcher (`mediaTabs`, 3–8 product views auto-cycled).
 * @useWhen    Top of every marketing / product / solution page. For product
 *             LPs (PPM, PMO, capacity-planning, pi-planning, etc.) clone one
 *             of the two canonical blueprint stories — `LandingWithDashboard`
 *             (static screen) or `LandingWithTabbedDashboards` (animated
 *             multi-view switcher) — and swap copy/assets. The blueprint
 *             reference example is the live `/fr/lp/ppm` page.
 * @dontUse    As a mid-page section — that's what FeatureFrame / ValuePropositionFrame are for.
 *             Only one <Hero> per page.
 *             `mediaTabs` is incompatible with `layout="split"` (the split
 *             layout has no room for a tab row beside the text column).
 *
 * @limits
 *   - title: max 60 chars
 *   - titleHighlight: max 30 chars
 *   - titleSuffix: max 30 chars
 *   - subtitle: max 220 chars
 *   - eyebrow: max 30 chars (uppercase, tracking)
 *   - navItems: 2–7 top-level items
 *   - bottomTags: 0–6 (live LP PPM has 5 trust badges; cap at 6 — past 6 the row wraps awkwardly on tablet)
 *   - mediaTabs: 3–8 tabs, each label ≤ 16 chars, all images same aspect ratio
 *
 * @forbidden
 *   - Do NOT render multiple <Hero> on a single page
 *   - Do NOT pass className that changes the min-h-screen or background
 *   - Do NOT pass both `imageSrc` and `mediaTabs` — `mediaTabs` wins and the
 *     static `imageSrc` is ignored (warn in dev)
 *   - Do NOT combine `mediaTabs` with `layout="split"`
 *
 * @figma node-id 115-12821 (typography scale) + site templates
 */
export interface HeroProps {
  /** Visual variant — light (default) renders on white, dark renders on primary-70 */
  variant?: "light" | "dark";
  /** Layout — centered (default, stacked) or split (text left, illustration right) */
  layout?: "centered" | "split";
  /** Small uppercase label above the title (e.g. "SOLUTION") with an orange accent */
  eyebrow?: string;
  /** Navbar items */
  navItems?: NavItem[];
  navCtaLabel?: string;
  navCtaHref?: string;
  /** Login button in navbar */
  loginLabel?: string;
  loginHref?: string;
  /** Pill tag above the title */
  topTag?: HeroTag;
  /** Main title — dark colored portion */
  title: string;
  /** Gradient-colored portion of the title (rendered on a new line) */
  titleHighlight?: string;
  /** Dark text appended after the gradient portion */
  titleSuffix?: string;
  /** Subtitle paragraph below title */
  subtitle: string;
  /** Primary CTA button */
  primaryCta?: HeroButton;
  /** Secondary CTA button */
  secondaryCta?: HeroButton;
  /** Tags displayed below subtitle (before buttons) */
  bottomTags?: HeroTag[];
  /** Product screenshot/illustration path. Ignored when `mediaTabs` is provided. */
  imageSrc?: string;
  imageAlt: string;
  /** Optional Tailwind className override for the IllustrationFrame element.
   *  Default: "max-w-[94.8125rem] w-full". */
  imageClassName?: string;
  /** Optional extra Tailwind classes for the wrapper around the illustration.
   *  Use this to add lateral padding so the white frame sits inside the gradient
   *  with margin from the screen edges (e.g. "px-4 md:px-10 lg:px-20"). */
  imageWrapperClassName?: string;
  /** Animated tabbed media: a row of icon+label tabs whose active item swaps
   *  the dashboard screenshot. When provided, replaces `imageSrc`.
   *  Only supported with `layout="centered"`. */
  mediaTabs?: HeroMediaTab[];
  /** Auto-cycle through media tabs. Default `true`. Pauses on interaction
   *  and when `prefers-reduced-motion: reduce`. */
  mediaAutoRotate?: boolean;
  /** Tab rotation interval in ms. Default `4000`. */
  mediaRotateInterval?: number;
  /** Localized aria-label for the media tablist. */
  mediaTabsAriaLabel?: string;
  /** Decorative floating cards (bullseye / briefcase / calendar icons).
   *  Default `true`. Pass `false` on hero variants where the extra chrome
   *  distracts from a text-only composition (e.g. blog index hero). */
  floatingCards?: boolean;
  className?: string;
}

export function Hero({
  variant = "light",
  layout = "centered",
  eyebrow,
  navItems,
  navCtaLabel,
  navCtaHref,
  loginLabel,
  loginHref,
  topTag,
  title,
  titleHighlight,
  titleSuffix,
  subtitle,
  primaryCta,
  secondaryCta,
  bottomTags,
  imageSrc,
  imageAlt,
  imageClassName = "max-w-[94.8125rem] w-full",
  imageWrapperClassName = "px-4 md:px-8 lg:px-16",
  mediaTabs,
  mediaAutoRotate = true,
  mediaRotateInterval = 4000,
  mediaTabsAriaLabel,
  floatingCards = true,
  className,
}: HeroProps) {
  const isDark = variant === "dark";
  const isSplit = layout === "split";
  const hasTabs = Boolean(mediaTabs && mediaTabs.length > 0);

  if (process.env.NODE_ENV === "development") {
    if (hasTabs && isSplit) {
      // eslint-disable-next-line no-console
      console.warn(
        "[DS] Hero: `mediaTabs` is not supported with layout=\"split\" — tab switcher will be hidden. Use layout=\"centered\".",
      );
    }
    if (hasTabs && imageSrc) {
      // eslint-disable-next-line no-console
      console.warn(
        "[DS] Hero: both `imageSrc` and `mediaTabs` were provided — `mediaTabs` wins and `imageSrc` is ignored.",
      );
    }
  }

  return (
    <section
      className={cn(
        "relative w-full min-h-screen overflow-hidden",
        isDark ? "bg-primary-70" : "bg-white",
        className
      )}
    >
      {/* Ellipse background — subtle ring offset to the right */}
      <div
        className="absolute pointer-events-none z-0"
        aria-hidden="true"
        style={{
          width: "78.125rem",
          height: "78.125rem",
          top: "45%",
          right: "-18rem",
          transform: "translateY(-50%)",
          borderRadius: "50%",
          border: isDark
            ? "9.6875rem solid var(--color-white-alpha-6)"
            : "9.6875rem solid var(--color-primary-70-alpha-6)",
        }}
      />
      <GradientBackground
        variant={isDark ? "hero-dark" : "hero"}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full z-0"
      />

      {/* Content wrapper — matches Figma "Wrapper Hero" */}
      <div
        className={cn(
          "relative z-10 flex flex-col items-center gap-[2rem] px-[1.25rem] pt-[1.25rem] md:gap-[3rem] md:px-[2rem] md:pt-[2rem] lg:gap-[4.375rem] lg:pt-[2.5rem]",
          isSplit
            ? "lg:pl-[5rem] lg:pr-[2.5rem] xl:pl-[7rem] pb-[3.5rem] md:pb-[5rem] lg:pb-[7rem]"
            : "lg:px-[2.5rem] pb-0",
        )}
      >
        {/* Navbar */}
        {navItems && (
          <Navbar
            items={navItems}
            ctaLabel={navCtaLabel}
            ctaHref={navCtaHref}
            loginLabel={loginLabel}
            loginHref={loginHref}
          />
        )}

        {/* Main content */}
        {isSplit ? (
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,40%)_minmax(0,60%)] gap-[2.5rem] lg:gap-[4rem] items-start max-w-[93.75rem] w-full pt-[2rem] lg:pt-[4rem]">
            {/* Text column */}
            <div className="flex flex-col items-start gap-[1.25rem] md:gap-[1.75rem] lg:gap-[2rem] text-left">
              {eyebrow && (
                <span
                  className={cn(
                    "inline-flex items-center uppercase tracking-[0.1em] font-medium rounded-[1.5625rem]",
                    isDark ? "bg-white text-primary" : "bg-primary-5 text-primary",
                  )}
                  style={{ padding: "0.375rem 1rem", fontSize: "0.8125rem" }}
                >
                  {eyebrow}
                </span>
              )}
              {topTag && (
                <Tag variant={topTag.variant ?? "muted"}>
                  {topTag.label}
                </Tag>
              )}

              <Heading
                level={1}
                gradient="none"
                align="left"
                className={isDark ? "text-white" : undefined}
              >
                {title}
                {titleHighlight && (
                  <>
                    {" "}
                    {isDark ? (
                      titleHighlight
                    ) : (
                      <GradientText gradient="primary">{titleHighlight}</GradientText>
                    )}
                  </>
                )}
                {titleSuffix && (
                  <>
                    {" "}
                    {titleSuffix}
                  </>
                )}
              </Heading>

              <Text
                size="md"
                align="left"
                className={isDark ? "text-white" : undefined}
              >
                {subtitle}
              </Text>

              {bottomTags && bottomTags.length > 0 && (
                <div className="flex items-center gap-[1.2175rem] flex-wrap">
                  {bottomTags.map((tag, i) => (
                    <Tag key={i} variant={tag.variant ?? "success"}>
                      {tag.label}
                    </Tag>
                  ))}
                </div>
              )}

              {(primaryCta || secondaryCta) && (
                <div className="flex flex-col items-start gap-[0.75rem] sm:flex-row sm:gap-[0.9375rem] flex-wrap">
                  {primaryCta && (
                    <Button variant="primary" size="md" href={primaryCta.href}>
                      {primaryCta.label}
                    </Button>
                  )}
                  {secondaryCta && (
                    <Button variant={isDark ? "tertiary" : "secondary"} size="md" href={secondaryCta.href}>
                      {secondaryCta.label}
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Illustration column — bleeds aggressively past the right edge (print-style sangrado).
                The frame is oversized relative to its column and starts at the column's left edge,
                so its right portion is clipped by the section's overflow-hidden boundary. */}
            {imageSrc && (
              <div className="w-full flex justify-center lg:block lg:mr-[-4rem] xl:mr-[-8rem] 2xl:mr-[-12rem]">
                <IllustrationFrame
                  src={imageSrc}
                  alt={imageAlt}
                  shape="contained"
                  className="w-full lg:w-[105%] xl:w-[115%] 2xl:w-[125%] lg:max-w-none shrink-0"
                />
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-[1.5rem] md:gap-[2rem] lg:gap-[2.5rem] max-w-[93.75rem] w-full">
              {topTag && (
                <Tag variant={topTag.variant ?? "muted"}>
                  {topTag.label}
                </Tag>
              )}

              {/* H1 — first part dark, second part gradient (light) or all-white (dark) */}
              <div className="w-full md:w-[90%] lg:w-[80%]">
              <Heading
                level={1}
                gradient="none"
                align="center"
                className={isDark ? "text-white" : undefined}
              >
                {title}
                {titleHighlight && (
                  <>
                    <br />
                    {isDark ? (
                      titleHighlight
                    ) : (
                      <GradientText gradient="primary">{titleHighlight}</GradientText>
                    )}
                  </>
                )}
                {titleSuffix && (
                  <>
                    <br />
                    {titleSuffix}
                  </>
                )}
              </Heading>
              </div>

              <Text
                size="md"
                align="center"
                maxWidth="52.9375rem"
                className={isDark ? "text-white" : undefined}
              >
                {subtitle}
              </Text>

              {/* Bottom tags — rendered BEFORE buttons per reference */}
              {bottomTags && bottomTags.length > 0 && (
                <div className="flex items-center gap-[1.2175rem] flex-wrap justify-center">
                  {bottomTags.map((tag, i) => (
                    <Tag key={i} variant={tag.variant ?? "success"}>
                      {tag.label}
                    </Tag>
                  ))}
                </div>
              )}

              {/* CTA Buttons — rendered AFTER tags per reference */}
              {(primaryCta || secondaryCta) && (
                <div className="flex flex-col items-center gap-[0.75rem] sm:flex-row sm:gap-[0.9375rem] flex-wrap justify-center">
                  {primaryCta && (
                    <Button variant="primary" size="md" href={primaryCta.href}>
                      {primaryCta.label}
                    </Button>
                  )}
                  {secondaryCta && (
                    <Button variant="secondary" size="md" href={secondaryCta.href}>
                      {secondaryCta.label}
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Illustration — tabbed switcher takes precedence over a static image */}
            {hasTabs ? (
              <div className={cn("w-full flex justify-center", imageWrapperClassName)}>
                <HeroTabbedMedia
                  tabs={mediaTabs!}
                  autoRotate={mediaAutoRotate}
                  rotateInterval={mediaRotateInterval}
                  ariaLabel={mediaTabsAriaLabel}
                />
              </div>
            ) : imageSrc ? (
              <div className={cn("w-full flex justify-center", imageWrapperClassName)}>
                <IllustrationFrame
                  src={imageSrc}
                  alt={imageAlt}
                  className={imageClassName}
                />
              </div>
            ) : null}
          </>
        )}
      </div>

      {/* Floating cards — positioned for the centered layout (stacked hero) */}
      {floatingCards && !isSplit && (
        <>
          <Float variant={1} duration={4} delay={0} className="absolute z-20 right-[2%] top-[8rem] hidden xl:block">
            <FloatingCard icon={<BullseyeIcon />} />
          </Float>
          <Float variant={2} duration={4.5} delay={0.5} className="absolute z-20 left-[2%] top-[38.875rem] hidden xl:block">
            <FloatingCard icon={<BriefcaseIcon />} />
          </Float>
          <Float variant={3} duration={3.5} delay={1} className="absolute z-20 left-[7%] top-[55rem] hidden xl:block">
            <FloatingCard icon={<CalendarIcon />} />
          </Float>
        </>
      )}

      {/* Floating cards — positioned for the split layout (one over the navbar area,
          one near the bottom of the illustration) */}
      {floatingCards && isSplit && (
        <>
          <Float variant={1} duration={4} delay={0} className="absolute z-20 left-[45%] top-[9.5rem] hidden lg:block">
            <FloatingCard icon={<BullseyeIcon />} />
          </Float>
          <Float variant={2} duration={4.5} delay={0.5} className="absolute z-20 right-[18%] bottom-[2rem] hidden lg:block">
            <FloatingCard icon={<CalendarIcon />} />
          </Float>
        </>
      )}
    </section>
  );
}
