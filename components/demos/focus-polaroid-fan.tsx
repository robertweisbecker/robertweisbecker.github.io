"use client";

import { motion } from "motion/react";
import Image from "next/image";
import * as React from "react";

import { cn } from "@/lib/utils";

type Slide = {
  src: string;
  alt: string;
  caption: string;
  label: string;
};

const SLIDES: Slide[] = [
  {
    src: "/assets/forge/dark.png",
    alt: "Dark mode",
    label: "01",
    caption: "Dark mode",
  },
  {
    src: "/assets/forge/light.png",
    alt: "Light mode",
    label: "02",
    caption: "Light mode",
  },
  {
    src: "/assets/forge/colors-all.png",
    alt: "Color palette",
    label: "03",
    caption: "Expanded palettes",
  },
  {
    src: "/assets/forge/colors-neutral.png",
    alt: "Neutral ramp",
    label: "04",
    caption: "Neutral scale",
  },
  {
    src: "/assets/forge/density-compare.png",
    alt: "Density comparison",
    label: "05",
    caption: "Density",
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
const FOCUS_W = 200;
const FOCUS_SCALE = FOCUS_W / CARD_W;
const SPRING = { type: "spring" as const, visualDuration: 0.4, bounce: 0.15 };

function PolaroidFace({ slide }: { slide: Slide }) {
  return (
    <div className="flex h-full w-full flex-col gap-2 p-2">
      <p className="font-pixel text-[11px] tracking-wider text-muted-foreground uppercase">{slide.label}</p>
      <div className="relative flex-1 overflow-hidden rounded-md bg-muted">
        <Image src={slide.src} alt={slide.alt} fill sizes="360px" className="object-cover object-top" draggable={false} />
      </div>
      <div className="">
        <p className="mt-0.5 line-clamp-1 text-xs font-semibold text-foreground">{slide.caption}</p>
      </div>
    </div>
  );
}

export function FocusPolaroidFan({ className }: { className?: string }) {
  const [focusedId, setFocusedId] = React.useState<string | null>(null);
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  return (
    <div className={cn("flex w-full flex-col items-center border p-4", className)}>
      <div className="relative h-[400px] w-full overflow-hidden bg-muted" onClick={() => setFocusedId(null)} role="presentation">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-full w-full">
            {SLIDES.map((slide, i) => {
              const cfg = FAN[i];
              const isFocused = focusedId === slide.src;
              const isOther = focusedId !== null && !isFocused;
              const isHovered = hoveredId === slide.src && !focusedId;

              const clusterX = (i - (SLIDES.length - 1) / 2) * 18;
              const clusterY = 220;
              const clusterRotate = cfg.rotate * 0.35;

              const x = isFocused ? 0 : isOther ? clusterX : cfg.x;
              const y = isFocused ? 0 : isOther ? clusterY : isHovered ? cfg.y - 24 : cfg.y;
              const rotate = isFocused ? 0 : isOther ? clusterRotate : cfg.rotate;
              const scale = isFocused ? FOCUS_SCALE : isOther ? 0.8 : isHovered ? 1.05 : 1;

              return (
                <motion.button
                  key={slide.src}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setFocusedId(isFocused ? null : slide.src);
                  }}
                  onHoverStart={() => setHoveredId(slide.src)}
                  onHoverEnd={() => setHoveredId(null)}
                  aria-label={isFocused ? `Close ${slide.caption}` : `Focus ${slide.caption}`}
                  aria-pressed={isFocused}
                  animate={{ x, y, rotate, scale }}
                  transition={SPRING}
                  style={{
                    width: CARD_W,
                    height: CARD_H,
                    marginLeft: -CARD_W / 2,
                    marginTop: isFocused ? -CARD_H / 1.5 : -CARD_H / 2,
                    zIndex: isFocused ? 50 : isOther ? i : 20 - i,
                    boxShadow: isHovered ? "var(--shadow-border-md)" : isFocused ? "var(--shadow-border-lg)" : "var(--shadow-border-xs)",
                  }}
                  className="absolute top-1/2 left-1/2 cursor-pointer rounded-2xl bg-card outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <PolaroidFace slide={slide} />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <p className="mt-2 text-center font-pixel text-[10px] text-muted-foreground">
        {focusedId ? "click background to return" : "click a card to focus"}
      </p>
    </div>
  );
}
