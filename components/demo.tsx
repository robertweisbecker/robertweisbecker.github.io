"use client";

import { CodeBlock } from "@/components/code-block";
import { Separator } from "@/components/ui/separator";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { InfoTip } from "./info-tip";

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
      outline: "bg-muted",
      plain: "bg-transparent",
      muted: "m-0 max-w-[unset]",
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
    plain?: boolean;
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
  const demoInnerClasses = cn("p-4 flex-1 overflow-hidden", centerContent && "grid place-items-center", innerClass);

  if (overflowBehavior === "resize") {
    return (
      <ResizablePanelGroup orientation="horizontal" style={{ overflow: "visible" }} className="max-w-full p-px" data-slot="demo-body">
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
      <div className={cn(demoContainerVariants({ variant }), "max-h-56 min-h-14 max-w-full min-w-0")}>
        <ScrollArea orientation="horizontal" className="size-full" scrollFade innerClass={demoInnerClasses}>
          {children}
        </ScrollArea>
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
  plain,
  ...props
}: DemoProps) {
  const canExpand = maxHeight !== undefined;
  const hasHeader = title !== undefined || controls !== undefined || canExpand;
  const hasCode = code?.value !== undefined;

  return (
    <figure data-demo className={cn("not-prose flex min-w-0 flex-col rounded-xl", !plain ? "bg-muted/50" : "", className)} {...props}>
      {hasHeader ? (
        <header
          className={cn(
            "flex items-center justify-between gap-2 ps-[max(var(--radius-xl),--spacing(3))] pe-2 pt-2 pb-1.5 text-xs",
            headerClassName
          )}
        >
          <div className="flex flex-1 flex-wrap items-center gap-x-2 gap-y-0">
            <div className="min-w-0 font-[450] text-foreground">{title}</div>
            {description ? (
              <>
                <p className="truncate text-xs text-muted-foreground max-sm:hidden">∙ {description}</p>
                <InfoTip className="sm:hidden" description={description} />
              </>
            ) : null}
          </div>
          {controls ? (
            <>
              <Separator orientation="vertical" className="h-3" />
              <div className="flex items-center justify-end gap-1">{controls}</div>
            </>
          ) : null}
        </header>
      ) : null}

      <DemoBody overflowBehavior={overflowBehavior} variant={variant} centerContent={centerContent} innerClass={innerClass}>
        {children}
      </DemoBody>

      {caption ? (
        <figcaption className={cn("px-(--radius-xl) pt-1.5 pb-2 text-xs text-muted-foreground", captionClassName)}>{caption}</figcaption>
      ) : null}

      {hasCode ? (
        <CodeBlock
          code={code.value}
          language={code.language}
          filename={code.filename}
          lineNumbers={code.lineNumbers}
          collapsible={code.collapsible}
          initialHeight={code.initialHeight}
          className="m-px rounded-b-[inherit] border border-border"
        />
      ) : null}
    </figure>
  );
}
