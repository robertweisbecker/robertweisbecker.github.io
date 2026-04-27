"use client";

import { CodeBlock } from "@/components/code-block";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import * as React from "react";

type DemoCodeLanguage = "css" | "html" | "js" | "ts" | "json" | "tsx" | "jsx" | "md" | "mdx" | "text";

type DemoCodeConfig = {
  value: string;
  filename?: string;
  language?: DemoCodeLanguage;
  lineNumbers?: boolean;
  defaultOpen?: boolean;
};

type DemoOverflowBehavior = "wrap" | "scroll" | "resize";

type DemoProps = React.ComponentProps<"figure"> & {
  title?: React.ReactNode;
  controls?: React.ReactNode;
  caption?: React.ReactNode;
  maxHeight?: number | string;
  overflowBehavior?: DemoOverflowBehavior;
  centerContent?: boolean;
  innerClass?: string;
  headerClassName?: string;
  captionClassName?: string;
  code?: DemoCodeConfig;
};

const card =
  "rounded-[calc(var(--radius-xl)-1px)] bg-card dark:bg-card shadow-border-xs w-[calc(100%-3px)] mx-auto mb-px";

function DemoBody({
  children,
  overflowBehavior,
  maxHeight,
  centerContent,
  innerClass,
}: {
  children: React.ReactNode;
  overflowBehavior: DemoOverflowBehavior;
  maxHeight?: number | string;
  centerContent: boolean;
  innerClass?: string;
}) {
  const demoInnerClasses = cn("p-4", centerContent && "grid place-items-center", innerClass);

  if (overflowBehavior === "resize") {
    return (
      <ResizablePanelGroup orientation="horizontal" style={{ overflow: "visible" }}>
        <ResizablePanel defaultSize="100%" minSize="25%" maxSize="100%" className={cn(card, "h-full min-h-56")}>
          <div className={demoInnerClasses}>{children}</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="1%" minSize="0%" maxSize="75%">
          <div aria-hidden className="h-full bg-background" />
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  }

  if (overflowBehavior === "scroll") {
    return (
      <div className={cn(card, "max-h-56 min-h-14 w-full overflow-auto")}>
        <div className={cn(demoInnerClasses, "min-w-max")}>{children}</div>
      </div>
    );
  }

  // wrap (default)
  return <div className={cn(card, "min-h-14 overflow-hidden p-4", demoInnerClasses, innerClass)}>{children}</div>;
}

export function Demo({
  title,
  controls,
  caption,
  maxHeight,
  overflowBehavior = "wrap",
  centerContent = false,
  innerClass,
  headerClassName,
  captionClassName,
  code,
  className,
  children,
  ...props
}: DemoProps) {
  const [isCodeOpen, setIsCodeOpen] = React.useState(code?.defaultOpen ?? false);
  const canExpand = maxHeight !== undefined;
  const hasHeader = title !== undefined || controls !== undefined || canExpand;
  const hasCode = code?.value !== undefined;

  React.useEffect(() => {
    setIsCodeOpen(code?.defaultOpen ?? false);
  }, [code?.defaultOpen]);

  return (
    <figure
      data-demo
      className={cn("not-prose overflow-hidden rounded-xl bg-muted dark:outline dark:outline-border/50", className)}
      {...props}
    >
      {hasHeader ? (
        <header
          className={cn(
            "flex items-center justify-between gap-2 px-[max(var(--radius-xl),--spacing(3))] pt-2 pb-2 text-xs text-muted-foreground",
            headerClassName
          )}
        >
          <div className="min-w-0 grow font-pixel text-[11px] uppercase">{title}</div>
          <div className="flex items-center gap-1">{controls}</div>
        </header>
      ) : null}

      <DemoBody
        overflowBehavior={overflowBehavior}
        maxHeight={maxHeight}
        centerContent={centerContent}
        innerClass={innerClass}
      >
        {children}
      </DemoBody>

      {caption ? (
        <figcaption className={cn("p-2 text-sm text-muted-foreground", captionClassName)}>{caption}</figcaption>
      ) : null}

      {hasCode ? (
        <CodeBlock
          code={code.value}
          language={code.language}
          filename={code.filename}
          lineNumbers={code.lineNumbers}
          className="-mx-px mt-px rounded-b-none bg-transparent"
        />
      ) : null}
    </figure>
  );
}
