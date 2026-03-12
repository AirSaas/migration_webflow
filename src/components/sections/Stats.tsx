import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

type Stat = {
  value: string;
  description: string;
};

type StatsProps = {
  heading: React.ReactNode;
  stats: Stat[];
};

export function Stats({ heading, stats }: StatsProps) {
  return (
    <section className="py-20">
      <Container>
        <FadeIn>
        <h2 className="text-center text-[2.5rem] font-semibold leading-[3rem]">
          {heading}
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.value} className="text-center">
              <div className="text-[3.5rem] font-bold leading-tight text-primary">
                {stat.value}
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
        </FadeIn>
      </Container>
    </section>
  );
}
