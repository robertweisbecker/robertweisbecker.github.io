"use client";

import { Cambio } from "cambio";
import { IconX } from "@tabler/icons-react";
import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Artwork({
  year,
  src,
  title = "Untitled",
  medium,
  size,
  className,
}: {
  year: number;
  src: StaticImageData;
  title?: string;
  medium?: "digital" | "graphite" | "oil" | "charcoal" | "spraypaint" | "mixed";
  className?: string;
  size?: string;
}) {
  const aspectRatio = `${src.width} / ${src.height}`;
  const popupStyle: CSSProperties & { "--art-ratio": number } = {
    "--art-ratio": src.width / src.height,
    aspectRatio,
    borderRadius: 12,
  };

  return (
    <Cambio.Root dismissible>
      <figure className={cn("group relative mb-4 min-w-0", className)}>
        <Cambio.Trigger
          className="relative w-full cursor-zoom-in overflow-hidden rounded-lg bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          style={{ aspectRatio }}
        >
          <Image
            src={src}
            alt={title ? title : ""}
            fill
            loading="lazy"
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, 33vw"
            className="rounded-[inherit] object-contain shadow-border-xs"
          />
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <rect x="6" y="4" width="1" height="1" fill="currentColor" />
            <rect x="5" y="5" width="1" height="1" fill="currentColor" />
            <rect x="4" y="6" width="1" height="1" fill="currentColor" />
            <rect x="2" y="8" width="1" height="1" fill="currentColor" />
            <rect x="3" y="8" width="1" height="1" fill="currentColor" />
            <rect x="4" y="8" width="1" height="1" fill="currentColor" />
            <rect x="2" y="6" width="1" height="1" fill="currentColor" />
            <rect x="2" y="7" width="1" height="1" fill="currentColor" />
            <rect x="8" y="2" width="1" height="1" fill="currentColor" />
            <rect x="8" y="3" width="1" height="1" fill="currentColor" />
            <rect x="8" y="4" width="1" height="1" fill="currentColor" />
            <rect x="6" y="2" width="1" height="1" fill="currentColor" />
            <rect x="7" y="2" width="1" height="1" fill="currentColor" />
          </svg>
        </Cambio.Trigger>

        <figcaption className="pointer-events-none absolute inset-0 grid items-start duration-200 ease-out select-none *:px-1 *:opacity-0 *:transition-[transform,translate,opacity] *:group-hover:opacity-100">
          <span className="w-fit -translate-y-1 self-start bg-background font-heading text-sm group-hover:translate-y-0">
            &apos;{title}&apos;
          </span>
          <span className="h-fit translate-x-1 place-self-end bg-background font-pixel text-2xs capitalize [writing-mode:vertical-rl] group-hover:translate-x-0">
            {medium ? `${medium}` : ""} {year}. {size ? `${size}` : ""}
          </span>
        </figcaption>
      </figure>

      <Cambio.Portal>
        <Cambio.Backdrop className="fixed inset-0 h-dvh w-dvw bg-black/40" />
        <Cambio.Popup
          className="relative flex max-h-dialog w-[min(90vw,calc((100dvh-2rem)*var(--art-ratio)))] max-w-dialog flex-col gap-2 md:w-[min(60vw,calc((100dvh-2rem)*var(--art-ratio)))]"
          style={popupStyle}
        >
          <Image
            src={src}
            alt={title ? title : ""}
            fill
            sizes="(max-width: 768px) 90vw, 60vw"
            className="rounded-inherit pointer-events-none object-contain select-none"
            style={{ borderRadius: 8 }}
          />
          <div className="pointer-events-none absolute top-0 left-0 z-10 flex origin-top-left transform-[rotate(-90deg)_translateX(-100%)_translateY(-100%)] gap-1 font-pixel text-2xs text-white text-shadow-sm">
            <Cambio.Title className="h-fit px-1">{title}.</Cambio.Title>
            <Cambio.Description className="h-fit px-1 capitalize">
              {medium ? `${medium}` : ""} {year}. {size ? `${size}` : ""}
            </Cambio.Description>
          </div>
          <Cambio.Close
            aria-label="Close image preview"
            className="absolute inset-e-2 top-2 z-10"
            render={<Button variant="overlay" size="icon" rounded />}
          >
            <IconX className="size-6" />
          </Cambio.Close>
        </Cambio.Popup>
      </Cambio.Portal>
    </Cambio.Root>
  );
}
