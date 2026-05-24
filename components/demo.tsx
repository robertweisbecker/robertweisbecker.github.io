"use client";

import { CodeBlock } from "@/components/code-block";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

type DemoCodeLanguage = "css" | "html" | "js" | "ts" | "json" | "tsx" | "jsx" | "md" | "mdx" | "text";

type DemoCodeConfig = {
  value: string;
  filename?: string;
  language?: DemoCodeLanguage;
  lineNumbers?: boolean;
  /** Passed through to {@link CodeBlock}; enables expand/collapse for long samples. */
  collapsible?: boolean;
  /** Collapsed max height in px when `collapsible` is true. */
  initialHeight?: number;
};

type DemoOverflowBehavior = "wrap" | "scroll" | "resize";

const demoContainerVariants = cva("rounded-[calc(var(--radius-xl)-1px)] max-w-[calc(100%-2px)] mx-px mb-px min-w-0 flex-1", {
  variants: {
    variant: {
      card: "bg-card shadow-border-xs",
      outline: "outline outline-border/50 bg-muted -outline-offset-1",
    },
  },
  defaultVariants: {
    variant: "card",
  },
});

type DemoProps = React.ComponentProps<"figure"> &
  VariantProps<typeof demoContainerVariants> & {
    title?: React.ReactNode;
    controls?: React.ReactNode;
    description?: React.ReactNode;
    caption?: React.ReactNode;
    maxHeight?: number | string;
    overflowBehavior?: DemoOverflowBehavior;
    centerContent?: boolean;
    innerClass?: string;
    headerClassName?: string;
    captionClassName?: string;
    code?: DemoCodeConfig;
  };

function DemoBody({
  children,
  overflowBehavior,
  variant,
  centerContent,
  innerClass,
}: {
  children: React.ReactNode;
  overflowBehavior: DemoOverflowBehavior;
  variant: VariantProps<typeof demoContainerVariants>["variant"];
  centerContent: boolean;
  innerClass?: string;
}) {
  const demoInnerClasses = cn("p-5 flex-1", centerContent && "grid place-items-center", innerClass);

  if (overflowBehavior === "resize") {
    return (
      <ResizablePanelGroup orientation="horizontal" style={{ overflow: "visible" }} className="p-px">
        <ResizablePanel
          defaultSize="100%"
          minSize="25%"
          maxSize="100%"
          className={cn(demoContainerVariants({ variant }), "h-full min-h-56")}
        >
          <div className={demoInnerClasses}>{children}</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="0%" minSize="0%" maxSize="75%">
          <div aria-hidden className="h-full bg-linear-to-r to-muted" />
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  }

  if (overflowBehavior === "scroll") {
    return (
      <div className={cn(demoContainerVariants({ variant }), "max-h-56 min-h-14 w-full overflow-auto")}>
        <div className={cn(demoInnerClasses, "min-w-max")}>{children}</div>
      </div>
    );
  }

  // wrap (default)
  return <div className={cn(demoContainerVariants({ variant }), "min-h-14", demoInnerClasses)}>{children}</div>;
}

export function Demo({
  title,
  controls,
  description,
  caption,
  maxHeight,
  overflowBehavior = "wrap",
  variant = "card",
  centerContent = false,
  innerClass,
  headerClassName,
  captionClassName,
  code,
  className,
  children,
  ...props
}: DemoProps) {
  const canExpand = maxHeight !== undefined;
  const hasHeader = title !== undefined || controls !== undefined || canExpand;
  const hasCode = code?.value !== undefined;

  return (
    <figure data-demo className={cn("not-prose flex flex-col rounded-xl bg-sidebar", className)} {...props}>
      {hasHeader ? (
        <header
          className={cn(
            "flex items-center justify-between gap-2 px-[max(var(--radius-xl),--spacing(3))] pt-2 pb-1.5 text-xs",
            headerClassName
          )}
        >
          <div className="flex grow items-baseline gap-1">
            <span className="min-w-0 font-pixel text-[11px] text-foreground">{title}</span>
            {description ? <span className="text-xs text-muted-foreground">{description}</span> : null}
          </div>
          <div className="flex items-center gap-1">{controls}</div>
        </header>
      ) : null}

      <DemoBody overflowBehavior={overflowBehavior} variant={variant} centerContent={centerContent} innerClass={innerClass}>
        {children}
      </DemoBody>

      {caption ? (
        <figcaption className={cn("px-(--radius-xl) pt-1 pb-2 text-2xs text-muted-foreground", captionClassName)}>{caption}</figcaption>
      ) : null}

      {hasCode ? (
        <CodeBlock
          code={code.value}
          language={code.language}
          filename={code.filename}
          lineNumbers={code.lineNumbers}
          collapsible={code.collapsible}
          initialHeight={code.initialHeight}
          className="-mx-px mt-px rounded-b-none border-y bg-transparent"
        />
      ) : null}
    </figure>
  );
}
