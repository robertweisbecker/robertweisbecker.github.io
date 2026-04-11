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
      <>
        {children}
        <PostPagination />
      </>
    );
  }

  const post = posts.find((p) => p.path === pathname);

  return (
    <div className="container mx-auto flex max-w-4xl flex-col items-center gap-6">
      <div className="flex w-full max-w-2xl flex-col gap-4">
        <BackButton href="/posts" />
        <h1 className="text-2xl font-[550] tracking-tight">{post?.title}</h1>
      </div>
      {children}
      <PostPagination />
    </div>
  );
}
