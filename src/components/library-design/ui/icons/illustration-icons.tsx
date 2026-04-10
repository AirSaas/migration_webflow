/** Font Awesome 6 Duotone icons rendered as text characters.
 *  Used inside <IconIllustration> for the full styled effect.
 *  Requires "Font Awesome 6 Duotone" font loaded via @font-face in globals.css.
 */

interface FAIconProps {
  color?: string;
  className?: string;
}

function FADuotoneChar({ char, color = "currentColor", className }: FAIconProps & { char: string }) {
  return (
    <span
      className={className}
      style={{
        fontFamily: '"Font Awesome 6 Duotone"',
        fontWeight: 900,
        color,
        lineHeight: 1,
        display: "block",
        width: "100%",
        height: "100%",
        fontSize: "inherit",
      }}
    >
      {char}
    </span>
  );
}

/** U+F783 — calendar-day */
export function CalendarDayIcon(props: FAIconProps) {
  return <FADuotoneChar char={"\uF783"} {...props} />;
}

/** U+F648 — bullseye-arrow */
export function BullseyeArrowIcon(props: FAIconProps) {
  return <FADuotoneChar char={"\uF648"} {...props} />;
}

/** U+F0F2 — suitcase */
export function SuitcaseIcon(props: FAIconProps) {
  return <FADuotoneChar char={"\uF0F2"} {...props} />;
}

/** U+F138 — circle-chevron-right */
export function ChevronCircleIcon(props: FAIconProps) {
  return <FADuotoneChar char={"\uF138"} {...props} />;
}

/** U+F2F2 — stopwatch */
export function StopwatchIcon(props: FAIconProps) {
  return <FADuotoneChar char={"\uF2F2"} {...props} />;
}

/** U+F736 — calendar-star */
export function CalendarStarIcon(props: FAIconProps) {
  return <FADuotoneChar char={"\uF736"} {...props} />;
}

/** U+E0B7 — bolt-lightning */
export function BoltLightningIcon(props: FAIconProps) {
  return <FADuotoneChar char={"\uE0B7"} {...props} />;
}

/** U+F086 — comments */
export function CommentsIcon(props: FAIconProps) {
  return <FADuotoneChar char={"\uF086"} {...props} />;
}

/** U+F275 — industry */
export function IndustryIcon(props: FAIconProps) {
  return <FADuotoneChar char={"\uF275"} {...props} />;
}

/** U+E010 — lock-keyhole */
export function LockKeyholeIcon(props: FAIconProps) {
  return <FADuotoneChar char={"\uE010"} {...props} />;
}

/** U+F058 — circle-check */
export function CircleCheckIcon(props: FAIconProps) {
  return <FADuotoneChar char={"\uF058"} {...props} />;
}
