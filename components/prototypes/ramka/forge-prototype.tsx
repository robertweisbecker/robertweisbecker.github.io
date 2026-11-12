"use client";

import * as Lightbox from "@ramka/react/lightbox";
import Image from "next/image";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { MediaGallery, type GalleryItem } from "./media-gallery";
import after from "@/media/assets/forge/forge-after.png";
import colors from "@/media/assets/forge/colors-all.png";
import neutral from "@/media/assets/forge/colors-neutral.png";
import density from "@/media/assets/forge/density-compare.png";
import activity from "@/media/assets/forge/activity-edit.png";
import sidebar from "@/media/assets/forge/sidebar.png";
import buttons from "@/media/assets/forge/buttons.png";
import widgets from "@/media/assets/forge/widgets.png";

const items: GalleryItem[] = [
  {
    id: "overview",
    image: after,
    title: "A refreshed Forge",
    alt: "The refreshed Forge editor",
    sectionId: "overview",
    description: "A more coherent home for course creation.",
  },
  {
    id: "palette",
    image: colors,
    title: "A new color system",
    alt: "The updated Forge color palettes",
    sectionId: "color",
    description: "A predictable palette for surfaces, text, and interactive states.",
  },
  {
    id: "neutrals",
    image: neutral,
    title: "Room to elevate",
    alt: "Comparison of the old and new neutral palettes",
    sectionId: "color",
    description: "More neutral steps make nested surfaces easier to distinguish.",
  },
  {
    id: "density",
    image: density,
    title: "More room for the work",
    alt: "Comparison of the original and denser interface",
    sectionId: "density",
    description: "A tighter type scale and spacing give content more room.",
  },
  {
    id: "activity",
    image: activity,
    title: "Editing in context",
    alt: "The activity editing view",
    sectionId: "navigation",
    description: "Higher-level edits move into their own view.",
  },
  {
    id: "sidebar",
    image: sidebar,
    title: "A clearer hierarchy",
    alt: "Comparison of navigation hierarchy and actions",
    sectionId: "navigation",
    description: "Actions are brought together in the parent view.",
  },
  {
    id: "buttons",
    image: buttons,
    title: "A shared vocabulary",
    alt: "Standardized Forge buttons",
    sectionId: "standardization",
    description: "Consistent components bring the interface together.",
  },
  {
    id: "widgets",
    image: widgets,
    title: "Tools for the work",
    alt: "Forge utility class widgets",
    sectionId: "standardization",
    description: "Custom widgets support the details of course building.",
  },
];

const sections = [
  {
    id: "color",
    number: "01",
    title: "Color with room to grow",
    text: "Forge’s original neutral palette ran out of contrast as editors opened nested views. A broader, balanced scale makes elevation legible and gives interactive states a consistent foundation.",
    images: [1, 2],
  },
  {
    id: "density",
    number: "02",
    title: "A more useful density",
    text: "A semantic type scale and tighter spacing give the interface a calmer rhythm while leaving more room for the course itself.",
    images: [3],
  },
  {
    id: "navigation",
    number: "03",
    title: "Navigation that follows the work",
    text: "The old interface mirrored the underlying schema. Moving higher-level editing into its own view preserves the preview and brings related actions together.",
    images: [4, 5],
  },
  {
    id: "standardization",
    number: "04",
    title: "A common language",
    text: "Standardized controls and purpose-built widgets make the many parts of the editor feel like one product.",
    images: [6, 7],
  },
];

export function ForgePrototype() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const destination = useRef<string | null>(null);
  const active = items[activeIndex];
  return (
    <Lightbox.Root
      open={open}
      onOpenChange={setOpen}
      value={activeIndex}
      onValueChange={setActiveIndex}
      morphTo="active"
      scrollTriggerIntoView={[
        { type: "onChange", behavior: "instant" },
        { type: "onOpenComplete", behavior: "instant" },
      ]}
      onOpenChangeComplete={(isOpen) => {
        if (!isOpen && destination.current) {
          const target = document.getElementById(destination.current);
          destination.current = null;
          // Ramka may restore focus to the trigger on its next animation frame.
          // Move to the requested section after that restoration has completed.
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              target?.focus({ preventScroll: true });
              target?.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
                block: "start",
              });
            })
          );
        }
      }}
    >
      <article className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
        <header id="overview" tabIndex={-1} className="scroll-mt-28 outline-none">
          <p className="text-xs font-semibold tracking-[.2em] text-muted-foreground uppercase">Case study · Design systems</p>
          <h2 className="mt-5 text-5xl font-semibold tracking-tight sm:text-7xl">Everfi Forge</h2>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            Refreshing the tool that brings interactive learning to life.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-12 gap-y-4 border-t border-border pt-5 text-sm">
            <p>
              <span className="block text-muted-foreground">Role</span>Design systems lead
            </p>
            <p>
              <span className="block text-muted-foreground">Focus</span>Product design &amp; foundations
            </p>
          </div>
          <p className="mt-10 max-w-2xl text-base leading-7 text-muted-foreground">
            Forge is Everfi’s internal course creation tool. As its capabilities grew, the interface needed a stronger foundation and a more
            considered experience for the people building courses every day.
          </p>
          <ForgeImage index={0} className="mt-10" />
        </header>
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            tabIndex={-1}
            className="scroll-mt-28 border-t border-border py-16 outline-none sm:py-24"
          >
            <div className="grid gap-5 md:grid-cols-[1fr_2fr] md:gap-16">
              <span className="text-sm text-muted-foreground">{section.number} / Forge</span>
              <div>
                <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">{section.title}</h3>
                <p className="mt-5 max-w-xl leading-7 text-muted-foreground">{section.text}</p>
              </div>
            </div>
            <div className={`mt-10 grid gap-4 ${section.images.length > 1 ? "md:grid-cols-2" : ""}`}>
              {section.images.map((index) => (
                <ForgeImage key={items[index].id} index={index} />
              ))}
            </div>
          </section>
        ))}
      </article>
      <MediaGallery
        items={items}
        label="Forge project images"
        activeIndex={activeIndex}
        details={
          <>
            <p className="text-xs tracking-[.18em] text-muted-foreground uppercase">Everfi Forge</p>
            <h2 className="mt-4 text-2xl font-semibold">{active.title}</h2>
            <p className="mt-3 leading-6 text-muted-foreground">{active.description}</p>
            <Lightbox.Close
              render={<Button variant="outline" className="mt-6 min-h-11" />}
              onClick={() => {
                destination.current = active.sectionId ?? "overview";
              }}
            >
              Read this section <span aria-hidden>↗</span>
            </Lightbox.Close>
          </>
        }
      />
    </Lightbox.Root>
  );
}

function ForgeImage({ index, className = "" }: { index: number; className?: string }) {
  const item = items[index];
  return (
    <figure className={className}>
      <Lightbox.Trigger
        index={index}
        aria-label={`Open ${item.title} in gallery`}
        className="group block w-full overflow-hidden rounded-xl bg-muted text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        {({ imageRef, morphRef }) => (
          <Image
            ref={(node) => {
              imageRef(node);
              morphRef(node);
            }}
            src={item.image}
            alt={item.alt}
            placeholder="blur"
            className="h-auto w-full rounded-[inherit]"
          />
        )}
      </Lightbox.Trigger>
      <figcaption className="mt-3 flex justify-between gap-4 text-sm text-muted-foreground">
        <span>{item.title}</span>
        <span>View image ↗</span>
      </figcaption>
    </figure>
  );
}
