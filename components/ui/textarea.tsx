import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      data-disabled={props.disabled}
      data-readonly={props.readOnly}
      aria-invalid={props["aria-invalid"]}
      className={cn(
        // "border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 focus-visible:ring-3 aria-invalid:ring-3 placeholder:text-muted-foreground field-sizing-content flex min-h-16 w-full rounded-lg border bg-transparent px-2.5 py-2 text-base outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "flex field-sizing-content min-h-16 ui-input pt-2 data-readonly:border-border! data-readonly:ring-0!",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
