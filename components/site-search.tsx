"use client";

import { useKeyPress } from "@/hooks/use-key-press";
import { posts, postIcons } from "@/lib/data/posts";
import { projects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";
import {
  IconBriefcaseFilled,
  IconComponents,
  IconFile,
  IconFlask,
  IconHome,
  IconLayoutGridFilled,
  IconNews,
  IconPalette,
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
  CommandPanel,
  CommandShortcut,
} from "./ui/command";
import { Kbd, KbdGroup } from "./ui/kbd";
import { Dialog } from "@base-ui/react/dialog";
import { Badge } from "./ui/badge";
import { TreeIconFile, Favicon, PixelNewsIcon, PixelFinderIcon, FolderIcon, CursorIcon } from "./icons";
import { Separator } from "./ui/separator";
import { Item, ItemTitle, ItemContent, ItemMedia, ItemDescription, ItemActions } from "./ui/item";
import { Toolbar } from "./ui/toolbar";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

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

type FilterTab = "All" | "Projects" | "Posts" | "Private";

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
      <img
        src="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-e0904rWYQ29GCwVnLKDYLOjvAXcSXy.png&w=1000&q=75"
        alt="Posts"
        className="size-4"
      />
    ),
  },
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
  return <img src={src} alt="" />;
}

const staticPages: SearchItem[] = [
  { value: "home", label: "Home", path: "/", icon: itemIcon(IconHome), group: "Pages" },
  { value: "about", label: "About", path: "/about", icon: itemIcon(IconUser), group: "Pages" },
  { value: "posts-index", label: "Posts", path: "/posts", icon: itemIcon(IconNews), group: "Pages" },
  { value: "art", label: "Art", path: "/art", icon: itemIcon(IconPalette), group: "Pages" },
];

const privatePages: SearchItem[] = [
  {
    value: "components",
    label: "Components",
    path: "/components",
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
  {
    value: "device",
    label: "Device Mockup Prototypes",
    path: "/private/device",
    icon: itemIcon(IconFlask),
    category: "Testing",
    group: "Private",
  },
  {
    value: "cambio-examples",
    label: "Cambio examples",
    path: "/private/cambio",
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
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const { push } = useRouter();
  const pathname = usePathname();

  const allGroups = useMemo<SearchGroup[]>(
    () => [
      { value: "Pages", items: staticPages },
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
    <>
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
            "ease squircle flex h-button-sm items-center justify-start gap-2 rounded-md ps-2 pe-3 text-sm transition-colors duration-100",
            variant === "button" && "w-fit bg-muted hover:bg-accent hover:text-accent-foreground",
            variant === "input" &&
              "w-full bg-background text-muted-foreground inset-shadow-border outline -outline-offset-1 outline-border/50 hover:outline-input",
            className
          )}
          onClick={() => setOpen(true)}
        >
          {variant === "button" ? (
            <PixelFinderIcon className="size-[11px] fill-muted-foreground/50" data-icon={"inline-start"} />
          ) : (
            <IconSearch data-icon="inline-start" className="stroke-1.5 size-3.5 text-muted-foreground" />
          )}

          {label && <span className={cn("text-xs text-muted-foreground", variant === "input" && "opacity-50")}>{label}</span>}
          {showKbd ? (
            variant === "input" ? (
              <KbdGroup className="-me-1.5 ml-auto hidden md:block">
                <Kbd className="" variant="elevated">
                  ⌘
                </Kbd>
                <Kbd className="" variant="elevated">
                  /
                </Kbd>
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
            <CommandInput placeholder="Search pages…" />
            <Toolbar.Root className="px-2 pt-2">
              <Toolbar.Group render={<ToggleGroup spacing={1} />}>
                {FILTER_TABS.filter((tab) => isDev || tab.value !== "Private").map((tab) => (
                  <Toolbar.Button
                    key={`command-tab-${String(tab.value)}`}
                    render={<ToggleGroupItem value={tab.value} size="xs" />}
                    onClick={() => setActiveTab(tab.value)}
                  >
                    {tab.icon}
                    {tab.value}
                  </Toolbar.Button>
                ))}
              </Toolbar.Group>
              <Toolbar.Separator />
              <Toolbar.Link href="/" onClick={() => setOpen(false)}>
                Home
              </Toolbar.Link>
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
                          <Item size="sm" className="p-0">
                            <ItemMedia variant={"icon"} className="squircle relative size-5 rounded-md bg-card shadow-border-xs">
                              {item.icon ? item.icon : <TreeIconFile className="size-4 opacity-64" />}
                              {isCurrent && (
                                <div className="absolute bottom-0 left-1/2 size-[3px] -translate-x-1/2 translate-y-1 rounded-full bg-muted-foreground" />
                              )}
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle>
                                {item.label} <ItemDescription>{item.date}</ItemDescription>
                              </ItemTitle>
                            </ItemContent>
                            <ItemDescription>
                              {item.category && <span className="text-xs text-muted-foreground">{item.category}</span>}
                            </ItemDescription>
                            <ItemActions>
                              <CommandShortcut className="ease opacity-0 transition-opacity duration-50 group-data-highlighted/command-item:opacity-100">
                                ↵
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

            <CommandFooter className="text-xs font-medium">
              <span className="flex items-center gap-1">
                <Favicon className="size-4 opacity-50" />
              </span>
              <span className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  Go <Kbd>↵</Kbd>
                </span>
                <Separator orientation="vertical" />
                <Dialog.Close className="after:squircle relative isolate flex items-center gap-1 after:absolute after:-inset-x-2 after:-z-1 after:h-button-sm after:rounded-sm after:transition-colors after:duration-100 after:ease-out hover:after:bg-accent">
                  Close <Kbd className="-me-0.5">esc</Kbd>
                </Dialog.Close>
              </span>
            </CommandFooter>
          </Command>
        </CommandDialogPopup>
      </CommandDialog>
    </>
  );
}
