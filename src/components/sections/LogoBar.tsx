import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

type Logo = {
  src: string;
  alt: string;
};

type LogoBarProps = {
  heading?: string;
  logos: Logo[];
};

export function LogoBar({
  heading = "Ils nous font confiance",
  logos,
}: LogoBarProps) {
  return (
    <section className="py-16">
      <Container>
        <FadeIn>
        <p className="mb-10 text-center text-sm font-medium uppercase tracking-widest text-text-secondary">
          {heading}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10">
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="grayscale opacity-50 transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>
        </FadeIn>
      </Container>
    </section>
  );
}
