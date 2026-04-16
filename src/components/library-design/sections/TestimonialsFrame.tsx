import { cn } from "@/lib/utils";
import { Heading } from "@/components/library-design/ui/Heading";
import { TestimonialCard } from "@/components/library-design/ui/TestimonialCard";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatarSrc?: string;
}

interface TestimonialsFrameProps {
  /** Dark-to-primary gradient part of the title */
  title: string;
  /** Primary gradient part of the title */
  titleHighlight: string;
  /** Simple mode: array of personal testimonials rendered as TestimonialCard grid */
  testimonials?: Testimonial[];
  /** Flexible mode: pass any combination of card grids as children (overrides testimonials) */
  children?: React.ReactNode;
  className?: string;
}

export function TestimonialsFrame({
  title,
  titleHighlight,
  testimonials,
  children,
  className,
}: TestimonialsFrameProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:gap-[2.5rem] md:px-[3rem] md:py-[4rem] lg:gap-[3.125rem] lg:px-[10rem] lg:py-[6.25rem] bg-primary-2",
        className
      )}
    >
      <Heading level={2} gradient="none" align="center">
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: "var(--gradient-dark-to-primary)",
            WebkitBackgroundClip: "text",
          }}
        >
          {title}
        </span>{" "}
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: "var(--gradient-primary)",
            WebkitBackgroundClip: "text",
          }}
        >
          {titleHighlight}
        </span>
      </Heading>

      {children ?? (
        <div className="grid grid-cols-1 gap-[1rem] items-stretch w-full md:grid-cols-2 lg:grid-cols-3">
          {testimonials?.map((t, i) => (
            <TestimonialCard
              key={i}
              quote={t.quote}
              name={t.name}
              role={t.role}
              avatarSrc={t.avatarSrc}
              className="flex-1"
            />
          ))}
        </div>
      )}
    </section>
  );
}
