import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { LinkButton } from "@/components/ui/link-button";
import { ScrollToTop } from "@/components/blocks/scroll-to-top";

export function Footer() {
  return (
    <footer className="mx-auto max-w-4xl py-3" style={{ viewTransitionName: "site-footer" }}>
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
          <ScrollToTop />
        </div>
      </div>
    </footer>
  );
}
