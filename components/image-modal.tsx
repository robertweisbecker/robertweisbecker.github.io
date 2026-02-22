"use client";

import { useState } from "react";
import { RiZoomInLine, RiCloseLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";

interface ImageModalProps {
  src: string;
  src2?: string;
  caption?: string;
}

export function ImageModal({ src, src2, caption }: ImageModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-muted">
        <img src={src} alt={caption ?? ""} className="w-full" />
        <Button
          variant="outline"
          size="icon-sm"
          className="absolute bottom-3 right-3 z-10 shadow-md"
          onClick={() => setOpen(true)}
          aria-label="View fullscreen image"
        >
          <RiZoomInLine className="size-4" />
        </Button>
      </div>
      {caption && (
        <p className="mt-1 text-center text-xs text-muted-foreground">
          {caption}
        </p>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl border-none bg-transparent p-0 shadow-none sm:p-4">
          <DialogTitle className="sr-only">Image</DialogTitle>
          <div className="overflow-hidden rounded-2xl border border-border/50">
            <img
              src={src2 ?? src}
              alt={caption ?? ""}
              className="w-full rounded-lg object-contain"
            />
          </div>
          {caption && (
            <p className="mx-auto mt-2 text-center text-xs text-foreground">
              {caption}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
