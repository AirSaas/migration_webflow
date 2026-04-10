import { cn } from "@/lib/utils";
import { Heading } from "@/components/library-design/ui/Heading";
import { Text } from "@/components/library-design/ui/Text";
import { ListCard } from "@/components/library-design/ui/ListCard";
import { GradientBackground } from "@/components/library-design/ui/GradientBackground";

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
        className="relative z-10 flex flex-col items-center gap-[2rem] px-[1.5rem] py-[3rem] md:gap-[2.5rem] md:px-[3rem] md:py-[4rem] lg:gap-[3.125rem] lg:px-[10rem] lg:py-[6.25rem] overflow-clip"
      >
        {/* Text block */}
        <div className="flex flex-col items-center gap-[1rem] md:gap-[1.25rem] text-center">
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
