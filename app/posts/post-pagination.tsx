"use client";

import { Pagination } from "@/components/pagination";
import { posts } from "@/lib/data/posts";
import { resolveNeighbors } from "@/lib/utils";
import { usePathname } from "next/navigation";

const items = posts.map((p) => ({ title: p.title, path: p.path }));

export function PostPagination() {
  const pathname = usePathname();

  if (pathname === "/posts") return null;

  const neighbors = resolveNeighbors(items, pathname, {
    title: "Posts",
    href: "/posts",
  });

  return <Pagination {...neighbors} backHref="/posts" backLabel="Posts" />;
}
