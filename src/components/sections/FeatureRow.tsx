import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FeatureRowProps = {
  badge?: string;
  heading: React.ReactNode;
  description: React.ReactNode;
  image: string;
  imageAlt: string;
  reversed?: boolean;
  variant?: "default" | "card";
  buttonText?: string;
  buttonHref?: string;
};

export function FeatureRow({
  badge,
  heading,
  description,
  image,
  imageAlt,
  reversed = false,
  variant = "default",
  buttonText,
  buttonHref,
}: FeatureRowProps) {
  const isCard = variant === "card";

  return (
    <section className="py-8">
      <Container>
        <div
          className={cn(
            "flex items-center gap-12",
            isCard && "rounded-2xl bg-bg-lavender p-8 md:p-12",
            reversed
              ? "flex-col-reverse md:flex-row-reverse"
              : "flex-col md:flex-row",
          )}
        >
          <div className="flex-1">
            <div className="border-l-[3px] border-primary pl-6">
              {badge && (
                <span className="mb-3 inline-block rounded-full bg-primary-10 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
                  {badge}
                </span>
              )}
              <h3 className="text-[1.75rem] font-bold leading-[2.25rem] text-foreground">
                {heading}
              </h3>
              <div className="mt-4 text-[17px] leading-[27px] text-text-secondary">
                {description}
              </div>
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
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
