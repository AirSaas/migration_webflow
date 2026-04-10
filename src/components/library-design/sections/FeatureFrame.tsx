import { cn } from "@/lib/utils";
import { Tag } from "@/components/library-design/ui/Tag";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { Button } from "@/components/library-design/ui/Button";
import { ListInline } from "@/components/library-design/ui/ListInline";

interface FeatureFrameProps {
  /** Image on left or right */
  imagePosition?: "left" | "right";
  tag?: string;
  /** Gradient-colored part of the title */
  titleHighlight?: string;
  /** Regular-colored part of the title */
  title: string;
  description: string;
  checklist?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  /** Screenshot/illustration source */
  imageSrc?: string;
  imageAlt?: string;
  /** Background color of the illustration frame */
  imageBgColor?: string;
  className?: string;
}

export function FeatureFrame({
  imagePosition = "right",
  tag,
  titleHighlight,
  title,
  description,
  checklist,
  ctaLabel,
  ctaHref = "#",
  imageSrc,
  imageAlt = "",
  imageBgColor,
  className,
}: FeatureFrameProps) {
  const isRight = imagePosition === "right";
  const defaultBg = isRight ? "var(--color-primary-5)" : "#fffbeb";

  const textContent = (
    <div className="flex flex-1 flex-col gap-[1rem] md:gap-[1.25rem] items-start min-w-0">
      {tag && <Tag variant="muted">{tag}</Tag>}

      <Heading level={3} gradient="none" align="left">
        {titleHighlight && (
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "var(--gradient-primary)",
              WebkitBackgroundClip: "text",
            }}
          >
            {titleHighlight}
          </span>
        )}
        {titleHighlight && " "}
        {title}
      </Heading>

      <Text size="md" align="left">
        {description}
      </Text>

      {checklist && checklist.length > 0 && (
        <div className="flex flex-col gap-[0.625rem] w-full">
          {checklist.map((item, i) => (
            <ListInline key={i}>{item}</ListInline>
          ))}
        </div>
      )}

      {ctaLabel && (
        <Button variant="primary" size="sm" href={ctaHref}>
          {ctaLabel}
        </Button>
      )}
    </div>
  );

  const illustrationContent = imageSrc && (
    <div
      className={cn(
        "shrink-0 rounded-[1.5rem] md:rounded-[2.1875rem] overflow-hidden w-full lg:w-[67.5rem] lg:max-w-[60%]",
        isRight ? "p-[1.5rem] lg:pl-[2.5rem] lg:py-[2.5rem] lg:pr-0" : "p-[1.5rem] lg:pr-[2.5rem] lg:py-[2.5rem] lg:pl-0"
      )}
      style={{
        backgroundColor: imageBgColor ?? defaultBg,
      }}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-auto rounded-[0.625rem] object-cover"
        loading="lazy"
      />
    </div>
  );

  return (
    <section
      className={cn(
        "flex flex-col gap-[2rem] px-[1.5rem] py-[3rem] bg-white",
        "md:px-[3rem] md:py-[4rem] md:gap-[2.5rem]",
        "lg:flex-row lg:items-center lg:gap-[3.125rem] lg:py-[6.25rem]",
        isRight ? "lg:pl-[10rem] lg:pr-0" : "lg:pr-[10rem] lg:pl-0 lg:justify-end",
        className
      )}
    >
      {isRight ? (
        <>
          {textContent}
          {illustrationContent}
        </>
      ) : (
        <>
          {illustrationContent}
          {textContent}
        </>
      )}
    </section>
  );
}
