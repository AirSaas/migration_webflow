import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type LpFeatureCardProps = {
  badge?: string;
  heading: React.ReactNode;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  reversed?: boolean;
};

export function LpFeatureCard({
  badge,
  heading,
  description,
  bullets,
  image,
  imageAlt,
  reversed = false,
}: LpFeatureCardProps) {
  return (
    <div className="py-12">
      <Container>
        <div
          className={cn(
            "flex items-center gap-12",
            reversed
              ? "flex-col md:flex-row-reverse"
              : "flex-col md:flex-row",
          )}
        >
          <div className="flex-1">
            {badge && (
              <div className="mb-3 inline-block rounded-full bg-primary-10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                {badge}
              </div>
            )}
            <h3 className="text-[1.5rem] font-semibold leading-[2rem]">
              {heading}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
              {description}
            </p>
            {bullets.length > 0 && (
              <ul className="mt-5 space-y-3">
                {bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-sm text-text-secondary"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs text-green-600">
                      ✓
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative flex-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border shadow-sm">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
