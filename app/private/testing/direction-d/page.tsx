"use client";

/*─────────────────────────────────────────────────────────
 * DIRECTION D — Annotated Diagram (two variations)
 *
 * Uses Base UI Popover.createHandle<Payload> so:
 *   - Multiple Popover.Trigger components share one popover
 *   - Popover.Viewport provides direction-aware content transitions
 *   - Positioner transitions left/top for smooth re-anchoring
 *   - Prev/Next navigate by calling handle.open(triggerId)
 *
 * Variation 1 — Dot annotations on images
 * Variation 2 — Sidebar list with SVG dashed line + highlighted image
 *─────────────────────────────────────────────────────────*/

import * as React from "react";
import Link from "next/link";
import { Popover } from "@base-ui/react/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { PopoverClose, PopoverFooter, PopoverHeader, PopoverTitle } from "@/components/ui/popover";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { ArrowSvg } from "@/components/icons";
import { ButtonGroup } from "@/components/ui/button-group";

/* ─── Shared types & data ────────────────────────────────── */
type Annotation = {
  id: number;
  /** trigger id string used with the handle */
  tid: string;
  x: number; // % from left of image
  y: number; // % from top of image
  label: string;
  body: string;
  cardIndex: number;
};

type ImageCard = {
  src: string;
  alt: string;
  caption: string;
};

const CARDS: ImageCard[] = [
  { src: "/assets/forge/dark.png", alt: "Forge dark mode", caption: "Forge — after the refresh" },
  { src: "/assets/forge/colors-all.png", alt: "Color palettes", caption: "New color system — all palettes" },
  { src: "/assets/forge/density-compare.png", alt: "Density comparison", caption: "Before & after — 60% shorter" },
];

const ALL_ANNOTATIONS: Annotation[] = [
  {
    id: 1,
    tid: "ann-1",
    x: 12,
    y: 22,
    cardIndex: 0,
    label: "Navigation",
    body: "The sidebar nav was rebuilt with explicit hierarchy — section headers, page items, and sub-items each have distinct visual weight.",
  },
  {
    id: 2,
    tid: "ann-2",
    x: 55,
    y: 15,
    cardIndex: 0,
    label: "Toolbar",
    body: "Page-level actions moved out of a hidden context menu into a persistent toolbar, dramatically improving discoverability.",
  },
  {
    id: 3,
    tid: "ann-3",
    x: 72,
    y: 70,
    cardIndex: 0,
    label: "Preview panel",
    body: "The live preview no longer resizes when an edit panel opens. Context is preserved — no more disorienting refresh cycles.",
  },
  {
    id: 4,
    tid: "ann-4",
    x: 18,
    y: 30,
    cardIndex: 1,
    label: "Scale range",
    body: "Each palette now spans 100–900, matching the lightness range of its siblings so you can mix values across scales predictably.",
  },
  {
    id: 5,
    tid: "ann-5",
    x: 65,
    y: 55,
    cardIndex: 1,
    label: "Semantic tokens",
    body: "Semantic tokens map to specific scale steps — e.g. `surface` always comes from the 100 range, `text` from 700+.",
  },
  {
    id: 6,
    tid: "ann-6",
    x: 25,
    y: 20,
    cardIndex: 2,
    label: "Before",
    body: "The old layout used generous padding borrowed from consumer-facing products. Fine for reading, too loose for a dense editing tool.",
  },
  {
    id: 7,
    tid: "ann-7",
    x: 72,
    y: 20,
    cardIndex: 2,
    label: "After",
    body: "A strict 4px grid and reduced type scale trimmed vertical space by 60%, letting more content fit without scrolling.",
  },
];

/* ─── Shared popover content ─────────────────────────────── */
function AnnotationPopoverContent({
  annotation,
  index,
  total,
  onPrev,
  onNext,
  onClose,
}: {
  annotation: Annotation;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <PopoverHeader className="w-full">
        <PopoverTitle>
          <Badge variant="outline">{annotation.id}</Badge> {annotation.label}
        </PopoverTitle>
        <PopoverClose className="absolute top-0 right-0" onClick={onClose} />
      </PopoverHeader>
      <Popover.Description className="text-xs leading-relaxed text-popover-foreground/70">
        {annotation.body}
      </Popover.Description>

      <PopoverFooter className="flex items-center justify-between">
        <span className="font-pixel text-[11px] tabular-nums">
          {index + 1} / {total}
        </span>
        <ButtonGroup>
          <Button variant="outline" size="icon-sm" onClick={onPrev} aria-label="Previous">
            <IconChevronLeft />
          </Button>
          <Button variant="outline" size="icon-sm" onClick={onNext} aria-label="Next">
            <IconChevronRight />
          </Button>
        </ButtonGroup>
      </PopoverFooter>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
 * VARIATION 1 — Dot annotations on images
 * ═══════════════════════════════════════════════════════════ */

/* Single handle shared across all dot triggers in Variation 1 */
const dotHandle = Popover.createHandle<Annotation>();

function Variation1() {
  const [activeId, setActiveId] = React.useState<number | null>(null);
  const activeIndex = ALL_ANNOTATIONS.findIndex((a) => a.id === activeId);

  function openById(id: number) {
    const ann = ALL_ANNOTATIONS.find((a) => a.id === id);
    if (!ann) return;
    setActiveId(id);
    dotHandle.open(ann.tid);
  }

  function prev() {
    const idx = (activeIndex - 1 + ALL_ANNOTATIONS.length) % ALL_ANNOTATIONS.length;
    openById(ALL_ANNOTATIONS[idx].id);
  }

  function next() {
    const idx = (activeIndex + 1) % ALL_ANNOTATIONS.length;
    openById(ALL_ANNOTATIONS[idx].id);
  }

  return (
    <div>
      <h2 className="mb-1 text-xl font-semibold">Variation 1 — Dot annotations</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Numbered dots on the image. Click any to open the shared popover — it smoothly re-anchors and cross-fades
        content as you navigate.
      </p>

      <div className="flex flex-col gap-6">
        {CARDS.map((card, ci) => {
          const cardAnns = ALL_ANNOTATIONS.filter((a) => a.cardIndex === ci);
          return (
            <Card key={card.src} variant="muted" size="sm" className="overflow-visible">
              <div className="relative mx-3 mt-3 overflow-hidden rounded-lg">
                <img src={card.src} alt={card.alt} className="w-full object-cover object-top" />
                {cardAnns.map((ann) => (
                  <Popover.Trigger
                    key={ann.tid}
                    id={ann.tid}
                    handle={dotHandle}
                    payload={ann}
                    nativeButton
                    render={
                      <Button
                        style={{ left: `${ann.x}%`, top: `${ann.y}%` }}
                        onClick={() => setActiveId(ann.id)}
                        aria-label={`Annotation ${ann.id}: ${ann.label}`}
                        size="icon"
                        variant="elevated"
                        className={cn(
                          "absolute z-10 -translate-x-1/2 -translate-y-1/2"
                          // activeId === ann.id
                          //   ? "bg-primary"
                          //   : "bg-black/60 backdrop-blur-sm hover:bg-primary/80"
                        )}
                      >
                        {ann.id}
                      </Button>
                    }
                  >
                    {ann.id}
                  </Popover.Trigger>
                ))}
              </div>
              <p className="px-3 pt-2 pb-3 font-pixel text-[11px] text-muted-foreground">{card.caption}</p>
            </Card>
          );
        })}
      </div>

      {/* Single shared popover for all dot triggers */}
      <Popover.Root
        handle={dotHandle}
        onOpenChange={(open) => {
          if (!open) setActiveId(null);
        }}
      >
        {({ payload: ann }) => (
          <Popover.Portal>
            <Popover.Positioner
              side="top"
              sideOffset={10}
              align="center"
              arrowPadding={16}
              className="h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom,transform] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] data-instant:transition-none"
            >
              <Popover.Popup
                className={cn(
                  "max-w-xs overflow-hidden rounded-xl bg-popover text-popover-foreground shadow-popover",
                  "relative h-(--popup-height,auto) w-(--popup-width,auto) origin-(--transform-origin)",
                  // open/close animation
                  "transition-[width,height,opacity,scale] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:scale-90 data-ending-style:opacity-0 data-instant:transition-none data-starting-style:scale-90 data-starting-style:opacity-0"
                  // size transition between different content
                )}
              >
                {/* Viewport enables direction-aware content crossfade */}
                <Popover.Viewport
                  className={cn(
                    "relative h-full w-full overflow-clip",
                    "p-(--popover-padding) [--popover-padding:--spacing(4)]",
                    "[&_[data-current]]:w-[calc(var(--popup-width)-3rem)]",
                    "[&_[data-current]]:translate-x-0",
                    "[&_[data-current]]:opacity-100",
                    "[&_[data-current]]:transition-[translate,opacity]",
                    "[&_[data-current]]:duration-[350ms,175ms]",
                    "[&_[data-current]]:ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "data-[activation-direction~='left']:[&_[data-current][data-starting-style]]:-translate-x-1/2",
                    "data-[activation-direction~='left']:[&_[data-current][data-starting-style]]:opacity-0",
                    "data-[activation-direction~='right']:[&_[data-current][data-starting-style]]:translate-x-1/2",
                    "data-[activation-direction~='right']:[&_[data-current][data-starting-style]]:opacity-0",
                    "[&_[data-previous]]:w-[calc(var(--popup-width)-3rem)]",
                    "[&_[data-previous]]:translate-x-0",
                    "[&_[data-previous]]:opacity-100",
                    "[&_[data-previous]]:transition-[translate,opacity]",
                    "[&_[data-previous]]:duration-[350ms,175ms]",
                    "[&_[data-previous]]:ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "data-[activation-direction~='left']:[&_[data-previous][data-ending-style]]:translate-x-1/2",
                    "data-[activation-direction~='left']:[&_[data-previous][data-ending-style]]:opacity-0",
                    "data-[activation-direction~='right']:[&_[data-previous][data-ending-style]]:-translate-x-1/2",
                    "data-[activation-direction~='right']:[&_[data-previous][data-ending-style]]:opacity-0"
                  )}
                >
                  {ann && (
                    <AnnotationPopoverContent
                      annotation={ann}
                      index={ALL_ANNOTATIONS.findIndex((a) => a.id === ann.id)}
                      total={ALL_ANNOTATIONS.length}
                      onPrev={prev}
                      onNext={next}
                      onClose={() => {
                        dotHandle.close();
                        setActiveId(null);
                      }}
                    />
                  )}
                </Popover.Viewport>

                <Popover.Arrow className="flex data-[side=bottom]:-top-2 data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:-bottom-2 data-[side=top]:rotate-180">
                  <ArrowSvg />
                </Popover.Arrow>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        )}
      </Popover.Root>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
 * VARIATION 2 — Sidebar list with dashed SVG line
 * ═══════════════════════════════════════════════════════════ */

const sidebarHandle = Popover.createHandle<Annotation>();

/* Resolves a bounding-box center in the coordinate space of a container */
function getRelativeCenter(el: Element, container: Element) {
  const elR = el.getBoundingClientRect();
  const cR = container.getBoundingClientRect();
  return {
    x: elR.left + elR.width / 2 - cR.left,
    y: elR.top + elR.height / 2 - cR.top,
  };
}

function Variation2() {
  const [activeId, setActiveId] = React.useState<number | null>(null);
  const activeIndex = ALL_ANNOTATIONS.findIndex((a) => a.id === activeId);
  const activeAnn = activeId !== null ? ALL_ANNOTATIONS.find((a) => a.id === activeId) : null;

  // Refs for SVG line drawing
  const layoutRef = React.useRef<HTMLDivElement>(null);
  const triggerRefs = React.useRef<Map<number, HTMLButtonElement>>(new Map());
  const imageRefs = React.useRef<Map<number, HTMLDivElement>>(new Map()); // card image containers

  const [line, setLine] = React.useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);

  React.useEffect(() => {
    if (!activeAnn || !layoutRef.current) {
      setLine(null);
      return;
    }
    const triggerEl = triggerRefs.current.get(activeAnn.id);
    const imageEl = imageRefs.current.get(activeAnn.cardIndex);
    if (!triggerEl || !imageEl) {
      setLine(null);
      return;
    }

    const container = layoutRef.current;
    const from = getRelativeCenter(triggerEl, container);
    const imgR = imageEl.getBoundingClientRect();
    const cR = container.getBoundingClientRect();
    // target point = annotation's x/y% within the image element
    const to = {
      x: imgR.left - cR.left + (activeAnn.x / 100) * imgR.width,
      y: imgR.top - cR.top + (activeAnn.y / 100) * imgR.height,
    };
    setLine({ x1: from.x, y1: from.y, x2: to.x, y2: to.y });
  }, [activeAnn]);

  function openById(id: number) {
    const ann = ALL_ANNOTATIONS.find((a) => a.id === id);
    if (!ann) return;
    setActiveId(id);
    sidebarHandle.open(ann.tid);
  }

  function prev() {
    const idx = (activeIndex - 1 + ALL_ANNOTATIONS.length) % ALL_ANNOTATIONS.length;
    openById(ALL_ANNOTATIONS[idx].id);
  }

  function next() {
    const idx = (activeIndex + 1) % ALL_ANNOTATIONS.length;
    openById(ALL_ANNOTATIONS[idx].id);
  }

  return (
    <div>
      <h2 className="mb-1 text-xl font-semibold">Variation 2 — Sidebar list</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Annotation labels in a fixed sidebar. Clicking one highlights the target on the image with an outline and a
        dashed SVG line.
      </p>

      {/* Relative container so SVG overlay can fill it */}
      <div ref={layoutRef} className="relative flex gap-6">
        {/* SVG overlay — sits on top of everything, pointer-events-none */}
        {line && (
          <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible" aria-hidden>
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              strokeLinecap="round"
              className="transition-all duration-200"
            />
            {/* dot at target */}
            <circle cx={line.x2} cy={line.y2} r="4" fill="hsl(var(--primary))" />
          </svg>
        )}

        {/* Sidebar */}
        <aside className="flex w-44 shrink-0 flex-col gap-0.5">
          <p className="mb-2 px-2 font-pixel text-[10px] text-muted-foreground">Annotations</p>
          {ALL_ANNOTATIONS.map((ann) => {
            const isActive = activeId === ann.id;
            return (
              <Popover.Trigger
                key={ann.tid}
                id={ann.tid}
                handle={sidebarHandle}
                payload={ann}
                nativeButton
                render={
                  <button
                    ref={(el) => {
                      if (el) triggerRefs.current.set(ann.id, el);
                      else triggerRefs.current.delete(ann.id);
                    }}
                    onClick={() => setActiveId(isActive ? null : ann.id)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors duration-100",
                      isActive
                        ? "bg-accent font-medium text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    )}
                  />
                }
              >
                <span
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold transition-colors",
                    isActive ? "bg-primary text-primary-foreground" : "bg-muted-foreground/20 text-muted-foreground"
                  )}
                >
                  {ann.id}
                </span>
                {ann.label}
              </Popover.Trigger>
            );
          })}
        </aside>

        {/* Image cards */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          {CARDS.map((card, ci) => {
            const isHighlighted = activeAnn?.cardIndex === ci;
            return (
              <Card key={card.src} variant="muted" size="sm">
                <div
                  ref={(el) => {
                    if (el) imageRefs.current.set(ci, el);
                    else imageRefs.current.delete(ci);
                  }}
                  className={cn(
                    "relative mx-3 mt-3 overflow-hidden rounded-lg transition-all duration-200",
                    isHighlighted && "z-10 outline-3 outline-offset-2 outline-primary"
                  )}
                >
                  <img src={card.src} alt={card.alt} className="w-full object-cover object-top" />
                </div>
                <p className="px-3 pt-2 pb-3 font-pixel text-[10px] text-muted-foreground">{card.caption}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Shared popover for sidebar triggers — opens to the right of sidebar items */}
      <Popover.Root
        handle={sidebarHandle}
        onOpenChange={(open) => {
          if (!open) setActiveId(null);
        }}
      >
        {({ payload: ann }) => (
          <Popover.Portal>
            <Popover.Positioner
              side="right"
              sideOffset={10}
              align="start"
              arrowPadding={12}
              className="isolate z-50 transition-[left,top] duration-200 ease-out"
            >
              <Popover.Popup
                className={cn(
                  "w-64 overflow-hidden rounded-xl bg-popover text-sm text-popover-foreground shadow-popover",
                  "origin-(--transform-origin)",
                  "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-99",
                  "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
                  "transition-[width,height] duration-200 ease-out"
                )}
              >
                <Popover.Viewport
                  className={cn(
                    "relative overflow-hidden",
                    "[&>[data-current]]:animate-in [&>[data-current]]:fade-in-0",
                    "[&[data-activation-direction~=down]>[data-current]]:slide-in-from-top-2",
                    "[&[data-activation-direction~=up]>[data-current]]:slide-in-from-bottom-2",
                    "[&>[data-previous]]:animate-out [&>[data-previous]]:fade-out-0",
                    "[&[data-activation-direction~=down]>[data-previous]]:slide-out-to-bottom-2",
                    "[&[data-activation-direction~=up]>[data-previous]]:slide-out-to-top-2"
                  )}
                >
                  {ann && (
                    <AnnotationPopoverContent
                      annotation={ann}
                      index={ALL_ANNOTATIONS.findIndex((a) => a.id === ann.id)}
                      total={ALL_ANNOTATIONS.length}
                      onPrev={prev}
                      onNext={next}
                      onClose={() => {
                        sidebarHandle.close();
                        setActiveId(null);
                      }}
                    />
                  )}
                </Popover.Viewport>

                <Popover.Arrow className="flex data-[side=bottom]:-top-2 data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:-bottom-2 data-[side=top]:rotate-180">
                  <ArrowSvg />
                </Popover.Arrow>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        )}
      </Popover.Root>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
 * Page
 * ═══════════════════════════════════════════════════════════ */
export default function DirectionD() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <div className="flex items-center gap-4 border-b border-border px-5 py-3">
        <Link href="/private/testing" className="font-pixel text-[11px] text-muted-foreground hover:text-foreground">
          ← directions
        </Link>
        <span className="text-sm font-semibold">Forge Editor</span>
        <Badge variant="default" className="ml-auto">
          Direction D · Diagram
        </Badge>
      </div>

      <div className="mx-auto max-w-4xl space-y-20 px-4 py-10">
        <header>
          <p className="mb-1 font-pixel text-[11px] text-muted-foreground">Everfi · 2022</p>
          <h1 className="text-3xl font-semibold tracking-tight">Forge Editor</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Two annotation layouts. Both use a single shared popover with animated content transitions.
          </p>
        </header>

        <Separator />
        <Variation1 />
        <Separator />
        <Variation2 />
      </div>
    </div>
  );
}
