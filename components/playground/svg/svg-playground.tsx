"use client";

import dynamic from "next/dynamic";
import { PixelDino } from "@/components/animation/pixel-dino";
import { DemoContainer } from "@/components/demo";
import { PixelMorphToggles } from "@/components/demos/pixel-morph-toggles";
import { PlaygroundSection } from "@/components/playground/playground-section";

const DvdLoaderDemo = dynamic(
  () => import("@/components/playground/svg/dvd-loader-demo").then((module) => ({ default: module.DvdLoaderDemo })),
  {
    loading: () => <p className="text-sm text-muted-foreground">Loading DVD animation…</p>,
  }
);

export function SvgPlayground() {
  return (
    <div className="flex w-full flex-col gap-14">
      <PlaygroundSection id="svg" title="SVG Animations">
        <DemoContainer title="DVD Loader" variant="muted" className="lg:col-span-full">
          <DvdLoaderDemo />
        </DemoContainer>
        <DemoContainer
          title="Dino Animation"
          caption="SVG animation, so no cacti"
          variant="muted"
          centerContent
          className="lg:col-span-full"
        >
          <PixelDino />
        </DemoContainer>
        <DemoContainer title="Pixel morph toggles" variant="muted" centerContent className="lg:col-span-full">
          <PixelMorphToggles />
        </DemoContainer>
      </PlaygroundSection>
    </div>
  );
}
