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
import { extendTheme, extendBaseTheme, withDefaultColorScheme, theme as baseTheme } from "@chakra-ui/react";
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
			_selection: {
				bg: "accent",
				color: "emphasis-invert",
			},
			":root": {
				fontFamily: "fallback",
			},
			body: {
				bg: "surface",
				lineHeight: "tall",
				color: "text-muted",
			},
		}),
	},
	...foundations,
	...foundations.typography,
	components: {
		...components,
		Badge: {
			baseStyle: {
				fontFamily: "heading",
				letterSpacing: "wider",
			},
		},
		Code: {
			baseStyle: {
				borderRadius: "sm",
				lineHeight: "short",
				fontSize: ".875em",
				color: "text-emphasis",
			},
			defaultProps: { colorScheme: "brand" },
		},
	},
	colors: {
		...foundations.colors,
		brand: foundations.colors.purple,
	},
	semanticTokens: { ...semanticTokens },
	// proTheme,
});
