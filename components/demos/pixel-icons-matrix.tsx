"use client";

import { IconPlayerPauseFilled, IconPlayerPlayFilled } from "@tabler/icons-react";
import * as React from "react";

import { DotMatrix, type Frame } from "@/components/animation/dot-matrix";
import { DemoContainer } from "@/components/demo";
import { Button } from "@/components/ui/button";

const MATRIX_SIZE = 11;
const HOLD_FRAMES = 10;
const FRAME_RATE = 8;
const FRAME_INTERVAL_MS = 1000 / FRAME_RATE;

const ARROWS_COMPRESS_SMALL: Frame = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const ARROWS_COMPRESS: Frame = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
  [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
  [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
  [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const VIEWFINDER: Frame = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const ARROWS_EXPAND_SMALL: Frame = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const ARROWS_EXPAND: Frame = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
  [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const PIXEL_ICON_HERO_EXPORTS: readonly Frame[] = [ARROWS_EXPAND_SMALL, ARROWS_EXPAND, VIEWFINDER, ARROWS_COMPRESS, ARROWS_COMPRESS_SMALL];

function holdFrame(frame: Frame): Frame[] {
  return Array.from({ length: HOLD_FRAMES }, () => frame);
}

const animatedFrames = PIXEL_ICON_HERO_EXPORTS.flatMap(holdFrame);

function usePixelIconHeroFrame(paused: boolean): Frame {
  const [frameIndex, setFrameIndex] = React.useState(0);

  React.useEffect(() => {
    if (paused || animatedFrames.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setFrameIndex((index) => (index + 1) % animatedFrames.length);
    }, FRAME_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [paused]);

  return animatedFrames[frameIndex] ?? PIXEL_ICON_HERO_EXPORTS[0];
}

export function PixelIconMatrix() {
  const [paused, setPaused] = React.useState(false);
  const currentFrame = usePixelIconHeroFrame(paused);

  return (
    <DemoContainer variant="muted" centerContent innerClass="relative min-h-[420px] p-12 sm:min-h-[520px] sm:p-16">
      <DotMatrix
        rows={MATRIX_SIZE}
        cols={MATRIX_SIZE}
        pattern={currentFrame}
        size={12}
        gap={8}
        palette={{
          on: "var(--primary)",
          off: "color-mix(in oklch, var(--muted-foreground) 28%, transparent)",
        }}
        ariaLabel="Animated dot matrix cycling through exported pixel icon coordinates"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        rounded
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground"
        aria-label={paused ? "Play pixel icon animation" : "Pause pixel icon animation"}
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? <IconPlayerPlayFilled aria-hidden="true" /> : <IconPlayerPauseFilled aria-hidden="true" />}
      </Button>
    </DemoContainer>
  );
}
