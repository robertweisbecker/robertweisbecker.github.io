"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { ThemeSettings } from "@/components/theme-settings";
import { useMediaQuery } from "@/hooks/use-media-query";
import { projects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";
import { IconBlobFilled, IconComponents } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Favicon } from "./icons";
import { PixelChevronDownIcon, PixelNewspaperIcon, PixelPointerIcon, PixelScribbleIcon } from "./icons-pixel";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLink,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LinkButton } from "./ui/link-button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { PreviewCardGroup, PreviewCardPrimitive, PreviewCardTrigger } from "./ui/preview-card";
import { Badge } from "./ui/badge";
import { DataList, DataListItem, DataListLabel, DataListValue } from "./ui/data-list";
import * as React from "react";

export function Header() {
  const isMobile = useMediaQuery("max-md");
  const pathname = usePathname();
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";
  const previewHandle = React.useMemo(() => PreviewCardPrimitive.createHandle<React.ReactNode>(), []);
  const previewActions = React.useRef<PreviewCardPrimitive.Root.Actions | null>(null);
  const filteredProjects = projects.filter((project) => project.published);

  return (
    <nav className={cn("sticky top-0 isolate z-50 bg-background")}>
      <div className="mx-auto flex h-12 max-w-6xl items-center gap-1 py-2 max-sm:px-2">
        <LinkButton href="/" variant="ghost" size="sm" aria-current={pathname === "/" ? "true" : "false"} className="me-2 font-pixel">
          <Favicon className="size-4 text-secondary-foreground" />

          <span className="text-[11px]/[10px] max-sm:hidden">
            {" "}
            bob
            <br />
            <span className="text-primary/50">dot</span>fyi
          </span>
        </LinkButton>
        {/* <LinkButton
          href="/about"
          variant="ghost"
          size="sm"
          aria-current={pathname === "/about" ? "true" : "false"}
          className="aria-current:bg-accent aria-current:text-accent-foreground max-md:hidden"
        >
          About
        </LinkButton> */}
        <div className="me-auto" />
        <PreviewCardGroup side="right" sideOffset={8} handle={previewHandle} actionsRef={previewActions} align="start" anchor={anchorRef}>
          <DropdownMenu
            modal={false}
            onOpenChange={(open) => {
              if (!open) {
                previewHandle.close();
                previewActions.current?.unmount();
              }
            }}
          >
            <DropdownMenuTrigger render={<Button variant="ghost" size="sm" />} className="group/trigger font-pixel text-[11px] uppercase">
              <span className="hidden md:block">Work</span>
              <span className="md:hidden">Menu</span>
              <PixelChevronDownIcon
                className={cn("rotate-0 opacity-50 transition-transform duration-100 group-data-pressed/trigger:rotate-180")}
                data-icon="inline-end"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" ref={anchorRef}>
              <DropdownMenuGroup className="md:hidden">
                <DropdownMenuItem render={<Link href="/" />} nativeButton={false}>
                  Home
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/posts" />} nativeButton={false}>
                  Posts
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/art" />} nativeButton={false}>
                  Art
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/playground" />} nativeButton={false}>
                  Playground
                </DropdownMenuItem>
                {process.env.NODE_ENV === "development" && (
                  <>
                    <DropdownMenuItem render={<Link href="/components" />} nativeButton={false} className="md:hidden">
                      <IconComponents />
                      Components
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Projects</DropdownMenuLabel>

                {filteredProjects.map((project) => (
                  <PreviewCardTrigger
                    key={project.id}
                    delay={100}
                    preview={
                      <>
                        <div className="flex w-64 flex-col p-1 md:w-sm">
                          {project.heroImage && (
                            <div className="via-smooth relative aspect-video w-full overflow-hidden rounded-lg bg-linear-to-b to-popover">
                              <Image
                                src={project.heroImage}
                                alt={`${project.title} hero preview`}
                                fill
                                sizes="(max-width: 768px) 100vw, 320px"
                                className="object-cover object-top"
                                preload
                              />
                            </div>
                          )}
                          <DataList.Root size="sm" className="px-4 py-2">
                            <DataListItem>
                              <DataListLabel>Title</DataListLabel>
                              <DataListValue className="font-medium">{project.title}</DataListValue>
                            </DataListItem>
                            <DataListItem>
                              <DataListLabel>Description</DataListLabel>
                              <DataListValue>{project.description}</DataListValue>
                            </DataListItem>
                            <DataListItem>
                              <DataListLabel>Date</DataListLabel>
                              <DataListValue>{project.date}</DataListValue>
                            </DataListItem>

                            {project.categories && project.categories.length > 0 && (
                              <DataListItem>
                                <DataListLabel>Tags</DataListLabel>
                                <DataListValue className="flex flex-wrap gap-1">
                                  {project.categories.map((category) => (
                                    <Badge variant="inherit" size="sm" key={`${project.id}-${category}`}>
                                      {category}
                                    </Badge>
                                  ))}
                                </DataListValue>
                              </DataListItem>
                            )}
                          </DataList.Root>
                        </div>
                      </>
                    }
                    render={
                      <DropdownMenuLink
                        closeOnClick
                        render={<Link href={project.path} />}
                        aria-current={pathname === project.path ? "true" : "false"}
                      />
                    }
                  >
                    {project.icon && (
                      <Avatar className="-ms-1 size-[1lh] self-start shadow-border-xs [--avatar-radius:var(--radius-sm)]">
                        <AvatarImage src={project.icon} alt={project.nickname} className="object-scale-down" />
                      </Avatar>
                    )}

                    {project.nickname}
                    {/* <div className="flex flex-wrap gap-1">
                      {project.categories?.map((category) => (
                        <Badge variant="inherit" className="rounded-full" size="sm" key={`${project.id}-${category}`}>
                          {category}
                        </Badge>
                      ))}
                    </div> */}
                  </PreviewCardTrigger>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </PreviewCardGroup>
        <HeaderButton
          label="Posts"
          icon={<PixelNewspaperIcon className="size-3.5" data-icon={"inline-start"} />}
          hideTextOnMobile={false}
          href="/posts"
          aria-current={pathname.startsWith("/posts") ? "true" : "false"}
          className="max-md:hidden"
        />
        <HeaderButton
          label="Art"
          icon={<PixelScribbleIcon className="size-3.5" data-icon={"inline-start"} />}
          hideTextOnMobile={false}
          href="/art"
          aria-current={pathname === "/art" ? "true" : "false"}
          className="max-md:hidden"
        />

        <HeaderButton
          label="Play"
          icon={<PixelPointerIcon className="size-3.5" data-icon={"inline-start"} />}
          hideTextOnMobile={false}
          href="/playground"
          aria-current={pathname === "/playground" ? "true" : "false"}
          className="max-md:hidden"
        />
        {/* <SiteSearch className="ml-auto" /> */}

        {process.env.NODE_ENV === "development" && (
          <>
            <HeaderButton
              label="Components"
              icon={<IconComponents data-icon={isMobile ? null : "inline-start"} />}
              hideTextOnMobile={true}
              href="/components"
              aria-current={pathname === "/components" ? "true" : "false"}
            />
            <HeaderButton
              label="Private"
              icon={<IconBlobFilled data-icon={isMobile ? null : "inline-start"} />}
              hideTextOnMobile={true}
              href="/private"
              aria-current={pathname === "/private" ? "true" : "false"}
            />
          </>
        )}
        <ThemeSettings className="font-pixel text-[11px] uppercase" />
        <ModeToggle size="sm" className="font-pixel text-[11px] uppercase" variant="ghost" label={true} />
      </div>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 isolate -z-1 h-20 transform-gpu",
          // "backdrop-blur-sm",
          //   "bg-background",
          "via-smooth overflow-hidden bg-linear-to-b from-background from-25% to-background/0"
        )}
      >
        <div className="absolute inset-0 mask-b-from-black mask-b-from-10% mask-b-to-black/0 backdrop-blur-xs" />
        <div className="absolute inset-0 mask-b-from-black mask-b-from-25% mask-b-to-black/0 backdrop-blur-md" />
      </div>
    </nav>
  );
}

function HeaderButton({
  label,
  icon,
  hideTextOnMobile = false,
  ...props
}: React.ComponentProps<typeof LinkButton> & { label: string; icon: React.ReactNode; hideTextOnMobile?: boolean }) {
  const isMobile = useMediaQuery("max-md");
  return (
    <LinkButton
      {...props}
      variant="ghost"
      size={isMobile && hideTextOnMobile && icon ? "icon-sm" : "sm"}
      className={cn(
        "font-pixel text-[11px] uppercase backdrop-blur-md aria-current:bg-accent aria-current:text-accent-foreground",
        "[&_svg]:size-2.75",
        props.className
      )}
    >
      {icon}
      <span className={cn(hideTextOnMobile && "max-md:sr-only")}>{label}</span>
    </LinkButton>
  );
}
