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

const interFontFeatureSettings = `
	'liga' 1, 
	'calt' 1,
	'case' 1,
	'cv01' 1,
	'cv10' 1,
	'ss01' 1,
	'ss03' 1
`;

export const theme = extendTheme({
	config: {
		cssVarPrefix: "bob",
		initialColorMode: "dark",
	},
	styles: {
		global: (props: StyleFunctionProps) => ({
			_selection: {
				bg: "bg.accent",
				color: "fg.emphasis-invert",
			},
			":root": {
				fontFamily: "fallback",
				fontFeatureSettings: interFontFeatureSettings,
			},
			"@supports (font-variation-settings: normal)": {
				":root": {
					fontFamily: "body",
				},
			},
			body: {
				bg: "bg.page",
				lineHeight: "base",
				color: "fg.muted",
				fontSize: "md",
				fontFeatureSettings: interFontFeatureSettings,
			},
			b: {
				color: "fg.emphasized",
				fontWeight: "semibold",
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
				color: "fg.emphasized",
			},
			defaultProps: { colorScheme: "brand" },
		},
		List: {
			baseStyle: {
				item: {
					"&::marker": {
						color: "fg.subdued",
						fontFamily: "mono",
					},
				},
			},
		},
	},
	colors: {
		...foundations.colors,
		brand: foundations.colors.purple,
	},
	semanticTokens: { ...semanticTokens },
	// proTheme,
});
