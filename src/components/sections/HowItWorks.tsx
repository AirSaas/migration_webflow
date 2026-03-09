import { Container } from "@/components/ui/Container";

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
        <div className="mb-10 text-center">
          <h2 className="text-[2rem] font-semibold">{heading}</h2>
          <p className="mt-3 text-[17px] text-text-secondary">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                {i + 1}
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
