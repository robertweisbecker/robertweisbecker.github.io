"use client";

import dynamic from "next/dynamic";

import { CodeBlock } from "@/components/code-block";
import { DemoContainer } from "@/components/blocks/demo";
import { LinkOut } from "@/components/link-out";
import { AnchoredSliderDemo } from "@/components/demos/playground/controls/anchored-slider-demo";
import { SliderDemo } from "@/components/demos/playground/controls/slider-demo";
import { SwitchDemo } from "@/components/demos/playground/controls/switch-demo";
import { TabsVariantsDemo } from "@/components/demos/playground/controls/tabs-variants-demo";
import { ToggleGridDemo } from "@/components/demos/playground/controls/toggle-variants-demo";
import { CarouselDemo } from "@/components/demos/playground/frames/carousel-demo";
import { ImageToggleDemo } from "@/components/demos/playground/frames/image-toggle-demo";
import { PlaygroundSection } from "@/components/blocks/playground-section";
import { NumberChip } from "@/components/demos/playground/controls/number-chip";
import ExampleDrawerNested from "@/components/demos/drawer-demo";

const Video = dynamic(() => import("@/components/video").then((module) => ({ default: module.Video })), {
  loading: () => <p className="text-sm text-muted-foreground">Loading video player...</p>,
});

export function UiPlayground() {
  return (
    <div className="flex w-full flex-col gap-14">
      <PlaygroundSection id="ui" title="UI">
        <DemoContainer title="Tabs" caption="Elevated, line, and pill variants" variant="muted" className="lg:col-span-full">
          <TabsVariantsDemo />
        </DemoContainer>
        <DemoContainer title="ToggleGrid" variant="muted" centerContent className="lg:col-span-full">
          <ToggleGridDemo />
        </DemoContainer>
        <DemoContainer title="Switch" variant="muted" centerContent className="lg:col-span-full">
          <div className="grid-stack aspect-square w-32">
            <SwitchDemo />
          </div>
        </DemoContainer>
        <DemoContainer title="Base UI + CSS-anchored value" variant="muted" centerContent className="lg:col-span-full">
          <AnchoredSliderDemo />
        </DemoContainer>
        <DemoContainer title="NumberChip" description="Scrub to adjust value" variant="muted" centerContent className="lg:col-span-full">
          <NumberChip />
        </DemoContainer>
        <DemoContainer title="Slider" variant="muted" centerContent className="lg:col-span-full">
          <SliderDemo />
        </DemoContainer>
        <DemoContainer caption="CodeBlock" variant="muted" centerContent className="lg:col-span-full lg:row-span-2">
          <CodeBlock
            code={`export function ButtonDemo() {\n  return <Button variant="elevated">Save</Button>;\n}`}
            language="tsx"
            filename="button-demo.tsx"
          />
        </DemoContainer>
        <DemoContainer caption="CarouselToolbar" variant="muted" centerContent className="lg:col-span-full">
          <CarouselDemo />
        </DemoContainer>
        <DemoContainer title="ImageToggle" caption="Select a variant" variant="muted" centerContent className="lg:col-span-full">
          <ImageToggleDemo />
        </DemoContainer>
        <DemoContainer
          title="Video Player"
          caption={
            <>
              Built with <LinkOut href="https://www.media-chrome.org/" text="media-chrome" /> + Base UI Toolbar
            </>
          }
          variant="muted"
          centerContent
          className="lg:col-span-full"
        >
          <Video
            src="/assets/shine/unused/shine-military-dataviz.mov"
            autoPlay={false}
            preload="metadata"
            className="my-0 w-full max-w-4xl"
          />
        </DemoContainer>
        <DemoContainer title="Drawer" caption="Stacked drawers" variant="muted" centerContent className="lg:col-span-full">
          <ExampleDrawerNested />
        </DemoContainer>
      </PlaygroundSection>
    </div>
  );
}
