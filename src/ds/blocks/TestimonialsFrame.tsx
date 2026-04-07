import { cn } from "@/ds/utils";
import { Heading } from "@/ds/primitives/Heading";
import { TestimonialCard } from "@/ds/primitives/TestimonialCard";

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
  testimonials: Testimonial[];
  className?: string;
}

export function TestimonialsFrame({
  title,
  titleHighlight,
  testimonials,
  className,
}: TestimonialsFrameProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-center gap-[3.125rem] bg-primary-2",
        className
      )}
      style={{ padding: "6.25rem 14.375rem" }}
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

      <div className="flex gap-[1.5625rem] items-stretch justify-center w-full">
        {testimonials.map((t, i) => (
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
    </section>
  );
}
