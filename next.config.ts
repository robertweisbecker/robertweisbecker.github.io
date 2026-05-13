import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatar.vercel.sh" },
      { protocol: "https", hostname: "s3-figma-hubfile-images-production.figma.com" },
    ],
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
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
