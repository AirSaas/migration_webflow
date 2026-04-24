import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/library-design/ui/Tag";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { GradientText } from "@/components/library-design/ui/GradientText";
import {
  assertArrayBounds,
  assertMaxLength,
  assertNoClassNameOverride,
} from "@/lib/ds-validators";

export interface Step {
  /** Pre-rendered icon node — typically an <IconIllustration size="lg"> */
  icon: React.ReactNode;
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
 * @purpose    Horizontal row of numbered sequential steps — each step has a
 *             large primary-gradient number, an icon, a short title, and a
 *             description. Cards are visually connected by chevron indicators
 *             between them on desktop (hidden on mobile, where steps stack).
 * @useWhen    Presenting a linear deployment / onboarding / how-it-works flow
 *             of 3–5 discrete steps that must be read in order
 *             (e.g. "Lancez votre déploiement en 4 étapes").
 * @dontUse    For non-sequential principles or methodology pillars (use
 *             <PillarFrame>). For metrics / stats grids (use
 *             <ValuePropositionFrame> + <FeatureCard>). For a zigzag vertical
 *             list with big outside numbers (use <HighlightFrame>).
 *
 * @limits
 *   - tag: max 24 chars
 *   - titleHighlight: max 40 chars
 *   - title: max 80 chars
 *   - subtitle: max 260 chars
 *   - steps: 3–5 items (below 3 looks sparse; above 5 the row breaks on md)
 *   - step.title: max 24 chars (e.g. "Kick-off", "Go live")
 *   - step.description: max 180 chars
 *   - step.number: 1–9 (auto-derived from index if omitted)
 *
 * @forbidden
 *   - Do NOT use for non-sequential content — use <PillarFrame>
 *   - Do NOT pass className with bg / text / font / padding overrides
 *   - Do NOT mix items with and without explicit step.number (all or none)
 *   - Do NOT nest another StepsFrame inside a step card
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
  /** Show chevron connectors between cards on md+. Default true. */
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
  showConnectors = true,
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
      180,
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
        "flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:gap-[2.5rem] md:px-[3rem] md:py-[4rem] lg:gap-[3.75rem] lg:px-[10rem] lg:py-[6.25rem]",
        isDark ? "bg-primary-70" : "bg-white",
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

      <div className="flex w-full max-w-[91rem] flex-col items-stretch gap-[2rem] md:flex-row md:items-start md:gap-[1rem] lg:gap-[1.5rem]">
        {steps.map((step, i) => (
          <Fragment key={i}>
            <StepCard
              step={step}
              stepNumber={step.number ?? i + 1}
              isDark={isDark}
            />
            {showConnectors && i < steps.length - 1 && (
              <StepConnector isDark={isDark} />
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}

function StepCard({
  step,
  stepNumber,
  isDark,
}: {
  step: Step;
  stepNumber: number;
  isDark: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col items-start gap-[1rem] md:gap-[1.25rem]">
      <div className="flex items-center gap-[1rem]">
        {isDark ? (
          <Heading
            level={3}
            gradient="none"
            align="left"
            className="text-white"
          >
            {String(stepNumber)}
          </Heading>
        ) : (
          <Heading level={3} gradient="primary" align="left">
            {String(stepNumber)}
          </Heading>
        )}
        <div className="shrink-0">{step.icon}</div>
      </div>

      <Heading
        level={4}
        gradient="none"
        align="left"
        className={isDark ? "text-white" : undefined}
      >
        {step.title}
      </Heading>

      <Text
        size="sm"
        align="left"
        className={isDark ? "text-white" : undefined}
      >
        {step.description}
      </Text>
    </div>
  );
}

function StepConnector({ isDark }: { isDark: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "hidden shrink-0 items-center self-start md:flex",
        isDark ? "text-white/70" : "text-primary-40",
      )}
      style={{ paddingTop: "1.25rem" }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 6L15 12L9 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
