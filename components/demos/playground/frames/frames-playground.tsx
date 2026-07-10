"use client";

import dynamic from "next/dynamic";
import { DemoContainer } from "@/components/blocks/demo";
import { LinkOut } from "@/components/link-out";
import { PlaygroundSection } from "@/components/blocks/playground-section";
import { CarouselDemo } from "@/components/demos/playground/frames/carousel-demo";
import { ImageToggleDemo } from "@/components/demos/playground/frames/image-toggle-demo";

const Video = dynamic(() => import("@/components/video").then((module) => ({ default: module.Video })), {
  loading: () => <p className="text-sm text-muted-foreground">Loading video player…</p>,
});

export function FramesPlayground() {
  return (
    <div className="flex w-full flex-col gap-14">
      <PlaygroundSection id="media-comparison" title="Frames">
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
