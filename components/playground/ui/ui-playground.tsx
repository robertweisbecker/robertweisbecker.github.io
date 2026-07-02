"use client";

import dynamic from "next/dynamic";

import { CodeBlock } from "@/components/code-block";
import { DemoContainer } from "@/components/demo";
import { LinkOut } from "@/components/link-out";
import { AnchoredSliderDemo } from "@/components/playground/controls/anchored-slider-demo";
import { SliderDemo } from "@/components/playground/controls/slider-demo";
import { SwitchDemo } from "@/components/playground/controls/switch-demo";
import { TabsVariantsDemo } from "@/components/playground/controls/tabs-variants-demo";
import { ToggleVariantsDemo } from "@/components/playground/controls/toggle-variants-demo";
import { CarouselDemo } from "@/components/playground/frames/carousel-demo";
import { ImageToggleDemo } from "@/components/playground/frames/image-toggle-demo";
import { PlaygroundSection } from "@/components/playground/playground-section";

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
          <ToggleVariantsDemo />
        </DemoContainer>
        <DemoContainer title="Switch" variant="muted" centerContent className="lg:col-span-full">
          <div className="grid-stack aspect-square w-32">
            <SwitchDemo />
          </div>
        </DemoContainer>
        <DemoContainer title="Base UI + CSS-anchored value" variant="muted" centerContent className="lg:col-span-full">
          <AnchoredSliderDemo />
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
      </PlaygroundSection>
    </div>
  );
}
