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
    <Carousel autoplay={{ delay: 3000, defaultInteraction: false }} fade className="w-full max-w-xl">
      <CarouselViewport>
        {CAROUSEL_SLIDES.map((slide) => (
          <CarouselItem key={slide.src}>
            <div
              className="aspect-video overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat ring-1 ring-border/50 ring-inset"
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
