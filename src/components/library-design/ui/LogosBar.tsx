import { cn } from "@/lib/utils";

interface Logo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface LogosBarProps {
  label?: string;
  logos: Logo[];
  className?: string;
}

export function LogosBar({
  label = "Ils gèrent leur capacité avec AirSaas",
  logos,
  className,
}: LogosBarProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-[0.5rem] border-y border-primary-60 px-[1rem] py-[1rem] md:flex-row md:gap-[0.625rem] md:px-0 md:py-0",
        className
      )}
      style={{ minHeight: "6rem" }}
    >
      {/* Label */}
      <span
        className="shrink-0 font-light whitespace-nowrap text-center"
        style={{ color: "#63606e", fontSize: "1.2rem" }}
      >
        {label}
      </span>

      {/* Divider — hidden on mobile */}
      <div
        className="hidden shrink-0 border-l border-text-light md:block"
        style={{ height: "1.875rem" }}
        aria-hidden="true"
      />

      {/* Logos */}
      <div className="flex flex-wrap items-center justify-center gap-[0.5rem] md:gap-[0.8rem]">
        {logos.map((logo) => (
          <img
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className="h-[2.5rem] w-auto object-contain grayscale opacity-70 md:h-[4.14rem]"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
