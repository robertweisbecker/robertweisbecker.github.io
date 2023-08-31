// import { theme as proTheme } from '@chakra-ui/pro-theme';

// import {
//   extendBaseTheme,
//   extendTheme,
//   theme as baseTheme
// } from '@chakra-ui/react';

// export const theme = extendBaseTheme({
//   colors: { ...baseTheme.colors, brand: baseTheme.colors.gray },
//   components: {
//     Button: { ...baseTheme.components.Button.variants }
//     },
//   },
//   proTheme,
// }),
import * as components from "./theme/components";
import { theme as proTheme } from "@chakra-ui/pro-theme";
import {
  extendTheme,
  extendBaseTheme,
  withDefaultColorScheme,
  theme as baseTheme,
} from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import { semanticTokens } from "./theme/semanticTokens";
// import { typographyOverrides } from "./theme/foundations/typography";
import * as foundations from "./theme/foundations";

export const theme = extendTheme({
  ...foundations,
  config: {
    cssVarPrefix: "bob",
    initialColorMode: "dark",
  },

  styles: {
    global: (props: StyleFunctionProps) => ({
      _selection: {
        bg: "accent",
        color: "emphasis-invert",
      },
      body: {
        bg: "surface",
        lineHeight: "base",
        color: "text-muted",
      },
    }),
  },
  colors: {
    ...foundations.colors,
    brand: foundations.colors.purple,
  },
  fonts: {
    heading: `'Nimbus Sans', 'Inter var alt', system-ui, sans-serif`,
    body: `'Inter', sans-serif`,
  },

  components: {
    ...components,
    Code: {
      baseStyle: {
        borderRadius: "md",
        lineHeight: "short",
        fontSize: ".875em",
        fontWeight: "semibold",
        color: "emphasis",
      },
      defaultProps: { colorScheme: "gray" },
    },
  },
  semanticTokens: { ...semanticTokens },

  proTheme,
});