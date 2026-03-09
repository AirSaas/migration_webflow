import { Container } from "@/components/ui/Container";

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
};

export function ComparisonTable({
  heading,
  description,
  competitorName,
  rows,
}: ComparisonTableProps) {
  return (
    <section className="py-20">
      <Container>
        <div className="mb-8 text-center">
          <h2 className="text-[2rem] font-semibold leading-[2.5rem]">
            {heading}
          </h2>
          <p className="mt-4 text-[17px] leading-[27px] text-text-secondary">
            {description}
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Header */}
            <div className="grid grid-cols-[1fr_100px_100px] gap-4 border-b-2 border-border pb-4">
              <div className="text-sm font-bold uppercase tracking-wider text-text-muted">
                Fonctionnalités
              </div>
              <div className="text-center text-sm font-bold uppercase tracking-wider text-primary">
                AirSaas
              </div>
              <div className="text-center text-sm font-bold uppercase tracking-wider text-text-muted">
                {competitorName}
              </div>
            </div>

            {/* Rows */}
            {rows.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-[1fr_100px_100px] gap-4 border-b border-border py-5"
              >
                <div>
                  <p className="font-semibold">{row.feature}</p>
                  <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                    {row.description}
                  </p>
                </div>
                <div className="flex items-start justify-center pt-1">
                  {row.airsaas ? (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                      ✓
                    </span>
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-500">
                      ✗
                    </span>
                  )}
                </div>
                <div className="flex items-start justify-center pt-1">
                  {row.competitor ? (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                      ✓
                    </span>
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-500">
                      ✗
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
