"use client";

import { motion } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

type Slide = {
  id: string;
  caption: string;
  label: string;
  gradient: string;
};

const SLIDES: Slide[] = [
  {
    id: "dark-mode",
    label: "01",
    caption: "Dark mode",
    gradient:
      "radial-gradient(circle at 20% 18%, #38bdf8 0 12%, transparent 22%), linear-gradient(135deg, #0f172a 0%, #1e3a8a 48%, #c026d3 100%)",
  },
  {
    id: "light-mode",
    label: "02",
    caption: "Light mode",
    gradient:
      "radial-gradient(circle at 74% 20%, #fef08a 0 10%, transparent 22%), linear-gradient(135deg, #e0f2fe 0%, #a7f3d0 45%, #f0abfc 100%)",
  },
  {
    id: "expanded-palettes",
    label: "03",
    caption: "Expanded palettes",
    gradient: "conic-gradient(from 210deg at 50% 45%, #ef4444, #f59e0b, #84cc16, #06b6d4, #3b82f6, #a855f7, #ec4899, #ef4444)",
  },
  {
    id: "neutral-scale",
    label: "04",
    caption: "Neutral scale",
    gradient:
      "linear-gradient(135deg, #f8fafc 0 12%, #cbd5e1 12% 24%, #94a3b8 24% 36%, #64748b 36% 48%, #475569 48% 60%, #334155 60% 72%, #1e293b 72% 84%, #020617 84% 100%)",
  },
  {
    id: "density",
    label: "05",
    caption: "Density",
    gradient:
      "repeating-linear-gradient(90deg, #14b8a6 0 8px, #0f766e 8px 16px, #7c3aed 16px 24px, #db2777 24px 32px), linear-gradient(135deg, #020617, #172554)",
  },
];

const FAN: Array<{ rotate: number; x: number; y: number }> = [
  { rotate: -16, x: -150, y: -12 },
  { rotate: 4, x: -75, y: -10 },
  { rotate: -2, x: 0, y: -4 },
  { rotate: -7, x: 75, y: 0 },
  { rotate: 18, x: 150, y: 16 },
];

const CARD_W = 160;
const CARD_H = 200;
const HOVER_X_BUFFER = 6;
const FOCUS_SCALE = 1.25;
const FOCUSED_OTHER_SCALE = 0.64;
const FOCUSED_Y = -40;
const FOCUSED_CLUSTER_Y = 142;
const FOCUSED_CLUSTER_SPACING = 96;
const NEIGHBOR_GAP = 32;
const CLUSTER_SPACING = 48;
const FAN_MIDDLE_INDEX = (SLIDES.length - 1) / 2;
const HOVER_PROMOTION_DELAY = 180;
const SPRING = { type: "spring" as const, visualDuration: 0.4, bounce: 0.15 };

function PolaroidFace({ slide }: { slide: Slide }) {
  return (
    <div className="flex h-full w-full flex-col gap-2 p-2">
      <p className="font-pixel text-[11px] tracking-wider text-muted-foreground uppercase">{slide.label}</p>
      <div
        className="relative aspect-square flex-1 overflow-hidden bg-muted bg-cover bg-center inset-ring inset-ring-input after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/.45),transparent_38%)]"
        style={{ backgroundImage: slide.gradient }}
        role="img"
        aria-label={slide.caption}
      >
        <div className="absolute inset-x-3 bottom-3 h-8 rounded-full bg-black/10 blur-md" />
      </div>
      <div>
        <p className="mt-0.5 line-clamp-1 text-xs font-semibold text-foreground">{slide.caption}</p>
      </div>
    </div>
  );
}

export function CardFan({ className }: { className?: string }) {
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [promotedIndex, setPromotedIndex] = React.useState<number | null>(null);
  const promotionTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeIndex = focusedIndex ?? hoveredIndex;

  const clearPromotionTimeout = React.useCallback(() => {
    if (promotionTimeoutRef.current) {
      clearTimeout(promotionTimeoutRef.current);
      promotionTimeoutRef.current = null;
    }
  }, []);

  const startHover = React.useCallback(
    (index: number) => {
      if (focusedIndex !== null) return;

      clearPromotionTimeout();
      setHoveredIndex(index);
      setPromotedIndex(null);
      promotionTimeoutRef.current = setTimeout(() => {
        setPromotedIndex(index);
        promotionTimeoutRef.current = null;
      }, HOVER_PROMOTION_DELAY);
    },
    [clearPromotionTimeout, focusedIndex]
  );

  const endHover = React.useCallback(() => {
    if (focusedIndex !== null) return;

    clearPromotionTimeout();
    setHoveredIndex(null);
    setPromotedIndex(null);
  }, [clearPromotionTimeout, focusedIndex]);

  React.useEffect(() => clearPromotionTimeout, [clearPromotionTimeout]);

  const layouts = SLIDES.map((slide, i) => {
    const cfg = FAN[i];
    const isFocused = focusedIndex === i;
    const isOtherFocusedCard = focusedIndex !== null && !isFocused;
    const isActive = activeIndex === i;
    const isPromoted = focusedIndex === null && hoveredIndex === i && promotedIndex === i;

    let x = cfg.x;
    let y = cfg.y;
    let rotate = cfg.rotate;
    let scale = 1;
    let zIndex = 20 - Math.abs(i - FAN_MIDDLE_INDEX);

    if (focusedIndex !== null) {
      if (isFocused) {
        x = 0;
        y = FOCUSED_Y;
        rotate = 0;
        scale = FOCUS_SCALE;
        zIndex = 80;
      } else {
        const otherIndices = SLIDES.map((_, index) => index).filter((index) => index !== focusedIndex);
        const rank = otherIndices.indexOf(i);
        x = (rank - (otherIndices.length - 1) / 2) * FOCUSED_CLUSTER_SPACING;
        y = FOCUSED_CLUSTER_Y;
        rotate = cfg.rotate * 0.25;
        scale = FOCUSED_OTHER_SCALE;
        zIndex = 10 + rank;
      }
    } else {
      let neighborDx = 0;
      if (activeIndex !== null && activeIndex !== i) {
        const activeX = FAN[activeIndex].x;
        const sideIndices = SLIDES.map((_, index) => index)
          .filter((index) => (i < activeIndex ? index < activeIndex : index > activeIndex))
          .sort((a, b) => Math.abs(a - activeIndex) - Math.abs(b - activeIndex));
        const rank = sideIndices.indexOf(i);
        const direction = i < activeIndex ? -1 : 1;
        const targetX = activeX + direction * (CARD_W + NEIGHBOR_GAP + rank * CLUSTER_SPACING);
        neighborDx = targetX - cfg.x;
      }

      x = cfg.x + neighborDx;
      y = isActive ? cfg.y - 16 : cfg.y;
      rotate = isActive ? 0 : cfg.rotate;
      scale = isPromoted ? 1.08 : 1;
      zIndex = isPromoted ? 60 : 20 - Math.abs(i - FAN_MIDDLE_INDEX);
    }

    return { slide, i, isFocused, isOtherFocusedCard, isPromoted, x, y, rotate, scale, zIndex };
  });

  return (
    <div className={cn("flex w-full flex-col items-center", className)}>
      <div
        className="relative h-[430px] w-full overflow-visible"
        onClick={() => {
          clearPromotionTimeout();
          setFocusedIndex(null);
          setHoveredIndex(null);
          setPromotedIndex(null);
        }}
        role="presentation"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-full w-full">
            <div className="absolute inset-0 z-0">
              {layouts.map(({ slide, i, x, y, rotate, scale, zIndex }) => (
                <motion.div
                  key={`${slide.id}-hover`}
                  onMouseEnter={() => startHover(i)}
                  onMouseLeave={endHover}
                  initial={false}
                  animate={{ x, y, rotate, scale }}
                  transition={SPRING}
                  style={{
                    width: CARD_W + HOVER_X_BUFFER * 2,
                    height: CARD_H,
                    marginLeft: -(CARD_W / 2 + HOVER_X_BUFFER),
                    marginTop: -CARD_H / 2,
                    zIndex,
                  }}
                  className={cn("absolute top-1/2 left-1/2", focusedIndex === null ? "pointer-events-auto" : "pointer-events-none")}
                />
              ))}
            </div>

            <div className="pointer-events-none absolute inset-0 z-10">
              {layouts.map(({ slide, i, isFocused, isOtherFocusedCard, isPromoted, x, y, rotate, scale, zIndex }) => (
                <motion.button
                  key={slide.id}
                  type="button"
                  onMouseEnter={() => startHover(i)}
                  onMouseLeave={endHover}
                  onClick={(event) => {
                    event.stopPropagation();
                    clearPromotionTimeout();
                    setFocusedIndex(isFocused ? null : i);
                    setHoveredIndex(null);
                    setPromotedIndex(null);
                  }}
                  aria-label={isFocused ? `Close ${slide.caption}` : `Focus ${slide.caption}`}
                  aria-pressed={isFocused}
                  initial={false}
                  animate={{ x, y, rotate, scale }}
                  transition={SPRING}
                  style={{
                    width: CARD_W,
                    height: CARD_H,
                    marginLeft: -CARD_W / 2,
                    marginTop: -CARD_H / 2,
                    zIndex,
                    boxShadow: isFocused || isPromoted ? "var(--shadow-border-xl)" : "var(--shadow-border-md)",
                  }}
                  className={cn(
                    "pointer-events-auto absolute top-1/2 left-1/2 cursor-pointer bg-card outline-none hover:bg-popover focus-visible:ring-2 focus-visible:ring-primary",
                    isOtherFocusedCard && "hover:bg-card"
                  )}
                >
                  <PolaroidFace slide={slide} />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
