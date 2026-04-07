import { cn } from "@/ds/utils";

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
        "flex w-full items-center justify-center gap-[0.625rem] border-y border-primary-60",
        className
      )}
      style={{ height: "3.5rem" }}
    >
      {/* Label */}
      <span
        className="shrink-0 text-border font-light whitespace-nowrap"
        style={{ fontSize: "var(--text-paragraph)" }}
      >
        {label}
      </span>

      {/* Divider */}
      <div
        className="shrink-0 border-l border-text-light"
        style={{ height: "1.875rem" }}
        aria-hidden="true"
      />

      {/* Logos */}
      <div className="flex items-center gap-[0.6875rem]">
        {logos.map((logo) => (
          <img
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className="h-[1.875rem] w-auto object-contain"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
