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
import { Footer } from "@/components/library-design/sections/Footer";
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

function renderSection(section: LandingSection, index: number): ReactNode {
  switch (section.type) {
    case "hero": {
      // If no real image, use centered text-only layout (LP-style); avoid
      // rendering placehold.co which is jarring.
      const hasImage = !!section.imageSrc;
      return (
        <Hero
          key={index}
          layout={hasImage ? "split" : "centered"}
          navItems={BLOG_INDEX_DATA.navItems}
          navCtaLabel={BLOG_INDEX_DATA.navCtaLabel}
          navCtaHref={BLOG_INDEX_DATA.navCtaHref}
          loginLabel={BLOG_INDEX_DATA.loginLabel}
          loginHref={BLOG_INDEX_DATA.loginHref}
          title={section.title}
          titleHighlight={section.titleHighlight || undefined}
          subtitle={section.subtitle || ""}
          primaryCta={section.primaryCta || undefined}
          secondaryCta={section.secondaryCta || undefined}
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

    case "logo-bar":
      if (!section.logos || section.logos.length === 0) return null;
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
          <div className="flex flex-wrap items-center justify-center gap-[2rem] md:gap-[3rem] max-w-[91.25rem] w-full">
            {section.logos.slice(0, 12).map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center"
                style={{ minWidth: "8rem", height: "3rem" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={logo.alt || ""}
                  className="max-h-[3rem] w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      );

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

    case "customer-testimonials":
      if (!section.testimonials || section.testimonials.length === 0) return null;
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
        </section>
      );

    case "comparison-table":
      if (!section.rows || section.rows.length === 0) return null;
      return (
        <ComparisonTableFrame
          key={index}
          title={section.title || "Comparaison"}
          columns={section.columns.map((c) => ({ label: c }))}
          rows={section.rows.map(([feature, ...values]) => ({
            feature: feature || "",
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

    case "faq":
      return (
        <FaqFrame
          key={index}
          title={section.title || "Questions"}
          titleHighlight={section.titleHighlight || "fréquentes"}
          items={section.items}
        />
      );

    case "cta":
      return (
        <CtaHighlightFrame
          key={index}
          titlePrefix={section.title}
          titleHighlight={section.titleHighlight || " "}
          subtitle={section.subtitle ?? ""}
          ctaLabel={section.ctaLabel}
          ctaHref={section.ctaHref}
        />
      );

    case "icon-row":
      if (!section.items || section.items.length === 0) return null;
      return (
        <section
          key={index}
          className="flex flex-col items-center gap-[1.5rem] px-[1.5rem] py-[2.5rem] md:px-[3rem] md:py-[3.5rem] lg:px-[10rem] lg:py-[4rem] bg-white"
        >
          {section.title ? (
            <Heading level={3} align="center">
              {section.title}
            </Heading>
          ) : null}
          {section.subtitle ? (
            <Text size="md" align="center" maxWidth="50rem">
              {section.subtitle}
            </Text>
          ) : null}
          <div className="flex flex-wrap items-center justify-center gap-[2.5rem]">
            {section.items.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-[0.5rem]">
                {item.iconSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.iconSrc}
                    alt=""
                    className="h-[2.5rem] w-auto"
                    loading="lazy"
                  />
                ) : null}
                <Text size="sm">{item.label}</Text>
              </div>
            ))}
          </div>
        </section>
      );

    case "trust-badges":
      if (!section.badges || section.badges.length === 0) return null;
      return (
        <section
          key={index}
          className="flex flex-wrap items-center justify-center gap-[1rem] px-[1.5rem] py-[1.5rem] md:px-[3rem] bg-white"
        >
          {section.badges.map((b, i) => (
            <Tag key={i} variant="muted">
              {b.label}
            </Tag>
          ))}
        </section>
      );

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
          titlePrefix={section.titlePrefix}
          titleHighlight={section.titleHighlight}
          titleSuffix={section.titleSuffix}
          subtitle={section.subtitle}
          ctaLabel={section.ctaLabel}
          ctaHref={section.ctaHref}
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
          titleGradient={section.titleGradient}
          titleDark={section.titleDark}
          titleDarkPrefix={section.titleDarkPrefix}
          subtitle={section.subtitle}
          listItems={section.listItems}
          imageSrc={section.imageSrc}
          imageAlt={section.imageAlt}
          variant={section.variant}
        />
      );

    case "value-proposition":
      if (!section.items || section.items.length === 0) return null;
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
              title={it.title}
              description={it.description ?? ""}
            />
          ))}
        </ValuePropositionFrame>
      );

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
            number: s.number,
          }))}
        />
      );

    case "raw":
      return null;

    default:
      return null;
  }
}

export default function LandingPageV2({ page }: { page: LandingPage }) {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      {page.sections.map((section, i) => renderSection(section, i))}
      <Footer
        columns={BLOG_INDEX_DATA.footerColumns}
        copyright={BLOG_INDEX_DATA.copyright}
      />
    </main>
  );
}
