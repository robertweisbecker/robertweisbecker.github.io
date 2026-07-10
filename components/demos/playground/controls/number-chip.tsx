import * as React from "react";
import { NumberField } from "@base-ui/react/number-field";
import { IconArrowsHorizontal } from "@tabler/icons-react";
import { CursorEwResizeIcon } from "@/components/icons";

export function NumberChip() {
  const id = React.useId();
  return (
    <NumberField.Root id={id} defaultValue={0} max={100} min={0} className="group relative gap-1 text-sm tabular-nums focus-within:z-1">
      <NumberField.ScrubArea className="flex cursor-ew-resize items-center gap-4">
        <NumberField.ScrubAreaCursor className="cursor-ew-resize">
          <CursorEwResizeIcon className="size-6" aria-hidden="true" />
        </NumberField.ScrubAreaCursor>
        <label htmlFor={id} className="flex shrink-0 cursor-ew-resize items-center gap-1 text-sm font-medium text-foreground">
          <IconArrowsHorizontal className="size-4 shrink-0 text-muted-foreground opacity-50" aria-hidden="true" />
          Amount
        </label>

        <NumberField.Group className="relative flex h-6 w-fit items-center gap-0.5 rounded-md bg-secondary px-1 shadow-border-xs data-scrubbing:inset-shadow-button-pressed">
          <NumberField.Input
            className="ease pointer-events-none inline h-full w-[3ch] text-center text-secondary-foreground transition-[padding-top] duration-50 outline-none data-scrubbing:pt-px"
            readOnly
          />
          <span className="text-secondary-foreground/50">px</span>
        </NumberField.Group>
      </NumberField.ScrubArea>
    </NumberField.Root>
  );
}
