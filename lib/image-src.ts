import type { StaticImageData } from "next/image";

/** URL string for `<img>` or motion — works with static imports and plain paths. */
export function imageSrc(src: string | StaticImageData): string {
  return typeof src === "string" ? src : src.src;
}
