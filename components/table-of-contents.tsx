"use client";

import type { TocItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import * as React from "react";
import { ScrollArea } from "./ui/scroll-area";

export type TableOfContentsMaxDepth = 2 | 3 | 4 | 5 | 6;

const titleScrollThreshold = 200;

function useScrolledPast(enabled: boolean, threshold = titleScrollThreshold) {
  const [isScrolledPast, setIsScrolledPast] = React.useState(false);

  React.useEffect(() => {
    if (!enabled) {
      setIsScrolledPast(false);
      return;
    }

    let frame = 0;
    const updateScrolledPast = () => {
      setIsScrolledPast(window.scrollY >= threshold);
    };
    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateScrolledPast);
    };

    updateScrolledPast();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [enabled, threshold]);

  return isScrolledPast;
}

function useActiveItem(ids: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const headings = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    if (!headings.length) {
      setActiveId(null);
      return;
    }

    let frame = 0;
    const updateActiveItem = () => {
      const viewportHeight = window.innerHeight;
      const activationLine = viewportHeight / 2;
      let nextActiveId: string | null = null;

      for (const heading of headings) {
        const rect = heading.getBoundingClientRect();

        if (rect.top <= activationLine) {
          nextActiveId = heading.id;
        }
      }

      setActiveId(nextActiveId);
    };
    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveItem);
    };

    updateActiveItem();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [ids]);

  return activeId;
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
  const activeId = useActiveItem(ids);
  const isTitleVisible = useScrolledPast(Boolean(title));

  if (!visibleToc.length) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "grid h-full max-h-[calc(100vh-4rem)] w-full grid-rows-[auto_1fr_auto] justify-items-start gap-2 py-4 text-xs",
        "[--inset:--spacing(3)]",
        className
      )}
    >
      {title && (
        <p
          className="data-visible:blur-0 -translate-y-1.5 transform pt-3 pb-1.5 text-sm font-medium opacity-0 blur-xs transition-[transform,opacity,translate,filter] duration-400 ease-out data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100 data-[visible=true]:blur-none"
          data-visible={isTitleVisible}
          data-slot="title"
        >
          <a href={"#"} data-active={activeId === ""}>
            {title}
          </a>
        </p>
      )}
      <ScrollArea scrollFade scrollbarGutter>
        <ul
          className={cn(
            "group relative text-[0.8125rem]/5",
            isTitleVisible && "opacity-72",
            // "before:absolute before:inset-s-0 before:top-1.5 before:bottom-1.5 before:w-px before:bg-border",
            className
          )}
        >
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
                // "before:absolute before:-inset-s-px before:top-0 before:bottom-[50%] before:w-0.5 before:rounded-e has-data-[active=true]:before:bg-primary"
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
                  // "data-active:border-input",
                  "text-muted-foreground hover:text-accent-foreground",
                  "pl-(--depth-inset)",
                  "data-[active=true]:font-[450] data-[active=true]:tracking-[-0.0025em] data-[active=true]:text-foreground",
                  item.depth > 2 && ["text-[round(calc(1em-.05em*(var(--depth))),1px)]"],
                  item.depth > 1 && [
                    // "data-active:border-transparent!",
                    "before:rounded-es-0 before:absolute before:top-0 before:left-0 before:h-[calc(50%+1px)] before:w-[calc(var(--depth-inset)/1.5)] before:border-s before:border-b before:border-transparent",
                    "hover:before:border-b-border data-active:before:border-border",
                    // "data-active:border-border",
                    // "after:absolute after:top-[calc(var(--inset)/1)] after:bottom-0 after:left-0 after:w-px after:rounded-t data-active:after:bg-border",
                    // "after:mask-l-from-[calc(100%-1px)] after:mask-l-to-[1px]",
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
