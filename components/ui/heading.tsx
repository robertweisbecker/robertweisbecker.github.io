import { cn, slugify } from "@/lib/utils";
import { IconLinkFilled } from "@tabler/icons-react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const headingVariants = cva(
  ['scroll-32 lg:scroll-18 [&+hr]:my-16 [&+[data-slot="separator"]]:my-16 first:mt-0 last:mb-0 [&+p]:mt-2 text-pretty'],
  {
    variants: {
      level: {
        1: [
          "mb-2 text-3xl leading-none font-semibold tracking-tight text-balance [&+section]:mt-6",
          // 'first-of-type:not-only:pb-8 first-of-type:not-only:border-b',
        ],
        2: [" mt-16 mb-4 scroll-mt-20 text-base font-[550] tracking-[-.02em] [&+h3]:mt-6 [&~hr]:mt-16"],
        3: [
          "text-[1.1875rem] scroll-mt-20 font-medium leading-normal tracking-[-.01875rem] text-balance mt-16",
          "has-[+h4]:text-xs has-[+h4]:leading-loose has-[+h4]:font-medium has-[+h4]:font-mono has-[+h4]:tracking-widest has-[+h4]:uppercase has-[+h4]:text-muted-foreground",
        ],
        4: "text-base scroll-mt-20 font-medium tracking-snug leading-tight mt-12 opacity-90",
        5: "text-[.9375rem] font-semibold leading-normal tracking-[-.00875em] mt-12",
        6: "text-sm font-semibold tracking-[-.0065em] mt-12",
      },
      defaultVariants: {
        level: 2,
      },
    },
  }
);

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  level?: HeadingLevel;
  render?: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}

function getNodeText(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) return getNodeText(node.props.children);
  return "";
}

function getHeadingId(id: React.HTMLAttributes<HTMLHeadingElement>["id"], children: React.ReactNode) {
  if (id) return id;
  const text = getNodeText(children);
  const generatedId = slugify(text);
  return generatedId || undefined;
}

function Heading({ level = 2, render, className, children, ...props }: HeadingProps) {
  const classes = cn(headingVariants({ level }), className);
  const headingId = getHeadingId(props.id, children);
  const headingContent = headingId ? (
    <a href={`#${headingId}`} className="anchor group/anchor relative">
      <span className="absolute inset-y-0 -inset-s-[.5em] grid-stack opacity-0 transition-[opacity,translate] group-hover/anchor:-translate-x-[.5em] group-hover/anchor:opacity-100 group-focus/anchor:-translate-x-[.5em] group-focus/anchor:opacity-100 group-focus/anchor:duration-0">
        <IconLinkFilled className="size-[.75em] text-current/50" />
      </span>
      {children}
    </a>
  ) : (
    children
  );

  if (render && React.isValidElement(render)) {
    return React.cloneElement(render, {
      ...props,
      id: headingId,
      "data-toc-heading": level > 1 ? "" : undefined,
      ...(render.props as Record<string, unknown>),
      className: cn(classes, (render.props as { className?: string }).className),
      children: (render.props as { children?: React.ReactNode }).children ?? headingContent,
    } as React.HTMLAttributes<HTMLElement>);
  }

  const Tag = `h${level}` as const;

  return (
    <Tag className={classes} id={headingId} data-toc-heading={level > 1 ? "" : undefined} {...props}>
      {headingContent}
    </Tag>
  );
}

export { Heading, headingVariants };
