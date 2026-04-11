import { postIcons, posts, type Post } from "@/lib/data/posts";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { ReactNode } from "react";

export const ogSize = {
  width: 1200,
  height: 630,
} as const;

export const ogContentType = "image/png";

type BaseCardProps = {
  title: string;
  description?: string;
  rightSlot?: ReactNode;
};

let faviconDataUriPromise: Promise<string> | undefined;

async function getFaviconDataUri() {
  if (!faviconDataUriPromise) {
    faviconDataUriPromise = readFile(join(process.cwd(), "app/favicon.svg"), "utf8").then(
      (iconSvg) => `data:image/svg+xml;utf8,${encodeURIComponent(iconSvg)}`,
    );
  }

  return faviconDataUriPromise;
}

export async function createOgCard({ title, description, rightSlot }: BaseCardProps) {
  const faviconDataUri = await getFaviconDataUri();

  return new ImageResponse(
    <div
      style={{
        background: "#f4f4f8",
        color: "#131418",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "48px",
        justifyContent: "space-between",
        border: "1px solid #d4d7e0",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "20px",
          borderBottom: "1px solid #d9dce6",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <img src={faviconDataUri} alt="bob.fyi favicon" width={44} height={44} />
          <div style={{ display: "flex", fontSize: 34, fontWeight: 600, letterSpacing: "-0.02em" }}>bob.fyi</div>
        </div>
        <div style={{ display: "flex", minWidth: "160px", justifyContent: "flex-end", alignItems: "center" }}>
          {rightSlot ?? null}
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, alignItems: "center", marginTop: "28px" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, maxWidth: "980px", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              color: "#10131a",
            }}
          >
            {title}
          </div>
          {description ? (
            <div
              style={{
                display: "flex",
                fontSize: 42,
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: "#4b5261",
                textWrap: "balance",
                maxWidth: "760px",
              }}
            >
              {description}
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    ogSize,
  );
}

export async function createPostOgCard(post: Post) {
  const Icon = post.icon ? postIcons[post.icon] : undefined;

  return createOgCard({
    title: post.title,
    description: post.description,
    rightSlot: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            border: "1px solid #cfd4df",
            borderRadius: "999px",
            padding: "8px 14px",
            fontSize: 20,
            color: "#596073",
            background: "#ffffff",
          }}
        >
          {post.date ?? ""}
        </div>
        {Icon ? (
          <div
            style={{
              display: "flex",
              width: "62px",
              height: "62px",
              borderRadius: "14px",
              border: "1px solid #cfd4df",
              background: "#ffffff",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={38} stroke={1.8} color="#384056" />
          </div>
        ) : null}
      </div>
    ),
  });
}

export function getPostById(id: string): Post {
  const post = posts.find((candidate) => candidate.id === id);

  if (!post) {
    throw new Error(`Missing post metadata for id: ${id}`);
  }

  return post;
}
