import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { postIcons, posts, type PostIconName } from "@/lib/data/posts";
import { cn } from "@/lib/utils";
import { IconFile } from "@tabler/icons-react";
import Link from "next/link";
import * as React from "react";

function PostListIcon({ name }: { name?: PostIconName }) {
  const Icon = name ? postIcons[name] : IconFile;
  return <Icon aria-hidden strokeWidth={1} className="opacity-72" />;
}

export default function PostsPage() {
  return (
    <div className="mx-auto grid max-w-2xl gap-12">
      <div>
        <h1 className="font-medium">Posts</h1>
        <p className="mt-1 text-balance">Code experiments and small tools.</p>
      </div>

      <ItemGroup className="">
        {posts.map((post, index) => (
          <React.Fragment key={post.id}>
            <Item render={<Link href={post.path} />} className="-mx-4">
              <ItemMedia variant="image">
                <PostListIcon name={post.icon} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{post.title}</ItemTitle>
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
