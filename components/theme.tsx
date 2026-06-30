"use client";

import * as React from "react";

export type ColorOption<V extends string = string> = {
  value: V;
  label: string;
  preview: string;
};

export type HueName =
  | "ruby"
  | "red"
  | "orange"
  | "yellow"
  | "gold"
  | "lime"
  | "green"
  | "jade"
  | "teal"
  | "cyan"
  | "blue"
  | "navy"
  | "indigo"
  | "violet"
  | "purple"
  | "magenta"
  | "pink"
  | "gray"
  | "zinc"
  | "ash"
  | "sage"
  | "sand"
  | "plum"
  | "steel"
  | "black";

export type NeutralName = "gray" | "zinc" | "ash" | "sage" | "sand" | "plum" | "steel" | "black";

export const HUE_OPTIONS: ColorOption<HueName>[] = [
  { value: "ruby", label: "Ruby", preview: "var(--color-ruby-400)" },
  { value: "red", label: "Red", preview: "var(--color-red-400)" },
  { value: "orange", label: "Orange", preview: "var(--color-orange-400)" },
  { value: "yellow", label: "Yellow", preview: "var(--color-yellow-400)" },
  { value: "gold", label: "Gold", preview: "var(--color-gold-400)" },
  { value: "lime", label: "Lime", preview: "var(--color-lime-400)" },
  { value: "green", label: "Green", preview: "var(--color-green-400)" },
  { value: "jade", label: "Jade", preview: "var(--color-jade-400)" },
  { value: "teal", label: "Teal", preview: "var(--color-teal-400)" },
  { value: "cyan", label: "Cyan", preview: "var(--color-cyan-400)" },
  { value: "blue", label: "Blue", preview: "var(--color-blue-400)" },
  { value: "navy", label: "Navy", preview: "var(--color-navy-400)" },
  { value: "indigo", label: "Indigo", preview: "var(--color-indigo-400)" },
  { value: "violet", label: "Violet", preview: "var(--color-violet-400)" },
  { value: "purple", label: "Purple", preview: "var(--color-purple-400)" },
  { value: "magenta", label: "Magenta", preview: "var(--color-magenta-400)" },
  { value: "pink", label: "Pink", preview: "var(--color-pink-400)" },
];

export const NEUTRAL_OPTIONS: ColorOption<NeutralName>[] = [
  { value: "black", label: "Black", preview: "var(--color-black-400)" },
  { value: "gray", label: "Gray", preview: "var(--color-gray-400)" },
  { value: "ash", label: "Ash", preview: "var(--color-ash-400)" },
  { value: "zinc", label: "Zinc", preview: "var(--color-zinc-400)" },
  { value: "plum", label: "Plum", preview: "var(--color-plum-400)" },
  { value: "sand", label: "Sand", preview: "var(--color-sand-400)" },
  { value: "sage", label: "Sage", preview: "var(--color-sage-400)" },
  { value: "steel", label: "Steel", preview: "var(--color-steel-400)" },
];

export const ALL_HUE_OPTIONS: ColorOption<HueName>[] = [...HUE_OPTIONS, ...NEUTRAL_OPTIONS];

export const COLOR_MAP = new Map<string, ColorOption<HueName>>(ALL_HUE_OPTIONS.map((o) => [o.value, o]));

export type ThemeSettings = {
  hue: HueName;
  neutral: NeutralName;
  radius: number;
};

const DEFAULT_HUE: HueName = "black";
const DEFAULT_NEUTRAL: NeutralName = "black";

const DEFAULTS: ThemeSettings = { hue: DEFAULT_HUE, neutral: DEFAULT_NEUTRAL, radius: 10 };

type ThemeContextValue = ThemeSettings & {
  defaultHue: HueName;
  defaultNeutral: NeutralName;
  defaultRadius: number;
  set: (patch: Partial<ThemeSettings>) => void;
  reset: () => void;
  isDirty: boolean;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const themeContext = React.useContext(ThemeContext);
  if (!themeContext) throw new Error("useTheme must be used within a <Theme> provider");
  return themeContext;
}

function getBodyBackgroundColor() {
  const backgroundColor = window.getComputedStyle(document.body).backgroundColor;
  return backgroundColor && backgroundColor !== "rgba(0, 0, 0, 0)" && backgroundColor !== "transparent" ? backgroundColor : null;
}

function syncThemeColorMeta() {
  const color = getBodyBackgroundColor();
  if (!color) return;

  const metas = Array.from(document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]'));
  for (const meta of metas) {
    meta.content = color;
  }

  let dynamicMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"][data-dynamic-theme-color]');
  if (!dynamicMeta) {
    dynamicMeta = document.createElement("meta");
    dynamicMeta.name = "theme-color";
    dynamicMeta.dataset.dynamicThemeColor = "";
    document.head.append(dynamicMeta);
  }
  dynamicMeta.content = color;
}

type ThemeProps = Omit<React.ComponentProps<"div">, "children"> & {
  children: React.ReactNode;
  defaultHue?: HueName;
  defaultNeutral?: NeutralName;
  defaultRadius?: number;
};

export function Theme({
  children,
  defaultHue: defaultHueProp = DEFAULT_HUE,
  defaultNeutral: defaultNeutralProp = DEFAULT_NEUTRAL,
  defaultRadius: defaultRadiusProp = DEFAULTS.radius,
  className,
  style,
  ...props
}: ThemeProps) {
  const parentContext = React.useContext(ThemeContext);
  const isRoot = parentContext === null;

  /** Nested only: once true, stop syncing from parent until reset or values match parent again. */
  const [hasLocalOverrides, setHasLocalOverrides] = React.useState(false);

  const [settings, setSettings] = React.useState<ThemeSettings>(() =>
    isRoot
      ? { hue: defaultHueProp, neutral: defaultNeutralProp, radius: defaultRadiusProp }
      : {
          hue: parentContext!.hue,
          neutral: parentContext!.neutral,
          radius: parentContext!.radius,
        }
  );

  const parentHue = parentContext?.hue;
  const parentNeutral = parentContext?.neutral;
  const parentRadius = parentContext?.radius;

  React.useEffect(() => {
    if (isRoot || hasLocalOverrides) return;
    setSettings({
      hue: parentHue!,
      neutral: parentNeutral!,
      radius: parentRadius!,
    });
  }, [isRoot, hasLocalOverrides, parentHue, parentNeutral, parentRadius]);

  React.useEffect(() => {
    if (isRoot) return;
    const matches = settings.hue === parentHue && settings.neutral === parentNeutral && settings.radius === parentRadius;
    if (matches) setHasLocalOverrides(false);
  }, [isRoot, settings.hue, settings.neutral, settings.radius, parentHue, parentNeutral, parentRadius]);

  const set = React.useCallback(
    (patch: Partial<ThemeSettings>) => {
      if (!isRoot) setHasLocalOverrides(true);
      setSettings((prev) => ({ ...prev, ...patch }));
    },
    [isRoot]
  );

  const reset = React.useCallback(() => {
    if (isRoot) {
      setSettings({ hue: defaultHueProp, neutral: defaultNeutralProp, radius: defaultRadiusProp });
    } else {
      setHasLocalOverrides(false);
      setSettings({
        hue: parentHue!,
        neutral: parentNeutral!,
        radius: parentRadius!,
      });
    }
  }, [isRoot, defaultHueProp, defaultNeutralProp, defaultRadiusProp, parentHue, parentNeutral, parentRadius]);

  const baselineHue = isRoot ? defaultHueProp : parentHue!;
  const baselineNeutral = isRoot ? defaultNeutralProp : parentNeutral!;
  const baselineRadius = isRoot ? defaultRadiusProp : parentRadius!;

  const isDirty = settings.hue !== baselineHue || settings.neutral !== baselineNeutral || settings.radius !== baselineRadius;

  const themeContext = React.useMemo<ThemeContextValue>(
    () => ({
      ...settings,
      defaultHue: baselineHue,
      defaultNeutral: baselineNeutral,
      defaultRadius: baselineRadius,
      set,
      reset,
      isDirty,
    }),
    [settings, baselineHue, baselineNeutral, baselineRadius, set, reset, isDirty]
  );

  const radiusValue = `${settings.radius / 16}rem`;

  React.useEffect(() => {
    if (!isRoot) return;
    const els = [document.documentElement, document.body];
    for (const el of els) {
      el.setAttribute("data-theme", "");
      el.setAttribute("data-hue", settings.hue);
      el.setAttribute("data-neutral", settings.neutral);
      el.style.setProperty("--radius", radiusValue);
    }
    return () => {
      for (const el of els) {
        el.removeAttribute("data-theme");
        el.removeAttribute("data-hue");
        el.removeAttribute("data-neutral");
        el.style.removeProperty("--radius");
      }
    };
  }, [isRoot, settings.hue, settings.neutral, radiusValue]);

  React.useEffect(() => {
    if (!isRoot) return;
    const frame = window.requestAnimationFrame(syncThemeColorMeta);
    const observer = new MutationObserver(syncThemeColorMeta);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-hue", "data-neutral", "data-theme", "style"],
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class", "data-hue", "data-neutral", "data-theme", "style"] });

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [isRoot, settings.hue, settings.neutral, radiusValue]);

  if (isRoot) {
    return <ThemeContext.Provider value={themeContext}>{children}</ThemeContext.Provider>;
  }

  return (
    <ThemeContext.Provider value={themeContext}>
      <div
        data-theme=""
        data-hue={settings.hue}
        data-neutral={settings.neutral}
        className={className}
        style={{ "--radius": radiusValue, ...style } as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
