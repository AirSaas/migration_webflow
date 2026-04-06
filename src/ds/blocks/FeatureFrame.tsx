import { cn } from "@/ds/utils";
import { Tag } from "@/ds/primitives/Tag";
import { Heading } from "@/ds/primitives/Heading";
import { Text } from "@/ds/primitives/Text";
import { Button } from "@/ds/primitives/Button";
import { ListInline } from "@/ds/primitives/ListInline";

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
    <div className="flex flex-1 flex-col gap-[1.25rem] items-start min-w-0">
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
        "shrink-0 rounded-[2.1875rem] overflow-hidden",
        isRight ? "pl-[2.5rem] py-[2.5rem]" : "pr-[2.5rem] py-[2.5rem]"
      )}
      style={{
        backgroundColor: imageBgColor ?? defaultBg,
        width: "67.5rem",
        maxWidth: "60%",
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
        "flex items-center gap-[3.125rem] bg-white",
        isRight ? "pl-[10rem]" : "pr-[10rem] justify-end",
        className
      )}
      style={{ paddingBlock: "6.25rem" }}
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
