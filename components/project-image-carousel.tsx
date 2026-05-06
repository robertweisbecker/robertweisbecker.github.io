"use client";

import { Image } from "@/components/image";
import { Carousel, CarouselViewport, CarouselItem, CarouselToolbar } from "@/components/ui/carousel";
import { imageSrc } from "@/lib/image-src";
import { cn } from "@/lib/utils";
import type { StaticImageData } from "next/image";

export type ProjectImageCarouselSlide = {
  src: StaticImageData;
  alt: string;
  caption?: string;
};

export function ProjectImageCarousel({
  slides,
  className,
  orientation = "horizontal",
  variant = "default",
  fade,
}: {
  slides: ProjectImageCarouselSlide[];
  className?: string;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "inset" | "full";
  fade?: boolean;
}) {
  const hasCaptions = slides.some((s) => Boolean(s.caption));

  return (
    <div className={cn("not-prose relative mx-auto w-full lg:max-w-3xl", className)}>
      <Carousel
        orientation={orientation}
        opts={
          {
            // loop: true,
          }
        }
        className={cn(
          "",
          variant === "inset" &&
            "**:data-[slot=carousel-viewport]:rounded-2xl",
          variant === "full" &&
            "**:data-[slot=carousel-item]:ps-0 **:data-[slot=carousel-viewport]:rounded-none **:data-[slot=carousel-viewport]:data-[orientation=horizontal]:overflow-visible **:data-[slot=carousel-viewport]:[&>div]:ms-0"
        )}
        fade={fade}
        style={{
          clipPath: variant === "full" ? "inset(0 -100% 0 0)" : undefined,
        }}
      >
        <CarouselViewport className={cn(orientation === "vertical" && "h-100!")}>
          {slides.map((slide) => (
            <CarouselItem key={imageSrc(slide.src)}>
              {variant === "inset" ? (
                <Image src={slide.src} alt={slide.alt} caption={slide.caption} />
              ) : (
                <figure className="flex flex-col gap-2">
                  <img src={imageSrc(slide.src)} alt={slide.alt} className="h-auto w-full max-w-full" />
                  {slide.caption && (
                    <figcaption className="mx-auto max-w-prose text-center text-xs text-muted-foreground">
                      {slide.caption}
                    </figcaption>
                  )}
                </figure>
              )}
            </CarouselItem>
          ))}
        </CarouselViewport>
        <CarouselToolbar inset={!hasCaptions || variant === "full"} />
      </Carousel>
    </div>
  );
}
