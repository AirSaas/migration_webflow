import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type FeatureRowProps = {
  badge?: string;
  heading: React.ReactNode;
  description: React.ReactNode;
  image: string;
  imageAlt: string;
  reversed?: boolean;
  bgColor?: "white" | "alt" | "lavender";
};

export function FeatureRow({
  badge,
  heading,
  description,
  image,
  imageAlt,
  reversed = false,
  bgColor = "white",
}: FeatureRowProps) {
  return (
    <section className={cn("py-8", bgColor === "alt" ? "bg-bg-alt" : "")}>
      <Container>
        <div
          className={cn(
            "flex items-center gap-12 rounded-2xl p-8 md:p-12",
            reversed ? "bg-bg-lavender" : "bg-bg-alt",
            bgColor === "alt" && !reversed && "bg-white",
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
            </div>
          </div>
          <div className="relative flex-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/50 bg-white shadow-xl">
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
