import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Feature = {
  title: string;
  description: string;
};

type FeatureNumberedListProps = {
  badge?: string;
  heading: React.ReactNode;
  image: string;
  imageAlt: string;
  features: Feature[];
  reversed?: boolean;
  buttonText?: string;
  buttonHref?: string;
};

export function FeatureNumberedList({
  badge,
  heading,
  image,
  imageAlt,
  features,
  reversed = false,
  buttonText,
  buttonHref,
}: FeatureNumberedListProps) {
  return (
    <section className="py-16">
      <Container>
        <div className="text-center">
          {badge && (
            <span className="mb-3 inline-block rounded-full bg-primary-10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">
              {badge}
            </span>
          )}
          <h3 className="text-[1.75rem] font-bold leading-[2.25rem]">
            {heading}
          </h3>
        </div>
        <div
          className={cn(
            "mt-10 flex items-center gap-12",
            reversed
              ? "flex-col md:flex-row-reverse"
              : "flex-col md:flex-row",
          )}
        >
          <div className="relative flex-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-white shadow-lg">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-8">
            {features.map((feature, i) => (
              <div key={feature.title} className="flex gap-4">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <h4 className="text-[1rem] font-bold text-foreground">
                    {feature.title}
                  </h4>
                  <p className="mt-1 text-[15px] leading-relaxed text-text-secondary">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
            {buttonText && buttonHref && (
              <div className="mt-2">
                <Button href={buttonHref}>{buttonText}</Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
