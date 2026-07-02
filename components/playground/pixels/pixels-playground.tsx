"use client";

import dynamic from "next/dynamic";
import { PixelDino } from "@/components/animation/pixel-dino";
import { DemoContainer } from "@/components/demo";
import { PixelMorphToggles } from "@/components/demos/pixel-morph-toggles";
import { PlaygroundSection } from "@/components/playground/playground-section";

const DvdAnimationDemo = dynamic(
  () => import("@/components/animation/dvd-animation").then((module) => ({ default: module.DvdAnimationDemo })),
  {
    loading: () => <p className="text-sm text-muted-foreground">Loading DVD animation…</p>,
  }
);

export function PixelsPlayground() {
  return (
    <div className="flex w-full flex-col gap-14">
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
