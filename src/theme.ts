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
import {
  extendTheme,
  extendBaseTheme,
  withDefaultColorScheme,
  theme as baseTheme,
} from "@chakra-ui/react";
import { theme as proTheme } from "@chakra-ui/pro-theme";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import { semanticTokens } from "./theme/semanticTokens";
// import { typographyOverrides } from "./theme/foundations/typography";
import * as foundations from "./theme/foundations";

export const theme = extendTheme({
  config: {
    cssVarPrefix: "bob",
    initialColorMode: "dark",
  },

  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: "surface",
        lineHeight: "1.75",
      },
    }),
  },

  fonts: {
    heading: `'Inter Display', 'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  semanticTokens: { ...semanticTokens },

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
  ...foundations,
  layerStyles: {
    base: {
      bg: "gray.50",
      border: "2px solid",
      borderColor: "gray.500",
    },
    selected: {
      bg: "teal.500",
      color: "teal.700",
      borderColor: "orange.500",
    },
  },

  proTheme,
});
