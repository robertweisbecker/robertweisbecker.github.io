import { posts, type Post } from "@/lib/data/posts";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Masthead uses Inter Display so glyphs don’t fall back to Season Mix (headline-only serif below).

const INTER_DISPLAY_FONT_PATH = "app/fonts/InterDisplay-Regular.ttf";

let interFontPromise: Promise<ArrayBuffer> | undefined;
let seasonMixFontPromise: Promise<ArrayBuffer> | undefined;

async function getInterFont(): Promise<ArrayBuffer> {
  if (!interFontPromise) {
    interFontPromise = readFile(join(process.cwd(), INTER_DISPLAY_FONT_PATH)).then((buf) =>
      buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
    );
  }
  return interFontPromise;
}

async function getSeasonMixFont(): Promise<ArrayBuffer> {
  if (!seasonMixFontPromise) {
    seasonMixFontPromise = readFile(join(process.cwd(), "app/fonts/SeasonMix-Bold.ttf")).then((buf) =>
      buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
    );
  }
  return seasonMixFontPromise;
}

export const ogSize = {
  width: 1200,
  height: 630,
} as const;

export const ogContentType = "image/png";

type BaseCardProps = {
  title: string;
};

const colors = {
  bg: "#f4f0ec",
  fg: "#555351",
  border: "#dad5cf",
  fg2: "#aaaaaa",
};

export async function createOgCard({ title }: BaseCardProps) {
  const [interData, seasonMixData] = await Promise.all([getInterFont(), getSeasonMixFont()]);

  return new ImageResponse(
    <div
      style={{
        background: colors.bg,
        color: colors.fg,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "56px",
        fontFamily: "sans-serif",
      }}
    >
      {[
        <div
          key="masthead"
          style={{
            display: "flex",
            fontSize: 32,
            fontWeight: 500,
            color: colors.fg,
            letterSpacing: "0.01em",
            fontFamily: "Inter Display",
          }}
        >
          <span style={{ color: colors.fg2 }}>https://</span>bob.fyi
        </div>,
        <div key="spacer" style={{ flex: 1, minHeight: 0 }} />,
        <div
          key="title-wrap"
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "1000px",
            gap: 32,
          }}
        >
          <h1
            style={{
              display: "flex",
              margin: 0,
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 0.95,
              color: colors.fg,
              textWrap: "balance",
              fontFamily: "Season Mix",
              borderBottom: `2px solid ${colors.border}`,
              paddingBottom: 32,
            }}
          >
            {title}
          </h1>
          <h2
            style={{
              display: "flex",
              margin: 0,
              fontSize: 48,
              fontWeight: 500,
              letterSpacing: "-0.005em",
              lineHeight: 0.95,
              color: colors.fg,
              textWrap: "balance",
              paddingBottom: 32,
              opacity: 0.8,
              fontFamily: "Inter Display",
            }}
          >
            Robert Weisbecker
          </h2>
        </div>,
      ]}
    </div>,
    {
      ...ogSize,
      fonts: [
        {
          name: "Inter Display",
          data: interData,
          weight: 400,
          style: "normal",
        },
        {
          name: "Season Mix",
          data: seasonMixData,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}

export async function createPostOgCard(post: Post) {
  return createOgCard({
    title: post.title,
  });
}

export function getPostById(id: string): Post {
  const post = posts.find((candidate) => candidate.id === id);

  if (!post) {
    throw new Error(`Missing post metadata for id: ${id}`);
  }

  return post;
}
