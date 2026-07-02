"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { playgroundRoutes } from "@/lib/data/playground";
import { LinkButton } from "@/components/ui/link-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type PlaygroundRouteNavProps = {
  className?: string;
  hideOnRoot?: boolean;
  size?: "sm" | "md";
};

export function PlaygroundRouteNav({ className, hideOnRoot = false, size = "sm" }: PlaygroundRouteNavProps) {
  const pathname = usePathname();
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const activeLink = rootRef.current?.querySelector<HTMLElement>('[aria-current="page"]');

    activeLink?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [pathname]);

  if (hideOnRoot && pathname === "/playground") {
    return null;
  }

  return (
    <div ref={rootRef} className={cn("mx-auto w-full max-w-7xl", className)}>
      <ScrollArea orientation="horizontal" scrollFade className="w-full" contentClass="min-w-full">
        <nav aria-label="Playground sections" className="flex w-max min-w-full items-center gap-3 py-px">
          {playgroundRoutes.map((route) => {
            const isCurrent = pathname === route.href;

            return (
              <LinkButton
                key={route.href}
                href={route.href}
                variant={isCurrent ? "secondary" : "outline"}
                size={size}
                rounded
                aria-current={isCurrent ? "page" : undefined}
              >
                {route.label}
              </LinkButton>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}
