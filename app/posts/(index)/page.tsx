import { Alert, AlertTitle, AlertDescription, AlertContent } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle } from "@/components/ui/item";
import { NAV_FORWARD_TRANSITION, TitleMorph, pageTitleTransitionName } from "@/components/view-transitions";
import { postIcons, posts, type PostIconName } from "@/lib/data/posts";
import { cn } from "@/lib/utils";
import { IconFile } from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import * as React from "react";

export const metadata: Metadata = {
  title: "Posts",
  description: "Code experiments, demos, and small tools from bob.fyi.",
};

function PostListIcon({ name }: { name?: PostIconName }) {
  const Icon = name ? postIcons[name] : IconFile;
  return <Icon aria-hidden strokeWidth={1} className="opacity-72" />;
}

export default function PostsPage() {
  return (
    <div className="mx-auto grid gap-12">
      <div className="animate-stagger-enter [--stagger:0]">
        <h1 className="mb-4 text-h1">Posts</h1>
        <p className="text-sm text-balance">Code experiments and small tools.</p>
      </div>

      <Alert variant="warning" className="animate-stagger-enter [--stagger:1]">
        <AlertContent>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>Some of the posts below use new or experimental features that may not work in all browsers.</AlertDescription>
        </AlertContent>
      </Alert>

      <ItemGroup className="animate-stagger-enter [--stagger:2]">
        {posts.map((post, index) => (
          <React.Fragment key={post.id}>
            <Item render={<Link href={post.path} transitionTypes={NAV_FORWARD_TRANSITION} />} className="-mx-4">
              <ItemMedia variant="image">
                <PostListIcon name={post.icon} />
              </ItemMedia>
              <ItemContent>
                <TitleMorph name={pageTitleTransitionName("post", post.id)}>
                  <ItemTitle>{post.title}</ItemTitle>
                </TitleMorph>
                <ItemDescription>{post.description}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Badge
                  variant="inherit"
                  className={cn(
                    "font-pixel text-[11px] uppercase",
                    post.category === "Snippet" && "text-navy-500 dark:text-navy-300",
                    post.category === "Demo" && "text-orange-500 dark:text-orange-300",
                    post.category === "Motion" && "text-plum-500 dark:text-plum-300"
                  )}
                >
                  {post.category}
                </Badge>
              </ItemActions>
              <ItemDescription className="text-xs tabular-nums">{post.date}</ItemDescription>
            </Item>
            {index !== posts.length - 1 && <ItemSeparator />}
          </React.Fragment>
        ))}
      </ItemGroup>
    </div>
  );
}
