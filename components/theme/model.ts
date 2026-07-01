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

export type ThemeSettings = {
  hue: HueName;
  neutral: NeutralName;
  radius: number;
};

export const DEFAULT_HUE: HueName = "black";
export const DEFAULT_NEUTRAL: NeutralName = "black";
export const DEFAULT_RADIUS = 10;

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
export const COLOR_MAP = new Map<string, ColorOption<HueName>>(ALL_HUE_OPTIONS.map((option) => [option.value, option]));

export function themeSettingsEqual(a: ThemeSettings, b: ThemeSettings) {
  return a.hue === b.hue && a.neutral === b.neutral && a.radius === b.radius;
}
