"use client";

import { BackButton } from "@/components/back-button";
import { posts } from "@/lib/data/posts";
import { usePathname } from "next/navigation";
import { PostPagination } from "./post-pagination";

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isIndex = pathname === "/posts";

  if (isIndex) {
    return (
      <div className="mx-auto flex flex-col items-center gap-6">
        {children}
        <PostPagination />
      </div>
    );
  }

  const post = posts.find((p) => p.path === pathname);

  return (
    <div className="container mx-auto flex max-w-4xl flex-col items-center gap-6">
      {/* post title */}
      <div className="flex w-full max-w-xl flex-col gap-8">
        <PostTopBar date={post?.date} />
        <h1 className="text-h1">{post?.title}</h1>
      </div>
      {children}
      <PostPagination />
    </div>
  );
}

function PostTopBar({ date }: { date?: string }) {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-4 border-b border-dashed pb-4">
      <BackButton href="/posts">Posts</BackButton>
      {date ? (
        <time className="font-pixel text-sm text-[11px] text-muted-foreground" dateTime={date}>
          {Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(
            new Date(date || new Date())
          )}
        </time>
      ) : (
        "∞"
      )}
    </div>
  );
}
