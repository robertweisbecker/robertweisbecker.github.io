import { Slider, SliderControl, SliderGroup, SliderValue } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export function SliderDemo() {
  const max = 12;
  const skipInterval = 2;
  const ticks = [...Array(max + 1)].map((_, i) => i);

  return (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <Slider defaultValue={[40]} />
      <div className="grid max-w-xs">
        <SliderGroup defaultValue={[4]} max={max} step={1} className="relative">
          <SliderControl id="2" />
          <span aria-hidden="true" className="relative flex w-full items-start justify-between text-input">
            {ticks.map((_, i) => (
              <span className="flex w-0 flex-col items-center justify-start gap-2 font-pixel text-2xs" key={String(i)}>
                <span>{i % skipInterval !== 0 ? "╵" : "╎"}</span>
                <span className={cn("text-muted-foreground", i % skipInterval !== 0 && "opacity-0")}>{i}</span>
              </span>
            ))}
          </span>
          <span className="absolute bottom-0 left-[anchor(center)] flex w-0 -translate-x-1/2 flex-col items-center justify-center gap-2 text-center font-pixel text-2xs whitespace-nowrap [position-anchor:--thumb-2]">
            {"│"}
            <SliderValue className="z-1 bg-[color-mix(in_srgb,var(--background),var(--muted))] text-center text-2xs text-card-foreground before:text-input before:content-['['] after:text-input after:content-[']']" />
          </span>
        </SliderGroup>
      </div>
    </div>
  );
}
