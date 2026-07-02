"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { TextReveal } from "@/components/animation/shared";
import { PixelDino } from "@/components/animation/pixel-dino";
import { DemoContainer } from "@/components/demo";
import * as PixelIcons from "@/components/icons-pixel";
import { ModeToggle } from "@/components/mode-toggle";
import { PixelMorphToggles } from "@/components/demos/pixel-morph-toggles";
import { Button } from "@/components/ui/button";
import { ColorCode } from "@/components/ui/color-code";
import { CopyButton } from "@/components/ui/copy-button";
import { MorphIcon } from "@/components/morph-icon";
import { Toggle } from "@/components/ui/toggle";
import { PlaygroundSection } from "@/components/playground/playground-section";
import { ChartDemo } from "@/components/playground/motion/chart-demo";
import { ColorSwatchGroupDemo } from "@/components/playground/motion/color-swatch-group-demo";
import { SkeletonDemo } from "@/components/playground/motion/skeleton-demo";

const CardFan = dynamic(() => import("@/components/demos/card-fan").then((module) => ({ default: module.CardFan })), {
  loading: () => <p className="text-sm text-muted-foreground">Loading motion cards…</p>,
});

const MotionTextPlaygroundDemo = dynamic(
  () =>
    import("@/components/playground/motion/motion-text-playground-demo").then((module) => ({ default: module.MotionTextPlaygroundDemo })),
  {
    loading: () => <p className="text-sm text-muted-foreground">Loading motion text…</p>,
  }
);

const DvdAnimationDemo = dynamic(
  () => import("@/components/animation/dvd-animation").then((module) => ({ default: module.DvdAnimationDemo })),
  {
    loading: () => <p className="text-sm text-muted-foreground">Loading DVD animation…</p>,
  }
);

export function MotionPlayground() {
  const [morphIcon, setMorphIcon] = React.useState(false);
  const [resetKey, setResetKey] = React.useState(0);

  return (
    <div className="flex w-full flex-col gap-14">
      <PlaygroundSection id="motion-systems" title="Motion">
        <DemoContainer title="Motion cards" className="lg:col-span-8" innerClass="min-h-[400px]">
          <CardFan />
        </DemoContainer>
        <DemoContainer
          title="TextReveal"
          centerContent
          variant="muted"
          className="lg:col-span-4"
          innerClass="min-h-60"
          controls={
            <Button size="xs" variant="ghost" onClick={() => setResetKey((key) => key + 1)}>
              Replay
              <PixelIcons.PixelRedoIcon data-icon="inline-end" />
            </Button>
          }
        >
          <TextReveal
            key={resetKey}
            className="overflow-visible text-center text-2xl font-semibold tracking-tight text-balance"
            duration={600}
            stagger={22}
          >
            Interfaces should feel alive, but never impatient.
          </TextReveal>
        </DemoContainer>
        <DemoContainer
          title="MotionText"
          caption="Inline playback controls"
          className="lg:col-span-8 lg:row-span-2"
          innerClass="min-h-[420px]"
        >
          <MotionTextPlaygroundDemo />
        </DemoContainer>
        <DemoContainer title="Skeleton" centerContent className="lg:col-span-4">
          <SkeletonDemo />
        </DemoContainer>
        <DemoContainer title="Motion chart" description="Hover to animate" centerContent className="lg:col-span-4">
          <ChartDemo />
        </DemoContainer>
        <DemoContainer title="ColorCode" description="Click to copy" centerContent className="lg:col-span-3">
          <ColorCode value="#0b0b0b" />
        </DemoContainer>
        <DemoContainer title="ColorSwatchGroup" centerContent className="lg:col-span-5">
          <ColorSwatchGroupDemo />
        </DemoContainer>
        <DemoContainer title="Animated icon buttons" centerContent className="lg:col-span-6">
          <div className="grid grid-cols-3 grid-rows-2 place-items-center gap-2 text-center text-xs">
            <Toggle pressed={morphIcon} onPressedChange={() => setMorphIcon((prev) => !prev)} variant="outline" className="w-button">
              <MorphIcon from="filter" to="chevronRight" active={morphIcon} />
            </Toggle>
            <p className="row-2">Line morph</p>
            <ModeToggle size="icon" variant="outline" />
            <p className="row-2">Mode toggle: pixel morph</p>
            <CopyButton value="Hello, world!" size="icon" variant="outline" />
            <p className="row-2">Icon swap, stroke anim, inline toast</p>
          </div>
        </DemoContainer>
      </PlaygroundSection>

      <PlaygroundSection id="pixel-demos" title="Pixels">
        <DemoContainer title="DVD Loader" className="lg:col-span-5">
          <DvdAnimationDemo className="dark bg-background" />
        </DemoContainer>
        <DemoContainer title="Dino Animation" caption="SVG animation, so no cacti" centerContent className="lg:col-span-3">
          <PixelDino />
        </DemoContainer>
        <DemoContainer title="Pixel morph toggles" centerContent className="lg:col-span-4">
          <PixelMorphToggles />
        </DemoContainer>
      </PlaygroundSection>
    </div>
  );
}
