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
        {heading && (
          <h3 className="mb-10 text-center text-lg font-semibold text-text-secondary">
            {heading}
          </h3>
        )}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-[2.5rem] font-bold leading-tight text-primary">
                {stat.value}
              </div>
              <p className="mt-2 text-sm text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
