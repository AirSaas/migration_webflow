import { cn } from "@/ds/utils";
import { Heading } from "@/ds/primitives/Heading";
import { Text } from "@/ds/primitives/Text";
import { GradientBackground } from "@/ds/primitives/GradientBackground";
import { FloatingCard } from "@/ds/primitives/FloatingCard";
import { Float } from "@/ds/primitives/Float";

interface CtaFrameProps {
  title: string;
  subtitle: string;
  /** Card content — pass CardCta components as children */
  children: React.ReactNode;
  className?: string;
}

export function CtaFrame({
  title,
  subtitle,
  children,
  className,
}: CtaFrameProps) {
  return (
    <section
      className={cn("relative w-full overflow-hidden", className)}
      style={{ minHeight: "54.75rem" }}
    >
      {/* Gradient background */}
      <GradientBackground
        variant="cta"
        className="absolute inset-0 w-full"
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center gap-[3.125rem] overflow-clip"
        style={{ padding: "6.25rem 14.375rem" }}
      >
        <div className="flex flex-col items-center gap-[1.25rem] text-center">
          <Heading level={2} gradient="dark-to-primary" align="center">
            {title}
          </Heading>

          <Text size="md" align="center" maxWidth="73.75rem">
            {subtitle}
          </Text>
        </div>

        {/* Cards container */}
        <div className="flex gap-[0.875rem] items-stretch justify-center w-full">
          {children}
        </div>
      </div>

      {/* Floating cards with perpetual bobbing */}
      <Float variant={3} duration={3.5} delay={0} className="absolute z-20 left-[2%] top-[17rem] hidden xl:block">
        <FloatingCard />
      </Float>
      <Float variant={1} duration={4} delay={1.5} className="absolute z-20 right-[2%] bottom-[10%] hidden xl:block">
        <FloatingCard />
      </Float>
    </section>
  );
}
