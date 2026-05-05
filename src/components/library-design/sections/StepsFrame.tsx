import { cn } from "@/lib/utils";
import { Tag } from "@/components/library-design/ui/Tag";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { GradientText } from "@/components/library-design/ui/GradientText";
import { AnimateOnScroll } from "@/components/library-design/ui/AnimateOnScroll";
import {
  assertArrayBounds,
  assertMaxLength,
  assertNoClassNameOverride,
} from "@/lib/ds-validators";

export interface Step {
  /** Optional pre-rendered icon node — kept for backward compat but not
   *  rendered in the current zigzag layout (the design centers on number +
   *  title + description). Pass `undefined` for new consumers. */
  icon?: React.ReactNode;
  /** Short step label — natural-case text like "Kick-off", "Configuration", "Go live" */
  title: string;
  /** One-to-two-sentence description of what happens at this step */
  description: string;
  /** Explicit step number (1–9). If omitted, auto-derived from the array index (1-based). */
  number?: number;
}

/**
 * StepsFrame
 *
 * @purpose    Sequential deployment / onboarding flow rendered as a
 *             zigzag row of bordered cards with large floating numbered
 *             badges (alternating left/right). Designed for storytelling
 *             — each card has a primary-blue border, a soft white body,
 *             and a primary-tinted description so the gaze travels through
 *             the steps with rhythm.
 * @useWhen    Presenting 3–5 discrete sequential steps that must be read
 *             in order (e.g. "Lancez votre déploiement en 4 étapes" or
 *             "Onboarding en X étapes").
 * @dontUse    For non-sequential principles or methodology pillars (use
 *             <PillarFrame>). For metrics / stats grids (use
 *             <ValuePropositionFrame> + <FeatureCard>). For a zigzag
 *             vertical list with big outside numbers (use <HighlightFrame>).
 *
 * @limits
 *   - tag: max 24 chars
 *   - titleHighlight: max 40 chars
 *   - title: max 80 chars
 *   - subtitle: max 260 chars
 *   - steps: 3–5 items (below 3 looks sparse; above 5 the row breaks on md)
 *   - step.title: max 24 chars (e.g. "Kick-off", "Go live")
 *   - step.description: max 160 chars (cards are tighter than the old layout)
 *   - step.number: 1–9 (auto-derived from index if omitted)
 *
 * @forbidden
 *   - Do NOT use for non-sequential content — use <PillarFrame>
 *   - Do NOT pass className with bg / text / font / padding overrides
 *   - Do NOT mix items with and without explicit step.number (all or none)
 *   - Do NOT nest another StepsFrame inside a step card
 *   - Do NOT add concentric decorative rings to the section background —
 *     banned by the DS rules
 */
interface StepsFrameProps {
  variant?: "light" | "dark";
  tag?: string;
  /** Primary-gradient portion of the title (light variant) / white (dark variant) */
  titleHighlight?: string;
  /** Dark-to-primary gradient portion of the title (light variant) / white (dark variant) */
  title: string;
  subtitle?: string;
  steps: Step[];
  /** @deprecated No-op — kept for backward compatibility. The zigzag
   *  layout doesn't use chevron connectors. */
  showConnectors?: boolean;
  /** Optional DOM id on the root `<section>` — used as a scroll-spy target by `<TabsFrame>`. */
  id?: string;
  className?: string;
}

export function StepsFrame({
  variant = "light",
  tag,
  titleHighlight,
  title,
  subtitle,
  steps,
  id,
  className,
}: StepsFrameProps) {
  if (tag) assertMaxLength("StepsFrame", "tag", tag, 24);
  if (titleHighlight)
    assertMaxLength("StepsFrame", "titleHighlight", titleHighlight, 40);
  assertMaxLength("StepsFrame", "title", title, 80);
  if (subtitle) assertMaxLength("StepsFrame", "subtitle", subtitle, 260);
  assertArrayBounds("StepsFrame", "steps", steps, 3, 5);
  steps.forEach((step, i) => {
    assertMaxLength("StepsFrame", `steps[${i}].title`, step.title, 24);
    assertMaxLength(
      "StepsFrame",
      `steps[${i}].description`,
      step.description,
      160,
    );
  });
  assertNoClassNameOverride("StepsFrame", className, [
    "bg-",
    "text-",
    "font-",
    "p-",
  ]);

  const isDark = variant === "dark";

  return (
    <section
      id={id}
      className={cn(
        "relative flex flex-col items-center gap-[2rem] overflow-hidden px-[1.5rem] py-[3rem] md:gap-[2.5rem] md:px-[2.5rem] md:py-[4rem] lg:gap-[3.75rem] lg:px-[3.5rem] lg:py-[6.25rem]",
        isDark ? "bg-primary-70" : "bg-bg-lavender",
        className,
      )}
    >
      {tag && <Tag variant="muted">{tag}</Tag>}

      <div className="flex flex-col items-center gap-[1rem] md:gap-[1.25rem] text-center">
        {isDark ? (
          <Heading
            level={2}
            gradient="none"
            align="center"
            className="text-white"
          >
            {titleHighlight && <>{titleHighlight} </>}
            {title}
          </Heading>
        ) : (
          <Heading level={2} gradient="none" align="center">
            {titleHighlight && (
              <GradientText gradient="primary">{titleHighlight}</GradientText>
            )}
            {titleHighlight && " "}
            <GradientText gradient="dark-to-primary">{title}</GradientText>
          </Heading>
        )}

        {subtitle && (
          <Text
            size="md"
            align="center"
            maxWidth="60rem"
            className={isDark ? "text-white" : undefined}
          >
            {subtitle}
          </Text>
        )}
      </div>

      {/* Zigzag row of cards with alternating vertical offset */}
      <div className="relative w-full max-w-[91rem] pt-[2rem] md:pt-[3rem]">
        {/* Decorative wavy connector — replaces the banned ring outlines */}
        <DecorativeWave isDark={isDark} count={steps.length} />

        <div className="relative z-10 grid grid-cols-1 items-start gap-[3rem] md:grid-cols-2 md:gap-[2.5rem] lg:grid-cols-4 lg:gap-[1.25rem] xl:gap-[1.75rem]">
          {steps.map((step, i) => (
            <AnimateOnScroll
              key={i}
              animation="fade-up"
              delay={i * 100}
              duration={500}
              className={cn(
                "min-w-0",
                // Zigzag offset only at lg+ where the 4 cards line up in a single row
                i % 2 === 1 && "lg:-translate-y-[3rem]",
              )}
            >
              <StepCard
                step={step}
                stepNumber={step.number ?? i + 1}
                badgeAlignment={i % 2 === 0 ? "left" : "right"}
                isDark={isDark}
              />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  stepNumber,
  badgeAlignment,
  isDark,
}: {
  step: Step;
  stepNumber: number;
  badgeAlignment: "left" | "right";
  isDark: boolean;
}) {
  return (
    <div className="relative h-full">
      {/* Floating numbered badge — alternates left / right per card */}
      <div
        className={cn(
          "absolute z-20 flex h-[3rem] w-[3rem] items-center justify-center rounded-full font-bold leading-none shadow-elevation-md",
          isDark ? "bg-white text-primary" : "bg-primary text-white",
          "-top-[1.25rem]",
          badgeAlignment === "left"
            ? "-left-[0.5rem] md:-left-[0.75rem]"
            : "-right-[0.5rem] md:-right-[0.75rem]",
        )}
        aria-hidden="true"
      >
        <span className="text-paragraph">{stepNumber}</span>
      </div>

      {/* Card */}
      <article
        className={cn(
          "relative flex h-full min-w-0 flex-col gap-[0.75rem] rounded-[1.5rem] border-2 p-[1.25rem] shadow-elevation-sm transition-shadow duration-300 hover:shadow-elevation-md md:p-[1.5rem]",
          isDark
            ? "border-white/30 bg-primary-70"
            : "border-primary bg-white",
        )}
      >
        {/* Visually hidden step label for screen readers */}
        <span className="sr-only">Étape {stepNumber} :</span>

        <Heading
          level={4}
          gradient="none"
          align="left"
          className={cn(
            "break-words hyphens-auto",
            isDark ? "text-white" : undefined,
          )}
        >
          {step.title}
        </Heading>

        <Text
          size="sm"
          align="left"
          className={cn(
            "break-words hyphens-auto",
            isDark ? "text-white/80" : "text-primary",
          )}
        >
          {step.description}
        </Text>
      </article>
    </div>
  );
}

/**
 * Decorative wavy connector behind the cards — a soft horizontal sine
 * wave in primary-10 (or white/20 on dark). Replaces the banned
 * concentric-ring outlines from the reference design while preserving
 * the "flowing" visual rhythm. Hidden on mobile (cards stack).
 */
function DecorativeWave({
  isDark,
  count,
}: {
  isDark: boolean;
  count: number;
}) {
  // Sine wave that crests once per card — peaks above odd-index cards
  // and dips below even-index cards. Roughly tracks the zigzag offset.
  const points: string[] = [];
  const segments = count * 2;
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * 100;
    // Sine: alternates between -1 and +1 every 2 segments
    const phase = (i / 2) * Math.PI;
    const y = 50 + Math.sin(phase) * 35;
    points.push(`${x},${y}`);
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn(
        "absolute inset-x-0 top-1/2 -z-0 hidden h-[80%] w-full -translate-y-1/2 md:block",
        isDark ? "text-white/20" : "text-primary-20",
      )}
    >
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="0.8 1.2"
      />
    </svg>
  );
}
