import { Container } from "@/components/ui/Container";

type PainPointsProps = {
  heading: string;
  items: React.ReactNode[];
};

export function PainPoints({ heading, items }: PainPointsProps) {
  return (
    <section className="bg-bg-alt py-16">
      <Container className="max-w-[800px]">
        <h3 className="mb-8 text-center text-[1.5rem] font-semibold">
          {heading}
        </h3>
        <div className="space-y-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-xl bg-white p-5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                {i + 1}
              </span>
              <div className="text-[15px] leading-relaxed text-text-secondary">
                {item}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
