"use client";

import * as React from "react";
import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import Autoplay, { type AutoplayType } from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion, type Transition } from "motion/react";
import { IconChevronDown, IconChevronLeft, IconChevronRight, IconChevronUp } from "@tabler/icons-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Meter, Toolbar } from "@base-ui/react";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { PauseFill, PlayFill, ArrowRotateLeft } from "@gravity-ui/icons";

const iconTransition: Transition = { type: "spring", stiffness: 600, damping: 30 };

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 4 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

type CarouselApi = EmblaCarouselType | undefined;

type CarouselProps = {
  opts?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  autoplay?: boolean | Parameters<typeof Autoplay>[0];
  fade?: boolean;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  orientation: "horizontal" | "vertical";
  goTo: (index: number) => void;
  goToPrev: () => void;
  goToNext: () => void;
  canGoToPrev: boolean;
  canGoToNext: boolean;
  snaps: number[];
  selectedSnap: number;
  isPlaying: boolean;
  togglePlay: () => void;
  autoplayProgress: number;
  autoplayEnabled: boolean;
  isFinished: boolean;
  restartAutoplay: () => void;
};

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within a <Carousel />");
  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins: externalPlugins,
  autoplay: autoplayOption,
  fade: fadeOption,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const autoplayEnabled = !!autoplayOption;
  const fadeEnabled = !!fadeOption;

  const autoplayOpts = typeof autoplayOption === "object" ? autoplayOption : {};
  const isLoop = opts?.loop ?? false;
  const autoplayPlugin = React.useRef(autoplayEnabled ? Autoplay({ delay: 4000, ...autoplayOpts }) : null);

  const [intersectionRef, entry] = useIntersectionObserver({ threshold: 0.3 });
  const isInView = entry?.isIntersecting ?? false;
  const userPaused = React.useRef(false);

  const builtInPlugins = [
    ...(fadeEnabled ? [Fade()] : []),
    ...(autoplayPlugin.current ? [autoplayPlugin.current] : []),
  ];

  const [carouselRef, api] = useEmblaCarousel({ ...opts, axis: orientation === "horizontal" ? "x" : "y" }, [
    ...builtInPlugins,
    ...(externalPlugins ?? []),
  ]);

  const [canGoToPrev, setCanGoToPrev] = React.useState(false);
  const [canGoToNext, setCanGoToNext] = React.useState(false);
  const [snaps, setSnaps] = React.useState<number[]>([]);
  const [selectedSnap, setSelectedSnap] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [autoplayProgress, setAutoplayProgress] = React.useState(0);

  const autoplay = () => (api?.plugins()?.autoplay as AutoplayType | undefined) ?? null;

  // User-initiated navigation: reset autoplay's timer so the new slide gets a
  // fresh delay instead of inheriting the previous slide's countdown.
  // `plug.reset()` no-ops when autoplay isn't playing, so this is safe.
  const goTo = React.useCallback(
    (index: number) => {
      api?.goTo(index);
      autoplay()?.reset();
    },
    [api]
  );
  const goToPrev = React.useCallback(() => {
    api?.goToPrev();
    autoplay()?.reset();
  }, [api]);
  const goToNext = React.useCallback(() => {
    api?.goToNext();
    autoplay()?.reset();
  }, [api]);

  const isFinished = autoplayEnabled && !isLoop && !isPlaying && selectedSnap === snaps.length - 1;

  const togglePlay = React.useCallback(() => {
    const plug = autoplay();
    if (!plug) return;
    if (plug.isPlaying()) {
      userPaused.current = true;
      plug.stop();
    } else {
      userPaused.current = false;
      plug.play();
    }
  }, [api]);

  const restartAutoplay = React.useCallback(() => {
    const plug = autoplay();
    if (!plug) return;
    userPaused.current = false;
    api?.goTo(0);
    plug.play();
  }, [api]);

  const delay = typeof autoplayOpts.delay === "number" ? autoplayOpts.delay : 4000;

  // Sync selection state from embla.
  React.useEffect(() => {
    if (!api) return;
    const sync = (emblaApi: EmblaCarouselType) => {
      setCanGoToPrev(emblaApi.canGoToPrev());
      setCanGoToNext(emblaApi.canGoToNext());
      setSelectedSnap(emblaApi.selectedSnap());
      setSnaps(emblaApi.snapList());
    };
    sync(api);
    setApi?.(api);
    api.on("reinit", sync);
    api.on("select", sync);
    return () => {
      api.off("reinit", sync);
      api.off("select", sync);
    };
  }, [api, setApi]);

  // Wire autoplay: start stopped (in-view effect plays), listeners, last-snap interception.
  React.useEffect(() => {
    const plug = autoplay();
    if (!api || !plug) return;

    plug.stop();
    setIsPlaying(plug.isPlaying());

    const onPlay = () => setIsPlaying(true);
    const onStop = () => {
      setIsPlaying(false);
      setAutoplayProgress(0);
    };
    const onAutoplaySelect = (
      emblaApi: EmblaCarouselType,
      { detail }: { detail: { sourceSnap: number; targetSnap: number } }
    ) => {
      setAutoplayProgress(0);
      // Non-loop: intercept autoplay's wrap from last→0 and stop on the last slide.
      // The library calls startAutoplay() right after this event fires, so defer via
      // microtask to override. goTo(..., true) is instant and runs before paint.
      if (!isLoop && detail.sourceSnap === emblaApi.snapList().length - 1 && detail.targetSnap === 0) {
        queueMicrotask(() => {
          plug.stop();
          emblaApi.goTo(detail.sourceSnap, true);
        });
      }
    };

    api.on("autoplay:play", onPlay);
    api.on("autoplay:stop", onStop);
    api.on("autoplay:select", onAutoplaySelect);

    return () => {
      api.off("autoplay:play", onPlay);
      api.off("autoplay:stop", onStop);
      api.off("autoplay:select", onAutoplaySelect);
    };
  }, [api, isLoop]);

  // Drive the progress meter only while actually playing.
  React.useEffect(() => {
    if (!isPlaying) return;
    const plug = autoplay();
    if (!plug) return;
    let rafId = 0;
    const tick = () => {
      const t = plug.timeUntilNext();
      setAutoplayProgress(t !== null ? ((delay - t) / delay) * 100 : 0);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, api, delay]);

  // Lazy autoplay: only play while the carousel is in view (and user hasn't paused).
  React.useEffect(() => {
    const plug = autoplay();
    if (!plug || !autoplayEnabled) return;
    if (isInView && !userPaused.current) plug.play();
    else if (!isInView && plug.isPlaying()) plug.stop();
  }, [api, autoplayEnabled, isInView]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      }
    },
    [goToPrev, goToNext]
  );

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        orientation,
        goTo,
        goToPrev,
        goToNext,
        canGoToPrev,
        canGoToNext,
        snaps,
        selectedSnap,
        isPlaying,
        togglePlay,
        autoplayProgress,
        autoplayEnabled,
        isFinished,
        restartAutoplay,
      }}
    >
      <div
        ref={autoplayEnabled ? intersectionRef : undefined}
        onKeyDownCapture={handleKeyDown}
        data-orientation={orientation}
        className={cn(
          "group relative",
          "[--carousel-height:var(--container-xs)]",
          "[--carousel-gap:--spacing(4)]",
          orientation === "vertical" &&
            "has-data-[slot=carousel-next]:pb-button-sm has-data-[slot=carousel-previous]:pt-button-sm",
          className
        )}
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

function CarouselViewport({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div
      ref={carouselRef}
      className={cn(
        // Clip the slide strip; toolbar is a sibling so old has-data-[layout=inset] never matched the viewport.
        "size-full min-w-0 overflow-hidden",
        "group-has-[[data-slot=carousel-toolbar][data-layout=inset]]:rounded-2xl",
        "[clip-path:inset(-8px)]",
        orientation === "vertical" && "h-full",
        orientation === "horizontal" &&
          "group-has-[[data-slot=carousel-toolbar][data-layout=default]]:min-h-0 group-has-[[data-slot=carousel-toolbar][data-layout=default]]:w-full"
      )}
      data-slot="carousel-viewport"
    >
      <div
        data-slot="carousel-container"
        className={cn(
          "flex min-w-0 has-[[class*='shadow-border']]:p-px",
          orientation === "horizontal" && "-ms-(--carousel-gap)",
          orientation === "vertical" &&
            "-mt-(--carousel-gap) h-[calc(var(--carousel-gap)+var(--carousel-height))] flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();
  return (
    <div
      role="tabpanel"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" && "ps-(--carousel-gap)",
        orientation === "vertical" && "pt-(--carousel-gap)",
        className
      )}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = "overlay",
  size = "icon-sm",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, goToPrev, canGoToPrev } = useCarousel();
  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      rounded
      render={<motion.button whileTap={{ scale: 0.95 }} transition={iconTransition} />}
      className={cn(
        "touch-manipulation",
        orientation === "vertical" && "in-data-[slot=carousel-toolbar]:-rotate-90",
        // "not-in-data-[slot=carousel-toolbar]:absolute not-in-data-[slot=carousel-toolbar]:z-10",
        // orientation === "horizontal"
        //   ? "not-in-data-[slot=carousel-toolbar]:inset-s-0 not-in-data-[slot=carousel-toolbar]:top-1/2 not-in-data-[slot=carousel-toolbar]:-translate-y-1/2 md:not-in-data-[slot=carousel-toolbar]:-inset-s-(--carousel-gap)"
        //   : "not-in-data-[slot=carousel-toolbar]:inset-s-1/2 not-in-data-[slot=carousel-toolbar]:-top-4 not-in-data-[slot=carousel-toolbar]:-translate-x-1/2 rtl:not-in-data-[slot=carousel-toolbar]:translate-x-1/2",
        className
      )}
      disabled={!canGoToPrev}
      onClick={goToPrev}
      {...props}
    >
      {orientation === "horizontal" ? (
        <IconChevronLeft strokeWidth={3} className="-ms-px size-5 rtl:rotate-180" />
      ) : (
        <IconChevronUp strokeWidth={3} className="-mt-px size-5 rtl:rotate-180" />
      )}
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "overlay",
  size = "icon-sm",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, goToNext, canGoToNext } = useCarousel();
  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      rounded
      render={<motion.button whileTap={{ scale: 0.95 }} transition={iconTransition} />}
      className={cn(
        "touch-manipulation",
        orientation === "vertical" && "in-data-[slot=carousel-toolbar]:-rotate-90",
        // "not-in-data-[slot=carousel-toolbar]:absolute not-in-data-[slot=carousel-toolbar]:z-10",
        // orientation === "horizontal"
        //   ? "not-in-data-[slot=carousel-toolbar]:inset-e-0 not-in-data-[slot=carousel-toolbar]:top-1/2 not-in-data-[slot=carousel-toolbar]:-translate-y-1/2 md:not-in-data-[slot=carousel-toolbar]:-inset-e-(--carousel-gap)"
        //   : "not-in-data-[slot=carousel-toolbar]:inset-s-1/2 not-in-data-[slot=carousel-toolbar]:-bottom-4 not-in-data-[slot=carousel-toolbar]:-translate-x-1/2 rtl:not-in-data-[slot=carousel-toolbar]:translate-x-1/2",
        className
      )}
      disabled={!canGoToNext}
      onClick={goToNext}
      {...props}
    >
      {orientation === "horizontal" ? (
        <IconChevronRight strokeWidth={3} className="-me-px size-4.5 rtl:rotate-180" />
      ) : (
        <IconChevronDown strokeWidth={3} className="-mb-px size-4.5 rtl:rotate-180" />
      )}
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

function CarouselDots({ className, ...props }: React.ComponentProps<typeof Toolbar.Group>) {
  const { snaps, selectedSnap, goTo, autoplayEnabled, isPlaying, autoplayProgress, orientation } = useCarousel();

  return (
    <Toolbar.Group
      role="tablist"
      className={cn(
        "flex h-button-sm shrink-0 items-center justify-center rounded-full border bg-neutral-700/60 px-2.5 py-1.5 backdrop-blur-xl",
        orientation === "vertical" && "rotate-90",
        className
      )}
      aria-label="Choose a slide to show."
      {...props}
    >
      {snaps.map((_, index) => {
        const isActive = selectedSnap === index;
        const isFillingSlide = autoplayEnabled && isPlaying && isActive;

        return (
          <Toolbar.Button
            key={index}
            role="tab"
            aria-selected={isActive}
            data-selected={isActive}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goTo(index)}
            className={cn(
              "relative shrink-0 cursor-pointer rounded-full transition-all duration-500 ease-out not-first:ms-3",
              "h-2 bg-current/30 hover:not-data-selected:bg-current/50",
              "after:absolute after:-inset-y-5 after:-inset-s-3 after:-inset-e-1.5",
              isActive ? "z-1 w-6 bg-current/80 after:hidden" : "w-2",
              isFillingSlide && "bg-current/30"
            )}
          >
            {autoplayEnabled && isActive && (
              <Meter.Root
                value={autoplayProgress}
                min={0}
                max={100}
                className="absolute inset-0 overflow-hidden"
                aria-label="Autoplay progress"
              >
                <Meter.Track className="size-full overflow-hidden rounded-full">
                  <Meter.Indicator
                    className={cn(
                      "min-w-px rounded-full bg-white duration-0",
                      isFillingSlide ? "transition-[width]" : "transition-none"
                    )}
                    style={{ width: `${autoplayProgress}%` }}
                  />
                </Meter.Track>
                <Meter.Value className="sr-only" />
              </Meter.Root>
            )}
          </Toolbar.Button>
        );
      })}
    </Toolbar.Group>
  );
}

function CarouselPlay({ className, ...props }: React.ComponentProps<typeof Toolbar.Button>) {
  const { autoplayEnabled, isPlaying, isFinished, togglePlay, restartAutoplay, orientation } = useCarousel();

  if (!autoplayEnabled) return null;

  return (
    <Toolbar.Button
      {...props}
      onClick={isFinished ? restartAutoplay : togglePlay}
      aria-label={isFinished ? "Restart" : isPlaying ? "Pause" : "Play"}
      className={cn(
        buttonVariants({ variant: "overlay", size: "icon-sm" }),
        orientation === "vertical" && "-rotate-90",
        className
      )}
      render={<motion.button />}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={isFinished ? "restart" : isPlaying ? "pause" : "play"}
          variants={iconVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={iconTransition}
        >
          {isFinished ? (
            <ArrowRotateLeft className="relative" />
          ) : isPlaying ? (
            <PauseFill className="relative" />
          ) : (
            <PlayFill className="relative" />
          )}
        </motion.div>
      </AnimatePresence>
    </Toolbar.Button>
  );
}

function CarouselToolbar({
  className,
  inset = true,
  ...props
}: React.ComponentProps<typeof Toolbar.Root> & { inset?: boolean }) {
  const { orientation, autoplayEnabled } = useCarousel();
  const layout = inset ? "inset" : "default";

  return (
    <Toolbar.Root
      data-slot="carousel-toolbar"
      data-layout={layout}
      orientation={orientation}
      className={cn(
        "z-10 flex shrink-0 items-center gap-3 text-white",
        orientation === "horizontal" && "w-fit flex-row",
        orientation === "vertical" && "flex-col",
        !inset && "m-2 mx-auto shrink-0",
        inset && orientation === "horizontal" && "absolute bottom-4 left-1/2 -translate-x-1/2",
        inset && orientation === "vertical" && "inset-inline-s-0 absolute top-1/2 -translate-y-1/2",
        className
      )}
      {...props}
    >
      {!autoplayEnabled && <CarouselPrevious />}
      <CarouselDots />
      <CarouselPlay />
      {!autoplayEnabled && <CarouselNext />}
    </Toolbar.Root>
  );
}

export {
  Autoplay as CarouselAutoplay,
  Fade as CarouselFade,
  Carousel,
  CarouselViewport,
  CarouselItem,
  CarouselDots,
  CarouselNext,
  CarouselPlay,
  CarouselPrevious,
  CarouselToolbar,
  useCarousel,
  type CarouselApi,
};
