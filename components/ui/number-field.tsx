"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import * as React from "react";

export const NumberFieldContext: React.Context<{
  fieldId: string;
} | null> = React.createContext<{
  fieldId: string;
} | null>(null);

export function NumberField({
  id,
  className,
  size = "default",
  ...props
}: NumberFieldPrimitive.Root.Props & {
  size?: "xs" | "sm" | "default" | "lg";
}): React.ReactElement {
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;

  return (
    <NumberFieldContext.Provider value={{ fieldId }}>
      <NumberFieldPrimitive.Root
        className={cn("flex flex-col items-start gap-2", className)}
        data-size={size}
        data-slot="number-field"
        id={fieldId}
        {...props}
      />
    </NumberFieldContext.Provider>
  );
}

export function NumberFieldGroup({ className, ...props }: NumberFieldPrimitive.Group.Props): React.ReactElement {
  return (
    <NumberFieldPrimitive.Group
      className={cn(
        "relative isolate flex ui-input w-fit items-center justify-between p-0 focus-within:border-ring has-autofill:bg-transparent has-aria-invalid:border-destructive/36 focus-within:has-aria-invalid:border-destructive/64 focus-within:has-aria-invalid:ring-destructive/48 dark:has-autofill:bg-foreground/8 dark:has-aria-invalid:ring-destructive/24 data-disabled:pointer-events-none data-disabled:opacity-64 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-slot="number-field-group"
      {...props}
    />
  );
}

export function NumberFieldDecrement({ className, ...props }: NumberFieldPrimitive.Decrement.Props): React.ReactElement {
  return (
    <NumberFieldPrimitive.Decrement
      className={cn(
        "relative -me-2 grid-stack grid shrink-0 self-stretch px-2 text-muted-foreground after:absolute after:size-button-xs after:rounded-full after:transition-colors hover:text-accent-foreground hover:after:bg-accent active:text-muted-foreground active:after:bg-muted",
        className
      )}
      data-slot="number-field-decrement"
      {...props}
    >
      <IconMinus className="size-4" strokeWidth={1.5} />
    </NumberFieldPrimitive.Decrement>
  );
}

export function NumberFieldIncrement({ className, ...props }: NumberFieldPrimitive.Increment.Props): React.ReactElement {
  return (
    <NumberFieldPrimitive.Increment
      className={cn(
        "relative -ms-2 grid-stack grid shrink-0 self-stretch px-2 text-muted-foreground after:absolute after:size-button-xs after:rounded-full after:transition-colors hover:text-accent-foreground hover:after:bg-accent active:text-muted-foreground active:after:bg-muted",
        className
      )}
      data-slot="number-field-increment"
      {...props}
    >
      <IconPlus className="size-4" strokeWidth={1.5} />
    </NumberFieldPrimitive.Increment>
  );
}

export function NumberFieldInput({ className, ...props }: NumberFieldPrimitive.Input.Props): React.ReactElement {
  return (
    <NumberFieldPrimitive.Input
      className={cn(
        "h-button w-full min-w-0 grow bg-transparent px-3 text-center text-base tabular-nums outline-none [transition:background-color_5000000s_ease-in-out_0s] in-data-[size=lg]:h-button-lg in-data-[size=sm]:h-button-sm in-data-[size=xs]:h-button-xs in-data-[size=xs]:px-1 md:in-data-[size=sm]:text-sm md:in-data-[size=xs]:text-xs",
        className
      )}
      data-slot="number-field-input"
      {...props}
    />
  );
}

export function NumberFieldScrubArea({
  className,
  label,
  ...props
}: NumberFieldPrimitive.ScrubArea.Props & {
  label?: string;
}): React.ReactElement {
  const context = React.useContext(NumberFieldContext);

  if (!context) {
    throw new Error("NumberFieldScrubArea must be used within a NumberField component for accessibility.");
  }

  return (
    <NumberFieldPrimitive.ScrubArea
      className={cn("absolute inset-0 cursor-ew-resize", className)}
      data-slot="number-field-scrub-area"
      {...props}
    >
      {label && (
        <Label className="cursor-ew-resize" htmlFor={context.fieldId}>
          {label}
        </Label>
      )}
      <NumberFieldPrimitive.ScrubAreaCursor className="drop-shadow-[0_1px_1px_#0008] filter">
        <CursorGrowIcon />
      </NumberFieldPrimitive.ScrubAreaCursor>
    </NumberFieldPrimitive.ScrubArea>
  );
}

export function CursorGrowIcon(props: React.ComponentProps<"svg">): React.ReactElement {
  return (
    <svg
      aria-hidden="true"
      fill="black"
      height="14"
      stroke="white"
      viewBox="0 0 24 14"
      width="26"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.5 5.5L6.5 5.52V2L1 7L6.5 12L6.5 8.5L19.5 8.5V12L25 7L19.5 2V5.5Z" />
    </svg>
  );
}

export { NumberFieldPrimitive };
