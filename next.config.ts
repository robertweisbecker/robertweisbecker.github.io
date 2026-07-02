import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const basePageExtensions = ["js", "jsx", "md", "mdx", "ts", "tsx"] as const;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "a.ltrbxd.com" },
      { protocol: "https", hostname: "avatar.vercel.sh" },
      { protocol: "https", hostname: "s3-figma-hubfile-images-production.figma.com" },
    ],
  },
  pageExtensions: isDev ? [...basePageExtensions, "private.tsx"] : [...basePageExtensions],
  typescript: {
    tsconfigPath: "tsconfig.build.json",
  },
  experimental: {
    optimizePackageImports: ["@tabler/icons-react"],
    viewTransition: true,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-unwrap-images"],
  },
});

export default withMDX(nextConfig);
