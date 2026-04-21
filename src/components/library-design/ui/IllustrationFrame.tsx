import { cn } from "@/lib/utils";

interface IllustrationFrameProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  /**
   * "open-bottom" (default) — rounded top corners only, padding only on top/sides.
   * Use when the illustration bleeds into the next section (e.g. centered hero).
   * "contained" — all 4 corners rounded, padding on all sides. Use for standalone
   * illustrations (e.g. split hero where the frame is fully visible).
   */
  shape?: "open-bottom" | "contained";
  className?: string;
}

export function IllustrationFrame({
  src,
  alt = "",
  width,
  height,
  shape = "open-bottom",
  className,
}: IllustrationFrameProps) {
  const isDecorative = alt === "";
  const shapeStyles =
    shape === "contained"
      ? "rounded-[20px] p-[30px]"
      : "rounded-t-[20px] pt-[30px] px-[30px]";

  return (
    <div
      className={cn(
        "bg-white/50 border border-white overflow-clip",
        shapeStyles,
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
        className="w-full object-cover rounded-b-none"
      />
    </div>
  );
}
