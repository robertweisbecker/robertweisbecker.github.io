"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { ThemeSettings } from "@/components/theme-settings";
import { useMediaQuery } from "@/hooks/use-media-query";
import { projects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Favicon } from "./icons";
import { PixelEyeIcon, PixelNewspaperIcon, PixelPointerIcon, PixelScribbleIcon, PixelUserIcon } from "./icons-pixel";
import { PixelMorph } from "./pixel-morph";
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
import { LinkButton, type LinkButtonProps } from "./ui/link-button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { PreviewCardGroup, PreviewCardPrimitive, PreviewCardTrigger } from "./ui/preview-card";
import { Badge } from "./ui/badge";
import { DataList, DataListItem, DataListLabel, DataListValue } from "./ui/data-list";
import * as React from "react";
import { Separator } from "./ui/separator";

export function Header() {
  const isMobile = useMediaQuery("max-md");
  const pathname = usePathname();
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";
  const previewHandle = React.useMemo(() => PreviewCardPrimitive.createHandle<React.ReactNode>(), []);
  const previewActions = React.useRef<PreviewCardPrimitive.Root.Actions | null>(null);
  const filteredProjects = projects.filter((project) => project.published);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const mobileIconClasses = "squircle -ms-1 grid-stack size-7 shrink-0 rounded-sm bg-card shadow-border-xs";
  return (
    <nav className={cn("sticky top-0 isolate z-50 bg-linear-to-b from-[canvas]")}>
      <div className="mx-auto flex h-12 max-w-7xl items-center gap-1 py-2 max-sm:px-2">
        <LinkButton href="/" variant="ghost" size="sm" aria-current={pathname === "/" ? "true" : "false"} className="me-2 gap-2 font-pixel">
          <Favicon className="size-4 text-secondary-foreground" data-icon="inline-start" />

          <span className="text-[11px]/[10px] max-sm:hidden">
            {" "}
            bob
            <br />
            <span className="text-(--hue-500)">dot</span>
            <span className="text-muted-foreground">fyi</span>
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
              setMenuOpen(open);
              if (!open) {
                previewHandle.close();
                previewActions.current?.unmount();
              }
            }}
          >
            <DropdownMenuTrigger render={<Button variant="ghost" size={isMobile ? "md" : "sm"} rounded />} className="group/trigger">
              <span className="max-md:hidden">Work</span>
              <span className="md:hidden">Menu</span>
              <PixelMorph
                from="PixelChevronDownSmallIcon"
                to="PixelCrossSmallIcon"
                active={menuOpen}
                animation="spring"
                strategy="radial"
                duration={0.5}
                stagger={0.01}
                scale={1.5}
                data-icon="inline-end"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isMobile ? "center" : "end"} ref={anchorRef} className="max-md:max-w-md">
              <DropdownMenuGroup className="-mt-1 grid grid-cols-4 px-1 text-2xs *:grid *:shrink-0 *:grid-rows-2 *:place-items-center *:gap-0.5 *:text-xs *:before:inset-0 md:hidden">
                <DropdownMenuItem render={<Link href="/#about" />} nativeButton={false}>
                  <div className={mobileIconClasses} data-slot="icon">
                    <PixelUserIcon scale={1.5} />
                  </div>
                  About
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="grid grid-rows-2 place-items-center gap-0.5 text-xs"
                  render={<Link href="/posts" />}
                  nativeButton={false}
                >
                  <div className={mobileIconClasses} data-slot="icon">
                    <PixelNewspaperIcon scale={1.5} className="text-blue-500 dark:text-blue-400" />
                  </div>
                  Posts
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="grid grid-rows-2 place-items-center gap-0.5 text-xs"
                  render={<Link href="/art" />}
                  nativeButton={false}
                >
                  <div className={mobileIconClasses} data-slot="icon">
                    <PixelScribbleIcon scale={1.5} className="text-violet-500 dark:text-violet-400" />
                  </div>
                  Art
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="grid grid-rows-2 place-items-center gap-0.5 text-xs"
                  render={<Link href="/playground" />}
                  nativeButton={false}
                >
                  <div className={mobileIconClasses} data-slot="icon">
                    <PixelPointerIcon scale={1.5} className="text-green-500 dark:text-green-400" />
                  </div>
                  Play
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="md:hidden" />
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
                        <AvatarImage src={project.icon} alt={project.nickname} className="object-contain" />
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

              {process.env.NODE_ENV === "development" && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem render={<Link href="/private/qa" />} nativeButton={false}>
                    <div className="size-4">
                      <PixelEyeIcon scale={1.5} />
                    </div>
                    Private
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </PreviewCardGroup>
        <HeaderLinkButton
          label="Posts"
          icon={<PixelNewspaperIcon scale={1.5} />}
          mobileIconOnly={false}
          href="/posts"
          aria-current={pathname.startsWith("/posts") ? "true" : "false"}
          className="max-md:hidden"
        />
        <HeaderLinkButton
          label="Art"
          icon={<PixelScribbleIcon scale={1.5} />}
          mobileIconOnly={false}
          href="/art"
          aria-current={pathname === "/art" ? "true" : "false"}
          className="max-md:hidden"
        />

        <HeaderLinkButton
          label="Play"
          icon={<PixelPointerIcon data-icon={"inline-start"} scale={1.5} />}
          mobileIconOnly={false}
          href="/playground"
          aria-current={pathname === "/playground" ? "true" : "false"}
          className="max-md:hidden"
        />
        {/* <SiteSearch className="ml-auto" /> */}

        {process.env.NODE_ENV === "development" && (
          <>
            <HeaderLinkButton
              label="Dev"
              icon={<PixelEyeIcon scale={1.5} />}
              mobileIconOnly={true}
              href="/private"
              aria-current={pathname === "/private" ? "true" : "false"}
            />
          </>
        )}
        <Separator orientation="vertical" className="h-4" />
        <ThemeSettings className="rounded-full" size={isMobile ? "md" : "sm"} />
        <ModeToggle size={isMobile ? "md" : "sm"} className="rounded-full" variant="ghost" label={true} />
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

type HeaderLinkButtonProps = Omit<Extract<LinkButtonProps, { isExternal?: false }>, "size" | "rounded" | "className" | "children"> & {
  label: string;
  icon?: React.ReactNode;
  mobileIconOnly?: boolean;
  className?: string;
};

function HeaderLinkButton({ label, icon, mobileIconOnly = false, className, ...props }: HeaderLinkButtonProps) {
  const isMobile = useMediaQuery("max-md");
  const buttonSize = isMobile && icon && mobileIconOnly ? "icon" : isMobile ? "md" : "sm";

  return (
    <LinkButton
      variant="ghost"
      rounded={true}
      size={buttonSize}
      className={cn(
        // "font-pixel text-[11px] uppercase",
        // "aria-current:bg-accent aria-current:text-accent-foreground",
        className
      )}
      {...props}
    >
      <span data-icon={isMobile ? null : "inline-start"}>{icon}</span>
      <span className={cn(mobileIconOnly && "max-md:sr-only")}>{label}</span>
    </LinkButton>
  );
}
