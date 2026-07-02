"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { PixelEyeIcon, PixelNewspaperIcon, PixelPointerIcon, PixelScribbleIcon, PixelUserIcon } from "@/components/icons-pixel";
import { PixelMorph } from "@/components/pixel-morph";
import { type HeaderMenuProject } from "@/components/header/menu-data";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { responsiveNavButtonSize } from "@/components/ui/button-variants";
import { DataList, DataListItem, DataListLabel, DataListValue } from "@/components/ui/data-list";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLink,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PreviewCardGroup, PreviewCardPrimitive, PreviewCardTrigger } from "@/components/ui/preview-card";

type WorkMenuProps = {
  projects: HeaderMenuProject[];
};

export function WorkMenu({ projects }: WorkMenuProps) {
  const isMobile = useMediaQuery("max-md");
  const pathname = usePathname();
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const previewHandle = React.useMemo(() => PreviewCardPrimitive.createHandle<React.ReactNode>(), []);
  const previewActions = React.useRef<PreviewCardPrimitive.Root.Actions | null>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const mobileIconClasses = "squircle -ms-1 grid-stack size-7 shrink-0 rounded-sm bg-card shadow-border-xs";

  return (
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
        <DropdownMenuTrigger render={<Button variant="ghost" size="sm" rounded className={cn(responsiveNavButtonSize, "group/trigger")} />}>
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
              render={<Link href="/playground/motion" />}
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

            {projects.map((project) => (
              <PreviewCardTrigger
                key={project.id}
                delay={100}
                preview={
                  <div className="flex w-64 flex-col p-1 md:w-sm">
                    {project.heroImage && (
                      <div className="via-smooth relative aspect-video w-full overflow-hidden rounded-lg bg-linear-to-b to-popover">
                        <Image
                          src={project.heroImage}
                          alt={`${project.title} hero preview`}
                          width={320}
                          height={180}
                          sizes="(max-width: 768px) 100vw, 320px"
                          className="object-cover object-top"
                          loading="eager"
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
  );
}
