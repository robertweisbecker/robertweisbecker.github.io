"use client";

import * as Lightbox from "@ramka/react/lightbox";
import { IconChevronLeft, IconChevronRight, IconX, IconZoomIn, IconZoomOut } from "@tabler/icons-react";
import Image, { type StaticImageData } from "next/image";
import { type CSSProperties, type ReactNode, useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import styles from "./media-gallery.module.css";

export type GalleryItem = {
  id: string;
  image: StaticImageData;
  title: string;
  description?: string;
  alt: string;
  sectionId?: string;
};

const control = "rounded-full bg-card/90 text-foreground shadow-sm hover:bg-accent disabled:opacity-30";

type ProjectContext = { title: string; summary: string; role: string; href: string };

function ProjectActions({ project }: { project: ProjectContext }) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  return (
    <div className="relative mt-3 flex items-center justify-center gap-4">
      {expanded && (
        <div
          id={id}
          className="absolute bottom-full left-1/2 mb-3 w-80 max-w-[calc(100vw-3rem)] -translate-x-1/2 rounded-xl border border-border bg-popover p-5 text-left text-sm shadow-lg"
        >
          <p className="font-medium">{project.title}</p>
          <p className="mt-2 text-pretty text-muted-foreground">{project.summary}</p>
          <p className="mt-4 text-xs text-muted-foreground">{project.role}</p>
        </div>
      )}
      <Button variant="ghost" size="sm" aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded(!expanded)}>
        {expanded ? "Hide details" : "About this project"}
      </Button>
      <LinkButton href={project.href} variant="outline" size="sm">
        Read case study <span aria-hidden>↗</span>
      </LinkButton>
    </div>
  );
}

export function MediaGallery({
  items,
  label,
  activeIndex,
  details,
  detailsFooter,
  footer,
  project,
}: {
  items: GalleryItem[];
  label: string;
  activeIndex: number;
  details?: ReactNode;
  detailsFooter?: ReactNode;
  footer?: ReactNode;
  project?: ProjectContext;
}) {
  const active = items[activeIndex] ?? items[0];
  return (
    <Lightbox.Portal>
      <Lightbox.Backdrop className="fixed inset-0 z-100 bg-background opacity-[calc(1-var(--lightbox-pull-progress,0)*0.6)] transition-opacity duration-(--lightbox-vt-duration) data-pulling:transition-none motion-reduce:transition-none starting:opacity-0 data-closed:opacity-0" />
      <Lightbox.Content aria-label={label} className={`${styles.gallery} fixed inset-0 z-101 flex flex-col text-foreground lg:flex-row`}>
        <Lightbox.Stage className="relative min-h-0 flex-1 overflow-hidden">
          <Lightbox.Slides
            preload={2}
            aria-label="Full-size images"
            aria-roledescription="carousel"
            className={styles.slides}
            style={
              {
                "--gallery-bottom": footer || project ? "13rem" : "10rem",
                "--gallery-first-ratio": items[0].image.width / items[0].image.height,
                "--gallery-last-ratio": items[items.length - 1].image.width / items[items.length - 1].image.height,
              } as CSSProperties
            }
          >
            {items.map((item, index) => (
              <Lightbox.Slide
                key={item.id}
                className={styles.slide}
                style={{ "--gallery-ratio": item.image.width / item.image.height } as CSSProperties}
              >
                <Lightbox.Item
                  index={index}
                  caption={item.title}
                  aria-label={`${index + 1} of ${items.length}: ${item.title}`}
                  className={styles.item}
                >
                  <Lightbox.Zoom>
                    <Lightbox.Media width={item.image.width} height={item.image.height} className="overflow-hidden rounded-lg">
                      <Image src={item.image} alt={item.alt} sizes="100vw" priority={index === activeIndex} />
                    </Lightbox.Media>
                  </Lightbox.Zoom>
                </Lightbox.Item>
              </Lightbox.Slide>
            ))}
          </Lightbox.Slides>
          <div className="absolute inset-x-4 top-[max(1rem,env(safe-area-inset-top))] flex items-center justify-between gap-2 sm:inset-x-6">
            <Lightbox.Counter className="px-2 py-1 text-xs text-muted-foreground tabular-nums" />
            <div className="flex gap-3">
              <Lightbox.ZoomOut aria-label="Zoom out" render={<Button variant="ghost" size="icon-sm" className={control} />}>
                <IconZoomOut aria-hidden />
              </Lightbox.ZoomOut>
              <Lightbox.ZoomIn aria-label="Zoom in" render={<Button variant="ghost" size="icon-sm" className={control} />}>
                <IconZoomIn aria-hidden />
              </Lightbox.ZoomIn>
              <Lightbox.Close aria-label="Close gallery" render={<Button variant="ghost" size="icon-sm" className={control} />}>
                <IconX aria-hidden />
              </Lightbox.Close>
            </div>
          </div>
          <Lightbox.Previous
            aria-label="Previous image"
            render={<Button variant="ghost" size="icon-sm" className={`${control} absolute top-1/2 left-2 -translate-y-1/2 sm:left-4`} />}
          >
            <IconChevronLeft aria-hidden />
          </Lightbox.Previous>
          <Lightbox.Next
            aria-label="Next image"
            render={<Button variant="ghost" size="icon-sm" className={`${control} absolute top-1/2 right-2 -translate-y-1/2 sm:right-4`} />}
          >
            <IconChevronRight aria-hidden />
          </Lightbox.Next>
          <div className="absolute inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] mx-auto max-w-3xl text-center">
            {project && <p className="mb-1 text-xs text-muted-foreground">{project.title}</p>}
            <p className="text-sm font-medium">{active?.title}</p>
            {!details && active?.description && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{active.description}</p>}
            <Lightbox.ThumbnailStrip className={styles.thumbnailStrip}>
              <Lightbox.ThumbnailStripTrack aria-label="Choose an image" className="flex w-max items-center gap-3">
                {items.map((item, index) => (
                  <Lightbox.Thumbnail
                    key={item.id}
                    index={index}
                    aria-label={`Show ${item.title}`}
                    className="size-14 shrink-0 overflow-hidden rounded-lg opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-selected:opacity-100 motion-reduce:transition-none"
                  >
                    <Image src={item.image} alt="" sizes="56px" draggable={false} className="size-full object-cover" />
                  </Lightbox.Thumbnail>
                ))}
              </Lightbox.ThumbnailStripTrack>
              <span aria-hidden className={styles.thumbnailFrame} />
            </Lightbox.ThumbnailStrip>
            {project && <ProjectActions project={project} />}
            {footer}
          </div>
        </Lightbox.Stage>
        {(details || detailsFooter) && (
          <aside className="flex max-h-[30dvh] shrink-0 flex-col border-t border-border bg-card text-sm lg:max-h-none lg:w-80 lg:border-t-0 lg:border-l">
            <div className="min-h-0 flex-1 overflow-y-auto p-5 lg:p-8">{details}</div>
            {detailsFooter && (
              <div className="shrink-0 border-t border-border px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:px-8 lg:pb-8">
                {detailsFooter}
              </div>
            )}
          </aside>
        )}
      </Lightbox.Content>
    </Lightbox.Portal>
  );
}
