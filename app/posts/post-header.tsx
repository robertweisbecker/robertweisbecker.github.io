"use client";

import { BackButton } from "@/components/back-button";
import { PostTableOfContents } from "@/components/post-table-of-contents";
import { TitleMorph, pageTitleTransitionName } from "@/components/view-transitions";
import { posts } from "@/lib/data/posts";
import { formatPostDateForDisplay } from "@/lib/parse-post-date";
import { usePathname } from "next/navigation";

function useCurrentPost() {
  const pathname = usePathname();
  return posts.find((post) => post.path === pathname);
}

export function PostRouteTableOfContents({ contentId }: { contentId: string }) {
  const post = useCurrentPost();

  return <PostTableOfContents contentId={contentId} title={post?.title} />;
}

export function PostHeader() {
  const post = useCurrentPost();

  return (
    <div className="flex w-full max-w-xl flex-col gap-8">
      <PostTopBar date={post?.date} />
      {post ? (
        <TitleMorph name={pageTitleTransitionName("post", post.id)}>
          <h1 className="text-h1">{post.title}</h1>
        </TitleMorph>
      ) : (
        <h1 className="text-h1">Post</h1>
      )}
    </div>
  );
}

function PostTopBar({ date }: { date?: string }) {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-4 border-b border-dashed pb-4">
      <BackButton href="/posts">Posts</BackButton>
      {date ? (
        <time className="font-pixel text-sm text-[11px] text-muted-foreground" dateTime={date}>
          {formatPostDateForDisplay(date)}
        </time>
      ) : (
        "∞"
      )}
    </div>
  );
}
