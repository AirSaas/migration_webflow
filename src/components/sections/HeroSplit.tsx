import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type HeroSplitProps = {
  badge?: string;
  heading: React.ReactNode;
  description: string;
  image: string;
  imageAlt: string;
};

export function HeroSplit({
  badge = "SOLUTION",
  heading,
  description,
  image,
  imageAlt,
}: HeroSplitProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent pb-12 pt-16">
      {/* Decorative circle */}
      <div className="absolute right-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full bg-primary/5" />

      <Container>
        {badge && (
          <div className="mb-6 flex items-center gap-2">
            <span className="h-1 w-10 rounded bg-orange" />
            <span className="text-sm font-semibold uppercase tracking-wider text-orange">
              {badge}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
          <div className="flex-1">
            <h1 className="text-[2.5rem] font-bold leading-[3rem] md:text-[3.5rem] md:leading-[4rem]">
              {heading}
            </h1>
            <p className="mt-6 max-w-[560px] text-[17px] leading-[27px] text-text-secondary">
              {description}
            </p>
            <div className="mt-8">
              <Button href="/fr/meetings-pages">Réservez une démo</Button>
            </div>
          </div>

          <div className="relative flex-1">
            <div className="relative w-full overflow-hidden rounded-[10px]">
              <Image
                src={image}
                alt={imageAlt}
                width={800}
                height={600}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
