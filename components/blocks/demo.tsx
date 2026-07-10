"use client";

import { CodeBlock } from "@/components/code-block";
import { InfoTip } from "@/components/info-tip";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

export type DemoCodeLanguage = "css" | "html" | "js" | "ts" | "json" | "tsx" | "jsx" | "md" | "mdx" | "text";

export type DemoCodeConfig = {
  value: string;
  filename?: string;
  language?: DemoCodeLanguage;
  lineNumbers?: boolean;
  /** Passed through to {@link CodeBlock}; enables expand/collapse for long samples. */
  collapsible?: boolean;
  /** Collapsed max height in px when `collapsible` is true. */
  initialHeight?: number;
};

export type DemoOverflowBehavior = "wrap" | "scroll" | "resize";

export type DemoRootProps = React.ComponentProps<"figure"> & {
  /** Removes the default muted canvas behind the demo content. */
  plain?: boolean;
};

export function DemoRoot({ className, plain, ...props }: DemoRootProps) {
  return (
    <figure
      data-demo
      data-slot="demo-root"
      className={cn("not-prose flex min-w-0 flex-col rounded-xl", !plain && "bg-neutral-75 dark:bg-neutral-950", className)}
      {...props}
    />
  );
}

export type DemoHeaderProps = React.ComponentProps<"header">;

export function DemoHeader({ className, ...props }: DemoHeaderProps) {
  return (
    <header
      data-slot="demo-header"
      className={cn(
        "flex items-center justify-between gap-2 rounded-t-xl ps-[max(var(--radius-xl),--spacing(3))] pe-2 pt-2 pb-1.5 text-sm",
        className
      )}
      {...props}
    />
  );
}

export type DemoTitleProps = React.ComponentProps<"div">;

export function DemoTitle({ className, ...props }: DemoTitleProps) {
  return <div data-slot="demo-title" className={cn("min-w-0 text-foreground", className)} {...props} />;
}

export type DemoDescriptionProps = React.ComponentProps<"p"> & {
  /** Text or node rendered before the desktop description. */
  prefix?: React.ReactNode;
  /** Shows the responsive InfoTip when the inline description is hidden. */
  showInfoTip?: boolean;
  infoTipTitle?: React.ReactNode;
  infoTipClassName?: string;
};

export function DemoDescription({
  children,
  className,
  prefix = "∙",
  showInfoTip = true,
  infoTipTitle,
  infoTipClassName,
  ...props
}: DemoDescriptionProps) {
  return (
    <>
      <p data-slot="demo-description" className={cn("truncate text-xs text-muted-foreground max-sm:hidden", className)} {...props}>
        {prefix ? <>{prefix} </> : null}
        {children}
      </p>
      {showInfoTip ? <InfoTip className={cn("sm:hidden", infoTipClassName)} title={infoTipTitle} description={children} /> : null}
    </>
  );
}

const demoContentVariants = cva("rounded-[calc(var(--radius-2xl)-1px)] max-w-[calc(100%-2px)] mx-px mb-px min-w-0 flex-1", {
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

// ------------------------------------------------------------

export type DemoContentProps = React.ComponentProps<"div"> &
  VariantProps<typeof demoContentVariants> & {
    /** How content that exceeds its demo card should be handled. */
    overflowBehavior?: DemoOverflowBehavior;
    /** Centers children inside the demo content area. */
    centerContent?: boolean;
    /** Classes applied to the innermost content wrapper. */
    innerClass?: string;
    /** Max height for scrollable or wrapped demo content. */
    maxHeight?: number | string;
  };

export function DemoContent({
  children,
  className,
  style,
  overflowBehavior = "wrap",
  variant = "card",
  centerContent = false,
  innerClass,
  maxHeight,
  ...props
}: DemoContentProps) {
  const demoInnerClasses = cn(
    "min-h-[300px] p-4 flex-1 overflow-hidden",
    centerContent && "mx-auto w-full flex flex-col items-center justify-center",
    innerClass
  );
  const contentStyle = maxHeight === undefined ? style : ({ maxHeight, ...style } satisfies React.CSSProperties);

  if (overflowBehavior === "resize") {
    return (
      <div data-slot="demo-content" data-overflow="resize" className={cn("max-w-full p-px", className)} style={contentStyle} {...props}>
        <ResizablePanelGroup orientation="horizontal" style={{ overflow: "visible" }} className="h-full max-w-full">
          <ResizablePanel
            defaultSize="100%"
            minSize="25%"
            maxSize="100%"
            className={cn(demoContentVariants({ variant }), "h-full min-h-[300px]")}
          >
            <div className={demoInnerClasses}>{children}</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="0%" minSize="0%" maxSize="75%">
            <div aria-hidden className="h-full bg-linear-to-r to-muted" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  }

  if (overflowBehavior === "scroll") {
    return (
      <div
        data-slot="demo-content"
        data-overflow="scroll"
        className={cn(
          demoContentVariants({ variant }),
          maxHeight === undefined && "max-h-[300px]",
          "min-h-[300px] max-w-full min-w-0",
          className
        )}
        style={contentStyle}
        {...props}
      >
        <ScrollArea orientation="both" className="size-full" scrollFade innerClass={demoInnerClasses}>
          {children}
        </ScrollArea>
      </div>
    );
  }

  return (
    <div
      data-slot="demo-content"
      data-overflow="wrap"
      className={cn(demoContentVariants({ variant }), demoInnerClasses, className)}
      style={contentStyle}
      {...props}
    >
      {children}
    </div>
  );
}

export type DemoFooterProps = React.ComponentProps<"footer"> & {
  /** Use `flush` when the child, such as a code block, owns its own padding and border. */
  variant?: "caption" | "flush";
};

export function DemoFooter({ className, variant = "caption", ...props }: DemoFooterProps) {
  return (
    <footer
      data-slot="demo-footer"
      data-variant={variant}
      className={cn(variant === "caption" && "p-(--radius-xl) pt-1 text-xs text-muted-foreground", "rounded-b-[inherit]", className)}
      {...props}
    />
  );
}

export const Demo = {
  Root: DemoRoot,
  Header: DemoHeader,
  Title: DemoTitle,
  Description: DemoDescription,
  Content: DemoContent,
  Footer: DemoFooter,
};

export type DemoContainerProps = DemoRootProps &
  VariantProps<typeof demoContentVariants> & {
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

export function DemoContainer({
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
  children,
  ...props
}: DemoContainerProps) {
  const canExpand = maxHeight !== undefined;
  const hasHeader = title !== undefined || controls !== undefined || canExpand;
  const hasCode = code?.value !== undefined;

  return (
    <Demo.Root {...props}>
      {hasHeader ? (
        <Demo.Header className={headerClassName}>
          <div className="flex flex-1 flex-wrap items-center gap-x-2 gap-y-0">
            <Demo.Title>{title}</Demo.Title>
            {description ? <Demo.Description>{description}</Demo.Description> : null}
          </div>
          {controls ? (
            <>
              <Separator orientation="vertical" className="h-3" />
              <div className="flex items-center justify-end gap-1">{controls}</div>
            </>
          ) : null}
        </Demo.Header>
      ) : null}

      <Demo.Content
        overflowBehavior={overflowBehavior}
        variant={variant}
        centerContent={centerContent}
        innerClass={innerClass}
        maxHeight={maxHeight}
      >
        {children}
      </Demo.Content>

      {caption ? <Demo.Footer className={captionClassName}>{caption}</Demo.Footer> : null}

      {hasCode ? (
        <Demo.Footer variant="flush">
          <CodeBlock
            code={code.value}
            language={code.language}
            filename={code.filename}
            lineNumbers={code.lineNumbers}
            collapsible={code.collapsible}
            initialHeight={code.initialHeight}
            className="m-px rounded-b-[inherit]"
          />
        </Demo.Footer>
      ) : null}
    </Demo.Root>
  );
}
