  import { Demo } from "@/components/demo"
  import { Image } from "@/components/image"
  import { ImageModal } from "@/components/image-modal"
  import { ImageToggle } from "@/components/image-toggle"
  import { LayoutGrid } from "@/components/layout-grid"
  import { LinkOut } from "@/components/link-out"
  import { ProjectImageCarousel } from "@/components/project-image-carousel"
  import { Stats } from "@/components/stats"
  import { Separator } from "@/components/ui/separator"
  import { Video } from "@/components/video"
  import { slugify } from "@/lib/utils"
  import { IconLinkFilled } from "@tabler/icons-react"
  import type { MDXComponents } from "mdx/types"
  import Link from "next/link"
  import React from "react"
  import { CodeBlock,type CodeBlockProps } from "./components/code-block"

function createHeading(level: number) {
  const HeadingTag = `h${level}` as "h2" | "h3" | "h4";
  const Heading = ({ children }: { children?: React.ReactNode }) => {
    const slug = slugify(String(children));
    return (
      <HeadingTag id={slug}>
        <a href={`#${slug}`} className="anchor group/anchor relative">
          <span className="absolute -inset-s-4 grid-stack h-lh opacity-0 transition-[opacity,translate] group-hover/anchor:-translate-x-1 group-hover/anchor:opacity-64 group-focus/anchor:-translate-x-1 group-focus/anchor:opacity-64">
            <IconLinkFilled className="size-[.875em]" />
          </span>
          {children}
        </a>
      </HeadingTag>
    );
  };
  Heading.displayName = `Heading${level}`;
  return Heading;
}

export function useMDXComponents(): MDXComponents {
  return {
    Image,
    ImageModal,
    ImageToggle,
    Demo,
    ProjectImageCarousel,
    LayoutGrid,
    LinkOut,
    Stats,
    Video,
    Separator,
    pre: ({ children, ...props }) => {
      const codeElement = React.isValidElement<{ className?: string; children?: React.ReactNode }>(children)
        ? children
        : null;
      const className = codeElement?.props?.className ?? "";
      const language = className.replace("language-", "") || undefined;
      const code = String(codeElement?.props?.children ?? "").replace(/\n$/, "");
      return (
        <CodeBlock
          {...props}
          code={code}
          language={language as CodeBlockProps["language"]}
          title={language as string}
        />
      );
    },
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    img: (props) => <Image {...(props as React.ImgHTMLAttributes<HTMLImageElement>)} className="my-16" />,
    a: ({ href, children, ...props }) => {
      if (href?.startsWith("/")) {
        return (
          <Link href={href} {...props} className="link">
            {children}
          </Link>
        );
      }
      if (href?.startsWith("#")) {
        return (
          <a href={href} {...props}>
            {children}
          </a>
        );
      }
      return <LinkOut className="not-prose" text={String(children)} href={href} {...props} />;
    },
  };
}
