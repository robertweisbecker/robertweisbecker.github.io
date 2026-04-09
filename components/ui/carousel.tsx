"use client";

  import useEmblaCarousel,{ type UseEmblaCarouselType } from "embla-carousel-react"
  import * as React from "react"

  import { Button } from "@/components/ui/button"
  import { cn } from "@/lib/utils"
  import { Toolbar } from "@base-ui/react"
  import { IconChevronLeft,IconChevronRight } from "@tabler/icons-react"

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollSnaps: number[];
  selectedSnap: number;
  scrollTo: (index: number) => void;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
  const [selectedSnap, setSelectedSnap] = React.useState(0);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
    setSelectedSnap(api.selectedScrollSnap());
  }, []);

  const setupSnaps = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const scrollTo = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    setupSnaps(api);
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("reInit", setupSnaps);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect, setupSnaps]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        scrollSnaps,
        selectedSnap,
        scrollTo,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="size-full overflow-hidden rounded-2xl" data-slot="carousel-content">
      <div className={cn("flex", orientation === "horizontal" ? "-ms-4" : "-mt-4 flex-col", className)} {...props} />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();

  return (
    <div
      // role="group"
      // aria-roledescription="slide"
      // id={`carousel-item-${index}`}
      role="tabpanel"
      data-slot="carousel-item"
      className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "ps-4" : "pt-4", className)}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = "elevated",
  size = "icon-sm",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      rounded
      className={cn(
        "absolute touch-manipulation",
        orientation === "horizontal"
          ? "-inset-s-12 top-1/2 -translate-y-1/2"
          : "inset-s-1/2 -top-12 -translate-x-1/2 rotate-90 rtl:translate-x-1/2",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <IconChevronLeft className="rtl:rotate-180" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "elevated",
  size = "icon-sm",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      rounded
      className={cn(
        "absolute touch-manipulation",
        orientation === "horizontal"
          ? "-inset-e-12 top-1/2 -translate-y-1/2"
          : "inset-s-1/2 -bottom-12 -translate-x-1/2 rotate-90 rtl:translate-x-1/2",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <IconChevronRight className="rtl:rotate-180" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

// custom toolbar for carousel

function CarouselToolbar({
  className,
  inset = true,
  ...props
}: React.ComponentProps<typeof Toolbar.Root> & { inset?: boolean }) {
  const { orientation, canScrollPrev, canScrollNext, scrollPrev, scrollNext, scrollSnaps, selectedSnap, scrollTo } =
    useCarousel();

  return (
    <Toolbar.Root
      data-slot="carousel-toolbar"
      orientation={orientation}
      style={
        {
          "--pill-dot-size": "8px", // Diameter of inactive dots
          "--pill-active-width": "24px", // Width of the active pill
          "--pill-gap": "6px", // Space between steps
          "--pill-bg": "rgba(0,0,0,0.12)", // Inactive dot color
          "--pill-active-bg": "rgba(0,0,0,0.8)", // Active pill color
          "--pill-fill-bg": "rgba(255,255,255,0.45)", // Autoplay fill bar color
          "--pill-container-bg": "rgba(0,0,0,0.04)", // Container background
          "--pill-container-border": "rgba(0,0,0,0.06)", // Container border color
          "--pill-container-radius": "999px", // Container border radius
        } as React.CSSProperties
      }
      className={cn(
        "z-10 flex items-center justify-center gap-2 rounded-full text-white",
        inset && [
          "absolute",
          orientation === "horizontal"
            ? "bottom-4 left-1/2 -translate-x-1/2 items-center"
            : "inset-inline-s-4 top-1/2 -translate-y-1/2",
        ],
        orientation === "horizontal" ? "w-fit flex-row" : "h-fit flex-col",
        className
      )}
      {...props}
    >
      <Toolbar.Button
        data-slot="carousel-previous"
        disabled={!canScrollPrev}
        aria-disabled={!canScrollPrev}
        onClick={scrollPrev}
        className={cn(
          "ease grid-stack size-8 rounded-full border bg-neutral-600/20 backdrop-blur-xl transition-colors duration-100 hover:not-aria-disabled:bg-neutral-600/30 active:scale-98 active:bg-neutral-600/25 aria-disabled:opacity-50"
        )}
      >
        <IconChevronLeft strokeWidth={3} className="size-4 -translate-x-px rtl:rotate-180" />
      </Toolbar.Button>
      <Toolbar.Group
        role="tablist"
        className="flex h-8 flex-1 shrink-0 items-center justify-center rounded-full border bg-neutral-600/20 px-2.5 py-1.5 backdrop-blur-xl"
        aria-label="Choose slide to display."
      >
        {scrollSnaps.map((_, index) => (
          <Toolbar.Button
            key={index}
            role="tab"
            // aria-controls={`carousel-item-${index}`}
            aria-selected={selectedSnap === index}
            data-selected={selectedSnap === index}
            className={cn(
              "size-2 shrink-0 origin-[50%] cursor-pointer rounded-full bg-current/30 transition-[background-color,width,opacity,height,transform,margin-left,margin-top] duration-500 ease-out not-first:ms-2 hover:not-data-selected:bg-current/50",
              "data-[selected=true]:w-7 data-[selected=true]:bg-current/90",
              "relative after:absolute after:-inset-3 after:rounded-full data-selected:after:hidden"
              // "bg-(--pill-bg) data-[selected=true]:bg-(--pill-active-bg)"
            )}
            onClick={() => scrollTo(index)}
          >
            <span className="sr-only">Slide {index + 1}</span>
          </Toolbar.Button>
        ))}
      </Toolbar.Group>
      <Toolbar.Button
        data-slot="carousel-next"
        disabled={!canScrollNext}
        aria-disabled={!canScrollNext}
        onClick={scrollNext}
        className={cn(
          "ease grid-stack size-8 rounded-full border bg-neutral-600/20 backdrop-blur-xl transition-colors duration-100 hover:not-aria-disabled:bg-neutral-600/40 active:scale-98 active:bg-neutral-600/30 aria-disabled:opacity-50"
        )}
      >
        <IconChevronRight strokeWidth={3} className="size-4 translate-x-px rtl:rotate-180" />
      </Toolbar.Button>
    </Toolbar.Root>
  );
}

  export {
    Carousel,
    CarouselContent,
    CarouselItem,CarouselNext,CarouselPrevious,CarouselToolbar,
    useCarousel,type CarouselApi
  }
