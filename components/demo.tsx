"use client";

  import { CodeBlock } from "@/components/code-block"
  import { Button } from "@/components/ui/button"
  import { Collapsible,CollapsibleIcon,CollapsiblePanel,CollapsibleTrigger } from "@/components/ui/collapsible"
  import { ResizableHandle,ResizablePanel,ResizablePanelGroup } from "@/components/ui/resizable"
  import { cn } from "@/lib/utils"
  import { IconChevronDown } from "@tabler/icons-react"
  import * as React from "react"

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

function toCssLength(value: number | string) {
  return typeof value === "number" ? `${value}px` : value;
}

const card = "rounded-[calc(var(--radius-xl)-2px)] bg-card dark:bg-card/50 shadow-border-xs";

function DemoBody({
  children,
  overflowBehavior,
  maxHeight,
  expanded,
  centerContent,
  innerClass,
}: {
  children: React.ReactNode;
  overflowBehavior: DemoOverflowBehavior;
  maxHeight?: number | string;
  expanded: boolean;
  centerContent: boolean;
  innerClass?: string;
}) {
  const isConstrained = maxHeight !== undefined && !expanded;
  const heightStyle = isConstrained ? { height: toCssLength(maxHeight!) } : undefined;

  const demoInnerClasses = cn("p-4", centerContent && "grid place-items-center", innerClass);

  if (overflowBehavior === "resize") {
    return (
      <ResizablePanelGroup orientation="horizontal" style={{ overflow: "visible" }}>
        <ResizablePanel
          defaultSize="100%"
          minSize="25%"
          maxSize="100%"
          className={cn(card, "h-full min-h-56")}
          style={isConstrained ? heightStyle : { maxHeight: "min(28rem, 70vh)" }}
        >
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
      <div className={cn(card, "w-full overflow-auto", !isConstrained && "max-h-56 min-h-14")} style={heightStyle}>
        <div className={cn(demoInnerClasses, "min-w-max")}>{children}</div>
      </div>
    );
  }

  // wrap (default)
  return (
    <div
      className={cn(card, "min-h-14 overflow-hidden p-4", centerContent && "grid place-items-center", innerClass)}
      style={heightStyle}
    >
      {children}
    </div>
  );
}

export function Demo({
  title,
  controls,
  caption,
  maxHeight,
  overflowBehavior = "wrap",
  centerContent = true,
  innerClass,
  headerClassName,
  captionClassName,
  code,
  className,
  children,
  ...props
}: DemoProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isCodeOpen, setIsCodeOpen] = React.useState(code?.defaultOpen ?? false);
  const canExpand = maxHeight !== undefined;
  const hasHeader = title !== undefined || controls !== undefined || canExpand;
  const hasCode = code?.value !== undefined;

  React.useEffect(() => {
    setIsCodeOpen(code?.defaultOpen ?? false);
  }, [code?.defaultOpen]);

  return (
    <figure data-demo className={cn("not-prose overflow-hidden rounded-xl bg-muted p-px", className)} {...props}>
      {hasHeader ? (
        <header
          className={cn(
            "flex items-center justify-between gap-2 px-[max(var(--radius-xl),--spacing(3))] pt-2 pb-1 text-sm font-medium",
            headerClassName
          )}
        >
          <div className="min-w-0 grow text-foreground">{title}</div>
          <div className="flex items-center gap-1">
            {controls}
            {canExpand ? (
              <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
                <CollapsibleTrigger render={<Button variant="ghost" size="xs" className="rounded-full" />}>
                  {isExpanded ? "Collapse" : "Expand"}
                  <IconChevronDown
                    className={cn("size-4 opacity-64 transition-transform duration-200", isExpanded && "rotate-180")}
                  />
                </CollapsibleTrigger>
              </Collapsible>
            ) : null}
          </div>
        </header>
      ) : null}

      <div className="p-px">
        <DemoBody
          overflowBehavior={overflowBehavior}
          maxHeight={maxHeight}
          expanded={isExpanded}
          centerContent={centerContent}
          innerClass={innerClass}
        >
          {children}
        </DemoBody>
      </div>

      {caption ? (
        <figcaption className={cn("p-2 text-sm text-muted-foreground", captionClassName)}>{caption}</figcaption>
      ) : null}

      {hasCode ? (
        <Collapsible open={isCodeOpen} onOpenChange={setIsCodeOpen}>
          <CollapsiblePanel className="mt-0 border-t p-2">
            <CodeBlock
              code={code.value}
              language={code.language}
              filename={code.filename}
              lineNumbers={code.lineNumbers}
            />
          </CollapsiblePanel>
          <CollapsibleTrigger
            render={<Button variant="ghost" className="w-full rounded-none" />}
            aria-label={isCodeOpen ? "Hide code" : "Show code"}
          >
            Code
            <CollapsibleIcon />
          </CollapsibleTrigger>
        </Collapsible>
      ) : null}
    </figure>
  );
}
