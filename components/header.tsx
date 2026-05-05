"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { ThemeSettings } from "@/components/theme-settings";
import { useMediaQuery } from "@/hooks/use-media-query";
import { projects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";
import { IconBlobFilled, IconChevronDown, IconComponents, IconNews, IconTemplateFilled } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Favicon, PixelChevronDownIcon, PixelNewsIcon } from "./icons";
import { SiteSearch } from "./site-search";
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
import { LayoutGroup, motion } from "motion/react";
import { ProjectMeta } from "./project-meta";
import { Badge } from "./ui/badge";
import { DataList, DataListItem, DataListLabel, DataListValue } from "./ui/data-list";
import * as React from "react";

export function Header() {
  const isMobile = useMediaQuery("max-md");
  const pathname = usePathname();
  const anchorRef = React.useRef<HTMLDivElement>(null);
  // const notHome = pathname !== "/";
  const previewHandle = React.useMemo(() => PreviewCardPrimitive.createHandle<React.ReactNode>(), []);
  const previewActions = React.useRef<PreviewCardPrimitive.Root.Actions | null>(null);

  return (
    <nav className={cn("sticky top-0 z-1")}>
      <div className="max-w-8xl mx-auto flex h-12 items-center gap-3 px-2 py-2 sm:px-4">
        <LinkButton
          href="/"
          variant="ghost"
          size="sm"
          aria-current={pathname === "/" ? "true" : "false"}
          className="me-2 font-pixel"
        >
          <Favicon className="size-4 text-secondary-foreground" />
          <span>
            bob<span className="text-primary">.</span>fyi
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
        {process.env.NODE_ENV === "development" && (
          <>
            <HeaderButton
              label="Components"
              icon={<IconComponents data-icon={isMobile ? null : "inline-start"} />}
              hideTextOnMobile={true}
              href="/components"
              aria-current={pathname === "/components" ? "true" : "false"}
            />
          </>
        )}
        <PreviewCardGroup
          side="right"
          sideOffset={8}
          handle={previewHandle}
          actionsRef={previewActions}
          align="start"
          anchor={anchorRef}
        >
          <DropdownMenu
            modal={false}
            onOpenChange={(open) => {
              if (!open) {
                previewHandle.close();
                previewActions.current?.unmount();
              }
            }}
          >
            <DropdownMenuTrigger render={<Button variant="ghost" size="sm" />} className="group/trigger">
              <span className="hidden md:block">Projects</span>
              <span className="md:hidden">Menu</span>
              <PixelChevronDownIcon
                className={cn("rotate-0 transition-transform duration-100 group-data-pressed/trigger:rotate-180")}
                data-icon="inline-end"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" ref={anchorRef}>
              <DropdownMenuGroup className="md:hidden">
                <DropdownMenuItem render={<Link href="/" />} nativeButton={false}>
                  Home
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/about" />} nativeButton={false}>
                  About
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/posts" />} nativeButton={false}>
                  Posts
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

                {projects.map((project) => (
                  <PreviewCardTrigger
                    key={project.id}
                    delay={100}
                    preview={
                      <>
                        <div className="flex w-64 flex-col p-1 md:w-sm">
                          {project.heroImage && (
                            <img
                              src={project.heroImage}
                              className="via-smooth aspect-video w-full rounded-lg bg-linear-to-b to-popover object-cover object-top"
                            />
                          )}
                          <DataList.Root size="sm" className="px-4 py-2">
                            <DataListItem>
                              <DataListLabel className="font-pixel text-[11px]">Title</DataListLabel>
                              <DataListValue className="font-medium">{project.title}</DataListValue>
                            </DataListItem>
                            <DataListItem>
                              <DataListLabel className="font-pixel text-[11px]">Description</DataListLabel>
                              <DataListValue>{project.description}</DataListValue>
                            </DataListItem>
                            <DataListItem>
                              <DataListLabel className="font-pixel text-[11px]">Date</DataListLabel>
                              <DataListValue>{project.date}</DataListValue>
                            </DataListItem>

                            <DataListItem>
                              <DataListLabel className="font-pixel text-[11px]">Tags</DataListLabel>
                              <DataListValue>
                                <Badge>{project.category}</Badge>
                              </DataListValue>
                            </DataListItem>
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
                      <Avatar className="size-[1lh] p-1 [--avatar-radius:var(--radius-sm)]">
                        <AvatarImage src={project.icon} alt={project.nickname} className="object-contain" />
                      </Avatar>
                    )}
                    {project.nickname}
                    <span className="ms-auto text-xs text-muted-foreground">{project.date}</span>
                  </PreviewCardTrigger>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </PreviewCardGroup>
        <HeaderButton
          label="Posts"
          icon={<PixelNewsIcon data-icon={isMobile ? null : "inline-start"} />}
          hideTextOnMobile={true}
          href="/posts"
          aria-current={pathname.startsWith("/posts") ? "true" : "false"}
          className="max-md:hidden"
        />
        {/* <SiteSearch className="ml-auto" /> */}
        <div className="ms-auto" />
        <ThemeSettings />
        <ModeToggle />
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
      className={cn("backdrop-blur-md aria-current:bg-accent aria-current:text-accent-foreground", props.className)}
    >
      {icon}
      <span className={cn(hideTextOnMobile && "max-md:sr-only")}>{label}</span>
    </LinkButton>
  );
}
