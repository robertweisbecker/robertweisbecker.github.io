import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	images: {
		unoptimized: true,
	},
};

const withMDX = createMDX({
	options: {
		remarkPlugins: [
			"remark-gfm",
			"remark-frontmatter",
			["remark-mdx-frontmatter", { name: "frontmatter" }],
		],
		rehypePlugins: ["rehype-unwrap-images"],
	},
});

export default withMDX(nextConfig);
