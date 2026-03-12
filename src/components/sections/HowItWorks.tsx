import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

type Step = {
  title: string;
  description: string;
};

type HowItWorksProps = {
  heading?: string;
  description?: string;
  steps: Step[];
};

export function HowItWorks({
  heading = "Comment ça marche ?",
  description = "Un déploiement en douceur, sans big bang.",
  steps,
}: HowItWorksProps) {
  return (
    <section className="py-16">
      <Container>
        <FadeIn>
        <div className="mb-10 text-center">
          <h2 className="text-[2.25rem] font-semibold leading-[2.75rem]">{heading}</h2>
          <p className="mt-3 text-[17px] text-text-secondary">{description}</p>
        </div>
        <div
          className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${steps.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4"}`}
        >
          {steps.map((step, i) => (
            <div key={step.title} className="rounded-xl p-4 text-center transition-all duration-200 hover:bg-white hover:shadow-md">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                {i + 1}
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-foreground/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        </FadeIn>
      </Container>
    </section>
  );
}
