"use client";

import { Dialog } from "@base-ui/react/dialog";
import { IconX } from "@tabler/icons-react";
import Image, { ImageProps, type StaticImageData } from "next/image";
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
  loading,
}: {
  year: number;
  src: StaticImageData;
  title?: string;
  medium?: "digital" | "graphite" | "oil" | "charcoal" | "spraypaint" | "mixed";
  className?: string;
  size?: string;
  loading?: ImageProps["loading"];
}) {
  const aspectRatio = `${src.width} / ${src.height}`;
  const popupStyle: CSSProperties & { "--art-ratio": number } = {
    "--art-ratio": src.width / src.height,
    aspectRatio,
    borderRadius: 12,
  };

  return (
    <Dialog.Root>
      <figure className={cn("group relative mb-4 flex min-w-0 flex-col gap-1", className)}>
        <Dialog.Trigger
          className="relative w-full cursor-zoom-in overflow-hidden shadow-border-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          style={{ aspectRatio }}
        >
          <Image
            src={src}
            alt={title ? title : ""}
            // fill
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain"
            loading={loading}
          />
        </Dialog.Trigger>

        <figcaption className="pointer-events-none absolute inset-0 grid items-start duration-200 ease-out select-none *:px-1 *:opacity-0 *:transition-[transform,translate,opacity] *:group-hover:opacity-100">
          <span className="w-fit -translate-y-1 self-start bg-background font-pixel text-2xs group-hover:translate-y-0">{title}</span>
          <span className="h-fit translate-x-1 place-self-end bg-background font-pixel text-2xs [writing-mode:vertical-rl] group-hover:translate-x-0">
            {medium ? `${medium},` : ""} {year} {size ? `∙ ${size}` : ""}
          </span>
        </figcaption>
      </figure>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-100 h-dvh w-dvw bg-black/40" />
        <Dialog.Viewport className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <Dialog.Popup
            className="relative flex max-h-dialog w-[min(90vw,calc((100dvh-2rem)*var(--art-ratio)))] max-w-dialog flex-col gap-2 md:max-w-[min(60vw,calc((100dvh-2rem)*var(--art-ratio)))]"
            style={popupStyle}
          >
            <Image
              src={src}
              alt={title ? title : ""}
              fill
              sizes="(max-width: 768px) 90vw, 60vw"
              className="rounded-inherit squircle pointer-events-none object-contain select-none"
              style={{ borderRadius: 20 }}
              preload
            />
            <div className="pointer-events-none absolute top-0 left-0 z-10 flex origin-top-left transform-[rotate(-90deg)_translateX(-100%)_translateY(-100%)] gap-1 font-pixel text-2xs text-white text-shadow-sm">
              <Dialog.Title className="h-fit px-1">{title}.</Dialog.Title>
              <Dialog.Description className="h-fit px-1 capitalize">
                {medium ? `${medium}` : ""} {year}. {size ? `${size}` : ""}
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close image preview"
              className="absolute inset-e-2 top-2 z-10"
              render={<Button variant="overlay" size="icon" rounded />}
            >
              <IconX className="size-6" />
            </Dialog.Close>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
