"use client";

import * as React from "react";
import {
  DEFAULT_HUE,
  DEFAULT_NEUTRAL,
  DEFAULT_RADIUS,
  themeSettingsEqual,
  type HueName,
  type NeutralName,
  type ThemeSettings,
} from "./model";

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
  const themeContext = React.use(ThemeContext);
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
  defaultHue = DEFAULT_HUE,
  defaultNeutral = DEFAULT_NEUTRAL,
  defaultRadius = DEFAULT_RADIUS,
  className,
  style,
  ...props
}: ThemeProps) {
  const parentContext = React.use(ThemeContext);
  const isRoot = parentContext === null;
  const baseline = React.useMemo<ThemeSettings>(
    () =>
      parentContext
        ? { hue: parentContext.hue, neutral: parentContext.neutral, radius: parentContext.radius }
        : { hue: defaultHue, neutral: defaultNeutral, radius: defaultRadius },
    [defaultHue, defaultNeutral, defaultRadius, parentContext]
  );
  const [localOverride, setLocalOverride] = React.useState<ThemeSettings | null>(null);
  const settings = localOverride ?? baseline;

  const set = React.useCallback(
    (patch: Partial<ThemeSettings>) => {
      setLocalOverride((currentOverride) => {
        const next = { ...(currentOverride ?? baseline), ...patch };
        return themeSettingsEqual(next, baseline) ? null : next;
      });
    },
    [baseline]
  );

  const reset = React.useCallback(() => setLocalOverride(null), []);
  const isDirty = !themeSettingsEqual(settings, baseline);
  const radiusValue = `${settings.radius / 16}rem`;

  const themeContext = React.useMemo<ThemeContextValue>(
    () => ({
      ...settings,
      defaultHue: baseline.hue,
      defaultNeutral: baseline.neutral,
      defaultRadius: baseline.radius,
      set,
      reset,
      isDirty,
    }),
    [baseline.hue, baseline.neutral, baseline.radius, isDirty, reset, set, settings]
  );

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
