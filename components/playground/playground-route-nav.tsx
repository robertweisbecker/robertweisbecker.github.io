"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { getPlaygroundRouteIcon } from "@/components/playground/playground-route-icons";
import { playgroundRoutes } from "@/lib/data/playground";
import { LinkButton } from "@/components/ui/link-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { IconChevronLeft } from "@tabler/icons-react";
import { Separator } from "../ui/separator";

type PlaygroundRouteNavProps = {
  className?: string;
  hideOnRoot?: boolean;
  size?: "xs" | "sm" | "md";
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
    <div ref={rootRef} className={cn("mx-auto flex w-full max-w-7xl items-center gap-5", className)}>
      <LinkButton href="/playground" variant="secondary" size="icon" rounded>
        <IconChevronLeft className="-ms-0.5 size-5" strokeWidth={2} />
      </LinkButton>
      <Separator orientation="vertical" className="h-button-xs" />
      <ScrollArea orientation="horizontal" scrollFade className="w-full" contentClass="min-w-full py-2 overflow-y-clip px-px">
        <nav aria-label="Playground sections" className="flex w-max min-w-full items-center gap-3">
          {playgroundRoutes.map((route) => {
            const isCurrent = pathname === route.href;
            const RouteIcon = getPlaygroundRouteIcon(route.slug);

            return (
              <LinkButton
                key={route.href}
                href={route.href}
                variant={isCurrent ? "default" : "ghost"}
                size={size}
                rounded
                aria-current={isCurrent ? "page" : undefined}
              >
                <RouteIcon className="size-4" />
                {route.label}
              </LinkButton>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}
