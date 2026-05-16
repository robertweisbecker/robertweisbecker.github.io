"use client";

/*─────────────────────────────────────────────────────────
 * DIRECTION E — Polaroid Fan
 *
 * Two variations sharing the same horizontal fan layout:
 *
 * V1  — click opens a fullscreen Dialog lightbox with a
 *       caption sidebar.
 * V2  — click focuses the card to the center; the others
 *       cluster below in a tight stack. Click again or
 *       click background to return to the fan.
 *
 * Motion (V2):
 *   idle        — 5 white cards in a slight fan, ~600px wide
 *   hover card  — that card lifts 8px, scales 1.03
 *   click card  — focused card centers, scales ~1.58, rotation 0
 *                 other cards scale to 0.7 and shift down ~220px
 *   click bg    — fan restored
 *─────────────────────────────────────────────────────────*/

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Carousel, CarouselViewport, CarouselItem, CarouselToolbar } from "@/components/ui/carousel";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { IconArrowsDiagonal, IconArrowsDiagonalMinimize2, IconChevronLeft, IconChevronRight, IconX } from "@tabler/icons-react";

/* ─── Data ───────────────────────────────────────────────── */
type Slide = { src: string; alt: string; caption: string; label: string; detail: string };

const SLIDES: Slide[] = [
  {
    src: "/assets/forge/dark.png",
    alt: "Dark mode",
    label: "UI",
    caption: "Dark mode",
    detail: "Dark mode was a Day 1 requirement. The new neutral scale lets surfaces stack visually without relying on borders alone.",
  },
  {
    src: "/assets/forge/light.png",
    alt: "Light mode",
    label: "UI",
    caption: "Light mode",
    detail: "The warm neutral base feels intentional rather than washed-out. A common trap with auto-generated light themes.",
  },
  {
    src: "/assets/forge/colors-all.png",
    alt: "Color palette",
    label: "Color",
    caption: "Expanded palettes",
    detail: "Each palette spans 100–900. Every step shares a lightness range with its siblings — mix across scales confidently.",
  },
  {
    src: "/assets/forge/colors-neutral.png",
    alt: "Neutral ramp",
    label: "Color",
    caption: "Neutral scale",
    detail: "The original five neutrals topped out too quickly. The new scale resolves all contrast failures at a stroke.",
  },
  {
    src: "/assets/forge/density-compare.png",
    alt: "Density comparison",
    label: "Density",
    caption: "60% shorter",
    detail: "A strict 4px grid and dense type scale cut vertical footprint by 60%. The preview panel can finally breathe.",
  },
  {
    src: "/assets/forge/buttons.png",
    alt: "Button variants",
    label: "Components",
    caption: "Standardized buttons",
    detail: "Every variant rebuilt with token-driven sizing and explicit states. No more one-off overrides accumulating.",
  },
  {
    src: "/assets/forge/fields.png",
    alt: "Input fields",
    label: "Components",
    caption: "Dense input fields",
    detail: "Reduced padding, 13px text, and focus rings that don't shift layout. Works in dark and light modes.",
  },
  {
    src: "/assets/forge/dialogs.png",
    alt: "Dialogs",
    label: "Components",
    caption: "Standardized dialogs",
    detail: "Single close target, clear action hierarchy, no competing CTAs. Anatomy is consistent across all dialog types.",
  },
  {
    src: "/assets/forge/nav.png",
    alt: "Toolbar",
    label: "Navigation",
    caption: "Surfaced toolbar actions",
    detail: "Page actions moved out of a hidden context menu into a persistent toolbar. Discoverability improved measurably.",
  },
];

/* Fan layout — 5 cards distributed horizontally across ~600px,
 * with subtle rotation + small organic vertical jitter.        */
const FAN: Array<{ rotate: number; x: number; y: number }> = [
  { rotate: -16, x: -150, y: -12 },
  { rotate: 4, x: -75, y: -10 },
  { rotate: -2, x: 0, y: 8 },
  { rotate: -7, x: 75, y: 0 },
  { rotate: 18, x: 150, y: 16 },
];

const PREVIEW_COUNT = FAN.length;
const CARD_W = 228;
const CARD_H = 288;
const FOCUS_W = 360;
const FOCUS_H = 464;
const FOCUS_SCALE = FOCUS_W / CARD_W; // ≈ 1.58
const SPRING = { type: "spring" as const, visualDuration: 0.4, bounce: 0.15 };

/* ─── Card face (polaroid) ───────────────────────────────── */
function PolaroidFace({ slide }: { slide: Slide }) {
  return (
    <div className="flex h-full w-full flex-col p-3">
      <div className="relative flex-1 overflow-hidden rounded-lg bg-muted">
        <img src={slide.src} alt={slide.alt} className="h-full w-full object-cover object-top" draggable={false} />
      </div>
      <div className="pt-2.5">
        <p className="font-pixel text-[9px] tracking-wider text-muted-foreground uppercase">{slide.label}</p>
        <p className="mt-0.5 line-clamp-1 text-xs font-semibold text-foreground">{slide.caption}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
 * VARIATION 1 — Dialog lightbox with caption sidebar
 * ═══════════════════════════════════════════════════════════ */

function Variation1() {
  const [open, setOpen] = React.useState(false);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const [fading, setFading] = React.useState(false);

  const previewSlides = SLIDES.slice(0, PREVIEW_COUNT);

  function openAt(i: number) {
    setActiveSlide(i);
    setOpen(true);
  }

  function goTo(i: number) {
    if (i === activeSlide) return;
    setFading(true);
    setTimeout(() => {
      setActiveSlide(i);
      setFading(false);
    }, 120);
  }
  function prev() {
    goTo((activeSlide - 1 + SLIDES.length) % SLIDES.length);
  }
  function next() {
    goTo((activeSlide + 1) % SLIDES.length);
  }

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, activeSlide]);

  return (
    <div>
      <h2 className="mb-1 text-xl font-semibold">Variation 1 — Dialog lightbox</h2>
      <p className="mb-10 text-sm text-muted-foreground">
        Polaroid fan. Hover lifts a card; click opens the lightbox with a caption sidebar.
      </p>

      <div className="relative mx-auto flex h-[360px] w-full items-center justify-center">
        <div className="relative h-full w-[600px]">
          {previewSlides.map((slide, i) => {
            const cfg = FAN[i];
            const isHovered = hoveredId === slide.src;
            return (
              <motion.button
                key={slide.src}
                onClick={() => openAt(i)}
                onHoverStart={() => setHoveredId(slide.src)}
                onHoverEnd={() => setHoveredId(null)}
                aria-label={`Open: ${slide.caption}`}
                animate={{
                  x: cfg.x,
                  y: isHovered ? cfg.y - 8 : cfg.y,
                  rotate: cfg.rotate,
                  scale: isHovered ? 1.03 : 1,
                  zIndex: isHovered ? 50 : previewSlides.length - i,
                }}
                transition={SPRING}
                className="absolute top-1/2 left-1/2 cursor-pointer rounded-2xl bg-white shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-primary"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  marginLeft: -CARD_W / 2,
                  marginTop: -CARD_H / 2,
                }}
              >
                <PolaroidFace slide={slide} />
              </motion.button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-center font-pixel text-[10px] text-muted-foreground">
        {SLIDES.length} images · hover to lift · click to open
      </p>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="flex h-svh max-h-svh w-svw max-w-svw flex-col rounded-none bg-foreground/60 p-0 backdrop-blur-xl sm:max-w-svw"
        >
          {/* Top bar */}
          <div className="flex shrink-0 items-center gap-3 border-b border-background/10 px-4 py-3">
            <span className="font-pixel text-[10px] text-background/50 tabular-nums">
              {activeSlide + 1} / {SLIDES.length}
            </span>
            <Separator orientation="vertical" className="h-3 bg-background/20" />
            <span className={cn("text-sm font-medium text-background/90 transition-opacity duration-150", fading && "opacity-0")}>
              {SLIDES[activeSlide].caption}
            </span>
            <DialogClose
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  rounded
                  className="ml-auto text-background/70 hover:bg-background/10 hover:text-background"
                  aria-label="Close"
                />
              }
            >
              <IconX />
            </DialogClose>
          </div>

          {/* Main: image + caption sidebar */}
          <div className="group/lb flex min-h-0 flex-1 overflow-hidden">
            <div className="relative flex min-h-0 flex-1 items-center justify-center">
              {SLIDES.map((slide, i) => (
                <div
                  key={slide.src}
                  className={cn(
                    "absolute inset-0 flex items-center justify-center p-6 transition-opacity duration-150",
                    i === activeSlide && !fading ? "opacity-100" : "pointer-events-none opacity-0"
                  )}
                >
                  <img src={slide.src} alt={slide.alt} className="max-h-full max-w-full rounded-xl object-contain" />
                </div>
              ))}

              <Button
                variant="overlay"
                size="icon"
                rounded
                onClick={prev}
                aria-label="Previous"
                className="absolute top-1/2 left-4 -translate-y-1/2 opacity-0 transition-opacity duration-150 group-hover/lb:opacity-100"
              >
                <IconChevronLeft />
              </Button>
              <Button
                variant="overlay"
                size="icon"
                rounded
                onClick={next}
                aria-label="Next"
                className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 transition-opacity duration-150 group-hover/lb:opacity-100"
              >
                <IconChevronRight />
              </Button>
            </div>

            <aside className="flex w-64 shrink-0 flex-col justify-center gap-4 border-l border-white/10 bg-black/40 p-6">
              <div className={cn("flex flex-col gap-3 transition-opacity duration-150", fading && "opacity-0")}>
                <Badge variant="outline" className="w-fit border-white/20 bg-white/10 text-white/70">
                  {SLIDES[activeSlide].label}
                </Badge>
                <p className="text-base font-semibold text-white">{SLIDES[activeSlide].caption}</p>
                <p className="text-sm leading-relaxed text-white/60">{SLIDES[activeSlide].detail}</p>
              </div>
              <Separator className="bg-white/10" />
              <div className="flex flex-col gap-1 overflow-y-auto">
                {SLIDES.map((slide, i) => (
                  <button
                    key={slide.src}
                    onClick={() => goTo(i)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition-colors",
                      i === activeSlide ? "bg-white/10 text-white" : "text-white/40 hover:bg-white/5 hover:text-white/70"
                    )}
                  >
                    <span className="font-pixel text-[9px] text-white/30 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {slide.caption}
                  </button>
                ))}
              </div>
            </aside>
          </div>

          <div className="flex shrink-0 items-center gap-2 overflow-x-auto border-t border-white/10 bg-black/60 px-4 py-3">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.src}
                onClick={() => goTo(i)}
                aria-label={slide.caption}
                className={cn(
                  "relative h-12 shrink-0 overflow-hidden rounded-md border-2 transition-all duration-100",
                  i === activeSlide ? "border-white" : "border-transparent opacity-40 hover:opacity-70"
                )}
                style={{ aspectRatio: "16/9" }}
              >
                <img src={slide.src} alt={slide.alt} className="h-full w-full object-cover object-top" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
 * VARIATION 2 — Focus to center, others cluster below
 * ═══════════════════════════════════════════════════════════ */

function Variation2() {
  const [focusedId, setFocusedId] = React.useState<string | null>(null);
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const previewSlides = SLIDES.slice(0, PREVIEW_COUNT);

  return (
    <div>
      <h2 className="mb-1 text-xl font-semibold">Variation 2 — Focus to center</h2>
      <p className="mb-10 text-sm text-muted-foreground">
        Click a card to focus it center-stage. Others cluster below. Click background or the card again to return.
      </p>

      <div className="relative mx-auto h-[600px] w-full" onClick={() => setFocusedId(null)}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-full w-[600px]">
            {previewSlides.map((slide, i) => {
              const cfg = FAN[i];
              const isFocused = focusedId === slide.src;
              const isOther = focusedId !== null && !isFocused;
              const isHovered = hoveredId === slide.src && !focusedId;

              // Cluster positions when another card is focused.
              // Cards bunch below center with small horizontal spread + slight tilt.
              const clusterX = (i - (PREVIEW_COUNT - 1) / 2) * 18;
              const clusterY = 220;
              const clusterRotate = cfg.rotate * 0.35;

              const x = isFocused ? 0 : isOther ? clusterX : cfg.x;
              const y = isFocused ? 0 : isOther ? clusterY : isHovered ? cfg.y - 8 : cfg.y;
              const rotate = isFocused ? 0 : isOther ? clusterRotate : cfg.rotate;
              const scale = isFocused ? FOCUS_SCALE : isOther ? 0.7 : isHovered ? 1.03 : 1;

              return (
                <motion.button
                  key={slide.src}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFocusedId(isFocused ? null : slide.src);
                  }}
                  onHoverStart={() => setHoveredId(slide.src)}
                  onHoverEnd={() => setHoveredId(null)}
                  aria-label={isFocused ? `Close ${slide.caption}` : `Focus ${slide.caption}`}
                  animate={{ x, y, rotate, scale }}
                  transition={SPRING}
                  style={{
                    width: CARD_W,
                    height: CARD_H,
                    marginLeft: -CARD_W / 2,
                    marginTop: -CARD_H / 2,
                    zIndex: isFocused ? 50 : isOther ? i : 20 - i,
                  }}
                  className="absolute top-1/2 left-1/2 cursor-pointer rounded-2xl bg-white shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <PolaroidFace slide={slide} />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <p className="mt-6 text-center font-pixel text-[10px] text-muted-foreground">
        {focusedId ? "click background to return" : "click a card to focus"}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
 * VARIATION 3 — Hover lifts, button expands into carousel card
 *
 * Composed from two distinct card components that share
 * `layoutId`s on their outer shell and their children:
 *
 *   <MinimizedCard />  ← one per slide in the fan
 *   <ExpandedCard />   ← mounted solo when a card is expanded
 *
 * Swapping between them inside <AnimatePresence mode="popLayout">
 * lets Motion bridge the two via matched `layoutId`s — no manual
 * conditional styling inside a single component.
 * ═══════════════════════════════════════════════════════════ */

const EXPANDED_W = 720;
const EXPANDED_H = 480;
/* Invisible hover halo around each minimized card. Extends the hit
 * target on every side so the cursor transitions from one card's
 * active zone directly into the next while panning across the fan. */
const HOVER_BUFFER = 28;
/* When a card is active, its immediate neighbors step aside so the
 * active card has breathing room and every card stays within the
 * cursor's reach. The spacing on each side is computed so the nearest
 * neighbor's inner edge sits NEIGHBOR_GAP pixels from the active card's
 * outer edge, and the remaining neighbors on that side maintain
 * CLUSTER_SPACING between each other. */
const NEIGHBOR_GAP = 32;
const CLUSTER_SPACING = 48;

const MotionCard = motion.create(Card);
const MotionCardHeader = motion.create(CardHeader);
const MotionCardTitle = motion.create(CardTitle);
const MotionCardContent = motion.create(CardContent);
const MotionCardDescription = motion.create(CardDescription);
const MotionCardAction = motion.create(CardAction);

/* Build a stable set of layoutIds for a given slide so both
 * MinimizedCard and ExpandedCard can reference them. */
function cardIds(slide: Slide) {
  const base = `v3-${slide.src}`;
  return {
    card: `${base}-card`,
    header: `${base}-header`,
    title: `${base}-title`,
    description: `${base}-description`,
    image: `${base}-image`,
    action: `${base}-action`,
  };
}

/* ─── Minimized (in the fan) ─────────────────────────────── */

type MinimizedCardProps = {
  slide: Slide;
  stackIndex: number;
  totalCards: number;
  fanConfig: (typeof FAN)[number];
  neighborDx: number;
  isActive: boolean;
  dimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
  onExpandClick: () => void;
};

function MinimizedCard({
  slide,
  stackIndex,
  totalCards,
  fanConfig,
  neighborDx,
  isActive,
  dimmed,
  onHoverStart,
  onHoverEnd,
  onClick,
  onExpandClick,
}: MinimizedCardProps) {
  const ids = cardIds(slide);

  /* Outer wrapper owns fan positioning (transforms). It has NO layoutId
   * and does not animate size, so Motion's layout engine is untouched by
   * hover/neighbor-shift changes. The inner MotionCard owns the layoutId
   * and animates *only* between "minimized box" and "expanded box",
   * eliminating the two-phase snap on return. */
  return (
    <motion.div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      // onClick={onClick}
      animate={{
        x: fanConfig.x + neighborDx,
        y: isActive ? 0 : fanConfig.y,
        rotate: isActive ? 0 : fanConfig.rotate,
        scale: isActive ? 1.08 : 1,
        opacity: dimmed ? 0.35 : 1,
      }}
      transition={SPRING}
      style={{
        // Wrapper is CARD + buffer on every side, so hover hitbox
        // covers the card plus an invisible halo. Centering offsets
        // use the padded footprint so the card's visual center still
        // lands at the transformed (x, y) point.
        width: CARD_W + HOVER_BUFFER * 2,
        height: CARD_H + HOVER_BUFFER * 2,
        marginLeft: -(CARD_W / 2 + HOVER_BUFFER),
        marginTop: -(CARD_H / 2 + HOVER_BUFFER),
        padding: HOVER_BUFFER,
        transformOrigin: "50% 50%",
        pointerEvents: dimmed ? "none" : "auto",
        zIndex: isActive ? 50 : totalCards + stackIndex,
      }}
      className="peer absolute top-1/2 left-1/2 grid place-items-center group-hover/fan:**:data-[slot=card]:bg-background peer-hover:**:data-[slot=card]:bg-background hover:**:data-[slot=card]:bg-card hover:**:data-[slot=card]:shadow-border-xl"
    >
      <MotionCard layoutId={ids.card} size="sm" className="ease h-full w-full shadow-border-sm transition-all duration-100">
        <MotionCardHeader layoutId={ids.header}>
          <MotionCardTitle layoutId={ids.title} className="truncate">
            {slide.caption}
          </MotionCardTitle>
          <MotionCardDescription layoutId={ids.description}>{slide.label}</MotionCardDescription>

          <MotionCardAction layoutId={ids.action}>
            <Button
              size="icon-sm"
              variant="ghost"
              rounded
              aria-label="Expand"
              onClick={(e) => {
                e.stopPropagation();
                onExpandClick();
              }}
            >
              <IconArrowsDiagonal />
            </Button>
          </MotionCardAction>
        </MotionCardHeader>

        <MotionCardContent
          transition={SPRING}
          animate={{
            opacity: isActive ? 1 : 0.5,
          }}
          // layoutId={ids.image}
        >
          <img src={slide.src} alt={slide.alt} className="aspect-square rounded-sm object-cover object-top" draggable={false} />
        </MotionCardContent>
      </MotionCard>
    </motion.div>
  );
}

/* ─── Expanded (with carousel) ───────────────────────────── */

type ExpandedCardProps = {
  slide: Slide;
  startIndex: number;
  onClose: () => void;
};

function ExpandedCard({ slide, startIndex, onClose }: ExpandedCardProps) {
  const ids = cardIds(slide);

  /* Same structural pattern as MinimizedCard: outer div centers the card
   * via margin-offset at 50%/50%, inner MotionCard owns the layoutId and
   * morphs its bounding box from the minimized card's slot. */
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: EXPANDED_W,
        height: EXPANDED_H,
        marginLeft: -EXPANDED_W / 2,
        marginTop: -EXPANDED_H / 2,
      }}
      className="absolute top-1/2 left-1/2 z-60 grid place-items-center"
    >
      <MotionCard layoutId={ids.card} transition={SPRING} size="lg" className="shadow-border-2xl">
        <MotionCardHeader layoutId={ids.header}>
          <MotionCardTitle layoutId={ids.title} className="text-base">
            {slide.caption}
          </MotionCardTitle>
          <MotionCardDescription layoutId={ids.description}>{slide.label}</MotionCardDescription>
          <MotionCardAction layoutId={ids.action}>
            <Button
              size="icon-sm"
              variant="ghost"
              rounded
              aria-label="Minimize"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              <IconArrowsDiagonalMinimize2 />
            </Button>
          </MotionCardAction>
        </MotionCardHeader>

        <MotionCardContent layoutId={ids.image} className="min-h-0">
          <Carousel opts={{ loop: true }} className="">
            <CarouselViewport className="">
              {SLIDES.map((s) => (
                <CarouselItem key={s.src} className="">
                  <div className="relative w-full">
                    <img src={s.src} alt={s.alt} className="aspect-video object-contain" draggable={false} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselViewport>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
              <CarouselToolbar />
            </div>
          </Carousel>
        </MotionCardContent>
      </MotionCard>
    </div>
  );
}

function Variation3() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);
  const previewSlides = SLIDES.slice(0, PREVIEW_COUNT);
  const expanded = expandedIndex !== null;
  const expandedSlide = expanded ? previewSlides[expandedIndex] : null;
  const activeIndex = expandedIndex ?? hoveredIndex;

  return (
    <div>
      <h2 className="mb-1 text-xl font-semibold">Variation 3 — Hover lifts, click expands to carousel</h2>
      <p className="mb-10 text-sm text-muted-foreground">
        Hover elevates a card and reveals an Expand button. Click to morph it into a wide carousel card.
      </p>

      <LayoutGroup id="v3-fan">
        <div className="relative mx-auto h-[600px] w-full" onClick={() => setExpandedIndex(null)}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="group/fan relative h-full w-[600px]">
              {/* Fan of minimized cards — the expanded card is hidden here
                  so Motion can morph the shared layoutIds cleanly. */}
              {previewSlides.map((slide, i) => {
                if (expandedIndex === i) return null;

                const cfg = FAN[i];
                const isActive = activeIndex === i && !expanded;
                const dimmed = expanded;

                // Clearance-based placement: the nearest neighbor on each
                // side sits one card-width + NEIGHBOR_GAP away from the
                // active card. The rest of that side's cards stack behind
                // it at CLUSTER_SPACING intervals, ordered by distance
                // from the active card.
                let neighborDx = 0;
                if (activeIndex !== null && activeIndex !== i && !expanded) {
                  const activeX = FAN[activeIndex].x;
                  const sideIndices = previewSlides
                    .map((_, idx) => idx)
                    .filter((idx) => (i < activeIndex ? idx < activeIndex : idx > activeIndex))
                    // Closest-first on each side so rank 0 is the
                    // nearest neighbor and gets the full clearance.
                    .sort((a, b) => Math.abs(a - activeIndex) - Math.abs(b - activeIndex));
                  const rank = sideIndices.indexOf(i);
                  const direction = i < activeIndex ? -1 : 1;
                  const targetX = activeX + direction * (CARD_W + NEIGHBOR_GAP + rank * CLUSTER_SPACING);
                  neighborDx = targetX - cfg.x;
                }

                return (
                  <MinimizedCard
                    key={slide.src}
                    slide={slide}
                    stackIndex={i}
                    totalCards={previewSlides.length}
                    fanConfig={cfg}
                    neighborDx={neighborDx}
                    isActive={isActive}
                    dimmed={dimmed}
                    onHoverStart={() => !expanded && setHoveredIndex(i)}
                    onHoverEnd={() => !expanded && setHoveredIndex(null)}
                    onClick={() => {
                      if (expanded) return;
                      if (hoveredIndex === i) setExpandedIndex(i);
                    }}
                    onExpandClick={() => setExpandedIndex(i)}
                  />
                );
              })}

              <AnimatePresence>
                {expanded && expandedSlide && (
                  <ExpandedCard
                    key={expandedSlide.src}
                    slide={expandedSlide}
                    startIndex={expandedIndex}
                    onClose={() => setExpandedIndex(null)}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </LayoutGroup>

      <p className="mt-6 text-center font-pixel text-[10px] text-muted-foreground">
        {expanded ? "click outside or minimize to return" : "hover a card to lift it · click Expand to open the carousel"}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
 * Page
 * ═══════════════════════════════════════════════════════════ */
export default function DirectionE() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center gap-4 border-b border-border px-5 py-3">
        <Link href="/private/testing" className="font-pixel text-[11px] text-muted-foreground hover:text-foreground">
          ← directions
        </Link>
        <span className="text-sm font-semibold">Forge Editor</span>
        <Badge variant="default" className="ml-auto">
          Direction E · Polaroid Fan
        </Badge>
      </div>

      <div className="mx-auto max-w-4xl space-y-24 px-4 py-10">
        <header>
          <p className="mb-1 font-pixel text-[11px] text-muted-foreground">Everfi · 2022</p>
          <h1 className="text-3xl font-semibold tracking-tight">Forge Editor</h1>
          <p className="mt-2 text-sm text-muted-foreground">Two polaroid-fan explorations.</p>
        </header>

        <Separator />
        <Variation1 />
        <Separator />
        <Variation2 />
        <Separator />
        <Variation3 />
      </div>
    </div>
  );
}
