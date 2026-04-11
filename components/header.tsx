"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { ThemeSettings } from "@/components/theme-settings";
import { useMediaQuery } from "@/hooks/use-media-query";
import { projects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";
import { IconBlobFilled, IconChevronDown, IconComponents, IconNews, IconTemplateFilled } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Favicon } from "./icons";
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

export function Header() {
  const isMobile = useMediaQuery("max-md");
  const pathname = usePathname();
  // const notHome = pathname !== "/";

  return (
    <nav className={cn("sticky top-0 z-10")}>
      <div className="mx-auto flex h-12 items-center gap-1 px-2 py-2 sm:px-4">
        <LinkButton
          href="/"
          variant="ghost"
          size="sm"
          aria-current={pathname === "/" ? "true" : "false"}
          className="font-pixel"
        >
          <Favicon className="size-4 text-primary" />
          <span>
            bob<span className="text-primary">.</span>fyi
          </span>
        </LinkButton>

        <LinkButton
          href="/about"
          variant="ghost"
          size="sm"
          aria-current={pathname === "/about" ? "true" : "false"}
          className="text-muted-foreground aria-current:bg-accent aria-current:text-accent-foreground max-md:hidden"
        >
          About
        </LinkButton>
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

        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" size="sm" />}
            className="group/trigger text-muted-foreground"
            openOnHover={true}
          >
            <span className="hidden md:block">Projects</span>
            <span className="md:hidden">Menu</span>
            <IconChevronDown
              className={cn("rotate-0 transition-transform duration-100 group-data-pressed/trigger:rotate-180")}
              data-icon="inline-end"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Projects</DropdownMenuLabel>
              {projects.map((project) => (
                <DropdownMenuLink
                  key={project.id}
                  render={<Link href={project.path} />}
                  aria-current={pathname === project.path ? "true" : "false"}
                  className="pe-8 aria-current:bg-accent aria-current:text-accent-foreground"
                >
                  {project.nickname}
                </DropdownMenuLink>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="md:hidden" />

            <DropdownMenuItem render={<Link href="/" />} nativeButton={false} className="md:hidden">
              Home
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/about" />} nativeButton={false} className="md:hidden">
              About
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/posts" />} nativeButton={false} className="md:hidden">
              <IconNews />
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
          </DropdownMenuContent>
        </DropdownMenu>
        <HeaderButton
          label="Posts"
          icon={<IconNews data-icon={isMobile ? null : "inline-start"} />}
          hideTextOnMobile={true}
          href="/posts"
          aria-current={pathname.startsWith("/posts") ? "true" : "false"}
        />
        <ThemeSettings className="ml-auto" />
        <ModeToggle />
      </div>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 isolate -z-1 h-24 transform-gpu",
          "backdrop-blur-sm",
          //   "bg-background",
          "via-smooth bg-linear-to-b from-background/90",
          "mask-b-from-black mask-b-from-25% mask-b-to-black/0"
        )}
      ></div>
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
        "text-muted-foreground aria-current:bg-accent aria-current:text-accent-foreground",
        props.className
      )}
    >
      {icon}
      <span className={cn(hideTextOnMobile && "max-md:sr-only")}>{label}</span>
    </LinkButton>
  );
}
