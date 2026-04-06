import { cn } from "@/ds/utils";
import { Heading } from "@/ds/primitives/Heading";
import { Text } from "@/ds/primitives/Text";
import { ListCard } from "@/ds/primitives/ListCard";
import { GradientBackground } from "@/ds/primitives/GradientBackground";

interface ComparisonItem {
  value: string | number;
  description: React.ReactNode;
}

interface ComparisonFrameProps {
  emoji?: string;
  title: string;
  subtitle: string;
  items: ComparisonItem[];
  className?: string;
}

export function ComparisonFrame({
  emoji,
  title,
  subtitle,
  items,
  className,
}: ComparisonFrameProps) {
  return (
    <section
      className={cn("relative w-full overflow-hidden", className)}
    >
      {/* Blurred gradient background at 30% opacity */}
      <GradientBackground
        variant="comparison"
        className="absolute inset-0 w-full"
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center gap-[3.125rem] overflow-clip"
        style={{ padding: "6.25rem 10rem" }}
      >
        {/* Text block */}
        <div className="flex flex-col items-center gap-[1.25rem] text-center">
          <Heading level={2} gradient="dark-to-primary" align="center">
            {emoji && <>{emoji} </>}{title}
          </Heading>

          <Text size="md" align="center" maxWidth="52.9375rem">
            {subtitle}
          </Text>
        </div>

        {/* 2-column grid of ListCards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ columnGap: "0.875rem", rowGap: "0.9375rem" }}
        >
          {items.map((item, i) => (
            <ListCard key={i} value={item.value}>
              {item.description}
            </ListCard>
          ))}
        </div>
      </div>
    </section>
  );
}
