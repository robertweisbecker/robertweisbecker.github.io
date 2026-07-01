"use client";

import { TableOfContents, type TableOfContentsProps } from "@/components/table-of-contents";
import type { TocItem } from "@/lib/types";
import { slugify } from "@/lib/utils";
import { usePathname } from "next/navigation";
import * as React from "react";

type PostTableOfContentsProps = Omit<TableOfContentsProps, "toc"> & {
  contentId?: string;
};

const headingSelector = "h2, h3, h4, h5, h6";

function getHeadingDepth(heading: HTMLElement) {
  const depth = Number(heading.tagName.slice(1));
  return depth >= 2 && depth <= 6 ? depth : undefined;
}

function getHeadingText(heading: HTMLElement) {
  return (heading.getAttribute("data-toc-text") ?? heading.querySelector(":scope > a.anchor")?.textContent ?? heading.textContent ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function isEligibleHeading(heading: HTMLElement) {
  if (heading.closest("[data-toc-exclude]")) return false;
  if (heading.closest(".not-prose")) return false;
  if (heading.closest(".prose")) return true;
  return heading.hasAttribute("data-toc-heading") || Boolean(heading.querySelector(":scope > a.anchor"));
}

function setHeadingId(heading: HTMLElement, usedIds: Set<string>, text: string) {
  const baseId = slugify(heading.id || text);
  if (!baseId) return undefined;

  let id = baseId;
  let index = 2;

  while (usedIds.has(id)) {
    id = `${baseId}-${index}`;
    index += 1;
  }

  usedIds.add(id);
  heading.id = id;
  heading.querySelector<HTMLAnchorElement>(":scope > a.anchor")?.setAttribute("href", `#${id}`);

  return id;
}

function collectToc(root: HTMLElement): TocItem[] {
  const usedIds = new Set<string>();
  const toc: TocItem[] = [];

  for (const heading of root.querySelectorAll<HTMLElement>(headingSelector)) {
    if (!isEligibleHeading(heading)) continue;

    const depth = getHeadingDepth(heading);
    const text = getHeadingText(heading);
    if (!depth || !text) continue;

    const id = setHeadingId(heading, usedIds, text);
    if (!id) continue;

    toc.push({ id, text, depth });
  }

  return toc;
}

export function PostTableOfContents({ contentId = "post-content", ...props }: PostTableOfContentsProps) {
  const pathname = usePathname();
  const [toc, setToc] = React.useState<TocItem[]>([]);

  React.useEffect(() => {
    const root = document.getElementById(contentId);
    if (!root) return;

    let frame = 0;
    const updateToc = () => setToc(collectToc(root));
    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateToc);
    };

    const observer = new MutationObserver(scheduleUpdate);
    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    scheduleUpdate();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [contentId, pathname]);

  return <TableOfContents toc={toc} {...props} />;
}
