"use client";

import { cn } from "@/lib/utils";
import { createContext, useContext, useId, useMemo } from "react";

type MarkNoteContextValue = {
  noteId: string;
};

const MarkNoteContext = createContext<MarkNoteContextValue | null>(null);

type MarkNoteProps = {
  note: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function MarkNote({ note, children, className }: MarkNoteProps) {
  const rawId = useId();
  const noteId = `mn-${rawId}`;
  const anchorName = `--${noteId}`;
  /** Deterministic pseudo-random from id (avoids SSR/client mismatch vs Math.random in effects). */
  const randomScale = useMemo(() => {
    const seed = rawId.replace(/[^a-z0-9]/gi, "");
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    return 5 + (h % 500) / 100;
  }, [rawId]);

  return (
    <MarkNoteContext.Provider value={{ noteId }}>
      <div className={cn("group/mark-note relative block", className)}>
        <div style={{ anchorName } as React.CSSProperties}>{children}</div>
        <svg
          viewBox="0 0 320 160"
          aria-hidden="true"
          className="mb-1 block h-8 flex-1 text-current lg:hidden"
          preserveAspectRatio="xMidYMin"
        >
          <line x1="0" y1="0.5" x2="1000" y2="0.5" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div
        style={
          {
            // left: "anchor(--article right)",
            top: `anchor(${anchorName} top)`,
            bottom: `anchor(${anchorName} bottom)`,
          } as React.CSSProperties
        }
        className={cn(
          "m-0 lg:absolute",
          "not-prose",
          "flex items-center gap-(--article-gap-x)",
          "translate-y-0 xl:-translate-x-(--article-gap-x)",
          "lg:left-[anchor(--article_right)]",
          "lg:w-[calc(var(--article-sidebar-width)+var(--article-gap-x))]"
          // "max-lg:top-[unset] max-lg:bottom-[unset] max-lg:left-[unset] max-lg:mx-auto max-lg:my-3 max-lg:block"
        )}
      >
        <svg
          aria-hidden="true"
          preserveAspectRatio="none"
          // preserveAspectRatio="xMidYMin meet"
          className={cn("w-(--article-gap-x) shrink-0 text-info-primary lg:h-full")}
          viewBox="0 0 384 100"
          vectorEffect="non-scaling-stroke"
        >
          <defs>
            <filter id={`noise-${noteId}`} filterUnits="userSpaceOnUse" height={"100%"}>
              <feTurbulence baseFrequency={randomScale / 10} />
              <feDisplacementMap in="SourceGraphic" scale={randomScale} />
            </filter>
          </defs>
          <g filter={`url(#noise-${noteId})`} className="max-lg:hidden" vectorEffect="non-scaling-stroke">
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="384"
              stroke="currentColor"
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
              strokeDashoffset=".5"
              style={{ strokeWidth: "2px" }}
            />
            <line
              x1="0"
              y1="49%"
              x2="100%"
              y2="49%"
              stroke="currentColor"
              // strokeWidth="2px"
              strokeDasharray="4 8"
              strokeDashoffset="6"
              vectorEffect="non-scaling-stroke"
              style={{ strokeWidth: "2px" }}
            />
          </g>
        </svg>

        <div role="note" id={noteId} className="font-pixel text-[11px]/4 text-balance text-info-foreground">
          {note}
        </div>
      </div>
    </MarkNoteContext.Provider>
  );
}

type MarkProps = {
  children: React.ReactNode;
  className?: string;
};

export function Mark({ children, className }: MarkProps) {
  const ctx = useContext(MarkNoteContext);

  return (
    <mark
      data-slot="mark"
      aria-describedby={ctx?.noteId}
      className={cn(
        "bg-transparent",
        "group-hover/mark-note:bg-info group-hover/mark-note:text-info-primary",
        "rounded-[0.2em] px-[0.1em]",
        "text-current underline decoration-wavy decoration-[.5px] underline-offset-4",
        className
      )}
    >
      {children}
    </mark>
  );
}
