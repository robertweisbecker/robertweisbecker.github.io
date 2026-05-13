import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle } from "@/components/ui/item";
import { projects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { TreeIconFile } from "./icons";

export type ProjectGridItem = {
  id: string | number;
  title: string;
  description?: string;
  date?: string;
  path: string;
  /** String renders as <img> src. ReactNode renders as-is (e.g. an icon component). */
  icon?: string | React.ReactNode;
  /** Optional content rendered in the trailing actions slot (e.g. a Badge). */
  tags?: React.ReactNode;
  /** Enables CSS view-transition on the title. Defaults to the title string. */
  viewTransitionName?: string;
  /** Whether the item is published. Defaults to true. */
  published?: boolean;
};

export type ProjectGridProps = {
  items?: ProjectGridItem[];
  className?: string;
  itemClassName?: string;
};

function renderMedia(icon: ProjectGridItem["icon"]) {
  if (typeof icon === "string") {
    return (
      <ItemMedia variant="image" className="">
        <Image src={icon} alt="" width={40} height={40} className="object-scale-down!" />
      </ItemMedia>
    );
  }
  if (icon) {
    return <ItemMedia variant="default">{icon}</ItemMedia>;
  }
  return (
    <ItemMedia variant="image">
      <TreeIconFile className="text-muted-foreground" />
    </ItemMedia>
  );
}

const defaultItems: ProjectGridItem[] = projects.map((p) => ({
  id: p.id,
  title: p.title,
  description: p.description,
  date: p.date,
  path: p.path,
  icon: p.icon,
  published: p.published,
}));

export function ProjectGrid({ items = defaultItems, className, itemClassName }: ProjectGridProps) {
  const filteredItems = items.filter((item) => item.published ?? true);
  return (
    <ItemGroup className={className}>
      {filteredItems.map((item, index) => (
        <React.Fragment key={item.id}>
          <Item
            render={<Link href={item.path} />}
            size="default"
            className={cn("peer hover:text-secondary-foreground sm:-mx-3", itemClassName)}
          >
            {renderMedia(item.icon)}
            <ItemContent>
              <ItemTitle style={{ viewTransitionName: item.viewTransitionName ?? item.title }}>{item.title}</ItemTitle>
              {item.description && <ItemDescription className="hidden sm:block">{item.description}</ItemDescription>}
            </ItemContent>
            {item.date && <ItemDescription className="font-pixel text-[11px] uppercase">{item.date}</ItemDescription>}
            {item.tags && <ItemActions>{item.tags}</ItemActions>}
          </Item>
          {index !== filteredItems.length - 1 && <ItemSeparator />}
        </React.Fragment>
      ))}
    </ItemGroup>
  );
}
