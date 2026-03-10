import { Container } from "@/components/ui/Container";

type LpStat = {
  value: string;
  label: string;
};

type LpStatsProps = {
  heading?: string;
  stats: LpStat[];
};

export function LpStats({ heading, stats }: LpStatsProps) {
  return (
    <section className="py-16">
      <Container>
        <div className="rounded-2xl bg-bg-lavender p-8 md:p-12">
          {heading && (
            <h3 className="mb-10 text-center text-[1.75rem] font-bold leading-[2.25rem]">
              {heading}
            </h3>
          )}
          <div
            className={`grid grid-cols-1 gap-8 ${stats.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4"}`}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-white p-6 text-center shadow-sm"
              >
                <div className="text-[2.5rem] font-bold leading-tight text-primary">
                  {stat.value}
                </div>
                <p className="mt-2 text-[15px] font-medium text-foreground/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
