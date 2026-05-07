"use client";

import type { ReactNode } from "react";
import { Hero } from "@/components/library-design/sections/Hero";
import { FeatureFrame } from "@/components/library-design/sections/FeatureFrame";
import { FaqFrame } from "@/components/library-design/sections/FaqFrame";
import { CtaHighlightFrame } from "@/components/library-design/sections/CtaHighlightFrame";
import { ValuePropositionFrame } from "@/components/library-design/sections/ValuePropositionFrame";
import { TestimonialsFrame } from "@/components/library-design/sections/TestimonialsFrame";
import { ComparisonTableFrame } from "@/components/library-design/sections/ComparisonTableFrame";
import { StepsFrame } from "@/components/library-design/sections/StepsFrame";
import { TabsFrame } from "@/components/library-design/sections/TabsFrame";
import { ComparisonFrame } from "@/components/library-design/sections/ComparisonFrame";
import { PillarFrame } from "@/components/library-design/sections/PillarFrame";
import { HighlightFrame } from "@/components/library-design/sections/HighlightFrame";
import { FeatureSectionStacked } from "@/components/library-design/sections/FeatureSectionStacked";
import { IconRowFrame } from "@/components/library-design/sections/IconRowFrame";
import { CtaFrame } from "@/components/library-design/sections/CtaFrame";
import { RelatedSolutionsFrame } from "@/components/library-design/sections/RelatedSolutionsFrame";
import { CardCta } from "@/components/library-design/ui/CardCta";
import { IconBadge } from "@/components/library-design/ui/IconBadge";
import { Footer } from "@/components/library-design/sections/Footer";
import { PAGES as SOLUTION_PAGES } from "@/data/landings-v2/solutions";
import { PAGES as PRODUIT_PAGES } from "@/data/landings-v2/produit";
import { LogosBar } from "@/components/library-design/ui/LogosBar";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { FeatureCard } from "@/components/library-design/ui/FeatureCard";
import { ListInline } from "@/components/library-design/ui/ListInline";
import { TestimonialCard } from "@/components/library-design/ui/TestimonialCard";
import { Tag } from "@/components/library-design/ui/Tag";
import { Button } from "@/components/library-design/ui/Button";
import {
  GearsIcon,
  CalendarDayIcon,
  BullseyeArrowIcon,
  SuitcaseIcon,
  ChevronCircleIcon,
  StopwatchIcon,
  CalendarStarIcon,
  BoltLightningIcon,
  CommentsIcon,
  IndustryIcon,
  LockKeyholeIcon,
  CircleCheckIcon,
  CircleXmarkIcon,
  BanIcon,
  CirclePlusIcon,
  ArrowsRotateIcon,
  AtomIcon,
  DollyIcon,
  ClipboardCheckIcon,
  FlagCheckeredIcon,
} from "@/components/library-design/ui/icons/illustration-icons";
import { IconIllustration } from "@/components/library-design/ui/IconIllustration";
import { BLOG_INDEX_DATA } from "@/data/blog";
import type { LandingPage, LandingSection } from "@/types/landing";

const ICON_BY_NAME: Record<string, React.ComponentType> = {
  gears: GearsIcon,
  "calendar-day": CalendarDayIcon,
  "bullseye-arrow": BullseyeArrowIcon,
  suitcase: SuitcaseIcon,
  "chevron-circle": ChevronCircleIcon,
  stopwatch: StopwatchIcon,
  "calendar-star": CalendarStarIcon,
  "bolt-lightning": BoltLightningIcon,
  comments: CommentsIcon,
  industry: IndustryIcon,
  "lock-keyhole": LockKeyholeIcon,
  "circle-check": CircleCheckIcon,
  "circle-xmark": CircleXmarkIcon,
  ban: BanIcon,
  "circle-plus": CirclePlusIcon,
  "arrows-rotate": ArrowsRotateIcon,
  atom: AtomIcon,
  dolly: DollyIcon,
  "clipboard-check": ClipboardCheckIcon,
  "flag-checkered": FlagCheckeredIcon,
};

function iconNode(iconName: string | undefined, fallback: React.ComponentType = GearsIcon) {
  const Cmp = (iconName && ICON_BY_NAME[iconName]) || fallback;
  return (
    <IconIllustration variant="dark" size="lg">
      <Cmp />
    </IconIllustration>
  );
}

const PLACEHOLDER_HERO =
  "https://placehold.co/1200x700/e8eafc/3a51e2?text=AirSaas";
const PLACEHOLDER_SECTION =
  "https://placehold.co/900x600/e8eafc/3a51e2?text=AirSaas";

function RichSpan({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

// R46 audit Marisella : prompt v4 sometimes leaks <strong>/<em>/<a> tags
// into title fields where the renderer expects plain text. Strip inline HTML
// for plain-text title-like props (Heading children render text verbatim).
function stripTags(s: string | null | undefined): string {
  if (!s) return "";
  return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function stripTagsOpt(s: string | null | undefined): string | undefined {
  if (s == null) return undefined;
  const out = stripTags(s);
  return out || undefined;
}

function renderSection(
  section: LandingSection,
  index: number,
  pageType: LandingPage["type"] = "lp",
): ReactNode {
  switch (section.type) {
    case "hero": {
      // If no real image, use centered text-only layout (LP-style); avoid
      // rendering placehold.co which is jarring.
      const hasImage = !!section.imageSrc;
      // Map bullets (string[]) into bottomTags (HeroTag[]). Cap at 6 (DS limit
      // post Marianela bump from 0-4 to 0-6).
      const bottomTags = (section.bullets || [])
        .slice(0, 6)
        .map((label) => ({ label, variant: "success" as const }));
      // R23 audit Marisella : produit pages render hero on dark blue + halo.
      const heroVariant = pageType === "produit" ? "dark" : "light";
      return (
        <Hero
          key={index}
          variant={heroVariant}
          layout={hasImage ? "split" : "centered"}
          navItems={BLOG_INDEX_DATA.navItems}
          navCtaLabel={BLOG_INDEX_DATA.navCtaLabel}
          navCtaHref={BLOG_INDEX_DATA.navCtaHref}
          loginLabel={BLOG_INDEX_DATA.loginLabel}
          loginHref={BLOG_INDEX_DATA.loginHref}
          eyebrow={section.tag}
          title={section.title}
          titleHighlight={section.titleHighlight || undefined}
          titleSuffix={section.titleSuffix || undefined}
          subtitle={section.subtitle || ""}
          primaryCta={section.primaryCta || undefined}
          secondaryCta={section.secondaryCta || undefined}
          bottomTags={bottomTags.length > 0 ? bottomTags : undefined}
          imageSrc={hasImage ? section.imageSrc || undefined : undefined}
          imageAlt={section.imageAlt || ""}
          floatingCards={false}
        />
      );
    }

    case "intro": {
      const level = (section.headingLevel ?? 2) as 2 | 3 | 4;
      const subSections = section.subSections || [];
      // Skip empty intros
      if (!section.title && !section.body && subSections.length === 0) return null;
      return (
        <section
          key={index}
          className="flex flex-col items-center gap-[1.5rem] px-[1.5rem] py-[3rem] md:px-[3rem] md:py-[5rem] lg:px-[10rem] lg:py-[6.25rem] bg-white"
        >
          {section.title ? (
            <Heading level={level} align="center">
              {section.title}
            </Heading>
          ) : null}
          {section.body ? (
            <Text size="md" align="center" maxWidth="52.9375rem">
              <RichSpan html={section.body} />
            </Text>
          ) : null}
          {subSections.length > 0 ? (
            <div className="flex flex-col items-center gap-[2rem] w-full max-w-[52.9375rem] mt-[1rem]">
              {subSections.map((ss, i) => (
                <div key={i} className="flex flex-col items-center gap-[0.75rem]">
                  {ss.title ? (
                    <Heading level={3} align="center">
                      {ss.title}
                    </Heading>
                  ) : null}
                  {ss.body ? (
                    <Text size="md" align="center" maxWidth="52.9375rem">
                      <RichSpan html={ss.body} />
                    </Text>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </section>
      );
    }

    case "feature-split": {
      const hasImage = !!section.imageSrc;
      // If no image, render as text-only intro variant (avoid placehold.co)
      if (!hasImage) {
        return (
          <section
            key={index}
            className="flex flex-col items-center gap-[1rem] px-[1.5rem] py-[2.5rem] md:px-[3rem] md:py-[3.5rem] lg:px-[10rem] lg:py-[4rem] bg-white text-center"
          >
            <Heading level={3} align="center">
              {section.title}
            </Heading>
            {section.body ? (
              <Text size="md" align="center" maxWidth="52.9375rem">
                <RichSpan html={section.body} />
              </Text>
            ) : null}
          </section>
        );
      }
      return (
        <FeatureFrame
          key={index}
          layout="inline"
          imagePosition={section.reversed ? "left" : "right"}
          title={section.title}
          richContent={
            <div className="flex flex-col gap-[0.75rem]">
              {section.body ? (
                <Text size="md">
                  <RichSpan html={section.body} />
                </Text>
              ) : null}
              {section.bullets && section.bullets.length > 0 ? (
                <div className="flex flex-col gap-[0.5rem] mt-[0.5rem]">
                  {section.bullets.map((b, i) => (
                    <ListInline key={i} bullet="circle-primary">
                      <RichSpan html={b} />
                    </ListInline>
                  ))}
                </div>
              ) : null}
            </div>
          }
          imageSrc={section.imageSrc!}
          imageAlt={section.imageAlt ?? ""}
        />
      );
    }

    case "pain-points":
      return (
        <section
          key={index}
          className="flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:px-[3rem] md:py-[5rem] lg:px-[10rem] lg:py-[6.25rem] bg-white"
        >
          <div className="flex flex-col items-center gap-[1rem] text-center">
            {section.emoji ? (
              <div className="text-5xl" aria-hidden="true">{section.emoji}</div>
            ) : null}
            <Heading level={2} align="center">
              {section.title}
            </Heading>
            {section.subtitle ? (
              <Text size="md" align="center" maxWidth="52.9375rem">
                {section.subtitle}
              </Text>
            ) : null}
          </div>
          <div className="flex flex-col gap-[1rem] max-w-[50rem] w-full">
            {section.items.map((item, i) => (
              <ListInline key={i} bullet="circle-primary">
                <RichSpan html={item} />
              </ListInline>
            ))}
          </div>
        </section>
      );

    case "stats": {
      const cols = Math.min(4, Math.max(2, section.items.length)) as 2 | 3 | 4;
      return (
        <ValuePropositionFrame
          key={index}
          title={section.title || "Nos chiffres"}
          subtitle={section.subtitle}
          columns={cols}
        >
          {section.items.map((s, i) => (
            <FeatureCard key={i} title={s.value} description={s.label} />
          ))}
        </ValuePropositionFrame>
      );
    }

    case "logo-bar": {
      if (!section.logos || section.logos.length === 0) return null;
      // R44 audit Marisella : équipes pages render the client logos with
      // a white chrome card (border + bg) so the trust strip stands out.
      const useChrome = pageType === "equipe" || section.variant === "client";
      return (
        <section
          key={index}
          className="flex flex-col items-center gap-[1.5rem] px-[1.5rem] py-[2.5rem] md:px-[3rem] md:py-[3.5rem] lg:px-[10rem] lg:py-[4.5rem] bg-primary-2"
        >
          {section.title ? (
            <Heading level={2} align="center">
              {section.title}
            </Heading>
          ) : null}
          {useChrome ? (
            <div className="w-full max-w-[91.25rem] rounded-[1.25rem] border border-primary-20 bg-white px-[1.5rem] py-[2rem] md:px-[2.5rem] md:py-[2.5rem]">
              <LogosBar
                logos={section.logos.slice(0, 12).map((logo) => ({
                  src: logo.src,
                  alt: logo.alt || "",
                }))}
                size="lg"
                variant="plain"
                preserveColor
              />
            </div>
          ) : (
            <LogosBar
              logos={section.logos.slice(0, 12).map((logo) => ({
                src: logo.src,
                alt: logo.alt || "",
              }))}
              size="lg"
            />
          )}
        </section>
      );
    }

    case "press-quotes":
      if (!section.quotes || section.quotes.length === 0) return null;
      return (
        <section
          key={index}
          className="flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:px-[3rem] md:py-[5rem] lg:px-[10rem] lg:py-[6.25rem] bg-white"
        >
          {section.title ? (
            <Heading level={2} align="center">
              {section.title}
            </Heading>
          ) : null}
          <div className="grid grid-cols-1 gap-[1.5rem] sm:grid-cols-2 lg:grid-cols-3 w-full max-w-[91.25rem]">
            {section.quotes.slice(0, 6).map((q, i) => (
              <div
                key={i}
                className="flex flex-col gap-[1rem] p-[1.5rem] rounded-[1rem] bg-primary-2"
              >
                <Text size="md">«&nbsp;{q.text}&nbsp;»</Text>
                <Text size="sm" className="text-text-light">— {q.source}</Text>
              </div>
            ))}
          </div>
        </section>
      );

    case "testimonials": {
      // Defensive : LLM extraction occasionally classifies anonymous quotes
      // (pain-point phrases, "Vous n'entendrez plus…") as testimonials. The
      // TestimonialCard component requires both text and name — drop entries
      // missing either.
      const validTestimonials = (section.testimonials || []).filter(
        (t) => t && typeof t.text === "string" && t.text.length > 0 && typeof t.name === "string" && t.name.length > 0,
      );
      if (validTestimonials.length === 0) return null;
      const anyHref = validTestimonials.some((t) => t.href);
      if (anyHref) {
        return (
          <section
            key={index}
            className="flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:px-[3rem] md:py-[5rem] lg:px-[10rem] lg:py-[6.25rem] bg-primary-2"
          >
            {section.title ? (
              <Heading level={2} align="center">
                {section.title}
              </Heading>
            ) : null}
            <div className="grid grid-cols-1 gap-[1.5rem] md:grid-cols-2 lg:grid-cols-3 w-full max-w-[91.25rem]">
              {validTestimonials.slice(0, 6).map((t, i) => {
                const card = (
                  <TestimonialCard
                    quote={t.text}
                    name={t.name}
                    role={t.role || t.company || ""}
                    readMoreLabel="Lire la suite"
                    readLessLabel="Voir moins"
                  />
                );
                return t.href ? (
                  <a
                    key={i}
                    href={t.href}
                    className="block hover:opacity-90 transition-opacity"
                  >
                    {card}
                  </a>
                ) : (
                  <div key={i}>{card}</div>
                );
              })}
            </div>
          </section>
        );
      }
      return (
        <TestimonialsFrame
          key={index}
          title={section.title || "Ils en parlent"}
          titleHighlight={section.titleHighlight}
          readMoreLabel="Lire la suite"
          readLessLabel="Voir moins"
          testimonials={validTestimonials.slice(0, 6).map((t) => ({
            quote: t.text,
            name: t.name,
            role: t.role || t.company || "",
          }))}
        />
      );
    }

    case "customer-testimonials": {
      if (!section.testimonials || section.testimonials.length === 0) return null;
      // R9 + R35 audit Marisella : équipes pages render testimonials as
      // photo-lead press cards (large avatar + name/role/company stacked).
      const photoLead = pageType === "equipe";
      return (
        <section
          key={index}
          className="flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:px-[3rem] md:py-[5rem] lg:px-[10rem] lg:py-[6.25rem] bg-primary-2"
        >
          {section.title ? (
            <Heading level={2} align="center">
              {section.title}
            </Heading>
          ) : null}
          {section.subtitle ? (
            <Text size="lg" align="center" className="max-w-[60rem]">
              {section.subtitle}
            </Text>
          ) : null}
          {photoLead ? (
            <div className="grid grid-cols-1 gap-[1.5rem] sm:grid-cols-2 lg:grid-cols-4 w-full max-w-[91.25rem]">
              {section.testimonials.slice(0, 8).map((t, i) => (
                <article
                  key={i}
                  className="flex flex-col items-center gap-[0.875rem] rounded-[1.25rem] border border-primary-20 bg-white p-[1.5rem] md:p-[1.75rem] text-center shadow-sm"
                >
                  {t.avatarSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.avatarSrc}
                      alt={t.name}
                      className="h-[6rem] w-[6rem] rounded-full object-cover border-2 border-primary-20"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-[6rem] w-[6rem] rounded-full bg-primary-10 flex items-center justify-center font-bold text-primary text-h4">
                      {t.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-col gap-[0.25rem]">
                    <Text size="md" align="center" className="font-bold">
                      {t.name}
                    </Text>
                    {t.role ? (
                      <Text size="sm" align="center" className="text-text-light">
                        {t.role}
                      </Text>
                    ) : null}
                    {t.company ? (
                      <Text size="sm" align="center" className="text-primary font-medium">
                        {t.company}
                      </Text>
                    ) : null}
                  </div>
                  {t.text ? (
                    <Text size="sm" align="center" className="italic">
                      «&nbsp;{t.text.slice(0, 140)}&nbsp;»
                    </Text>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-[1.5rem] md:grid-cols-2 lg:grid-cols-3 w-full max-w-[91.25rem]">
              {section.testimonials.slice(0, 6).map((t, i) => (
                <TestimonialCard
                  key={i}
                  quote={t.text || t.company || ""}
                  name={t.name}
                  role={t.role || ""}
                  readMoreLabel="Lire la suite"
                  readLessLabel="Voir moins"
                />
              ))}
            </div>
          )}
        </section>
      );
    }

    case "comparison-table":
      if (!section.rows || section.rows.length === 0) return null;
      return (
        <ComparisonTableFrame
          key={index}
          title={section.title || "Comparaison"}
          columns={section.columns.map((c) => ({ label: c }))}
          rows={section.rows.map(([feature, ...values]) => ({
            feature: typeof feature === "string" ? feature : "",
            // Cell may be a string OR a {type, text} tuple — pass through
            // either shape, ComparisonTableFrame handles both.
            values,
          }))}
        />
      );

    case "steps":
      if (!section.steps || section.steps.length === 0) return null;
      return (
        <StepsFrame
          key={index}
          title={section.title || "Comment ça marche"}
          titleHighlight={section.titleHighlight}
          subtitle={section.subtitle}
          steps={section.steps.map((s) => ({
            icon: (
              <IconIllustration variant="dark" size="lg">
                <GearsIcon />
              </IconIllustration>
            ),
            title: s.title,
            description: s.description ?? "",
          }))}
        />
      );

    case "faq": {
      // R12 audit Marisella : avoid "Questions Fréquentes Fréquentes" duplication.
      // Only fall back to "Questions" + "fréquentes" pair when both are missing.
      // If the data has either title or titleHighlight, pass through as-is.
      const hasAny = section.title || section.titleHighlight;
      return (
        <FaqFrame
          key={index}
          title={hasAny ? section.title : "Questions"}
          titleHighlight={hasAny ? section.titleHighlight : "fréquentes"}
          items={section.items}
        />
      );
    }

    case "cta": {
      // Dual-card CTA : 2+ items → <CtaFrame> + <CardCta> children
      // Single-card CTA : <CtaHighlightFrame> (DS canonical for single CTA)
      const items = section.items || [];
      // R27 audit Marisella : Solutions render the closing CTA as a wide bandeau.
      const ctaLayout = pageType === "solution" ? "wide" : "default";
      if (items.length >= 2) {
        return (
          <CtaFrame
            key={index}
            title={section.title}
            subtitle={section.subtitle ?? ""}
            layout={ctaLayout}
          >
            {items.slice(0, 2).map((item, i) => (
              <CardCta
                key={i}
                title={item.title}
                description={item.description ?? ""}
                ctaLabel={item.ctaLabel ?? section.ctaLabel ?? section.primaryCta?.label ?? "En savoir plus"}
                ctaHref={item.ctaHref ?? item.videoHref ?? section.ctaHref ?? section.primaryCta?.href}
              />
            ))}
          </CtaFrame>
        );
      }
      return (
        <CtaHighlightFrame
          key={index}
          titlePrefix={section.title}
          titleHighlight={section.titleHighlight || " "}
          subtitle={section.subtitle ?? ""}
          ctaLabel={section.ctaLabel ?? section.primaryCta?.label ?? "Réserver une démo"}
          ctaHref={section.ctaHref ?? section.primaryCta?.href}
        />
      );
    }

    case "icon-row":
      if (!section.items || section.items.length === 0) return null;
      return (
        <IconRowFrame
          key={index}
          singleTitle={section.title}
          subtitle={section.subtitle}
          items={section.items.map((item) => ({
            icon: (
              <IconBadge variant="light" size="md">
                {item.iconSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.iconSrc} alt="" className="h-[1.5rem] w-auto" loading="lazy" />
                ) : (
                  <CircleCheckIcon />
                )}
              </IconBadge>
            ),
            label: item.label,
          }))}
        />
      );

    case "trust-badges": {
      if (!section.badges || section.badges.length === 0) return null;
      // 4 badges = 4 cards of "Sécurité au top". Use ValuePropositionFrame
      // dark variant + FeatureCard so the chrome matches DS canonical.
      const cols = Math.min(4, Math.max(2, section.badges.length)) as 2 | 3 | 4;
      return (
        <ValuePropositionFrame
          key={index}
          variant="dark"
          title={section.title || "Sécurité au top"}
          subtitle={section.subtitle}
          columns={cols}
        >
          {section.badges.map((b, i) => (
            <FeatureCard
              key={i}
              icon={
                <IconBadge variant="solid" size="md">
                  {b.iconSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={b.iconSrc} alt="" className="h-[1.5rem] w-auto" loading="lazy" />
                  ) : (
                    <LockKeyholeIcon />
                  )}
                </IconBadge>
              }
              title={b.label}
            />
          ))}
        </ValuePropositionFrame>
      );
    }

    case "related":
      if (!section.items || section.items.length === 0) return null;
      return (
        <section
          key={index}
          className="flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:px-[3rem] md:py-[5rem] lg:px-[10rem] lg:py-[6.25rem] bg-primary-2"
        >
          {section.title ? (
            <Heading level={2} align="center">
              {section.title}
            </Heading>
          ) : null}
          <div className="grid grid-cols-1 gap-[1.5rem] md:grid-cols-2 lg:grid-cols-3 w-full max-w-[91.25rem]">
            {section.items.slice(0, 6).map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="flex flex-col gap-[0.75rem] p-[1.5rem] rounded-[1rem] bg-white border border-primary-20 hover:shadow-md transition-shadow"
              >
                {item.imageSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageSrc}
                    alt=""
                    className="w-full h-auto rounded-[0.5rem] object-cover"
                    loading="lazy"
                  />
                ) : null}
                <Heading level={4} align="left">
                  {item.title}
                </Heading>
                {item.description ? <Text size="sm">{item.description}</Text> : null}
              </a>
            ))}
          </div>
        </section>
      );

    case "tabs-frame":
      if (!section.tabs || section.tabs.length === 0) return null;
      return (
        <TabsFrame
          key={index}
          variant={section.variant || "light"}
          sticky={section.sticky}
          tabs={section.tabs}
        />
      );

    case "cta-highlight":
      return (
        <CtaHighlightFrame
          key={index}
          titlePrefix={section.titlePrefix ?? section.title ?? ""}
          titleHighlight={section.titleHighlight ?? ""}
          titleSuffix={section.titleSuffix}
          subtitle={section.subtitle}
          ctaLabel={section.ctaLabel ?? section.primaryCta?.label ?? "Réserver une démo"}
          ctaHref={section.ctaHref ?? section.primaryCta?.href}
        />
      );

    case "comparison-frame":
      if (!section.items || section.items.length === 0) return null;
      return (
        <ComparisonFrame
          key={index}
          emoji={section.emoji}
          title={section.title}
          subtitle={section.subtitle ?? ""}
          items={section.items.map((it) => ({
            value: it.value,
            description: it.description,
          }))}
        />
      );

    case "pillar-frame":
      if (!section.pillars || section.pillars.length === 0) return null;
      return (
        <PillarFrame
          key={index}
          variant={section.variant || "light"}
          tag={section.tag}
          title={section.title}
          titleHighlight={section.titleHighlight}
          subtitle={section.subtitle}
          columns={section.columns}
          pillars={section.pillars.map((p) => ({
            icon: iconNode(p.iconName),
            title: p.title,
            description: p.description,
            example: p.example,
            exampleLabel: p.exampleLabel,
          }))}
        />
      );

    case "highlight-frame":
      if (!section.items || section.items.length === 0) return null;
      return (
        <HighlightFrame
          key={index}
          title={section.title}
          titleHighlight={section.titleHighlight}
          subtitle={section.subtitle}
          items={section.items.map((it) => ({
            value: it.value,
            description: it.description,
          }))}
        />
      );

    case "feature-stacked":
      return (
        <FeatureSectionStacked
          key={index}
          titleGradient={section.titleGradient ?? section.title ?? ""}
          titleDark={section.titleDark}
          titleDarkPrefix={section.titleDarkPrefix}
          subtitle={section.subtitle}
          listItems={section.listItems}
          imageSrc={section.imageSrc}
          imageAlt={section.imageAlt ?? ""}
          variant={section.variant}
        />
      );

    case "value-proposition": {
      if (!section.items || section.items.length === 0) return null;
      const cardVariant = section.variant === "dark" ? "dark" : "light";
      return (
        <ValuePropositionFrame
          key={index}
          variant={section.variant || "light"}
          tag={section.tag}
          title={section.title}
          titleHighlight={section.titleHighlight}
          subtitle={section.subtitle}
          columns={section.columns}
        >
          {section.items.map((it, i) => (
            <FeatureCard
              key={i}
              icon={it.iconName ? iconNode(it.iconName) : undefined}
              title={it.title}
              description={it.description ?? ""}
              variant={cardVariant}
            />
          ))}
        </ValuePropositionFrame>
      );
    }

    case "steps-rich":
      if (!section.steps || section.steps.length === 0) return null;
      return (
        <StepsFrame
          key={index}
          variant={section.variant || "light"}
          tag={section.tag}
          title={section.title}
          titleHighlight={section.titleHighlight}
          subtitle={section.subtitle}
          steps={section.steps.map((s) => ({
            icon: iconNode(s.iconName),
            title: s.title,
            description: s.description,
            // Coerce string number ("1") to int (Opus quirk)
            number: typeof s.number === "string" ? parseInt(s.number, 10) || undefined : s.number,
          }))}
        />
      );

    case "raw":
      return null;

    default:
      return null;
  }
}

// R45 audit Marisella : footer copyright must show airsaas logo + 🇫🇷 emoji.
// copyrightIcon accepts ReactNode, so we render both inline.
const FOOTER_COPYRIGHT_ICON = (
  <span className="inline-flex items-center gap-[0.375rem]">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/assets/icons/airsaas-icon.svg"
      alt=""
      aria-hidden="true"
      className="h-[1.25rem] w-auto"
    />
    <span aria-label="Français">🇫🇷</span>
  </span>
);

// R3 audit Marisella : Solutions + Produit pages need a RelatedSolutionsFrame
// at the bottom (3 image-first sibling cards). Auto-append when data has no
// `related` section and page type is solution/produit.
function buildRelatedSolutions(page: LandingPage) {
  if (page.type !== "solution" && page.type !== "produit") return null;
  if (page.sections.some((s) => s.type === "related")) return null;
  const pool = page.type === "solution" ? SOLUTION_PAGES : PRODUIT_PAGES;
  const siblings = pool.filter((p) => p.slug !== page.slug).slice(0, 3);
  if (siblings.length < 3) return null;
  const basePrefix = page.type === "solution" ? "/fr/solutions" : "/fr/produit";
  return siblings.map((s) => {
    const heroSection = s.sections.find((x) => x.type === "hero");
    const heroImg = (heroSection && "imageSrc" in heroSection ? heroSection.imageSrc : null) || null;
    return {
      imageSrc: heroImg || "https://placehold.co/600x375/e8eafc/3a51e2?text=AirSaas",
      imageAlt: s.meta.title,
      title: s.meta.title.slice(0, 80),
      description: s.meta.description.slice(0, 140),
      href: `${basePrefix}/${s.slug}`,
    };
  });
}

// R40 + N1 audit Marisella : dedupe orphan CTAs. If the data has 2+ `cta`
// or `cta-highlight` sections, only render the LAST one (the page outro).
// Inline CTAs in feature-split.primaryCta still render normally.
function dedupeCtas(sections: LandingSection[]): LandingSection[] {
  const ctaIndices = sections
    .map((s, i) => ({ type: s.type, i }))
    .filter((x) => x.type === "cta" || x.type === "cta-highlight")
    .map((x) => x.i);
  if (ctaIndices.length <= 1) return sections;
  const lastCtaIdx = ctaIndices[ctaIndices.length - 1];
  const dropIdx = new Set(ctaIndices.slice(0, -1));
  return sections.filter((_, i) => !dropIdx.has(i) || i === lastCtaIdx);
}

// R46 audit Marisella : prompt v4 leaked <strong>/<em>/<a> tags into title
// fields. Strip them before render so Heading shows clean text. Body fields
// keep their HTML (rendered via RichSpan / dangerouslySetInnerHTML).
const TITLE_FIELDS = new Set([
  "title",
  "titleHighlight",
  "titlePrefix",
  "titleSuffix",
  "subtitle",
  "tag",
  "label",
]);

function sanitizeTitleFields<T extends Record<string, unknown>>(obj: T): T {
  const out: Record<string, unknown> = { ...obj };
  for (const k of Object.keys(out)) {
    const v = out[k];
    if (typeof v === "string" && TITLE_FIELDS.has(k)) {
      out[k] = stripTags(v);
    } else if (Array.isArray(v)) {
      out[k] = v.map((item) =>
        item && typeof item === "object" && !Array.isArray(item)
          ? sanitizeTitleFields(item as Record<string, unknown>)
          : item,
      );
    } else if (v && typeof v === "object" && !Array.isArray(v)) {
      out[k] = sanitizeTitleFields(v as Record<string, unknown>);
    }
  }
  return out as T;
}

export default function LandingPageV2({ page }: { page: LandingPage }) {
  const relatedSolutions = buildRelatedSolutions(page);
  const sections = dedupeCtas(page.sections).map(
    (s) => sanitizeTitleFields(s as unknown as Record<string, unknown>) as unknown as LandingSection,
  );
  // R45 audit Marisella : footer copyright must show year dynamic + logo + 🇫🇷.
  const year = new Date().getFullYear();
  const copyright = `© ${year} AirSaas — Made in France`;
  return (
    <main className="flex min-h-screen flex-col bg-background">
      {sections.map((section, i) => renderSection(section, i, page.type))}
      {relatedSolutions ? (
        <RelatedSolutionsFrame
          title="Découvrez nos autres solutions"
          subtitle="Tout AirSaas dans une plateforme unique."
          solutions={relatedSolutions}
          linkLabel="Voir plus"
        />
      ) : null}
      <Footer
        columns={BLOG_INDEX_DATA.footerColumns}
        copyright={copyright}
        copyrightIcon={FOOTER_COPYRIGHT_ICON}
      />
    </main>
  );
}
