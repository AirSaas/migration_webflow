import { cn } from "@/ds/utils";

interface IllustrationFrameProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function IllustrationFrame({
  src,
  alt = "",
  width,
  height,
  className,
}: IllustrationFrameProps) {
  const isDecorative = alt === "";

  return (
    <div
      className={cn(
        "bg-white/50 border border-white rounded-t-[20px] pt-[30px] px-[30px] overflow-clip",
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        {...(width ? { width } : {})}
        {...(height ? { height } : {})}
        {...(isDecorative ? { "aria-hidden": true as const } : {})}
        className="w-full object-cover"
      />
    </div>
  );
}
