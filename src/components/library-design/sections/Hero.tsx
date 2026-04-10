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

export interface HeroProps {
  /** Navbar items */
  navItems?: NavItem[];
  navCtaLabel?: string;
  navCtaHref?: string;
  /** Login button in navbar */
  loginLabel?: string;
  loginHref?: string;
  /** Pill tag above the headline */
  topTag?: HeroTag;
  /** Main headline — dark colored portion */
  headline: string;
  /** Gradient-colored portion of the headline (rendered on a new line) */
  headlineGradient?: string;
  /** Dark text appended after the gradient portion */
  headlineSuffix?: string;
  /** Subtitle paragraph below headline */
  subtitle: string;
  /** Primary CTA button */
  primaryCta?: HeroButton;
  /** Secondary CTA button */
  secondaryCta?: HeroButton;
  /** Tags displayed below subtitle (before buttons) */
  bottomTags?: HeroTag[];
  /** Product screenshot/illustration path */
  illustrationSrc?: string;
  illustrationAlt?: string;
  className?: string;
}

export function Hero({
  navItems,
  navCtaLabel,
  navCtaHref,
  loginLabel,
  loginHref,
  topTag,
  headline,
  headlineGradient,
  headlineSuffix,
  subtitle,
  primaryCta,
  secondaryCta,
  bottomTags,
  illustrationSrc,
  illustrationAlt = "",
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative w-full min-h-screen overflow-hidden bg-white",
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
          border: "9.6875rem solid rgba(107,123,233,0.06)",
        }}
      />
      <GradientBackground
        variant="hero"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full z-0"
      />

      {/* Content wrapper — matches Figma "Wrapper Hero" */}
      <div className="relative z-10 flex flex-col items-center gap-[2rem] px-[1.25rem] pt-[1.25rem] md:gap-[3rem] md:px-[2rem] md:pt-[2rem] lg:gap-[4.375rem] lg:px-[2.5rem] lg:pt-[2.5rem]">
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

        {/* Main content — matches Figma "Cont" */}
        <div className="flex flex-col items-center gap-[1.5rem] md:gap-[2rem] lg:gap-[2.5rem] max-w-[93.75rem] w-full">
          {topTag && (
            <Tag variant={topTag.variant ?? "muted"}>
              {topTag.label}
            </Tag>
          )}

          {/* H1 — first part dark, second part gradient */}
          <div className="w-full md:w-[90%] lg:w-[80%]">
          <Heading level={1} gradient="none" align="center">
            {headline}
            {headlineGradient && (
              <>
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "var(--gradient-primary)",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  {headlineGradient}
                </span>
              </>
            )}
            {headlineSuffix && (
              <>
                <br />
                {headlineSuffix}
              </>
            )}
          </Heading>
          </div>

          <Text size="md" align="center" maxWidth="52.9375rem">
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

        {/* Illustration */}
        {illustrationSrc && (
          <div className="w-full flex justify-center">
            <IllustrationFrame
              src={illustrationSrc}
              alt={illustrationAlt}
              className="max-w-[94.8125rem] w-full"
            />
          </div>
        )}
      </div>

      {/* Floating cards — with perpetual bobbing animation */}
      <Float variant={1} duration={4} delay={0} className="absolute z-20 right-[2%] top-[8rem] hidden xl:block">
        <FloatingCard icon={<BullseyeIcon />} />
      </Float>
      <Float variant={2} duration={4.5} delay={0.5} className="absolute z-20 left-[2%] top-[38.875rem] hidden xl:block">
        <FloatingCard icon={<BriefcaseIcon />} />
      </Float>
      <Float variant={3} duration={3.5} delay={1} className="absolute z-20 left-[7%] top-[55rem] hidden xl:block">
        <FloatingCard icon={<CalendarIcon />} />
      </Float>
    </section>
  );
}
