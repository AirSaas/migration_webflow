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

/** U+F057 — circle-xmark */
export function CircleXmarkIcon(props: FAIconProps) {
  return <FADuotoneChar char={"\uF057"} {...props} />;
}

/** U+F05E — ban (used for "drop" / "stop") */
export function BanIcon(props: FAIconProps) {
  return <FADuotoneChar char={"\uF05E"} {...props} />;
}

/** U+F055 — circle-plus (used for "add" / "try new") */
export function CirclePlusIcon(props: FAIconProps) {
  return <FADuotoneChar char={"\uF055"} {...props} />;
}

/** U+F021 — arrows-rotate / sync (used for "keep" / "maintain") */
export function ArrowsRotateIcon(props: FAIconProps) {
  return <FADuotoneChar char={"\uF021"} {...props} />;
}

/** U+F085 — gears / cogs (used for "improve" / "tune") */
export function GearsIcon(props: FAIconProps) {
  return <FADuotoneChar char={"\uF085"} {...props} />;
}

/** U+F5D2 — atom (science / portfolio visualisation) */
export function AtomIcon(props: FAIconProps) {
  return <FADuotoneChar char={"\uF5D2"} {...props} />;
}

/** U+F474 — dolly-flatbed (capacity / logistics) */
export function DollyIcon(props: FAIconProps) {
  return <FADuotoneChar char={"\uF474"} {...props} />;
}

/** U+F46C — clipboard-check (prioritisation / validation) */
export function ClipboardCheckIcon(props: FAIconProps) {
  return <FADuotoneChar char={"\uF46C"} {...props} />;
}

/** U+F11E — flag-checkered (roadmap / milestones) */
export function FlagCheckeredIcon(props: FAIconProps) {
  return <FADuotoneChar char={"\uF11E"} {...props} />;
}

/** U+F31C — file-pen (reporting / edit document) */
export function FilePenIcon(props: FAIconProps) {
  return <FADuotoneChar char={"\uF31C"} {...props} />;
}
