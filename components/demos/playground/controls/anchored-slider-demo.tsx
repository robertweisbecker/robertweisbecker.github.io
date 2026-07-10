import { Slider as BaseSlider } from "@base-ui/react";
import { cn } from "@/lib/utils";

export function AnchoredSliderDemo() {
  return (
    <BaseSlider.Root defaultValue={25} thumbAlignment="edge-client-only" className="flex w-56 items-center gap-3 py-4">
      <BaseSlider.Label className="text-sm font-[450]">Label</BaseSlider.Label>
      <BaseSlider.Control className="flex w-56 touch-none items-center select-none">
        <BaseSlider.Track className="h-button-xs w-full cursor-ew-resize overflow-hidden rounded-sm bg-border transition-transform duration-200 ease-out select-none squircle data-dragging:scale-102 data-dragging:cursor-ew-resize">
          <BaseSlider.Indicator className="rounded-s-sm bg-primary select-none squircle" />
          <BaseSlider.Thumb
            aria-label="Volume"
            className={cn(
              "relative flex h-full rounded-e-sm bg-primary p-1 squircle",
              "has-focus-visible:*:outline-2 has-focus-visible:*:outline-ring"
            )}
            style={{ anchorName: "--thumb" }}
          >
            <div className="pointer-events-none h-full w-0.5 origin-right rounded-xs bg-white shadow-border-xs transition-transform duration-100 ease-out-quad in-data-dragging:scale-110" />
          </BaseSlider.Thumb>
        </BaseSlider.Track>
      </BaseSlider.Control>
      <BaseSlider.Value className="absolute bottom-[calc(anchor(top)+4px)] left-[anchor(center)] mb-2 -translate-x-1/2 rounded-sm bg-popover px-1 py-px text-2xs text-popover-foreground tabular-nums shadow-border-sm [position-anchor:--thumb]" />
    </BaseSlider.Root>
  );
}
