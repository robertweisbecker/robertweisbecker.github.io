"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsPanel, TabsTrigger } from "@/components/ui/tabs";

const HomePrototype = dynamic(() => import("./home-prototype").then((module) => module.HomePrototype));
const ForgePrototype = dynamic(() => import("./forge-prototype").then((module) => module.ForgePrototype));
const DemoPrototype = dynamic(() => import("./demo-prototype").then((module) => module.DemoPrototype));

export function RamkaPrototypeReview() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-12">
      <div className="space-y-3 border-b border-border pb-6">
        <p className="font-pixel text-2xs text-muted-foreground uppercase">Private exploration · Ramka</p>
        <h1 className="text-3xl tracking-tight sm:text-4xl">A closer look, without losing your place.</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Preview a project, wander through artwork, browse a case study, or give an interactive demo room to breathe.
        </p>
      </div>
      <Tabs defaultValue="home" className="gap-10">
        <TabsList aria-label="Prototype experiences" className="max-w-full" variant="line">
          <TabsTrigger value="home" aria-label="Homepage" className="px-3 sm:px-5">
            Homepage
          </TabsTrigger>
          <TabsTrigger value="forge" aria-label="Case study" className="px-3 sm:px-5">
            Case study
          </TabsTrigger>
          <TabsTrigger value="demo" aria-label="Interactive demo" className="px-3 sm:px-5">
            Interactive demo
          </TabsTrigger>
        </TabsList>
        <TabsPanel value="home">
          <HomePrototype />
        </TabsPanel>
        <TabsPanel value="forge">
          <ForgePrototype />
        </TabsPanel>
        <TabsPanel value="demo">
          <DemoPrototype />
        </TabsPanel>
      </Tabs>
    </div>
  );
}

export function RamkaQaExamples() {
  const [showExamples, setShowExamples] = useState(false);

  return (
    <div className="mt-8 space-y-4 border-t border-border pt-6">
      <div className="space-y-2">
        <p className="font-medium">Ramka explorations</p>
        <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <li>Artwork · loose photo pile with image-first viewing</li>
          <li>Studio desk · textured paper, canvas edges, and scattered studio materials</li>
          <li>Project fan · rotated, individually expandable cards</li>
          <li>Snapped rail · inline browsing with matching close targets</li>
          <li>Shared viewer · image-first, scrolling thumbnail frame, details on demand</li>
          <li>Image motion · preserved proportions, stable hover origins, return to the active image</li>
          <li>Forge · shared figures and return to section</li>
          <li>Interactive demo · expanded editor with preserved state</li>
        </ul>
      </div>
      <Button variant="outline" aria-expanded={showExamples} onClick={() => setShowExamples(!showExamples)}>
        {showExamples ? "Hide Ramka examples" : "Show Ramka examples"}
      </Button>
      {showExamples && <RamkaPrototypeReview />}
    </div>
  );
}
