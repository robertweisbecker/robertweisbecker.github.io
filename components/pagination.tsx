import type { PaginationLink } from "@/lib/utils";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";

type PaginationProps = {
  previous?: PaginationLink;
  next?: PaginationLink;
  backHref?: string;
  backLabel?: string;
};

export function Pagination({ previous, next, backHref, backLabel = "Index" }: PaginationProps) {
  if (!previous && !next && !backHref) return null;

  if (!previous && !next && backHref) {
    return (
      <nav aria-label="pagination" className="mt-12 w-full border-t border-border pt-6">
        <Link
          href={backHref}
          aria-label={`Go back to ${backLabel}`}
          className="group inline-flex items-center gap-2 text-sm font-medium text-foreground no-underline transition-colors hover:text-foreground/80"
        >
          <IconChevronLeft className="transition-transform group-hover:-translate-x-0.5" />
          <span>{backLabel}</span>
        </Link>
      </nav>
    );
  }

  return (
    <nav aria-label="pagination" className="mx-auto mt-12 grid w-full max-w-5xl grid-cols-[1fr_1fr] border-t border-dashed pt-6">
      {previous ? (
        <Link
          href={previous.href}
          aria-label={`Go to previous page: ${previous.title}`}
          className="group grid grid-cols-[auto_1fr] grid-rows-[auto_auto] gap-x-3"
        >
          <span
            className="row-2 mt-px shrink-0 font-pixel text-[22px] leading-none text-muted-foreground transition-transform group-hover:-translate-x-1 group-hover:text-foreground"
            aria-hidden="true"
          >
            ⟨
          </span>
          <span className="col-start-2 text-[0.8125rem] leading-4.5 text-muted-foreground/50">Previous</span>

          <span className="col-start-2 truncate font-heading text-lg" style={{ fontVariationSettings: '"SERF" 40, "wght" 640' }}>
            {previous.title}
          </span>
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          href={next.href}
          aria-label={`Go to next page: ${next.title}`}
          className="group grid grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-x-3 text-end"
        >
          <span className="col-start-1 text-[0.8125rem] leading-4.5 text-muted-foreground/50">Next</span>
          <span className="col-start-1 truncate font-heading text-lg" style={{ fontVariationSettings: '"SERF" 40, "wght" 640' }}>
            {next.title}
          </span>
          <span
            className="col-2 row-2 mt-px shrink-0 font-pixel text-[22px] leading-none text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground"
            aria-hidden="true"
          >
            ⟩
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
