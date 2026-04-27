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
  description?: ReactNode;
  rightSlot?: ReactNode;
  icon?: ReactNode;
};

let faviconDataUriPromise: Promise<string> | undefined;

async function getFaviconDataUri() {
  if (!faviconDataUriPromise) {
    faviconDataUriPromise = readFile(join(process.cwd(), "app/favicon.svg"), "utf8").then(
      (iconSvg) => `data:image/svg+xml;utf8,${encodeURIComponent(iconSvg)}`
    );
  }

  return faviconDataUriPromise;
}

// Satori (next/og) cannot parse variable fonts — use a static TTF/OTF cut here.
// Ref: https://github.com/vercel/satori/issues/162, /issues/712
const SEASON_STATIC_FONT_PATH: string | null = "app/fonts/SeasonMix-Medium.ttf";

let seasonFontDataPromise: Promise<ArrayBuffer> | undefined;

async function getSeasonFontData(): Promise<ArrayBuffer | null> {
  if (!SEASON_STATIC_FONT_PATH) return null;
  if (!seasonFontDataPromise) {
    const fontPath = SEASON_STATIC_FONT_PATH;
    seasonFontDataPromise = readFile(join(process.cwd(), fontPath)).then((buf) =>
      buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
    );
  }

  return seasonFontDataPromise;
}

const colors = {
  bg: "#f4f0ec",
  fg: "#555351",
  border: "#dad5cf",
  fg2: "#6c6864",
};

export async function createOgCard({ title, description, rightSlot, icon }: BaseCardProps) {
  const [fontData, faviconDataUri] = await Promise.all([getSeasonFontData(), getFaviconDataUri()]);

  return new ImageResponse(
    <div
      style={{
        background: colors.bg,
        color: colors.fg,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "48px",
        border: `1px solid ${colors.border}`,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "20px",
          borderBottom: `2px dashed ${colors.border}`,
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
          }}
        >
          <div style={{ fontSize: 24, color: colors.fg, fontFamily: "ui-monospace" }}>bob.fyi</div>
        </div>
        <div
          style={{
            display: "flex",
            minWidth: "160px",
            justifyContent: "flex-end",
            alignItems: "center",
            fontFamily: "sans-serif",
          }}
        >
          {rightSlot ?? null}
        </div>
      </div>
      {icon ? (
        <div
          style={{
            display: "flex",
            width: "144px",
            height: "144px",
            borderRadius: "32px",
            border: `1px solid ${colors.border}`,
            background: "#ffffff",
            alignItems: "center",
            justifyContent: "center",
            color: colors.fg2,
            marginBottom: "28px",
            fontSize: 96,
          }}
        >
          {icon}
        </div>
      ) : (
        <img src={faviconDataUri} width={144} height={144} />
      )}

      <div
        style={{ display: "flex", flexDirection: "column", flex: 1, maxWidth: "980px", gap: "4px", marginTop: "auto" }}
      >
        <h1
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: colors.fg,
            textWrap: "balance",
            fontFamily: fontData ? "Season Mix, sans-serif" : "sans-serif",
          }}
        >
          {title}
        </h1>
        {description ? (
          <p
            style={{
              display: "flex",
              fontSize: 32,
              lineHeight: 1.2,
              fontWeight: 500,
              color: colors.fg2,
              textWrap: "balance",
              flexWrap: "wrap",
              maxWidth: "760px",
              fontFamily: "sans-serif",
            }}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>,
    {
      ...ogSize,
      // ...(fontData
      //   ? {
      //       fonts: [

      //         {
      //           name: "Season Mix",
      //           data: fontData,
      //           weight: 500,
      //           style: "normal",
      //         },
      //       ],
      //     }
      //   : {}),
    }
  );
}

export async function createPostOgCard(post: Post) {
  const Icon = post.icon ? postIcons[post.icon] : undefined;

  return createOgCard({
    title: "Robert Weisbecker",
    description: (
      <>
        {post.title}
        <span style={{ opacity: 0.5 }}> — {post.description ?? ""}</span>
      </>
    ),
    icon: Icon ? <Icon size={48} stroke={1.8} color="#384056" /> : undefined,
    rightSlot: (
      <div
        style={{
          display: "flex",
          border: "1px solid #cfd4df",
          borderRadius: "999px",
          padding: "8px 14px",
          fontSize: 20,
          color: "#596073",
          fontFamily: "monospace",
        }}
      >
        {post.date ?? ""}
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
