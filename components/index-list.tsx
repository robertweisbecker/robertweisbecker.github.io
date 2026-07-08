"use client";

import { AnimateHeight } from "@/components/animation/animate-height";
import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle } from "@/components/ui/item";
import { projects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";
import { LazyMotion, domMax, m } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { TreeIconFile } from "./icons-tree";
import { PixelMorph } from "./pixel-morph";
import { MotionText } from "./animation/MotionText";

export type IndexListItem = {
  id: string | number;
  title: string;
  description?: string;
  date?: string;
  path: string;
  /** String renders as <img> src. ReactNode renders as-is (e.g. an icon component). */
  icon?: string | React.ReactNode;
  /** Optional content rendered in the trailing actions slot (e.g. a Badge). */
  tags?: React.ReactNode;
  /** Valid title transition name from pageTitleTransitionName. Defaults to the project path. */
  viewTransitionName?: string;
  transitionTypes?: string[];
  /** Whether the item is published. Defaults to true. */
  published?: boolean;
};

export type IndexListProps = {
  items?: IndexListItem[];
  className?: string;
  itemClassName?: string;
  transitionTypes?: string[];
  /** Collapses the list after this many fully visible items. `true` uses 5. */
  maxVisibleItems?: number | true;
};

function renderMedia(icon: IndexListItem["icon"]) {
  if (typeof icon === "string") {
    return (
      <ItemMedia variant="image">
        <Image src={icon} alt="" width={40} height={40} className="object-scale-down!" />
      </ItemMedia>
    );
  }
  if (icon) {
    return <ItemMedia variant="image">{icon}</ItemMedia>;
  }
  return (
    <ItemMedia variant="image">
      <TreeIconFile className="text-muted-foreground" />
    </ItemMedia>
  );
}

const defaultItems: IndexListItem[] = projects.map((p) => ({
  id: p.id,
  title: p.title,
  description: p.description,
  date: p.date,
  path: p.path,
  icon: p.icon,
  published: p.published,
}));

export function IndexList({ items = defaultItems, className, itemClassName, transitionTypes, maxVisibleItems }: IndexListProps) {
  const filteredItems = items.filter((item) => item.published ?? true);
  const resolvedMaxVisibleItems = maxVisibleItems === true ? 5 : maxVisibleItems;
  const canCollapse =
    typeof resolvedMaxVisibleItems === "number" && resolvedMaxVisibleItems > 0 && filteredItems.length > resolvedMaxVisibleItems;
  const [open, setOpen] = React.useState(false);
  const listId = React.useId();
  // ▼ Don't try to fix this later, this isn't bad math. We're adding +1 to the count since the mask takes up a space
  const collapsedHeightPercent = canCollapse ? ((resolvedMaxVisibleItems + 1) / filteredItems.length) * 100 : 100;

  const list = (
    <ItemGroup className={className}>
      {filteredItems.map((item, index) => {
        // const titleTransitionName = item.viewTransitionName ?? pageTitleTransitionName("project", item.path.replace(/^\//, ""));

        return (
          <React.Fragment key={item.id}>
            <Item
              render={<Link href={item.path} transitionTypes={item.transitionTypes ?? transitionTypes} />}
              size="default"
              className={cn("peer hover:text-secondary-foreground sm:-mx-3", itemClassName)}
            >
              {renderMedia(item.icon)}
              <ItemContent className="gap-0">
                <ItemTitle>
                  {/* <TitleMorph name={titleTransitionName}> */}
                  <span
                    className="inline-block w-fit font-heading text-base leading-6 tracking-[.012em]"
                    style={{
                      fontFeatureSettings: '"calt" 1, "zero" 1, "ss01" 0, "ss02" 0, "ss03" 0',
                      fontVariationSettings: '"slnt" 0, "SERF" 20, "wght" 610',
                    }}
                  >
                    {item.title}
                  </span>
                  {/* </TitleMorph> */}
                </ItemTitle>
                {item.description && <ItemDescription className="max-sm:hidden">{item.description}</ItemDescription>}
              </ItemContent>
              <ItemActions>
                {/* {item.tags && <span className="max-sm:hidden">{item.tags}</span>} */}
                {item.date && <ItemDescription className="font-pixel text-[11px] uppercase">{item.date}</ItemDescription>}
              </ItemActions>
            </Item>
            {index !== filteredItems.length - 1 && <ItemSeparator />}
          </React.Fragment>
        );
      })}
    </ItemGroup>
  );

  if (!canCollapse) return list;

  return (
    <LazyMotion features={domMax}>
      <div className="group/index-list relative -mx-3">
        <AnimateHeight
          id={listId}
          open={open}
          initialHeight={`${collapsedHeightPercent}%`}
          className={cn("relative w-full min-w-0 overflow-x-visible! px-3", open ? "pb-10" : "pb-4")}
          transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.8 }}
        >
          {list}
        </AnimateHeight>
        <m.div
          layout="position"
          key={`scrim-${open ? "open" : "closed"}`}
          transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.8 }}
          className={cn(
            "absolute inset-x-0 z-10 flex h-18 items-end justify-center px-4",
            open
              ? "top-full -bottom-5 pt-0 pb-0"
              : "via-smooth bottom-0 bg-linear-to-t from-background via-background/75 to-transparent pb-4"
          )}
        >
          <Button
            variant="elevated"
            render={<m.button />}
            onClick={() => setOpen((value) => !value)}
            className="pointer-events-auto"
            aria-controls={listId}
            aria-expanded={open}
          >
            <MotionText.Morph as="span">
              {open
                ? `Hide ${filteredItems.length - resolvedMaxVisibleItems} items`
                : `Show ${filteredItems.length - resolvedMaxVisibleItems} more`}
            </MotionText.Morph>
            <PixelMorph from="PixelChevronDownIcon" to="PixelChevronUpIcon" active={open} />
          </Button>
        </m.div>
      </div>
    </LazyMotion>
  );
}
