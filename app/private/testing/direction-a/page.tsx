"use client";

/*─────────────────────────────────────────────────────────
 * DIRECTION A — Bento Annotated
 *
 * Layout: Asymmetric bento grid, images as primary content.
 * Interaction: Hover/focus reveals floating annotation overlays.
 * Motion storyboard:
 *   0ms    — page load, grid cells are invisible (opacity 0, y +24px)
 *  100ms   — cells stagger in (80ms apart) via scroll-driven @starting-style
 * Hover   — annotation fades in (opacity 0→1, y +4→0, 150ms ease-out)
 *─────────────────────────────────────────────────────────*/

import * as React from "react";
import Link from "next/link";

/* ─── Annotation component ─────────────────────────────── */
function Annotation({
  children,
  position = "bottom-left",
  label,
}: {
  children: React.ReactNode;
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  label?: string;
}) {
  const posClasses = {
    "bottom-left": "bottom-3 left-3",
    "bottom-right": "bottom-3 right-3",
    "top-left": "top-3 left-3",
    "top-right": "top-3 right-3",
  }[position];

  return (
    <div
      className={`pointer-events-none absolute ${posClasses} max-w-[220px] rounded-lg bg-black/80 px-3 py-2 text-xs text-white/90 opacity-0 backdrop-blur-sm transition-[opacity,transform] duration-150 ease-out group-hover:opacity-100 group-focus-within:opacity-100 [transform:translateY(4px)] group-hover:[transform:translateY(0)] group-focus-within:[transform:translateY(0)]`}
    >
      {label && <div className="mb-1 font-pixel text-[10px] text-white/50">{label}</div>}
      {children}
    </div>
  );
}

/* ─── Bento cell ────────────────────────────────────────── */
function BentoCell({
  src,
  alt,
  annotation,
  annotationLabel,
  annotationPos,
  className = "",
  style,
}: {
  src: string;
  alt: string;
  annotation: string;
  annotationLabel?: string;
  annotationPos?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-muted ${className}`}
      tabIndex={0}
      style={style}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        loading="lazy"
      />
      <Annotation position={annotationPos} label={annotationLabel}>
        {annotation}
      </Annotation>
      {/* Subtle gradient scrim so annotation reads over any image */}
      <div className="via-smooth pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100" />
    </div>
  );
}

/* ─── Stat pill ─────────────────────────────────────────── */
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-pixel text-[10px] uppercase text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────── */
export default function DirectionA() {
  return (
    <div className="min-h-screen bg-background">
      {/* Back nav */}
      <div className="px-6 pt-6">
        <Link
          href="/private/testing"
          className="font-pixel text-[11px] text-muted-foreground hover:text-foreground"
        >
          ← directions
        </Link>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Header */}
        <header className="mb-10">
          <p className="mb-1 font-pixel text-[11px] text-muted-foreground">Everfi · 2022 · Design Systems Lead</p>
          <h1 className="mb-3 text-4xl font-semibold tracking-tight">Forge Editor</h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Foundational refresh of Everfi's internal learning-content creation & management app.
          </p>
          <div className="mt-5 flex flex-wrap gap-6 border-t border-border pt-5">
            <Stat label="Role" value="Design Systems Lead" />
            <Stat label="Year" value="2022" />
            <Stat label="Type" value="Tooling · Electron App" />
          </div>
        </header>

        {/* Bento grid — hover each cell for annotation */}
        <p className="mb-3 font-pixel text-[10px] text-muted-foreground">Hover images for notes ↓</p>

        {/* Row 1 — 2 cols */}
        <div className="mb-3 grid grid-cols-2 gap-3">
          <BentoCell
            src="/assets/forge/dark.png"
            alt="Forge dark mode"
            annotation="Dark mode was a Day 1 requirement. The expanded neutral scale lets surfaces stack visually without relying on borders."
            annotationLabel="01 · Color"
            annotationPos="bottom-left"
            className="aspect-video"
          />
          <BentoCell
            src="/assets/forge/light.png"
            alt="Forge light mode"
            annotation="Light mode uses a warm neutral base that feels intentional, not washed-out — a common trap with auto-generated themes."
            annotationLabel="01 · Color"
            annotationPos="bottom-right"
            className="aspect-video"
          />
        </div>

        {/* Row 2 — 3 cols, mixed heights */}
        <div className="mb-3 grid grid-cols-3 gap-3">
          <BentoCell
            src="/assets/forge/colors-all.png"
            alt="Full color palette"
            annotation="12-step scales from 100–900 for every palette. Each step shares a lightness range with its siblings — mix confidently."
            annotationLabel="02 · Palette"
            className="col-span-1 row-span-1 aspect-square"
          />
          <BentoCell
            src="/assets/forge/buttons.png"
            alt="Button variants"
            annotation="Buttons before vs after. Consistent radius, weight, and state coloring across all variants using semantic tokens."
            annotationLabel="03 · Components"
            annotationPos="bottom-right"
            className="col-span-2 aspect-video"
          />
        </div>

        {/* Row 3 — wide + narrow */}
        <div className="mb-3 grid grid-cols-3 gap-3">
          <BentoCell
            src="/assets/forge/density-compare.png"
            alt="Density comparison"
            annotation="60% shorter with the new density system. Dense type and 4px grid spacing lets the preview panel breathe."
            annotationLabel="04 · Density"
            className="col-span-2 aspect-video"
          />
          <BentoCell
            src="/assets/forge/app-icon.png"
            alt="App icon"
            annotation="Separate icons for production and dev builds — small detail, big DX win when you Alt-Tab a hundred times a day."
            annotationLabel="05 · Icon"
            className="col-span-1 aspect-square object-contain"
          />
        </div>

        {/* Row 4 — 3 equal */}
        <div className="mb-3 grid grid-cols-3 gap-3">
          <BentoCell
            src="/assets/forge/fields.png"
            alt="Input fields"
            annotation="Dense inputs: reduced vertical padding, 13px text, and explicit focus rings that don't shift layout."
            annotationLabel="06 · Inputs"
            className="aspect-video"
          />
          <BentoCell
            src="/assets/forge/nav.png"
            alt="Toolbar / nav"
            annotation="Toolbar actions surfaced from a hidden context menu. Discoverability jumped measurably in usability testing."
            annotationLabel="07 · Navigation"
            className="aspect-video"
          />
          <BentoCell
            src="/assets/forge/dialogs.png"
            alt="Dialogs"
            annotation="Standardized dialog anatomy: single close target, clear action hierarchy, no competing CTAs."
            annotationLabel="08 · Dialogs"
            className="aspect-video"
          />
        </div>

        {/* Footer metadata */}
        <footer className="mt-12 border-t border-border pt-6 font-pixel text-[11px] text-muted-foreground">
          <div className="flex gap-6">
            <span>Kevin Grolton-Francisco · PM</span>
            <span>Annie Alvarado · Research</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
