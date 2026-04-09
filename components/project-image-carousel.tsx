"use client";

  import { Carousel,CarouselContent,CarouselItem,CarouselToolbar } from "@/components/ui/carousel"
  import { cn } from "@/lib/utils"

export type ProjectImageCarouselSlide = {
  src: string;
  alt: string;
};

export function ProjectImageCarousel({
  slides,
  className,
}: {
  slides: ProjectImageCarouselSlide[];
  className?: string;
}) {
  return (
    <div className={cn("not-prose relative mx-auto w-full", className)}>
      <Carousel className="rounded-2xl bg-card shadow-border-sm">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.src}>
              <img
                src={slide.src}
                alt={slide.alt}
                className="h-full w-auto rounded-[calc(var(--radius-xl)---spacing(1))] object-contain object-center"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselToolbar />
      </Carousel>
    </div>
  );
}
