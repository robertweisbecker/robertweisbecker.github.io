"use client";

import * as React from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ProjectPreview, type ProjectLayout } from "./project-preview";

import { homeProjects } from "./home-data";
import { ArtworkPreview } from "./artwork-preview";

export function HomePrototype() {
  const [layout, setLayout] = React.useState<ProjectLayout>("fan");
  return (
    <div className="mx-auto max-w-2xl space-y-16 py-6 sm:py-10">
      <section className="space-y-6">
        <h2 className="-ms-1 text-h1">
          Robert
          <br />
          Weisbecker
        </h2>
        <div className="max-w-prose space-y-3.5 text-md text-pretty text-muted-foreground">
          <p>
            You can call me <span className="text-foreground">Bob</span>.
          </p>
          <p>
            I&apos;m a principal designer at{" "}
            <a href="https://everfi.com" className="link text-foreground">
              Everfi
            </a>{" "}
            working on products, tools, and systems to help drive social good through education.
          </p>
          <p>
            This is my little slice of the internet.
            <br />
            Have a look around.
          </p>
        </div>
      </section>
      <section aria-labelledby="ramka-home-work">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
          <h2 id="ramka-home-work" className="font-pixel text-[11px] uppercase">
            I. Selected work
          </h2>
          <ToggleGroup
            aria-label="Compare project layouts"
            variant="elevated"
            size="sm"
            value={[layout]}
            onValueChange={(values) => {
              const next = values[0];
              if (next === "fan" || next === "rail") setLayout(next);
            }}
          >
            <ToggleGroupItem value="fan">Project fan</ToggleGroupItem>
            <ToggleGroupItem value="rail">Snapped rail</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <p className="mb-6 text-xs text-muted-foreground">
          {layout === "fan"
            ? "A collection to pick through. Choose any card to explore."
            : "A closer look, one frame at a time. Scroll or use the arrows, then open an image."}
        </p>
        <div className="space-y-16 sm:space-y-24">
          {homeProjects.map((project) => (
            <ProjectPreview key={`${project.id}-${layout}`} project={project} layout={layout} />
          ))}
        </div>
      </section>
      <section aria-labelledby="ramka-home-art">
        <ArtworkPreview />
      </section>
    </div>
  );
}
