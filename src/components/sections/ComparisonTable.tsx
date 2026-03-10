import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type ComparisonRow = {
  feature: string;
  description: string;
  airsaas: boolean;
  competitor: boolean;
};

type ComparisonTableProps = {
  heading: React.ReactNode;
  description: string;
  competitorName: string;
  rows: ComparisonRow[];
  buttonText?: string;
  buttonHref?: string;
};

export function ComparisonTable({
  heading,
  description,
  competitorName,
  rows,
  buttonText,
  buttonHref,
}: ComparisonTableProps) {
  return (
    <section className="py-16">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="text-[2rem] font-bold leading-[2.5rem]">
            {heading}
          </h2>
          <p className="mt-4 text-[17px] leading-[27px] text-text-secondary">
            {description}
          </p>
        </div>

        <div className="mx-auto max-w-[800px] overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-[1fr_100px_100px] gap-4 border-b border-border bg-bg-alt px-6 py-4">
            <div className="text-sm font-bold uppercase tracking-wider text-text-secondary">
              Fonctionnalités
            </div>
            <div className="text-center text-sm font-bold uppercase tracking-wider text-primary">
              AirSaas
            </div>
            <div className="text-center text-sm font-bold uppercase tracking-wider text-text-secondary">
              {competitorName}
            </div>
          </div>

          {/* Rows */}
          {rows.map((row) => (
            <div
              key={row.feature}
              className="grid grid-cols-[1fr_100px_100px] gap-4 border-b border-border px-6 py-5 last:border-b-0"
            >
              <div>
                <p className="font-semibold text-foreground">{row.feature}</p>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                  {row.description}
                </p>
              </div>
              <div className="flex items-start justify-center pt-1">
                {row.airsaas ? (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                    ✓
                  </span>
                ) : (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-crimson/10 text-[11px] font-bold text-crimson">
                    ✗
                  </span>
                )}
              </div>
              <div className="flex items-start justify-center pt-1">
                {row.competitor ? (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                    ✓
                  </span>
                ) : (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-crimson/10 text-[11px] font-bold text-crimson">
                    ✗
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {buttonText && buttonHref && (
          <div className="mt-8 text-center">
            <Button href={buttonHref}>{buttonText}</Button>
          </div>
        )}
      </Container>
    </section>
  );
}
