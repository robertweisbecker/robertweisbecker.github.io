"use client";

import * as React from "react";
import { balloons } from "balloons-js";
import { Button } from "@/components/ui/button";

export type BalloonsButtonProps = React.ComponentProps<typeof Button>;

export function BalloonsButton({ onClick, children, ...props }: BalloonsButtonProps) {
  return (
    <Button
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          balloons();
        }
      }}
      {...props}
    >
      {children ?? "Trigger balloons"}
    </Button>
  );
}
