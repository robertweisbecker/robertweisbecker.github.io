"use client";

/*─────────────────────────────────────────────────────────
 * DIRECTION B — Film Strip / Gallery
 *
 * Layout: Normal scroll (no snap). Fixed left sidebar with chapter
 *         nav updates via IntersectionObserver on the scroll container.
 *
 * Per-chapter:
 *   - Hero image fills the left pane; Prev/Next overlay buttons
 *     on the image edges navigate slides.
 *   - Sidebar: summary + filmstrip thumbnails.
 *   - When on the LAST slide, a floating ↓ button appears in the
 *     bottom-right of the hero, scrolling to the next chapter.
 *
 * Motion storyboard:
 *   hero swap   — opacity 0→1 cross-fade (120ms fade out, swap src, 200ms fade in)
 *   next-chapter button — fades in when atLastSlide (opacity, 200ms)
 *   caption     — fades with hero via same transition
 *─────────────────────────────────────────────────────────*/

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IconChevronLeft, IconChevronRight, IconChevronDown } from "@tabler/icons-react";

/* ─── Data ──────────────────────────────────────────────── */
type Slide = { src: string; alt: string; caption: string };
type Chapter = { id: string; label: string; summary: string; slides: Slide[] };

const CHAPTERS: Chapter[] = [
  {
    id: "overview",
    label: "Overview",
    summary:
      "Forge is Everfi's internal Electron app for building interactive e-learning products. After years of rapid iteration, rough edges had accumulated. This refresh rebuilt the foundations.",
    slides: [
      { src: "/assets/forge/dark.png", alt: "Forge dark mode", caption: "After — dark mode" },
      { src: "/assets/forge/light.png", alt: "Forge light mode", caption: "After — light mode" },
    ],
  },
  {
    id: "color",
    label: "Color System",
    summary:
      "The original palette had only five neutrals that topped out too quickly. The new 12-step scales (100–900) keep each value in a consistent lightness range, making cross-scale mixing predictable and accessible.",
    slides: [
      { src: "/assets/forge/colors-all.png", alt: "Full palette", caption: "All palettes, 100–900" },
      { src: "/assets/forge/colors-neutral.png", alt: "Neutral ramp", caption: "Neutrals — before & after" },
      { src: "/assets/forge/colors-teal.png", alt: "Primary ramp", caption: "Primary — before & after" },
      { src: "/assets/forge/button-modes.png", alt: "Button modes", caption: "Buttons across color modes" },
    ],
  },
  {
    id: "density",
    label: "Density",
    summary:
      "A strict 4px grid and dense type scale cut the editor's vertical footprint by 60%. The live preview no longer resizes and force-refreshes when an edit panel opens.",
    slides: [
      { src: "/assets/forge/density-compare.png", alt: "60% shorter", caption: "60% shorter" },
      { src: "/assets/forge/density-inputs.png", alt: "Dense inputs", caption: "Dense inputs in context" },
    ],
  },
  {
    id: "components",
    label: "Components",
    summary:
      "Every component rebuilt from scratch: token-driven sizing, consistent states, explicit focus rings. No more one-off overrides. Buttons, fields, dialogs, and the toolbar all share the same design language.",
    slides: [
      { src: "/assets/forge/buttons.png", alt: "Buttons", caption: "Button variants" },
      { src: "/assets/forge/fields.png", alt: "Fields", caption: "Redesigned input fields" },
      { src: "/assets/forge/dialogs.png", alt: "Dialogs", caption: "Standardized dialogs" },
      { src: "/assets/forge/nav.png", alt: "Toolbar", caption: "Surfaced toolbar actions" },
    ],
  },
  {
    id: "navigation",
    label: "Navigation",
    summary:
      "Page actions moved out of a hidden context menu into a dedicated dropdown at the parent level. Editing and preview no longer compete for the same pane — context is preserved.",
    slides: [
      { src: "/assets/forge/course-edit-after.png", alt: "After", caption: "After — dedicated edit pane" },
      { src: "/assets/forge/course-edit-before.png", alt: "Before", caption: "Before — edit opened adjacent" },
      { src: "/assets/forge/activity-edit.png", alt: "Activity edit", caption: "Activity edit view" },
    ],
  },
];

/* ─── Chapter section ───────────────────────────────────── */
function ChapterSection({
  chapter,
  index,
  total,
  nextChapterId,
}: {
  chapter: Chapter;
  index: number;
  total: number;
  nextChapterId: string | null;
}) {
  const [slideIndex, setSlideIndex] = React.useState(0);
  const [displaySlide, setDisplaySlide] = React.useState(chapter.slides[0]);
  const [fading, setFading] = React.useState(false);

  const atFirst = slideIndex === 0;
  const atLast = slideIndex === chapter.slides.length - 1;

  function goTo(idx: number) {
    if (idx === slideIndex) return;
    const slide = chapter.slides[idx];
    if (!slide) return;
    setFading(true);
    setTimeout(() => {
      setDisplaySlide(slide);
      setSlideIndex(idx);
      setFading(false);
    }, 120);
  }

  function scrollToNext() {
    if (!nextChapterId) return;
    document.getElementById(`chapter-${nextChapterId}`)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id={`chapter-${chapter.id}`} className="flex h-svh flex-col">
      {/* Chapter header bar */}
      <div className="flex shrink-0 items-center gap-3 border-b border-border px-5 py-3">
        <span className="font-pixel text-[11px] text-muted-foreground tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <Separator orientation="vertical" className="h-3" />
        <h2 className="text-sm font-semibold">{chapter.label}</h2>
        <span className="ml-auto font-pixel text-[10px] text-muted-foreground">
          {slideIndex + 1} / {chapter.slides.length}
        </span>
      </div>

      {/* Main body */}
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* ── Hero ── */}
        <div className="group/hero relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-black/95">
          <img
            src={displaySlide.src}
            alt={displaySlide.alt}
            className={`h-full w-full object-contain transition-opacity duration-200 ${fading ? "opacity-0" : "opacity-100"}`}
          />

          {/* Caption bar */}
          <div className="via-smooth pointer-events-none absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/60 to-transparent px-4 pt-10 pb-4">
            <p
              className={`text-xs text-white/80 transition-opacity duration-200 ${fading ? "opacity-0" : "opacity-100"}`}
            >
              {displaySlide.caption}
            </p>
          </div>

          {/* Prev button — left edge of hero */}
          <Button
            variant="overlay"
            size="icon-sm"
            rounded
            onClick={() => goTo(slideIndex - 1)}
            disabled={atFirst}
            aria-label="Previous image"
            className="absolute top-1/2 left-3 -translate-y-1/2 opacity-0 transition-opacity duration-150 group-hover/hero:opacity-100 disabled:pointer-events-none disabled:opacity-0"
          >
            <IconChevronLeft />
          </Button>

          {/* Next button — right edge of hero */}
          <Button
            variant="overlay"
            size="icon-sm"
            rounded
            onClick={() => goTo(slideIndex + 1)}
            disabled={atLast}
            aria-label="Next image"
            className="absolute top-1/2 right-3 -translate-y-1/2 opacity-0 transition-opacity duration-150 group-hover/hero:opacity-100 disabled:pointer-events-none disabled:opacity-0"
          >
            <IconChevronRight />
          </Button>

          {/* Next chapter button — appears at last slide, bottom-right of hero */}
          {nextChapterId && (
            <Button
              variant="overlay"
              size="icon-sm"
              rounded
              onClick={scrollToNext}
              aria-label="Next chapter"
              className={`absolute right-3 bottom-10 transition-[opacity,transform] duration-200 ${
                atLast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
              }`}
            >
              <IconChevronDown />
            </Button>
          )}
        </div>

        {/* ── Sidebar ── */}
        <div className="flex w-full shrink-0 flex-col gap-4 border-t border-border bg-card p-4 lg:w-72 lg:border-t-0 lg:border-l">
          <p className="text-sm leading-relaxed text-muted-foreground">{chapter.summary}</p>

          <Separator />

          {/* Filmstrip */}
          <div className="flex flex-col gap-2">
            <p className="font-pixel text-[10px] text-muted-foreground">
              {chapter.slides.length} {chapter.slides.length === 1 ? "image" : "images"}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {chapter.slides.map((slide, i) => (
                <button
                  key={slide.src}
                  onClick={() => goTo(i)}
                  aria-label={slide.caption}
                  className={`relative overflow-hidden rounded-lg border-2 transition-all duration-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                    i === slideIndex ? "border-primary" : "border-transparent opacity-55 hover:opacity-90"
                  }`}
                  style={{ aspectRatio: "16/9" }}
                >
                  <img src={slide.src} alt={slide.alt} className="h-full w-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Sidebar chapter nav ───────────────────────────────── */
function ChapterNav({ chapters, activeId }: { chapters: Chapter[]; activeId: string }) {
  return (
    <nav className="fixed top-0 left-0 z-20 hidden h-full w-48 flex-col justify-center gap-0.5 border-r border-border bg-background/80 px-3 backdrop-blur-sm xl:flex">
      <p className="mb-3 px-2 font-pixel text-[10px] text-muted-foreground">Forge Editor</p>
      {chapters.map((ch, i) => {
        const isActive = ch.id === activeId;
        return (
          <a
            key={ch.id}
            href={`#chapter-${ch.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(`chapter-${ch.id}`)?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors duration-100 ${
              isActive
                ? "bg-accent font-medium text-accent-foreground"
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            }`}
          >
            <span
              className={`h-1 w-1 shrink-0 rounded-full transition-colors duration-150 ${
                isActive ? "bg-primary" : "bg-border"
              }`}
            />
            <span className="font-pixel text-[11px]">{String(i + 1).padStart(2, "0")}</span>
            {ch.label}
          </a>
        );
      })}
    </nav>
  );
}

/* ─── Page ──────────────────────────────────────────────── */
export default function DirectionB() {
  const [activeId, setActiveId] = React.useState(CHAPTERS[0].id);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Track active chapter with IntersectionObserver rooted to the scroll container
  React.useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const sections = CHAPTERS.map((ch) => root.querySelector<HTMLElement>(`#chapter-${ch.id}`));
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry that's most visible
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) {
          setActiveId(best.target.id.replace("chapter-", ""));
        }
      },
      { root, threshold: 0.4 }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background">
      {/* Fixed top bar */}
      <div className="fixed top-10 right-0 left-0 isolate z-1000 flex h-10 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-sm xl:ps-52">
        <Link href="/private/testing" className="font-pixel text-[11px] text-muted-foreground hover:text-foreground">
          ← directions
        </Link>
        <Separator orientation="vertical" className="h-3" />
        <span className="text-sm font-semibold">Forge Editor</span>
        <Badge variant="default" className="ml-auto">
          Direction B · Film Strip
        </Badge>
      </div>

      <ChapterNav chapters={CHAPTERS} activeId={activeId} />

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="ms-0 mt-10 h-[calc(100svh-2.5rem)] overflow-y-auto xl:ms-48"
        style={{ scrollbarWidth: "none" }}
      >
        {CHAPTERS.map((ch, i) => (
          <ChapterSection
            key={ch.id}
            chapter={ch}
            index={i}
            total={CHAPTERS.length}
            nextChapterId={CHAPTERS[i + 1]?.id ?? null}
          />
        ))}

        <div className="flex h-20 items-center justify-center border-t border-border">
          <p className="font-pixel text-[11px] text-muted-foreground">End of project</p>
        </div>
      </div>

      {/* Mobile chapter dots */}
      <div className="fixed bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-1.5 xl:hidden">
        {CHAPTERS.map((ch) => (
          <button
            key={ch.id}
            aria-label={ch.label}
            onClick={() => document.getElementById(`chapter-${ch.id}`)?.scrollIntoView({ behavior: "smooth" })}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              ch.id === activeId ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
