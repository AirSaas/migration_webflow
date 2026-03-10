import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FeatureChecklistProps = {
  badge?: string;
  heading: React.ReactNode;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  reversed?: boolean;
  buttonText?: string;
  buttonHref?: string;
};

export function FeatureChecklist({
  badge,
  heading,
  description,
  bullets,
  image,
  imageAlt,
  reversed = false,
  buttonText,
  buttonHref,
}: FeatureChecklistProps) {
  return (
    <section className="py-12">
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
            <div className="border-l-[3px] border-primary pl-6">
              {badge && (
                <span className="mb-3 inline-block rounded-full bg-primary-10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  {badge}
                </span>
              )}
              <h3 className="text-[1.75rem] font-bold leading-[2.25rem] text-foreground">
                {heading}
              </h3>
              <p className="mt-4 text-[17px] leading-[27px] text-text-secondary">
                {description}
              </p>
              {bullets.length > 0 && (
                <ul className="mt-6 space-y-3">
                  {bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-3 text-[15px] font-medium text-foreground"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                        ✓
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
              {buttonText && buttonHref && (
                <div className="mt-6">
                  <Button href={buttonHref}>{buttonText}</Button>
                </div>
              )}
            </div>
          </div>
          <div className="relative flex-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-white shadow-lg">
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
    </section>
  );
}
