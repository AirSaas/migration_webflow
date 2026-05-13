import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Custom tailwind-merge config — registers our project's typography tokens
 * (`text-paragraph`, `text-small`, `text-h1..h4`) as **font-size** classes
 * so they don't accidentally conflict with text-color utilities like
 * `text-white` / `text-foreground`.
 *
 * Bug history (2026-05-13) : `<TableFrame>` headers had `text-white` silently
 * dropped because `twMerge` treated `text-paragraph` as text-color and
 * deduplicated `text-white` away. Headers rendered black-on-blue, invisible.
 * Marianela audit point #5 traced this back to the cn() utility.
 *
 * The custom classGroups below extend twMerge's default "font-size" group
 * with our token names. Any future custom `text-*` utility used as a
 * font-size must be appended here.
 */
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["paragraph", "small", "h1", "h2", "h3", "h4", "lg-fluid"] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
