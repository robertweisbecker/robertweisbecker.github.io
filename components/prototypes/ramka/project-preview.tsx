"use client";

import * as React from "react";
import * as Lightbox from "@ramka/react/lightbox";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { homeProjects } from "./home-data";
import { MediaGallery } from "./media-gallery";
import styles from "./home-prototype.module.css";
import { useStableMorph } from "./use-stable-morph";

export type ProjectLayout = "fan" | "rail";
type Project = (typeof homeProjects)[number];

function scrollToCard(rail: HTMLDivElement, index: number, behavior: ScrollBehavior) {
  const card = rail.querySelectorAll<HTMLButtonElement>("[data-project-image]")[index];
  if (card) rail.scrollTo({ left: card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2, behavior });
}

export function ProjectPreview({ project, layout }: { project: Project; layout: ProjectLayout }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [railIndex, setRailIndex] = React.useState(0);
  const railRef = React.useRef<HTMLDivElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const morph = useStableMorph();

  function readRailPosition() {
    const rail = railRef.current;
    if (!rail) return;
    const center = rail.scrollLeft + rail.clientWidth / 2;
    const cards = Array.from(rail.querySelectorAll<HTMLButtonElement>("[data-project-image]"));
    let nearest = 0;
    let distance = Infinity;
    cards.forEach((card, index) => {
      const next = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      if (next < distance) {
        nearest = index;
        distance = next;
      }
    });
    setRailIndex(nearest);
  }

  function navigateRail(index: number) {
    if (railRef.current) scrollToCard(railRef.current, index, reducedMotion ? "instant" : "smooth");
  }

  return (
    <Lightbox.Root
      value={value}
      onValueChange={setValue}
      open={open}
      onOpenChange={setOpen}
      morphTo="active"
      onOpenChangeComplete={morph.complete}
      scrollTriggerIntoView={[
        { type: "onChange", behavior: "instant", inline: "center", block: "nearest" },
        { type: "onOpenComplete", behavior: "instant", inline: "center", block: "nearest" },
      ]}
    >
      <article className="min-w-0 space-y-5" aria-label={project.title}>
        <div
          key={layout}
          ref={layout === "rail" ? railRef : undefined}
          className={layout === "fan" ? styles.fan : styles.rail}
          data-open={open || undefined}
          onClickCapture={layout === "fan" ? morph.capture : undefined}
          onScroll={layout === "rail" ? readRailPosition : undefined}
          role={layout === "rail" ? "region" : undefined}
          aria-label={layout === "rail" ? `${project.title} image rail` : undefined}
        >
          {project.items.map((item, index) => (
            <Lightbox.Trigger
              key={item.id}
              index={index}
              data-morph-card
              data-project-image
              aria-label={`Preview ${project.title}: ${item.title}`}
              className={layout === "fan" ? styles.fanCard : styles.railCard}
              style={layout === "fan" ? ({ "--slot": index - 2, "--layer": 5 - Math.abs(index - 2) } as React.CSSProperties) : undefined}
            >
              {({ imageRef, morphRef }) => (
                <span className={styles.projectSurface}>
                  <Image
                    ref={(node) => {
                      imageRef(node);
                      morphRef(node);
                    }}
                    src={item.image}
                    alt={item.alt}
                    placeholder="blur"
                    sizes={layout === "fan" ? "(max-width: 720px) 44vw, 320px" : "(max-width: 720px) 84vw, 620px"}
                    className="size-full rounded-[inherit] object-cover"
                    draggable={false}
                  />
                  <span className={styles.imageNumber} aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>
              )}
            </Lightbox.Trigger>
          ))}
        </div>
        <div className="space-y-3 px-1">
          {layout === "rail" && (
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground" aria-live="polite" aria-atomic="true">
                <span className="mr-3 tabular-nums">
                  {String(railIndex + 1).padStart(2, "0")} / {String(project.items.length).padStart(2, "0")}
                </span>
                {project.items[railIndex].title}
              </p>
              <div className="flex shrink-0 gap-3">
                <Button
                  size="icon-sm"
                  variant="outline"
                  rounded
                  aria-label={`Previous ${project.title} image`}
                  disabled={railIndex === 0}
                  onClick={() => navigateRail(railIndex - 1)}
                >
                  <IconChevronLeft aria-hidden />
                </Button>
                <Button
                  size="icon-sm"
                  variant="outline"
                  rounded
                  aria-label={`Next ${project.title} image`}
                  disabled={railIndex === project.items.length - 1}
                  onClick={() => navigateRail(railIndex + 1)}
                >
                  <IconChevronRight aria-hidden />
                </Button>
              </div>
            </div>
          )}
          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0 space-y-1.5">
              <h3 className="text-lg font-medium tracking-tight">
                <Link href={project.path} className="link">
                  {project.title} <span aria-hidden>↗</span>
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </div>
            {layout === "fan" && <span className="shrink-0 pt-1 text-xs text-muted-foreground">{project.items.length} images</span>}
          </div>
        </div>
      </article>
      <MediaGallery
        items={project.items}
        label={`${project.title} preview`}
        activeIndex={value}
        project={{ title: project.title, summary: project.summary, role: project.role, href: project.path }}
      />
    </Lightbox.Root>
  );
}
