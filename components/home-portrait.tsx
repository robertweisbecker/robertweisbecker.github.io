"use client";

import * as React from "react";

import { Float } from "@/components/animation/float";
import { PixelDino } from "@/components/animation/pixel-dino";
import { PixelPortrait } from "@/components/animation/pixel-portrait";
import { PixelReveal } from "@/components/animation/shared";
import { PixelShuffleIcon } from "@/components/icons-pixel";
import { Button } from "@/components/ui/button";

export function HomePortrait() {
  const [isDinoVisible, setIsDinoVisible] = React.useState(false);

  return (
    <div className="rounded-md bg-muted max-sm:order-last max-sm:justify-self-end">
      <Float
        className="group/pixel relative isolate w-fit rounded-md bg-card p-1 shadow-border-lg"
        speed={0.5}
        amplitude={[4, 8, 4]}
        rotationRange={[1, 1, 3]}
      >
        <div className="relative size-[150px] overflow-hidden rounded-[calc(var(--radius-md)-4px)] bg-background sm:size-50">
          <PixelPortrait className="outline-2 outline-card" />
          {isDinoVisible && (
            <PixelReveal className="absolute inset-0 size-full">
              <PixelDino />
            </PixelReveal>
          )}
        </div>
        <Button
          onClick={() => setIsDinoVisible((v) => !v)}
          aria-label="Toggle pixel artwork"
          aria-pressed={isDinoVisible}
          variant="ghost"
          size="icon-xs"
          className="pointer-fine:blur-2xs absolute inset-s-2 top-2 z-100 transform font-pixel text-[11px] uppercase transition-[opacity,translate,filter] duration-300 group-hover/pixel:translate-y-0 group-hover/pixel:opacity-100 group-hover/pixel:blur-none pointer-fine:-translate-y-1 pointer-fine:opacity-0"
        >
          <span aria-hidden="true">{isDinoVisible ? "⟨" : <PixelShuffleIcon className="size-[11px]" />}</span>
        </Button>
      </Float>
    </div>
  );
}
