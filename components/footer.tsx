"use client";

import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { IconBrandLinkedin, IconCircleArrowUp } from "@tabler/icons-react";
import { LinkButton } from "./ui/link-button";

export function Footer() {
  return (
    <footer className="mx-auto max-w-4xl py-3">
      <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
        <p className="text-xs text-muted-foreground" suppressHydrationWarning>
          &copy; {new Date().getFullYear()} Robert Weisbecker
        </p>

        <div className="flex gap-1">
          <LinkButton variant="ghost" size="icon" href="https://www.linkedin.com/in/robertweisbecker/" aria-label="LinkedIn">
            <LinkedinIcon />
          </LinkButton>
          <LinkButton href="https://github.com/robertweisbecker" aria-label="GitHub" variant="ghost" size="icon">
            <GithubIcon />
          </LinkButton>
          <Button variant="ghost" size="icon" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top">
            {/* <IconCircleArrowUp /> */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 21h8v-2H8zm0-4h8v-2H8z" />
              <path d="M8 17h2v-6H8zm-5-4h5v-2H3zm0-2h2V9H3zm2-2h2V7H5zm2-2h2V5H7zm2-2h2V3H9zm2-2h2V1h-2zm2 2h2V3h-2zm2 2h2V5h-2zm2 2h2V7h-2zm2 4h2V9h-2zm-3 0h3v-2h-3zm-2 4h2v-6h-2z" />
            </svg>
          </Button>
        </div>
      </div>
    </footer>
  );
}
