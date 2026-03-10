import Image from "next/image";
import { Container } from "@/components/ui/Container";

type QuoteItem = {
  quote: string;
  logo: string;
  logoAlt: string;
  href: string;
};

type QuoteCardsProps = {
  heading: React.ReactNode;
  items: QuoteItem[];
};

export function QuoteCards({ heading, items }: QuoteCardsProps) {
  return (
    <section className="py-16">
      <Container>
        <h2 className="text-center text-[2.5rem] font-semibold leading-[3rem]">
          {heading}
        </h2>

        <div className={`mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 ${items.length <= 2 ? "mx-auto max-w-[700px]" : items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
          {items.map((item) => (
            <a
              key={item.logoAlt}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-[10px] border border-border bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <div className="relative mb-6">
                <span className="text-5xl font-bold text-primary/20">
                  &ldquo;
                </span>
                <p className="mt-[-12px] text-sm leading-relaxed text-text-secondary">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
              <div className="relative h-8">
                <Image
                  src={item.logo}
                  alt={item.logoAlt}
                  fill
                  className="object-contain object-left"
                />
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
