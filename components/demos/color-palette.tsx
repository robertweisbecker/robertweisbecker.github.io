import { cn } from "@/lib/utils";

const HUE_STEPS = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 975] as const;
const NEUTRAL_STEPS = [25, 50, 75, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 975] as const;

type HueStep = (typeof HUE_STEPS)[number];
type NeutralStep = (typeof NEUTRAL_STEPS)[number];

const HUES = [
  "ruby",
  "red",
  "orange",
  "yellow",
  "gold",
  "lime",
  "green",
  "jade",
  "teal",
  "cyan",
  "blue",
  "navy",
  "indigo",
  "violet",
  "purple",
  "magenta",
  "pink",
] as const;

const NEUTRALS = ["black", "gray", "zinc", "ash", "sage", "sand", "plum", "steel"] as const;

const ALPHAS = ["black-alpha", "white-alpha", "gray-alpha"] as const;

type HueName = (typeof HUES)[number];
type NeutralName = (typeof NEUTRALS)[number];
type AlphaName = (typeof ALPHAS)[number];
type ColorName = HueName | NeutralName | AlphaName;

function stepsFor(name: ColorName): readonly number[] {
  if ((NEUTRALS as readonly string[]).includes(name) || (ALPHAS as readonly string[]).includes(name)) {
    return NEUTRAL_STEPS;
  }
  return HUE_STEPS;
}

const PALETTE_NAME_COL = "w-20 shrink-0";

/* -------------------------------------------------------------------------- */
/*  Color Swatch                                                              */
/* -------------------------------------------------------------------------- */

type ColorSwatchProps = {
  color: string;
  label?: string;
  className?: string;
  showLabel?: boolean;
  swatchClass?: string;
};

function ColorSwatch({ color, label, className, showLabel = true, swatchClass }: ColorSwatchProps) {
  return (
    <div className={cn("relative grid min-w-0 items-start", className)}>
      <div
        className={cn("relative isolate aspect-square w-full rounded-[clamp(2px,.4vw,var(--radius-xl))]", swatchClass)}
        data-slot="swatch"
      >
        <div
          className="absolute inset-px -z-1 rounded-[inherit]"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 7px,var(--border) 7px,var(--border) 8px)",
          }}
        />
        <div data-slot="fill" className={`size-full rounded-[inherit] border bg-${color}`} />
      </div>
      {showLabel ? <div className="z-1 font-pixel text-[11px]">{label}</div> : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Color Ramp — a single named color across all its steps                     */
/* -------------------------------------------------------------------------- */

type ColorRampProps = {
  name: ColorName;
  label?: string;
  showLabels?: boolean;
  className?: string;
  attached?: boolean;
};

function StepColumnHeader({ steps, className }: { steps: readonly number[]; className?: string }) {
  return (
    <div className={cn("grid min-w-0 flex-1", className)} style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
      {steps.map((step) => (
        <div key={step} className="text-center font-pixel text-[11px] text-muted-foreground">
          {step}
        </div>
      ))}
    </div>
  );
}

function ColorRamp({ name, label, showLabels = true, className, attached = true }: ColorRampProps) {
  const steps = stepsFor(name);

  return (
    <div className={cn("relative flex flex-col gap-1", className)}>
      {label && <div className="text-xs font-medium capitalize">{label}</div>}
      <div
        className={cn("grid w-full min-w-0 items-start", !attached && "gap-1")}
        style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
      >
        {steps.map((step) => (
          <ColorSwatch
            key={step}
            color={`${name}-${step}`}
            label={String(step)}
            showLabel={showLabels}
            className={cn(
              attached && [
                "first:**:rounded-e-none last:**:rounded-s-none",
                "not-first:**:data-[slot=fill]:border-s-[0.5px]! not-last:**:data-[slot=fill]:border-e-[0.5px]!",
              ]
            )}
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Full Palette — all hues, neutrals, or everything                          */
/* -------------------------------------------------------------------------- */

type ColorPaletteProps = {
  /** Which group to render. Defaults to "all". */
  group?: "hues" | "neutrals" | "alphas" | "all";
  /** When true, show step labels beneath each swatch. When false, show one header row above the grid. */
  showLabels?: boolean;
  /** Show the hue name to the left of each row. */
  showNames?: boolean;
  className?: string;
};

function ColorPalette({ group = "all", showLabels = true, showNames = true, className }: ColorPaletteProps) {
  const sections: { title?: string; names: readonly ColorName[] }[] = [];

  if (group === "hues" || group === "all") sections.push({ title: group === "all" ? "Hues" : undefined, names: HUES });
  if (group === "neutrals" || group === "all") sections.push({ title: group === "all" ? "Neutrals" : undefined, names: NEUTRALS });
  if (group === "alphas" || group === "all") sections.push({ title: group === "all" ? "Alpha" : undefined, names: ALPHAS });

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {sections.map((section) => (
        <div key={section.title ?? section.names[0]} className="flex flex-col gap-3">
          {section.title && <p className="text-base font-medium">{section.title}</p>}
          <div className={cn("relative grid grid-cols-1 gap-5 sm:gap-4", showNames && "sm:grid-cols-[auto_1fr]")}>
            {!showLabels && (
              <>
                {showNames && <div />}
                <StepColumnHeader steps={stepsFor(section.names[0])} />
              </>
            )}

            {section.names.map((name) => {
              const steps = stepsFor(name);
              return (
                <div className="col-span-full grid grid-cols-subgrid gap-1 sm:gap-3" key={name}>
                  {showNames && <div className={cn("self-center text-2xs font-medium capitalize max-sm:order-2 sm:text-sm")}>{name}</div>}
                  <PaletteRow
                    className={showNames ? "sm:col-start-2" : undefined}
                    name={name}
                    steps={steps}
                    showName={false}
                    showLabels={showLabels}
                    attached={steps.length === 1}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Palette Row — internal: one row inside the full palette grid              */
/* -------------------------------------------------------------------------- */

type PaletteRowProps = {
  name: ColorName;
  steps: readonly number[];
  showName?: boolean;
  showLabels?: boolean;
  attached?: boolean;
  className?: string;
};

function PaletteRow({ name, steps, showName, showLabels, attached = false, className }: PaletteRowProps) {
  return (
    <div className={cn("flex w-full items-start gap-2", className)}>
      {showName ? <div className={cn(PALETTE_NAME_COL, "pt-0.5 text-xs font-medium capitalize")}>{name}</div> : null}
      <div
        className={cn("grid min-w-0 flex-1 items-start", !attached && "gap-1")}
        style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
      >
        {steps.map((step) => (
          <ColorSwatch
            key={step}
            color={`${name}-${step}`}
            label={String(step)}
            showLabel={showLabels}
            className={cn(
              attached &&
                "first:**:data-[slot=swatch]:border-e-none not-first:**:data-[slot=swatch]:border-s-none not-first:not-last:**:data-[slot=swatch]:rounded-none first:**:data-[slot=swatch]:rounded-e-none last:**:data-[slot=swatch]:rounded-s-none"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export { ColorPalette, ColorSwatch, ColorRamp, ALPHAS, HUES, HUE_STEPS, NEUTRALS, NEUTRAL_STEPS };
export type { AlphaName, ColorName, ColorPaletteProps, ColorSwatchProps, HueName, ColorRampProps, HueStep, NeutralName, NeutralStep };
