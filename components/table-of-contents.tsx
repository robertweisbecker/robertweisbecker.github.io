"use client";

import type { TocItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { IconArrowNarrowUpDashed } from "@tabler/icons-react";
import * as React from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

function useActiveItem(ids: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries.find((entry) => entry.isIntersecting);
        if (first) {
          setActiveId(first.target.id);
        }
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

export function TableOfContents({ toc, title, className }: { toc: TocItem[]; title?: string; className?: string }) {
  const ids = React.useMemo(() => toc.map((item) => item.id), [toc]);
  const activeId = useActiveItem(ids);

  if (!toc.length) return null;

  return (
    <nav
      className={cn(
        "my-4 grid h-full max-h-[calc(100vh-4rem)] w-full grid-rows-[auto_1fr_auto] justify-items-start gap-4 text-xs",
        "[--inset:--spacing(3)]",
        className
      )}
    >
      <ScrollArea scrollFade scrollbarGutter>
        <ul
          className={cn(
            "group relative text-[0.8125rem]/5",
            // "before:absolute before:inset-s-0 before:top-1.5 before:bottom-1.5 before:w-px before:bg-border",
            className
          )}
        >
          {title && (
            <li
              className="ease -translate-y-0.5 transform truncate pt-2 pb-1 text-xs opacity-0 transition-[translate,transform,opacity] delay-400 duration-200 @stuck-top:translate-y-0 @stuck-top:opacity-100"
              data-slot="title"
            >
              <a href={"#"} data-active={activeId === ""}>
                {title}
              </a>
            </li>
          )}
          {toc.map((item) => (
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
                // "before:absolute before:inset-y-1.5 before:-inset-s-px before:w-0.5 before:rounded-e has-data-[active=true]:before:bg-primary",
                "group-has-data-active:[&>a]:not-data-active:border-border peer-has-data-active:[&>a]:border-transparent"
              )}
            >
              <a
                href={`#${item.id}`}
                data-active={item.id === activeId}
                data-depth={item.depth}
                className={cn(
                  "block w-full border-l border-transparent py-[round(calc(var(--inset)/3),2px)]",
                  // "data-active:border-input",
                  "text-muted-foreground hover:text-accent-foreground",
                  "pl-(--depth-inset)",
                  "data-[active=true]:font-[450] data-[active=true]:tracking-[-0.0025em] data-[active=true]:text-foreground",
                  item.depth > 2 && ["text-[round(calc(1em-.05em*(var(--depth))),1px)]"],
                  item.depth > 1 && [
                    // "data-active:border-transparent!",
                    "before:rounded-es-0 before:absolute before:top-0 before:left-0 before:h-1/2 before:w-[calc(var(--depth-inset)/1.5)] before:border-b before:border-l before:border-transparent",
                    "data-active:before:border-input",
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
