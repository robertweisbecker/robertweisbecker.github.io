// export const semanticTokens = {
//   colors: {
//     "bg.canvas": {
//       default: "gray.25",
//       _dark: "gray.800",
//     },
//     "bg.surface": {
//       default: "white",
//       _dark: "gray.900",
//     },
//     "bg.subtle": {
//       default: "gray.50",
//       _dark: "gray.800",
//     },
//     "bg.muted": {
//       default: "gray.100",
//       _dark: "gray.700",
//     },

//     "fg.default": {
//       default: "gray.900",
//       _dark: "white",
//     },
//     "fg.emphasized": {
//       default: "gray.700",
//       _dark: "gray.200",
//     },
//     "fg.muted": {
//       default: "gray.600",
//       _dark: "gray.300",
//     },
//     "fg.subtle": {
//       default: "gray.500",
//       _dark: "gray.400",
//     },
//     "fg.inverted": {
//       default: "white",
//       _dark: "gray.950",
//     },

//     "border.default": {
//       default: "gray.200",
//       _dark: "gray.800",
//     },
//     "border.emphasized": {
//       default: "gray.300",
//       _dark: "gray.700",
//     },
//     "border.active": {
//       default: "gray.400",
//       _dark: "gray.600",
//     },

//     "bg.accent.default": "brand.600",
//     "bg.accent.subtle": "brand.500",
//     "bg.accent.muted": "brand.400",

//     "fg.accent.subtle": "brand.100",
//     "fg.accent.muted": "brand.50",
//     "fg.accent.default": "white",

//     accent: {
//       default: "brand.500",
//       _dark: "brand.200",
//     },
//     success: {
//       default: "green.500",
//       _dark: "green.200",
//     },
//     error: {
//       default: "red.500",
//       _dark: "red.200",
//     },
//   },
//   shadows: {
//     xs: {
//       default:
//         "0px 0px 1px rgba(45, 55, 72, 0.05), 0px 1px 2px rgba(45, 55, 72,  0.1)",
//       _dark:
//         "0px 0px 1px rgba(13, 14, 20, 1), 0px 1px 2px rgba(13, 14, 20, 0.9)",
//     },
//     sm: {
//       default:
//         "0px 0px 1px rgba(45, 55, 72, 0.05), 0px 2px 4px rgba(45, 55, 72,  0.1)",
//       _dark:
//         "0px 0px 1px rgba(13, 14, 20, 1), 0px 2px 4px rgba(13, 14, 20, 0.9)",
//     },
//     md: {
//       default:
//         "0px 0px 1px rgba(45, 55, 72, 0.05), 0px 4px 8px rgba(45, 55, 72,  0.1)",
//       _dark:
//         "0px 0px 1px rgba(13, 14, 20, 1), 0px 4px 8px rgba(13, 14, 20, 0.9)",
//     },
//     lg: {
//       default:
//         "0px 0px 1px rgba(45, 55, 72, 0.05), 0px 8px 16px rgba(45, 55, 72,  0.1)",
//       _dark:
//         "0px 0px 1px rgba(13, 14, 20, 1), 0px 8px 16px rgba(13, 14, 20, 0.9)",
//     },
//     xl: {
//       default:
//         "0px 0px 1px rgba(45, 55, 72, 0.05), 0px 16px 24px rgba(45, 55, 72,  0.1)",
//       _dark:
//         "0px 0px 1px rgba(13, 14, 20, 1), 0px 16px 24px rgba(13, 14, 20, 0.9)",
//     },
//     focus: {
//       default: "0 0 0 4px #EDF2F7",
//       _dark: "0 0 0 4px #2D3748",
//     },
//   },
// };

// import { ThemeContext } from '@emotion/react';

export const semanticTokens = {
  colors: {
    "chakra-body-text": "muted",
    "chakra-body-bg": "bg-page",
    "chakra-border-color": "border",
    "chakra-subtle-bg": "bg-subtle",
    "chakra-placeholder-color": { _light: "gray.500", _dark: "whiteAlpha.400" },
    "bg-page": "bg-canvas",
    "bg-canvas": { _light: "white", _dark: "gray.900" },

    surface: { _light: "white", _dark: "gray.700" },
    "surface-hover": { _light: "blackAlpha.100", _dark: "whiteAlpha.50" },
    "surface-active": { _light: "blackAlpha.200", _dark: "whiteAlpha.100" },

    "bg-subtle": { _light: "gray.50", _dark: "gray.800" },
    "bg-muted": { _light: "gray.100", _dark: "gray.900" },
    "bg-forge": { _light: "gray.600", _dark: "gray.900" },
    "bg-invert": { _light: "gray.800", _dark: "gray.100" },
    "bg-furnace": { _light: "#0072e5", _dark: "blue.900" },
    "bg-udl": { _light: "teal.100", _dark: "teal.800" },
    "bg-mica": { _light: "pink.100", _dark: "pink.400" },
    "bg-npr": { _light: "#E2F3FE", _dark: "#394F78" },

    default: "muted",
    inverted: { _light: "white", _dark: "white" },
    emphasized: { _light: "gray.800", _dark: "gray.100" },

    emphasis: "emphasized",
    muted: { _light: "gray.700", _dark: "gray.200" },
    subtle: { _light: "gray.400", _dark: "gray.300" },
    disabled: { _light: "blackAlpha.200", _dark: "whiteAlpha.100" },
    border: { _light: "blackAlpha.200", _dark: "whiteAlpha.200" },
    "border-muted": { _light: "gray.100", _dark: "whiteAlpha.100" },
    accent: { _light: "brand.600", _dark: "brand.200" },
    interactive: { _light: "brand.400", _dark: "brand.300" },
    success: { _light: "green.600", _dark: "green.200" },
    error: { _light: "red.600", _dark: "red.200" },
    "bg-accent": "brand.600",
    "bg-accent-subtle": "brand.500",
    "bg-accent-muted": "brand.400",
    "emphasis-invert": { _light: "whiteAlpha.900", _dark: "gray.800" },
    "invert-muted": "brand.50",
    "invert-subtle": "brand.100",
  },
  shadows: {
    xs: {
      default:
        "0px 0px 1px rgba(45, 55, 72, 0.05), 0px 1px 2px rgba(45, 55, 72,  0.1)",
      _dark:
        "0px 0px 1px rgba(13, 14, 20, 1), 0px 1px 2px rgba(13, 14, 20, .4)",
    },
    sm: {
      default:
        "0px 0px 1px rgba(45, 55, 72, 0.05), 0px 2px 4px rgba(45, 55, 72,  0.1)",
      _dark:
        "0px 0px 1px rgba(13, 14, 20, 1), 0px 2px 4px rgba(13, 14, 20, .4)",
    },
    md: {
      default:
        "0px 0px 1px rgba(45, 55, 72, 0.05), 0px 4px 8px rgba(45, 55, 72,  0.1)",
      _dark:
        "0px 0px 1px rgba(13, 14, 20, 1), 0px 4px 8px rgba(13, 14, 20, .4)",
    },
    lg: {
      default:
        "0px 0px 1px rgba(45, 55, 72, 0.05), 0px 8px 16px rgba(45, 55, 72,  0.1)",
      _dark:
        "0px 0px 1px rgba(13, 14, 20, 1), 0px 8px 16px rgba(13, 14, 20, .4)",
    },
    xl: {
      default:
        "0px 0px 1px rgba(45, 55, 72, 0.05), 0px 16px 24px rgba(45, 55, 72,  0.1)",
      _dark:
        "0px 0px 1px rgba(13, 14, 20, 1), 0px 16px 24px rgba(13, 14, 20, .4), inset 0 0 0 1px rgba(255,255,255,.12)",
    },
  },
  space: {
    "2xs": "1",
    xs: "2",
    sm: "3",
    md: "5",
    lg: "8",
    xl: "12",
    "2xl": "16",
    "squish-xs": "var(--udl-space-3) var(--udl-space-3)",
    "squish-sm": "2xs xs",

    "squish-md": "{[ 2, 3 ]}",
    "squish-lg": {
      px: "8",
      py: "5",
    },
    "squish-xl": ["12", "8"],
    "squish-2xl": ["16", "12"],
  },

  // fontSizes: {
  //   "ui-micro": "3xs",
  //   "ui-compact": "xs",
  //   "ui-default": "sm",
  //   "ui-title": "xs",
  //   p4: "2xs",
  //   p3: "xs",
  //   p2: "sm",
  //   p1: "md",
  //   subtitle: "lg",
  //   h6: "xs",
  //   h5: "sm",
  //   h4: "md",
  //   h3: "lg",
  //   h2: "xl",
  //   h1: "2xl",
  //   h0: "4xl",
  // },
  // lineHeights: {
  //   "ui-default": "5",
  //   "ui-compact": "4",
  //   "ui-title": "base",
  //   p4: "3.5",
  //   p3: "4",
  //   p2: "5",
  //   p1: "6",
  //   subtitle: "6",
  //   h6: "4",
  //   h5: "4.5",
  //   h4: "5",
  //   h3: "5",
  //   h2: "6",
  //   h1: "6",
  //   h0: "9",
  // },
};
