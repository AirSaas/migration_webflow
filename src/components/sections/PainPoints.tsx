import { Container } from "@/components/ui/Container";

type PainPointsProps = {
  heading: string;
  items: React.ReactNode[];
};

export function PainPoints({ heading, items }: PainPointsProps) {
  return (
    <section className="py-16">
      <Container>
        <div className="rounded-2xl bg-bg-lavender p-8 md:p-12">
          <h3 className="mb-8 text-center text-[1.75rem] font-bold leading-[2.25rem]">
            {heading}
          </h3>
          <div className="mx-auto max-w-[700px] space-y-4">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-crimson/10 text-[11px] font-bold text-crimson">
                  ✗
                </span>
                <div className="text-[15px] font-medium leading-relaxed text-foreground">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
