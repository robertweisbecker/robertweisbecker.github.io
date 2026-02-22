"use client";

import { RiGithubFill, RiLinkedinBoxFill, RiArticleLine, RiArrowUpLine } from "@remixicon/react";
import { Button, buttonVariants } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="mx-auto max-w-4xl border-t border-border/50 px-4 py-5">
      <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
        <p className="text-[0.625rem] text-muted-foreground">
          &copy; {new Date().getFullYear()} Robert Weisbecker
        </p>

        <div className="flex gap-1">
          <a
            href="https://www.linkedin.com/in/robertweisbecker/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <RiLinkedinBoxFill className="size-4" />
          </a>
          <a
            href="https://github.com/robertweisbecker"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <RiGithubFill className="size-4" />
          </a>
          <a
            href="https://read.cv/weisbecker"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="read.cv"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <RiArticleLine className="size-4 rotate-[15deg]" />
          </a>
        </div>

        <Button
          variant="outline"
          size="icon-sm"
          className="rounded-full"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <RiArrowUpLine className="size-3.5" />
        </Button>
      </div>
    </footer>
  );
}
