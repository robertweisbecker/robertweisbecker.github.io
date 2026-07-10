import { Carousel, CarouselItem, CarouselToolbar, CarouselViewport } from "@/components/ui/carousel";

const CAROUSEL_SLIDES = [
  { src: "/assets/oklch/status-error.png", alt: "OKLCH status error palette" },
  { src: "/assets/oklch/status-warning.png", alt: "OKLCH status warning palette" },
  { src: "/assets/oklch/status-info.png", alt: "OKLCH status info palette" },
  { src: "/assets/oklch/status-success.png", alt: "OKLCH status success palette" },
  { src: "/assets/oklch/status-highlight.png", alt: "OKLCH status highlight palette" },
];

export function CarouselDemo() {
  return (
    <Carousel autoplay={{ delay: 3000, defaultInteraction: false }} className="w-full max-w-xl">
      <CarouselViewport className="rounded-[inherit]">
        {CAROUSEL_SLIDES.map((slide) => (
          <CarouselItem key={slide.src} className="aspect-square rounded-[inherit] md:basis-1/2 lg:basis-1/3">
            <div
              className="size-full rounded-[inherit] bg-white bg-contain bg-center bg-no-repeat inset-ring inset-ring-border/50"
              style={{ backgroundImage: `url('${slide.src}')` }}
              role="img"
              aria-label={slide.alt}
            />
          </CarouselItem>
        ))}
      </CarouselViewport>
      <CarouselToolbar />
    </Carousel>
  );
}
