"use client";

import { Carousel, CarouselItem, CarouselNext, CarouselPrevious, CarouselToolbar, CarouselViewport } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemHeader, ItemMedia, ItemTitle } from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  TreeIconClaude,
  TreeIconCss,
  TreeIconFile,
  TreeIconImage,
  TreeIconReact,
  TreeIconTailwind,
  TreeIconTypescript,
} from "@/components/icons/tree";
import { IconChevronDown, IconChevronLeft, IconChevronRight, IconChevronUp } from "@tabler/icons-react";
import * as React from "react";

const TREE_ICONS = [TreeIconImage, TreeIconFile, TreeIconReact, TreeIconClaude, TreeIconTypescript, TreeIconTailwind, TreeIconCss] as const;

function CarouselTestSlide({ slideIndex = 0 }: { slideIndex?: number }) {
  const Icon = TREE_ICONS[slideIndex % TREE_ICONS.length]!;
  return (
    <Item variant="muted">
      <ItemHeader>
        <ItemMedia variant="image">
          <Icon />
        </ItemMedia>
        <ItemActions>
          <Button type="button" size="sm" variant="outline">
            Action
          </Button>
        </ItemActions>
      </ItemHeader>
      <ItemContent>
        <ItemTitle>Slide {slideIndex + 1}</ItemTitle>
        <ItemDescription>This is the content for slide {slideIndex + 1}.</ItemDescription>
      </ItemContent>
    </Item>
  );
}

function SlideItems({ carouselId, count = 4 }: { carouselId: string; count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <CarouselItem key={`${carouselId}-item-${i}`}>
          <CarouselTestSlide slideIndex={i} />
        </CarouselItem>
      ))}
    </>
  );
}

function FakeScrollCarousel({ id, axis, snap = false }: { id: string; axis: "horizontal" | "vertical"; snap?: boolean }) {
  const shellRef = React.useRef<HTMLDivElement>(null);
  const stride = axis === "horizontal" ? 224 : 164;

  const scrollByDir = React.useCallback(
    (dir: -1 | 1) => {
      const vp = shellRef.current?.querySelector<HTMLElement>('[data-slot="scroll-area-viewport"]');
      if (!vp) return;
      if (axis === "horizontal") {
        vp.scrollBy({ left: dir * stride, behavior: "smooth" });
      } else {
        vp.scrollBy({ top: dir * stride, behavior: "smooth" });
      }
    },
    [axis, stride]
  );

  const viewportSnapClass =
    snap && axis === "horizontal" ? "snap-x snap-mandatory" : snap && axis === "vertical" ? "snap-y snap-mandatory" : undefined;

  return (
    <div id={id} ref={shellRef}>
      <div className="mb-2 flex gap-2">
        <Button type="button" size="icon-sm" variant="secondary" onClick={() => scrollByDir(-1)} aria-label="Scroll back">
          {axis === "horizontal" ? <IconChevronLeft /> : <IconChevronUp />}
        </Button>
        <Button type="button" size="icon-sm" variant="secondary" onClick={() => scrollByDir(1)} aria-label="Scroll forward">
          {axis === "horizontal" ? <IconChevronRight /> : <IconChevronDown />}
        </Button>
      </div>
      <ScrollArea
        orientation={axis === "horizontal" ? "horizontal" : "vertical"}
        className={axis === "horizontal" ? "w-full" : "h-64 w-full"}
        innerClass={viewportSnapClass}
        showScrollbar
        scrollbarGutter
        scrollFade
      >
        <div className={axis === "horizontal" ? "flex w-max gap-4 p-2" : "flex flex-col gap-4 p-2"}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={`${id}-strip-${i}`}
              className={
                axis === "horizontal" ? (snap ? "w-72 shrink-0 snap-center" : "w-72 shrink-0") : snap ? "shrink-0 snap-start" : "shrink-0"
              }
            >
              <CarouselTestSlide slideIndex={i} />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default function CarouselTestingPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-6 py-12">
      <header>
        <p className="font-pixel text-[11px] text-muted-foreground">private/testing/carousel</p>
        <h1 className="text-2xl font-semibold tracking-tight">Carousel testing</h1>
      </header>

      <section id="carousel-testing-row-1-orientation" className="space-y-4">
        <h2 className="text-base font-medium">Row 1 — orientation</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div id="carousel-testing-example-horizontal" className="space-y-2">
            <p className="text-sm text-muted-foreground">Horizontal + toolbar</p>
            <Carousel>
              <CarouselViewport>
                <SlideItems carouselId="carousel-testing-row-1-h" />
              </CarouselViewport>
              <CarouselToolbar />
            </Carousel>
          </div>
          <div id="carousel-testing-example-vertical" className="space-y-2">
            <p className="text-sm text-muted-foreground">Vertical + toolbar</p>
            <div className="h-80">
              <Carousel orientation="vertical" className="h-64 bg-muted">
                <CarouselViewport>
                  <SlideItems carouselId="carousel-testing-row-1-v" />
                </CarouselViewport>
                <CarouselToolbar />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      <section id="carousel-testing-row-2-fake-scroll" className="space-y-4">
        <h2 className="text-base font-medium">Row 2 — ScrollArea “fake” carousels</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Horizontal scroll + icon buttons</p>
            <FakeScrollCarousel id="carousel-testing-fake-scroll-x" axis="horizontal" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Vertical scroll + icon buttons</p>
            <FakeScrollCarousel id="carousel-testing-fake-scroll-y" axis="vertical" />
          </div>
        </div>

        <div id="carousel-testing-row-2-fake-scroll-snap" className="grid gap-8 md:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Same + scroll snapping — viewport <code className="text-xs">snap-x snap-mandatory</code>, slides{" "}
              <code className="text-xs">snap-start</code>
            </p>
            <FakeScrollCarousel id="carousel-testing-fake-scroll-x-snap" axis="horizontal" snap />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Same + scroll snapping — viewport <code className="text-xs">snap-y snap-mandatory</code>, slides{" "}
              <code className="text-xs">snap-start</code>
            </p>
            <FakeScrollCarousel id="carousel-testing-fake-scroll-y-snap" axis="vertical" snap />
          </div>
        </div>
      </section>

      <section id="carousel-testing-row-3-controls" className="space-y-4">
        <h2 className="text-base font-medium">Row 3 — Toolbar vs prev/next</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div id="carousel-testing-prev-next-only" className="space-y-2">
            <p className="text-sm text-muted-foreground">Prev / Next only (no toolbar)</p>
            <Carousel>
              <CarouselViewport>
                <SlideItems carouselId="carousel-testing-pn-only" />
              </CarouselViewport>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div id="carousel-testing-toolbar-default" className="space-y-2">
            <p className="text-sm text-muted-foreground">Toolbar only</p>
            <Carousel>
              <CarouselViewport>
                <SlideItems carouselId="carousel-testing-toolbar-def" />
              </CarouselViewport>
              <CarouselToolbar />
            </Carousel>
          </div>
        </div>
      </section>

      <section id="carousel-testing-row-4-autoplay" className="space-y-4">
        <h2 className="text-base font-medium">Row 4 — Autoplay</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div id="carousel-testing-autoplay-loop" className="space-y-2">
            <p className="text-sm text-muted-foreground">Autoplay + loop</p>
            <Carousel autoplay={{ delay: 2800, defaultInteraction: false }} opts={{ loop: true }}>
              <CarouselViewport>
                <SlideItems carouselId="carousel-testing-ap-loop" />
              </CarouselViewport>
              <CarouselToolbar />
            </Carousel>
          </div>
          <div id="carousel-testing-autoplay-no-loop" className="space-y-2">
            <p className="text-sm text-muted-foreground">Autoplay (no loop)</p>
            <Carousel autoplay={{ delay: 2800, defaultInteraction: false }} opts={{ loop: false }}>
              <CarouselViewport>
                <SlideItems carouselId="carousel-testing-ap-noloop" />
              </CarouselViewport>
              <CarouselToolbar />
            </Carousel>
          </div>
        </div>
      </section>

      <section id="carousel-testing-row-5-extras" className="space-y-4">
        <h2 className="text-base font-medium">Row 5 — Fade + vertical prev/next</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div id="carousel-testing-fade-autoplay" className="space-y-2">
            <p className="text-sm text-muted-foreground">Fade + autoplay + loop</p>
            <Carousel autoplay={{ delay: 3200, defaultInteraction: false }} fade opts={{ loop: true }}>
              <CarouselViewport>
                <SlideItems carouselId="carousel-testing-fade-ap" />
              </CarouselViewport>
              <CarouselToolbar />
            </Carousel>
          </div>
          <div id="carousel-testing-vertical-prev-next" className="space-y-2">
            <p className="text-sm text-muted-foreground">Vertical — Prev / Next only</p>
            <div className="h-80">
              <Carousel orientation="vertical">
                <CarouselViewport>
                  <SlideItems carouselId="carousel-testing-v-pn" />
                </CarouselViewport>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
