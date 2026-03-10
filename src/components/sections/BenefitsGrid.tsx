import { Container } from "@/components/ui/Container";

type BenefitsGridProps = {
  badge?: string;
  heading: string;
  description?: string;
  items: {
    icon?: string;
    title: string;
    description: string;
  }[];
};

export function BenefitsGrid({
  badge,
  heading,
  description,
  items,
}: BenefitsGridProps) {
  return (
    <section className="py-16">
      <Container>
        <div className="mb-12 text-center">
          {badge && (
            <span className="mb-3 inline-block rounded-full bg-primary-10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">
              {badge}
            </span>
          )}
          <h2 className="text-[2rem] font-bold leading-[2.5rem]">{heading}</h2>
          {description && (
            <p className="mx-auto mt-4 max-w-[600px] text-[17px] leading-[27px] text-text-secondary">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="text-center">
              {item.icon && (
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-10 text-2xl">
                  {item.icon}
                </div>
              )}
              <h3 className="text-lg font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-foreground/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
