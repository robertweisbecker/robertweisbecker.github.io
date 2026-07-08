"use client";

import { useKeyPress } from "@/hooks/use-key-press";
import { getPlaygroundRouteIcon } from "@/components/blocks/playground-route-icons";
import { playgroundRoutes } from "@/lib/data/playground";
import { posts, postIcons } from "@/lib/data/posts";
import { projects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";
import {
  IconBriefcaseFilled,
  IconComponents,
  IconFlask,
  IconHome,
  IconLayoutGridFilled,
  IconMonkeybar,
  IconSearch,
  IconUser,
} from "@tabler/icons-react";
import { useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo, useState, type ReactNode } from "react";
import { matchSorter } from "match-sorter";
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "./ui/command";
import { Kbd, KbdGroup } from "./ui/kbd";
import { Dialog } from "@base-ui/react/dialog";
import Image from "next/image";
import { Favicon, FolderIcon, CursorIcon } from "./icons";
import { PixelNewsIcon, PixelFinderIcon, PixelScribbleIcon } from "./icons-pixel";
import { TreeIconFile } from "./icons-tree";
import { MorphIcon } from "./morph-icon";
import { Item, ItemTitle, ItemContent, ItemMedia, ItemDescription, ItemActions } from "./ui/item";
import { Toolbar } from "./ui/toolbar";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { LinkButton } from "./ui/link-button";
import { Toggle } from "./ui/toggle";
import { AnimatePresence, LazyMotion, LayoutGroup, domAnimation, m } from "motion/react";

type SearchItem = {
  value: string;
  label: string;
  path: string;
  date?: string;
  icon?: ReactNode;
  mediaVariant?: "icon" | "image";
  category?: string;
  group?: string;
};

type SearchGroup = {
  value: string;
  icon?: ReactNode;
  items: SearchItem[];
};

type FilterTab = "All" | "Projects" | "Posts" | "Playground" | "Private";

const FILTER_TABS: { value: FilterTab; icon?: React.ReactNode }[] = [
  { value: "All", icon: <IconLayoutGridFilled /> },
  {
    value: "Projects",
    icon: (
      <>
        <IconBriefcaseFilled />
        {/* <svg width="152" height="152" viewBox="0 0 152 152" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M144 118C144 124.627 138.627 130 132 130H20C13.3726 130 8 124.627 8 118V35C8 28.3726 13.3726 23 20 23H48.5836C53.1289 23 57.284 25.568 59.3167 29.6334L60.6833 32.3666C62.716 36.432 66.8711 39 71.4164 39H132C138.627 39 144 44.3726 144 51V118Z"
            fill="#66BAFF"
          />
          <rect x="10" y="41" width="132" height="87" rx="10" fill="#A8D9FF" />
        </svg> */}
      </>
    ),
  },
  {
    value: "Posts",
    icon: (
      <Image
        src="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-e0904rWYQ29GCwVnLKDYLOjvAXcSXy.png&w=1000&q=75"
        alt="Posts"
        width={16}
        height={16}
        className="size-4"
        unoptimized
      />
    ),
  },
  { value: "Playground", icon: <IconMonkeybar /> },
  { value: "Private", icon: <CursorIcon /> },
];

function fuzzyFilter(item: SearchItem, query: string): boolean {
  if (!query) return true;
  const results = matchSorter([item], query, {
    keys: ["label", "category", { key: "group", threshold: matchSorter.rankings.CONTAINS }],
  });
  return results.length > 0;
}

function itemIcon(Icon: React.ComponentType<{ className?: string }>): ReactNode {
  return <Icon className="size-4 text-muted-foreground" />;
}

function itemImage(src: string): ReactNode {
  return <Image src={src} alt="" width={40} height={40} className="size-full object-cover" unoptimized={src.endsWith(".svg")} />;
}

const staticPages: SearchItem[] = [
  { value: "home", label: "Home", path: "/", icon: itemIcon(IconHome), group: "Pages" },
  { value: "about", label: "About", path: "/about", icon: itemIcon(IconUser), group: "Pages" },
  { value: "posts-index", label: "Posts", path: "/posts", icon: itemIcon(PixelNewsIcon), group: "Pages" },
  { value: "art", label: "Art", path: "/art", icon: itemIcon(PixelScribbleIcon), group: "Pages" },
];

const playgroundPages: SearchItem[] = [
  { value: "playground", label: "Playground", path: "/playground", icon: itemIcon(IconMonkeybar), group: "Playground" },
  ...playgroundRoutes.map((route) => ({
    value: `playground-${route.slug}`,
    label: route.label,
    path: route.href,
    icon: itemIcon(getPlaygroundRouteIcon(route.slug)),
    group: "Playground",
  })),
];

const privatePages: SearchItem[] = [
  {
    value: "qa",
    label: "QA",
    path: "/private/qa",
    icon: itemIcon(IconComponents),
    category: "Testing",
    group: "Private",
  },
  {
    value: "testing-index",
    label: "Testing",
    path: "/private/testing",
    icon: itemIcon(IconFlask),
    category: "Testing",
    group: "Private",
  },
  {
    value: "testing-carousel",
    label: "Carousel Testing",
    path: "/private/testing/carousel",
    icon: itemIcon(IconFlask),
    category: "Testing",
    group: "Private",
  },
  {
    value: "testing-direction-a",
    label: "Bento Annotated",
    path: "/private/testing/direction-a",
    icon: itemIcon(IconFlask),
    category: "Testing",
    group: "Private",
  },
  {
    value: "testing-direction-b",
    label: "Film Strip / Gallery",
    path: "/private/testing/direction-b",
    icon: itemIcon(IconFlask),
    category: "Testing",
    group: "Private",
  },
  {
    value: "testing-direction-c",
    label: "Mosaic with Dialogs",
    path: "/private/testing/direction-c",
    icon: itemIcon(IconFlask),
    category: "Testing",
    group: "Private",
  },
  {
    value: "testing-direction-d",
    label: "Annotated Diagram",
    path: "/private/testing/direction-d",
    icon: itemIcon(IconFlask),
    category: "Testing",
    group: "Private",
  },
  {
    value: "testing-direction-e",
    label: "Card Stack Lightbox",
    path: "/private/testing/direction-e",
    icon: itemIcon(IconFlask),
    category: "Testing",
    group: "Private",
  },
];

const isDev = process.env.NODE_ENV === "development";

export function SiteSearch({
  className,
  label = "Search…",
  variant = "input",
  showKbd = true,
}: {
  className?: string;
  label?: string;
  variant?: "button" | "input";
  showKbd?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const filterActive = activeTab !== "All" && !showFilters;
  const { push } = useRouter();
  const pathname = usePathname();

  const allGroups = useMemo<SearchGroup[]>(
    () => [
      { value: "Pages", items: staticPages },
      { value: "Playground", icon: <IconMonkeybar />, items: playgroundPages },
      {
        value: "Projects",
        icon: <FolderIcon />,
        items: projects
          .filter((p) => isDev || p.published !== false)
          .map((p) => ({
            value: String(p.id),
            label: p.nickname,
            path: p.path,
            date: p.date,
            icon: p.icon ? itemImage(p.icon) : undefined,
            mediaVariant: p.icon ? "image" : "icon",
            category: p.category,
            group: "Projects",
          })),
      },
      {
        value: "Posts",
        icon: <PixelNewsIcon />,
        items: posts.map((p) => ({
          value: p.id,
          label: p.title,
          path: p.path,
          date: p.date,
          icon: p.icon ? itemIcon(postIcons[p.icon]) : undefined,
          category: p.category,
          group: "Posts",
        })),
      },
      ...(isDev ? [{ icon: <CursorIcon />, value: "Private", items: privatePages }] : []),
    ],
    []
  );

  const groupedItems = useMemo<SearchGroup[]>(() => {
    if (activeTab === "All") return allGroups;
    if (activeTab === "Projects") return allGroups.filter((g) => g.value === "Projects");
    if (activeTab === "Posts") return allGroups.filter((g) => g.value === "Posts");
    if (activeTab === "Playground") return allGroups.filter((g) => g.value === "Playground");
    if (activeTab === "Private") return allGroups.filter((g) => g.value === "Private");
    return allGroups;
  }, [allGroups, activeTab]);

  useKeyPress("/", () => setOpen((prev) => !prev), { mod: true });

  const navigate = useCallback(
    (path: string) => {
      setOpen(false);
      push(path);
    },
    [push]
  );

  return (
    <LazyMotion features={domAnimation}>
      <CommandDialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setActiveTab("All");
        }}
        modal={false}
      >
        <CommandDialogTrigger
          className={cn(
            "ease flex h-button-sm items-center justify-start gap-2 rounded-md ps-2 pe-3 text-sm transition-colors duration-100 squircle",
            variant === "button" && "w-fit bg-muted hover:bg-accent hover:text-accent-foreground",
            variant === "input" &&
              "w-full bg-background inset-shadow-border outline -outline-offset-1 outline-border/50 hover:outline-input",
            className
          )}
          onClick={() => setOpen(true)}
        >
          {variant === "button" ? (
            <PixelFinderIcon className="size-[11px] fill-muted-foreground/50" data-icon={"inline-start"} />
          ) : (
            <IconSearch data-icon="inline-start" className="stroke-1.5 size-3.5 text-muted-foreground" />
          )}

          {label && <span className={cn("text-sm text-muted-foreground", variant === "input" && "text-md opacity-72")}>{label}</span>}
          {showKbd ? (
            variant === "input" ? (
              <KbdGroup className="-me-1.5 ml-auto hidden md:block">
                <Kbd variant="elevated">⌘</Kbd>
                <Kbd variant="elevated">/</Kbd>
              </KbdGroup>
            ) : (
              <Kbd data-icon="inline-end" className="-me-1.5 ml-auto">
                ⌘K
              </Kbd>
            )
          ) : null}
        </CommandDialogTrigger>

        <CommandDialogPopup aria-label="Search pages">
          <Command items={groupedItems} filter={fuzzyFilter}>
            <CommandInput placeholder="Search pages…" className="border-transparent" />
            <Toolbar.Root className="absolute top-1 right-1 min-h-button-sm px-2 pt-2">
              <LayoutGroup>
                <Toolbar.Button
                  render={
                    <Toggle
                      size="xs"
                      aria-label="Show filters"
                      pressed={showFilters}
                      onPressedChange={setShowFilters}
                      render={<m.button className={cn("order-last transition-all", filterActive ? "w-auto" : "w-button-xs")} />}
                    />
                  }
                >
                  <MorphIcon from="filter" to="chevronRight" active={showFilters} />
                  <AnimatePresence mode="popLayout" initial={false}>
                    {activeTab !== "All" && !showFilters && (
                      <>
                        <m.span
                          key="filter-indicator"
                          className="absolute top-0 right-0 size-1.5 rounded-full bg-info-primary whitespace-nowrap"
                          initial={{ opacity: 0, filter: "blur(2px)", scale: 0.5 }}
                          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                          exit={{ opacity: 0, filter: "blur(2px)", scale: 0.5 }}
                        ></m.span>
                      </>
                    )}
                  </AnimatePresence>
                </Toolbar.Button>
                <AnimatePresence mode="wait" initial={false}>
                  {showFilters && (
                    <>
                      <m.div
                        key="filter-group"
                        className="flex overflow-hidden"
                        initial={{ opacity: 0, filter: "blur(8px)", width: 0, paddingInline: 0 }}
                        animate={{ opacity: 1, filter: "blur(0px)", width: "auto", paddingInline: 4 }}
                        exit={{ opacity: 0, filter: "blur(4px)", width: 0, paddingInline: 0 }}
                        transition={{ type: "spring", visualDuration: 0.2, bounce: 0 }}
                      >
                        <Toolbar.Group
                          render={
                            <ToggleGroup
                              spacing={1}
                              size="xs"
                              value={[activeTab]}
                              onValueChange={(value) => {
                                const next = value[0] as FilterTab | undefined;
                                setActiveTab(next ?? "All");
                              }}
                            />
                          }
                          id="site-search-filters"
                        >
                          <Label htmlFor="site-search-filters" className="sr-only">
                            Filter by:
                          </Label>
                          {FILTER_TABS.filter((tab) => isDev || tab.value !== "Private").map((tab) => (
                            <Toolbar.Button
                              key={`command-tab-${String(tab.value)}`}
                              render={<ToggleGroupItem value={tab.value} className="bg-transparent! font-normal!" />}
                            >
                              {/* {tab.icon} */}
                              {tab.value}
                              {tab.value === activeTab && (
                                <m.div
                                  layoutId="filter-tab-indicator"
                                  className="absolute bottom-0 left-0 size-full rounded-[inherit] bg-accent"
                                  transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.8 }}
                                />
                              )}
                            </Toolbar.Button>
                          ))}
                        </Toolbar.Group>
                      </m.div>
                    </>
                  )}
                </AnimatePresence>
              </LayoutGroup>
            </Toolbar.Root>

            <CommandList>
              {(group: SearchGroup) => (
                <CommandGroup key={group.value} items={group.items}>
                  <CommandGroupLabel>{group.value}</CommandGroupLabel>
                  <CommandCollection>
                    {(item: SearchItem) => {
                      const isCurrent = pathname === item.path;
                      return (
                        <CommandItem
                          key={item.value}
                          value={item}
                          onClick={() => navigate(item.path)}
                          className={cn(isCurrent && "text-foreground")}
                        >
                          <Item size="sm" className="m-0 overflow-visible rounded-none p-0">
                            <ItemMedia variant={"icon"} className="relative size-5 rounded-sm bg-card shadow-border-xs squircle">
                              {item.icon ? item.icon : <TreeIconFile className="size-4 opacity-64" />}
                              {isCurrent && (
                                <div className="absolute bottom-0 left-1/2 size-[3px] -translate-x-1/2 translate-y-1 rounded-full bg-muted-foreground" />
                              )}
                            </ItemMedia>
                            <ItemContent className="min-w-0">
                              <ItemTitle className="flex max-w-full min-w-0 font-normal">
                                <span className="min-w-0 truncate">{item.label}</span>
                                {item.date && <ItemDescription className="shrink-0 ps-1 opacity-50">{item.date}</ItemDescription>}
                              </ItemTitle>
                            </ItemContent>
                            <ItemDescription>
                              {item.category && <span className="text-xs text-muted-foreground">{item.category}</span>}
                            </ItemDescription>
                            <ItemActions>
                              <CommandShortcut className="ease opacity-0 transition-opacity duration-50 group-data-highlighted/command-item:opacity-100">
                                ⏎
                              </CommandShortcut>
                            </ItemActions>
                          </Item>
                          {/* <span className="relative grid size-[1lh] shrink-0 place-items-center">
                            
                          </span>
                          <span className="truncate">{item.label}</span>
                          {item.category && <span className="text-muted-foreground/72">{item.category}</span>}

                          {item.date && <span className="ms-auto text-xs text-muted-foreground">{item.date}</span>} */}
                        </CommandItem>
                      );
                    }}
                  </CommandCollection>
                </CommandGroup>
              )}
            </CommandList>
            <CommandEmpty className="flex flex-col items-center justify-center gap-2">
              <FolderIcon className="size-20" />
              No results found.
            </CommandEmpty>

            <CommandFooter className="px-2 pt-1 pb-2 text-xs font-medium shadow-none">
              <LinkButton variant="elevated" rounded size="icon" href="/">
                <Favicon className="size-4 opacity-50" />
              </LinkButton>
              <span className="flex h-button items-center gap-1 rounded-full bg-card p-1 shadow-border-xs">
                <span className="flex items-center gap-1 ps-3 pe-2">
                  Go <Kbd>⏎</Kbd>
                </span>

                <Dialog.Close
                  render={
                    <Button variant="ghost" rounded size="sm" className="-me-0.5 text-[13px]">
                      Close <Kbd className="-me-0.5">esc</Kbd>
                    </Button>
                  }
                />
              </span>
            </CommandFooter>
          </Command>
        </CommandDialogPopup>
      </CommandDialog>
    </LazyMotion>
  );
}
