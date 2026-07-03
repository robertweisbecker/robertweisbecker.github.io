"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { TextReveal } from "@/components/animation/shared";
import { DemoContainer } from "@/components/demo";
import { PixelRedoIcon } from "@/components/icons-pixel";
import { ModeToggle } from "@/components/mode-toggle";
import { LinkOut } from "@/components/link-out";
import { Button } from "@/components/ui/button";
import { ColorCode } from "@/components/ui/color-code";
import { CopyButton } from "@/components/ui/copy-button";
import { MorphIcon } from "@/components/morph-icon";
import { Toggle } from "@/components/ui/toggle";
import { PlaygroundSection } from "@/components/playground/playground-section";

const CardFan = dynamic(() => import("@/components/demos/card-fan").then((module) => ({ default: module.CardFan })), {
  loading: () => <p className="text-sm text-muted-foreground">Loading motion cards…</p>,
});

const ChartDemo = dynamic(() => import("@/components/playground/motion/chart-demo").then((module) => ({ default: module.ChartDemo })), {
  loading: () => <p className="text-sm text-muted-foreground">Loading motion chart…</p>,
});

const ColorSwatchGroupDemo = dynamic(
  () => import("@/components/playground/motion/color-swatch-group-demo").then((module) => ({ default: module.ColorSwatchGroupDemo })),
  {
    loading: () => <p className="text-sm text-muted-foreground">Loading color swatches…</p>,
  }
);

const EmojiFeedbackDemo = dynamic(
  () => import("@/components/demos/emoji-feedback").then((module) => ({ default: module.EmojiFeedbackDemo })),
  {
    loading: () => <p className="text-sm text-muted-foreground">Loading feedback controls…</p>,
  }
);

const MotionTextPlaygroundDemo = dynamic(
  () =>
    import("@/components/playground/motion/motion-text-playground-demo").then((module) => ({ default: module.MotionTextPlaygroundDemo })),
  {
    loading: () => <p className="text-sm text-muted-foreground">Loading motion text…</p>,
  }
);

const SkeletonDemo = dynamic(
  () => import("@/components/playground/motion/skeleton-demo").then((module) => ({ default: module.SkeletonDemo })),
  {
    loading: () => <p className="text-sm text-muted-foreground">Loading skeleton…</p>,
  }
);

export function MotionPlayground() {
  const [morphIcon, setMorphIcon] = React.useState(false);
  const [resetKey, setResetKey] = React.useState(0);

  return (
    <div className="flex w-full flex-col gap-14">
      <PlaygroundSection id="motion" title="Motion">
        <DemoContainer caption="Card fan" variant="muted" className="lg:col-span-full" innerClass="min-h-[400px]">
          <CardFan />
        </DemoContainer>
        <DemoContainer
          title="TextReveal"
          centerContent
          variant="muted"
          className="lg:col-span-full"
          innerClass="min-h-[300px]"
          controls={
            <Button size="xs" variant="ghost" onClick={() => setResetKey((key) => key + 1)}>
              Replay
              <PixelRedoIcon data-icon="inline-end" />
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
          variant="muted"
          className="lg:col-span-full lg:row-span-2"
          innerClass="min-h-[420px]"
        >
          <MotionTextPlaygroundDemo />
        </DemoContainer>
        <DemoContainer title="Skeleton" variant="muted" centerContent className="lg:col-span-full">
          <SkeletonDemo />
        </DemoContainer>
        <DemoContainer
          title="Emoji Feedback"
          description="A remix of Vercel's Feedback component"
          controls={<LinkOut href="https://vercel.com/geist/feedback" text="View original" />}
          variant="muted"
          className="lg:col-span-full"
          innerClass="min-h-[300px]"
        >
          <EmojiFeedbackDemo />
        </DemoContainer>
        <DemoContainer title="Motion chart" description="Hover to animate" variant="muted" centerContent className="lg:col-span-full">
          <ChartDemo />
        </DemoContainer>
        <DemoContainer title="ColorCode" description="Click to copy" variant="muted" centerContent className="lg:col-span-full">
          <ColorCode value="#0b0b0b" />
        </DemoContainer>
        <DemoContainer title="ColorSwatchGroup" variant="muted" centerContent className="lg:col-span-full">
          <ColorSwatchGroupDemo />
        </DemoContainer>
        <DemoContainer title="Animated icon buttons" variant="muted" centerContent className="lg:col-span-full">
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
    </div>
  );
}
