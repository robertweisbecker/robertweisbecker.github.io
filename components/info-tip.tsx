"use client";

import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import * as React from "react";
import { HelpIcon, InfoIcon2 } from "@/components/icons";

type InfoTipProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  help?: boolean;
  children?: React.ReactNode;
};

export function InfoTip({ title, description, className, help, children }: InfoTipProps) {
  return (
    <Popover>
      <PopoverTrigger
        openOnHover
        // render={<Button variant="ghost" size={buttonToInfoTipSize[size]} />}
        className={cn(
          "relative inline-grid min-h-lh shrink-0 place-items-center rounded p-0 text-foreground/50 after:absolute after:aspect-square after:min-h-5 after:min-w-5 after:rounded-[inherit] hover:text-current hover:after:bg-current/5 aria-expanded:text-current aria-expanded:after:bg-current/10",
          className
        )}
      >
        {help ? <HelpIcon className="mt-px size-5" strokeWidth={2} /> : <InfoIcon2 className="mt-px size-3" />}
      </PopoverTrigger>
      <PopoverContent variant="tooltip" side="top">
        {title && (
          <PopoverHeader>
            <PopoverTitle>{title}</PopoverTitle>
          </PopoverHeader>
        )}
        {description && <PopoverDescription>{description}</PopoverDescription>}
        {children}
      </PopoverContent>
    </Popover>
  );
}
