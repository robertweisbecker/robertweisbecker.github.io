"use client";

/*─────────────────────────────────────────────────────────
 * DIRECTION C — Mosaic with Dialogs
 *
 * Layout: Explicit CSS grid areas — no auto-rows clashing with
 *         rowSpan. Images fill their cells. Labels sit *below*
 *         each tile as diagrammatic dotted-line callouts.
 * Interaction: Click a tile → Dialog opens with section narrative.
 *─────────────────────────────────────────────────────────*/

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent, DialogPopup, DialogHeader, DialogTitle, DialogDescription, DialogBody } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

/* ─── Types ─────────────────────────────────────────────── */
type Section = {
  id: string;
  tag: string;
  thumb: string;
  alt: string;
  headline: string;
  body: string;
  before?: string;
  after?: string;
  beforeLabel?: string;
  afterLabel?: string;
  images?: { src: string; caption?: string }[];
};

/* ─── Data ──────────────────────────────────────────────── */
const SECTIONS: Section[] = [
  {
    id: "color",
    tag: "01",
    thumb: "/assets/forge/colors-all.png",
    alt: "Color palette",
    headline: "Color system",
    body: "Forge's original styles had just five neutrals whose lightness topped out too quickly, making text unreadable after a few child views. The new palette spans 100–900, with each value in a similar lightness range as its siblings — so you can mix from different scales predictably and accessibly.",
    before: "/assets/forge/colors-neutral.png",
    after: "/assets/forge/colors-teal.png",
    beforeLabel: "Neutrals",
    afterLabel: "Primary",
  },
  {
    id: "modes",
    tag: "02",
    thumb: "/assets/forge/dark.png",
    alt: "Dark mode",
    headline: "Dark & light modes",
    body: "Both modes were treated as first-class. The expanded neutrals meant no cheating with opacity hacks — every surface, border, and text color was intentionally chosen from the same 12-step scales.",
    before: "/assets/forge/dark.png",
    after: "/assets/forge/light.png",
    beforeLabel: "Dark",
    afterLabel: "Light",
  },
  {
    id: "density",
    tag: "03",
    thumb: "/assets/forge/density-compare.png",
    alt: "Density comparison",
    headline: "Density",
    body: "A strict 4px spacing grid and dense type scale reduced the editor's vertical footprint by 60%. The preview panel can finally breathe, and the live preview no longer force-refreshes when editing opens.",
    before: "/assets/forge/density-inputs.png",
    after: "/assets/forge/density-compare.png",
    beforeLabel: "Inputs",
    afterLabel: "Full view",
  },
  {
    id: "components",
    tag: "04",
    thumb: "/assets/forge/buttons.png",
    alt: "Button variants",
    headline: "Components",
    body: "Every component rebuilt from scratch: token-driven sizing, consistent states, explicit focus rings. No more one-off overrides accumulating across releases.",
    images: [
      { src: "/assets/forge/buttons.png", caption: "Button variants across all states" },
      { src: "/assets/forge/fields.png", caption: "Redesigned input fields" },
      { src: "/assets/forge/dialogs.png", caption: "Standardized dialog anatomy" },
    ],
  },
  {
    id: "nav",
    tag: "05",
    thumb: "/assets/forge/nav.png",
    alt: "Toolbar",
    headline: "Navigation",
    body: "Page actions moved from a hidden context menu buried in list items to a dedicated dropdown on the parent view. Discovery improved significantly in follow-up usability sessions.",
  },
  {
    id: "icon",
    tag: "06",
    thumb: "/assets/forge/app-icon.png",
    alt: "App icon",
    headline: "App icon",
    body: "Separate icons for production and development builds use the new color palette. Small detail — big DX win when you Alt-Tab a hundred times per day.",
  },
];

const FORGE_IMAGE_SIZES: Record<string, { width: number; height: number }> = {
  "/assets/forge/buttons.png": { width: 2400, height: 1600 },
  "/assets/forge/colors-all.png": { width: 4590, height: 1600 },
  "/assets/forge/colors-neutral.png": { width: 1920, height: 1080 },
  "/assets/forge/colors-teal.png": { width: 1920, height: 1080 },
  "/assets/forge/dark.png": { width: 2883, height: 1803 },
  "/assets/forge/density-compare.png": { width: 2000, height: 2100 },
  "/assets/forge/density-inputs.png": { width: 1920, height: 1080 },
  "/assets/forge/dialogs.png": { width: 2400, height: 1350 },
  "/assets/forge/fields.png": { width: 2290, height: 1356 },
  "/assets/forge/light.png": { width: 2883, height: 1803 },
};

function forgeImageSize(src: string) {
  return FORGE_IMAGE_SIZES[src] ?? { width: 1920, height: 1080 };
}

/* ─── Before/After toggle ───────────────────────────────── */
function BeforeAfter({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [showing, setShowing] = React.useState<"before" | "after">("after");
  const [fading, setFading] = React.useState(false);
  const visibleSrc = showing === "before" ? before : after;
  const visibleSize = forgeImageSize(visibleSrc);

  function toggle(next: "before" | "after") {
    if (next === showing) return;
    setFading(true);
    setTimeout(() => {
      setShowing(next);
      setFading(false);
    }, 100);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1.5">
        {(["before", "after"] as const).map((s) => (
          <Button key={s} size="sm" variant={showing === s ? "default" : "outline"} onClick={() => toggle(s)}>
            {s === "before" ? beforeLabel : afterLabel}
          </Button>
        ))}
      </div>
      <div className="overflow-hidden rounded-xl border border-border">
        <Image
          src={visibleSrc}
          alt={showing === "before" ? beforeLabel : afterLabel}
          width={visibleSize.width}
          height={visibleSize.height}
          className={`h-auto w-full object-cover transition-opacity duration-150 ${fading ? "opacity-0" : "opacity-100"}`}
        />
      </div>
    </div>
  );
}

/* ─── Section dialog content ────────────────────────────── */
function SectionDialogContent({ section }: { section: Section }) {
  return (
    <>
      <DialogHeader>
        <div className="flex items-center gap-2">
          <Badge variant="default">{section.tag}</Badge>
          <DialogTitle>{section.headline}</DialogTitle>
        </div>
      </DialogHeader>
      <DialogBody>
        <DialogDescription className="text-sm leading-relaxed text-muted-foreground">{section.body}</DialogDescription>

        {section.before && section.after && (
          <>
            <Separator className="my-1" />
            <BeforeAfter before={section.before} after={section.after} beforeLabel={section.beforeLabel} afterLabel={section.afterLabel} />
          </>
        )}

        {section.images && (
          <>
            <Separator className="my-1" />

            {section.images.map((img) => {
              const size = forgeImageSize(img.src);
              return (
                <figure key={img.src} className="flex flex-col gap-1">
                  <Image
                    src={img.src}
                    alt={img.caption ?? ""}
                    width={size.width}
                    height={size.height}
                    className="h-auto w-full rounded-xl border border-border object-cover"
                  />
                  {img.caption && <figcaption className="text-xs text-muted-foreground">{img.caption}</figcaption>}
                </figure>
              );
            })}
          </>
        )}
      </DialogBody>
    </>
  );
}

/* ─── Diagram label — dotted line + circle callout ─────── */
function DiagramLabel({ tag, headline }: { tag: string; headline: string }) {
  return (
    <div className="pointer-events-none flex items-start gap-0 pt-1.5">
      {/* Vertical dotted stem */}
      <div className="flex flex-col items-center">
        <div className="h-3 w-px border-l border-dashed border-border" />
        <div className="h-1.5 w-1.5 rounded-full border border-border bg-background" />
      </div>
      <div className="ml-2 flex items-baseline gap-1.5">
        <span className="font-pixel text-[9px] text-muted-foreground tabular-nums">{tag}</span>
        <span className="text-xs font-medium text-foreground/80">{headline}</span>
      </div>
    </div>
  );
}

/* ─── Mosaic tile ───────────────────────────────────────── */
function MosaicTile({ section, onClick, className = "" }: { section: Section; onClick: () => void; className?: string }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <button
        type="button"
        onClick={onClick}
        className="group relative flex-1 overflow-hidden rounded-xl bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <Image
          src={section.thumb}
          alt={section.alt}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        {/* Hover scrim — via-smooth for feathered fade */}
        <div className="via-smooth pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        {/* Expand hint on hover */}
        <div className="absolute top-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/40 text-[10px] text-white opacity-0 backdrop-blur-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
          ↗
        </div>
      </button>
      {/* Diagram callout below the image */}
      <DiagramLabel tag={section.tag} headline={section.headline} />
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────── */
export default function DirectionC() {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const activeSection = SECTIONS.find((s) => s.id === activeId) ?? null;

  const open = (id: string) => setActiveId(id);
  const close = () => setActiveId(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <div className="flex items-center gap-4 border-b border-border px-5 py-3">
        <Link href="/private/testing" className="font-pixel text-[11px] text-muted-foreground hover:text-foreground">
          ← directions
        </Link>
        <span className="text-sm font-semibold">Forge Editor</span>
        <Badge variant="default" className="ml-auto">
          Direction C · Mosaic
        </Badge>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* Header */}
        <header className="mb-8">
          <p className="mb-1 font-pixel text-[11px] text-muted-foreground">Everfi · 2022</p>
          <h1 className="text-3xl font-semibold tracking-tight">Forge Editor</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Foundational refresh of Everfi&apos;s internal course builder. Click any tile to read more.
          </p>
        </header>

        {/*
          Explicit grid layout — two rows of different heights.
          Row 1: color (tall) | modes (short) / density (short) stacked
          Row 2: components (wide) | nav + icon stacked
        */}
        <div className="grid grid-cols-3 gap-3" style={{ gridTemplateRows: "280px 240px" }}>
          {/* [0] Color — spans 2 rows, 1 col */}
          <MosaicTile section={SECTIONS[0]} onClick={() => open(SECTIONS[0].id)} className="row-span-2" />

          {/* [1] Modes — row 1, col 2 */}
          <MosaicTile section={SECTIONS[1]} onClick={() => open(SECTIONS[1].id)} />

          {/* [2] Density — row 1, col 3 */}
          <MosaicTile section={SECTIONS[2]} onClick={() => open(SECTIONS[2].id)} />

          {/* [3] Components — row 2, cols 2-3 */}
          <MosaicTile section={SECTIONS[3]} onClick={() => open(SECTIONS[3].id)} className="col-span-2" />
        </div>

        {/* Second cluster: nav + icon */}
        <div className="mt-3 grid grid-cols-3 gap-3" style={{ gridTemplateRows: "220px" }}>
          <MosaicTile section={SECTIONS[4]} onClick={() => open(SECTIONS[4].id)} className="col-span-2" />
          <MosaicTile section={SECTIONS[5]} onClick={() => open(SECTIONS[5].id)} />
        </div>
      </div>

      <Dialog
        open={activeId !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) close();
        }}
      >
        <DialogContent>
          <DialogPopup showCloseButton className="sm:max-w-2xl">
            {activeSection && <SectionDialogContent section={activeSection} />}
          </DialogPopup>
        </DialogContent>
      </Dialog>
    </div>
  );
}
