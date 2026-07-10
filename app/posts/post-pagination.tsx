"use client";

import { Pagination } from "@/components/blocks/pagination";
import { pageTitleTransitionName } from "@/components/view-transitions";
import { posts } from "@/lib/data/posts";
import { resolveNeighbors } from "@/lib/utils";
import { usePathname } from "next/navigation";

const items = posts.map((post) => ({
  title: post.title,
  path: post.path,
  titleTransitionName: pageTitleTransitionName("post", post.id),
}));

export function PostPagination() {
  const pathname = usePathname();

  if (pathname === "/posts") return null;

  const neighbors = resolveNeighbors(items, pathname, {
    title: "Posts",
    href: "/posts",
  });

  return <Pagination {...neighbors} backHref="/posts" backLabel="Posts" />;
}
