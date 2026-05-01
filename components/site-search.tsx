"use client";

import { useKeyPress } from "@/hooks/use-key-press";
import { posts, postIcons } from "@/lib/data/posts";
import { projects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";
import { IconComponents, IconFile, IconFlask, IconHome, IconNews, IconSearch, IconUser } from "@tabler/icons-react";
import { useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo, useState, type ReactNode } from "react";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
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
import { Kbd } from "./ui/kbd";
import { DialogClose } from "./ui/dialog";
import { Dialog } from "@base-ui/react/dialog";
import { Badge } from "./ui/badge";
import { TreeIconFile, Favicon } from "./icons";
import { Separator } from "./ui/separator";
import { Item, ItemTitle, ItemContent, ItemMedia, ItemDescription, ItemActions } from "./ui/item";

type SearchItem = {
  value: string;
  label: string;
  path: string;
  date?: string;
  icon?: ReactNode;
  category?: string;
};

type SearchGroup = {
  value: string;
  items: SearchItem[];
};

function itemIcon(Icon: React.ComponentType<{ className?: string }>): ReactNode {
  return (
    <Avatar size="sm" className="object-contain">
      <AvatarFallback className="opacity-50">
        <Icon className="size-4 text-muted-foreground" />
      </AvatarFallback>
    </Avatar>
  );
}

function itemAvatar(src: string, label: string): ReactNode {
  return (
    <Avatar size="sm">
      <AvatarImage src={src} alt="" className="object-contain" />
      <AvatarFallback>
        <TreeIconFile className="size-4 text-muted-foreground" />
      </AvatarFallback>
    </Avatar>
  );
}

const staticPages: SearchItem[] = [
  { value: "home", label: "Home", path: "/", icon: itemIcon(IconHome) },
  { value: "about", label: "About", path: "/about", icon: itemIcon(IconUser) },
  { value: "posts-index", label: "Posts", path: "/posts", icon: itemIcon(IconNews) },
];

const privatePages: SearchItem[] = [
  {
    value: "components",
    label: "Components",
    path: "/components",
    icon: itemIcon(IconComponents),
    category: "Testing",
  },
  {
    value: "testing-index",
    label: "Testing",
    path: "/private/testing",
    icon: itemIcon(IconFlask),
    category: "Testing",
  },
  {
    value: "testing-carousel",
    label: "Carousel Testing",
    path: "/private/testing/carousel",
    icon: itemIcon(IconFlask),
    category: "Testing",
  },
  {
    value: "testing-direction-a",
    label: "Bento Annotated",
    path: "/private/testing/direction-a",
    icon: itemIcon(IconFlask),
    category: "Testing",
  },
  {
    value: "testing-direction-b",
    label: "Film Strip / Gallery",
    path: "/private/testing/direction-b",
    icon: itemIcon(IconFlask),
    category: "Testing",
  },
  {
    value: "testing-direction-c",
    label: "Mosaic with Dialogs",
    path: "/private/testing/direction-c",
    icon: itemIcon(IconFlask),
    category: "Testing",
  },
  {
    value: "testing-direction-d",
    label: "Annotated Diagram",
    path: "/private/testing/direction-d",
    icon: itemIcon(IconFlask),
    category: "Testing",
  },
  {
    value: "testing-direction-e",
    label: "Card Stack Lightbox",
    path: "/private/testing/direction-e",
    icon: itemIcon(IconFlask),
    category: "Testing",
  },
  {
    value: "device",
    label: "Device Mockup Prototypes",
    path: "/private/device",
    icon: itemIcon(IconFlask),
    category: "Testing",
  },
];

const isDev = process.env.NODE_ENV === "development";

export function SiteSearch({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const groupedItems = useMemo<SearchGroup[]>(
    () => [
      { value: "Pages", items: staticPages },
      {
        value: "Projects",
        items: projects.map((p) => ({
          value: String(p.id),
          label: p.nickname,
          path: p.path,
          date: p.date,
          icon: p.icon ? itemAvatar(p.icon, p.nickname) : undefined,
          category: p.category,
        })),
      },
      {
        value: "Posts",
        items: posts.map((p) => ({
          value: p.id,
          label: p.title,
          path: p.path,
          date: p.date,
          icon: p.icon ? itemIcon(postIcons[p.icon]) : undefined,
          category: p.category,
        })),
      },
      ...(isDev ? [{ value: "Private", items: privatePages }] : []),
    ],
    []
  );

  useKeyPress("/", () => setOpen((prev) => !prev), { mod: true });

  const navigate = useCallback(
    (path: string) => {
      setOpen(false);
      router.push(path);
    },
    [router]
  );

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen} modal={false}>
        <CommandDialogTrigger
          className={cn(
            "ease flex h-button-sm items-center justify-start gap-2 rounded-md bg-muted ps-2 pe-3 text-sm text-muted-foreground inset-shadow-border duration-100 hover:bg-accent hover:text-accent-foreground",
            className
          )}
          onClick={() => setOpen(true)}
        >
          <IconSearch data-icon="inline-start" className="size-3.5 stroke-1 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Search</span>
          <Kbd className="-me-1.5 ml-auto hidden md:block" variant="elevated">
            ⌘ /
          </Kbd>
        </CommandDialogTrigger>

        <CommandDialogPopup aria-label="Search pages">
          <Command items={groupedItems}>
            <CommandInput placeholder="Search pages…" />

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
                            <ItemMedia variant="icon" className="relative object-contain">
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
            <CommandEmpty>No results found.</CommandEmpty>

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
