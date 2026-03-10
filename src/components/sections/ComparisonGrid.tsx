import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type ComparisonRow = {
  left: string;
  right: string;
};

type ComparisonGridProps = {
  heading: React.ReactNode;
  leftLabel: string;
  rightLabel: string;
  rows: ComparisonRow[];
  buttonText?: string;
  buttonHref?: string;
};

export function ComparisonGrid({
  heading,
  leftLabel,
  rightLabel,
  rows,
  buttonText = "Réservez une démo",
  buttonHref = "/fr/meetings-pages",
}: ComparisonGridProps) {
  return (
    <section className="py-16">
      <Container>
        <div className="rounded-2xl bg-bg-lavender p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-[2rem] font-bold leading-[2.5rem]">
              {heading}
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-5 text-center text-sm font-bold uppercase tracking-wider text-text-secondary">
                {leftLabel}
              </h3>
              <div className="space-y-3">
                {rows.map((row, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg bg-crimson/5 p-3"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-crimson/15 text-[10px] font-bold text-crimson">
                      ✗
                    </span>
                    <p className="text-[15px] leading-relaxed text-foreground">
                      {row.left}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-5 text-center text-sm font-bold uppercase tracking-wider text-primary">
                {rightLabel}
              </h3>
              <div className="space-y-3">
                {rows.map((row, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg bg-primary-5 p-3"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                      ✓
                    </span>
                    <p className="text-[15px] font-medium leading-relaxed text-foreground">
                      {row.right}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button href={buttonHref}>{buttonText}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
