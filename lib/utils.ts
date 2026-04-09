  import { clsx,type ClassValue } from "clsx"
  import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export type PaginationLink = { title: string; href: string };
type NavItem = { title: string; path: string };

export function resolveNeighbors(
  items: NavItem[],
  currentPath: string,
  indexFallback?: PaginationLink
): { previous?: PaginationLink; next?: PaginationLink } {
  const i = items.findIndex((item) => item.path === currentPath);
  if (i === -1) return {};

  const prev = items[i - 1];
  const next = items[i + 1];

  return {
    previous: prev ? { title: prev.title, href: prev.path } : indexFallback,
    next: next ? { title: next.title, href: next.path } : undefined,
  };
}
