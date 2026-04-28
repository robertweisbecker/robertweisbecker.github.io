"use client";

import { ImageModal } from "@/components/image-modal";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable";
import { Badge } from "./ui/badge";
import { Image, ImageProps } from "./image";

interface ImageToggleProps {
  before: string;
  after: string;
  tab1?: string;
  tab2?: string;
  mode?: "tabs" | "slider" | "comparison";
  description?: React.ReactNode;
  imageProps?: ImageProps;
}

export function ImageToggle({
  before,
  after,
  tab1 = "Before",
  tab2 = "After",
  mode = "tabs",
  description,
  imageProps,
}: ImageToggleProps) {
  const [sliderValue, setSliderValue] = React.useState(0);

  if (mode === "comparison") {
    return (
      <figure className="not-prose flex flex-col justify-center">
        <ResizablePanelGroup className="squircle relative aspect-video rounded-xl" orientation="horizontal">
          <ResizablePanel
            defaultSize="50%"
            minSize="0%"
            maxSize="100%"
            className="squircle group relative rounded-s-xl rounded-e-xs"
          >
            <img src={before} className="h-full w-auto object-cover object-left" />
            <Badge
              variant="outline"
              className="absolute top-2 left-2 z-1 translate-y-0.5 opacity-0 transition-[translate,opacity] duration-100 ease-out group-hover:translate-0 group-hover:opacity-100"
            >
              {tab1}
            </Badge>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize="50%"
            minSize="0%"
            maxSize="100%"
            className="squircle group relative rounded-s-xs rounded-e-xl"
          >
            <img src={after} className="h-full w-auto object-cover object-right" />
            <Badge
              variant="outline"
              className="absolute top-2 right-2 z-1 translate-y-0.5 opacity-0 transition-[translate,opacity] duration-100 ease-out group-hover:translate-0 group-hover:opacity-100"
            >
              {tab2}
            </Badge>
          </ResizablePanel>
        </ResizablePanelGroup>
      </figure>
    );
  }

  if (mode === "slider") {
    return (
      <figure className="not-prose flex flex-col justify-center">
        <div className="relative">
          <img src={before} style={{ opacity: 1 - sliderValue / 100 }} alt="Before" />
          <img src={after} className="absolute inset-0" style={{ opacity: sliderValue / 100 }} alt="After" />
        </div>
        <figcaption className="mx-auto grid w-full max-w-sm flex-1 grid-cols-[auto_1fr_auto] items-center gap-4 p-3 text-xs text-muted-foreground">
          <p>{tab1}</p>
          <Slider
            min={0}
            max={100}
            step={1}
            value={[sliderValue]}
            onValueChange={(value) => setSliderValue(Array.isArray(value) ? value[0] : value)}
          />
          <p>{tab2}</p>
        </figcaption>
      </figure>
    );
  }

  return (
    <Tabs className="not-prose mx-auto">
      <TabsList className="" variant="pill">
        <TabsTrigger value="before">{tab1}</TabsTrigger>
        <TabsTrigger value="after">{tab2}</TabsTrigger>
      </TabsList>
      <TabsContent value="after" keepMounted>
        <Image src={after} {...imageProps} className="mt-0" />
      </TabsContent>
      <TabsContent value="before" keepMounted>
        <Image src={before} {...imageProps} className="mt-0" />
      </TabsContent>
    </Tabs>
  );
}

export function ImageToggle2({ before, after, tab1 = "Before", tab2 = "After" }: ImageToggleProps) {
  return (
    <div className="relative z-10 overflow-hidden rounded-2xl border border-transparent bg-background p-1 shadow-lg ring-1 shadow-black/6.5 ring-border backdrop-blur">
      <div className="-mb-px flex h-9">
        <div className="-me-px mt-3 w-5 rounded-br-xl border-e border-b bg-card" />
        <div className="mb-3 w-5 rounded-tl-xl border-t border-l bg-card" />
        <div className="flex h-full items-center gap-1.5 border-y border-b-card font-mono text-xs">response.json</div>
        <div className="mb-3 w-5 rounded-tr-xl bg-destructive" />

        {/* <div className="bg-destructive grid h-full grid-cols-[auto_1fr_auto]"> */}
        {/* <div className="translate-px bg-card h-1/2 w-5 -translate-y-px">
          </div> */}
        {/* <div className="bg-success mt-px h-full rounded-tr-xl border-r border-t" /> */}
        <div className="-ms-px mt-3 w-5 rounded-bl-xl border-b border-l bg-none" />
        {/* <div className="bg-destructive h-full w-5">
            <div className="bg-card h-1/2 translate-y-[200%]">
              <div className="bg-destructive -mt-px h-full rounded-tr-xl border-r border-t" />
            </div>
          </div> */}
        {/* </div> */}
      </div>
      <div className="h-96 rounded-xl border bg-card pt-9">
        <div className="h-full overflow-auto mask-y-from-80%">
          <Tabs className="my-16 items-center">
            <TabsList variant="pill">
              <TabsTrigger value="before">{tab1}</TabsTrigger>
              <TabsTrigger value="after">{tab2}</TabsTrigger>
            </TabsList>
            <TabsContent value="after" keepMounted>
              <ImageModal src={after} />
            </TabsContent>
            <TabsContent value="before" keepMounted>
              <ImageModal src={before} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
