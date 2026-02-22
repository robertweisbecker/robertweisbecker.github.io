"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiArrowDownSLine, RiHomeLine, RiInformationLine, RiCloseLine } from "@remixicon/react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ModeToggle } from "@/components/mode-toggle";
import { projects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 mx-auto max-w-4xl backdrop-blur-xl",
        isHome ? "bg-background/40" : "bg-background/80"
      )}
    >
      <div className="mx-auto flex items-center gap-4 border-b border-border/50 px-4 pb-2 pt-3">
        <Link
          href="/"
          className="flex flex-col text-sm font-semibold leading-tight tracking-wide text-foreground no-underline hover:no-underline"
        >
          bob dot fyi
          <span className="text-xs font-light text-muted-foreground">
            Bob Weisbecker
          </span>
        </Link>

        <div className="flex-1" />

        <Link
          href="/about"
          className={cn(
            "hidden text-sm text-muted-foreground transition-colors hover:text-foreground md:inline-flex",
            pathname === "/about" && "text-foreground font-medium"
          )}
        >
          about
        </Link>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            className="inline-flex items-center gap-1 px-3 text-sm font-normal text-muted-foreground transition-colors hover:text-foreground"
          >
              <span className="hidden md:inline">work</span>
              <span className="md:hidden">menu</span>
              <RiArrowDownSLine
                className={cn(
                  "size-3.5 transition-transform",
                  open && "rotate-180"
                )}
              />
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-72 overflow-hidden rounded-xl p-0 shadow-lg md:w-96"
          >
            <div className="flex items-center justify-between border-b p-3">
              <span className="text-sm font-medium">
                <span className="hidden md:inline">projects</span>
                <span className="md:hidden">work</span>
              </span>
            </div>
            <ul className="p-2">
              {projects.map((project) => (
                <li key={project.id}>
                  <Link
                    href={project.path}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                      pathname === project.path &&
                        "text-foreground font-medium"
                    )}
                  >
                    {project.nickname}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t p-2 md:hidden">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <RiHomeLine className="size-3.5" />
                home
              </Link>
              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <RiInformationLine className="size-3.5" />
                about
              </Link>
            </div>
          </PopoverContent>
        </Popover>

        <ModeToggle />
      </div>
    </nav>
  );
}
