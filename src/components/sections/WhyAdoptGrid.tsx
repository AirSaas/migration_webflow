import { Container } from "@/components/ui/Container";

type WhyAdoptGridProps = {
  heading: string;
  description?: string;
  items: {
    title: string;
    description: string;
  }[];
};

export function WhyAdoptGrid({
  heading,
  description,
  items,
}: WhyAdoptGridProps) {
  return (
    <section className="bg-bg-alt py-16">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="text-[2rem] font-semibold leading-[2.5rem]">
            {heading}
          </h2>
          {description && (
            <p className="mt-4 text-[17px] leading-[27px] text-text-secondary">
              {description}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
