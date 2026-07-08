"use client";

import type { TocItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useWindowScroll, useWindowSize } from "@uidotdev/usehooks";
import * as React from "react";
import { ScrollArea } from "./ui/scroll-area";

export type TableOfContentsMaxDepth = 2 | 3 | 4 | 5 | 6;

const titleScrollThreshold = 200;

function getActiveItem(headings: HTMLElement[], viewportHeight: number | null) {
  if (!viewportHeight || !headings.length) return null;
  const activationLine = viewportHeight / 2;
  let nextActiveId: string | null = null;

  for (const heading of headings) {
    const rect = heading.getBoundingClientRect();

    if (rect.top <= activationLine) {
      nextActiveId = heading.id;
    }
  }

  return nextActiveId;
}

function getHeadingElements(ids: string[]) {
  return ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
}

export type TableOfContentsProps = {
  toc: TocItem[];
  title?: string;
  className?: string;
  maxDepth?: TableOfContentsMaxDepth;
};

export function TableOfContents({ toc, title, className, maxDepth = 6 }: TableOfContentsProps) {
  const visibleToc = React.useMemo(() => toc.filter((item) => item.depth <= maxDepth), [toc, maxDepth]);
  const ids = React.useMemo(() => visibleToc.map((item) => item.id), [visibleToc]);
  const headingsRef = React.useRef<HTMLElement[]>([]);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [{ y: scrollY }] = useWindowScroll();
  const { height: viewportHeight } = useWindowSize();
  const scrollPosition = scrollY ?? 0;
  const isTitleVisible = Boolean(title) && (scrollY ?? 0) >= titleScrollThreshold;

  React.useEffect(() => {
    headingsRef.current = getHeadingElements(ids);
  }, [ids]);

  React.useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const nextActiveId = getActiveItem(headingsRef.current, viewportHeight);
      setActiveId((currentActiveId) => (currentActiveId === nextActiveId ? currentActiveId : nextActiveId));
    });

    return () => window.cancelAnimationFrame(frame);
  }, [ids, scrollPosition, viewportHeight]);

  if (!visibleToc.length) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "grid h-full max-h-[calc(100vh-4rem)] w-full grid-rows-[auto_1fr_auto] justify-items-start gap-4 text-xs",
        "[--inset:--spacing(3)]",
        className
      )}
    >
      {title && (
        <p
          className="data-visible:blur-0 -translate-y-1.5 transform text-xs font-medium opacity-0 blur-xs transition-[transform,opacity,translate,filter] duration-400 ease-out data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100 data-[visible=true]:blur-none"
          data-visible={isTitleVisible}
          data-slot="title"
        >
          <a href={"#"} data-active={activeId === ""}>
            {title}
          </a>
        </p>
      )}
      <ScrollArea scrollFade scrollbarGutter>
        <ul className={cn("group relative", isTitleVisible && "opacity-72")}>
          {visibleToc.map((item, index) => (
            <li
              key={item.id}
              data-depth={item.depth}
              style={
                {
                  "--depth": item.depth - 1,
                  "--depth-inset": "calc(var(--depth)*var(--inset))",
                } as React.CSSProperties
              }
              className={cn(
                "peer relative first:[&>a]:-mt-1.5",
                "group-hover:opacity-64 hover:opacity-100",
                "group-has-data-active:[&>a]:not-data-active:border-border peer-has-data-active:[&>a]:border-transparent",
                index === 0 && !isTitleVisible && "[&>a]:border-s-transparent! [&>a]:before:border-s-transparent!"
              )}
            >
              <a
                href={`#${item.id}`}
                data-active={item.id === activeId}
                data-depth={item.depth}
                className={cn(
                  "block w-full border-s border-transparent py-[round(calc(var(--inset)/3),2px)]",
                  "text-muted-foreground hover:text-accent-foreground",
                  "pl-(--depth-inset)",
                  "data-[active=true]:font-[450] data-[active=true]:tracking-[-0.0025em] data-[active=true]:text-foreground",
                  item.depth > 2 && ["text-[round(calc(1em-.05em*(var(--depth))),1px)]"],
                  item.depth > 1 && [
                    "before:rounded-es-0 before:absolute before:top-0 before:left-0 before:h-[calc(50%+1px)] before:w-[calc(var(--depth-inset)/1.5)] before:border-s before:border-b before:border-transparent",
                    "hover:before:border-b-border data-active:before:border-border",
                  ]
                )}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </nav>
  );
}
