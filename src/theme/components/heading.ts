import { defineStyleConfig } from "@chakra-ui/styled-system";

export const headingStyles = defineStyleConfig({
	baseStyle: {
		fontFamily: "heading",
		fontWeight: "", // make sure it's empty,
		lineHeight: "shorter", // 1.25
		// letterSpacing: "tightest",
		color: "fg.emphasized",
		// fontFeatureSettings: `"kern" 1`,
		fontSynthesis: "none",
		mb: "round(calc(1lh - 1em), 4px)",
		textWrap: "balance",
	},
	sizes: {
		"3xl": {
			fontSize: "3xl",
			// letterSpacing: "tightest",
			letterSpacing: "0.01em",
			fontWeight: "medium",
			lineHeight: "shorter",
			maxW: "40ch",
			// mb: "2",
			mb: "round(calc(1lh - 1em), 4px)",
		},
		"2xl": {
			fontSize: ["xl", null, "2xl"],
			fontWeight: "medium",
			lineHeight: "short",
			letterSpacing: "0.015em",
			mb: "8",
			_first: {
				mt: 0,
			},
		},
		xl: {
			fontSize: ["lg", null, "xl"],
			fontWeight: "semibold",
			mt: "8",
			letterSpacing: "0.02em",
		},
		lg: {
			fontSize: ["md", null, "lg"],
			lineHeight: "base",
			fontWeight: "semibold",
			mt: "2em",
			mb: ".25em",
			letterSpacing: "0.03em",
		},

		md: {
			fontSize: "md",
			fontWeight: "semibold",
			// letterSpacing: "tight",
			mt: "1em",
			mb: ".5em",
			letterSpacing: "0.04em",
		},
		sm: {
			fontSize: "sm",
			fontWeight: "semibold",
			my: ".5em",
		},
		xs: {
			fontSize: "sm",
			lineHeight: "1rem",
			fontWeight: "bold",
			my: ".5em",
		},
		"2xs": {
			textStyle: "divider",
			fontWeight: "bold",
		},
	},
	variants: {
		h1: {},
		heading2: {
			textStyle: "h2",
			textWrap: "balance",
		},
		heading3: {
			textStyle: "h3",
			textWrap: "balance",
		},
		h4: {
			textStyle: "h4",
			textWrap: "balance",
		},
		h5: {
			textStyle: "h5",
			textWrap: "balance",
		},
		h6: {
			textStyle: "h6",
			textWrap: "balance",
		},
		subtitle: {
			fontSize: "lg",
			fontWeight: "medium",
			lineHeight: "shorter",
			textWrap: "balance",
		},
	},
});

// const baseStyle = {
//   fontWeight: "regular",
//   color: "emphasized",
//   my: "4",
// };

// const sizes = {
//   "3xl": {
//     fontSize: "3xl",
//     lineHeight: "shorter",
//     fontWeight: "bold",
//   },

//   "2xl": {
//     textStyle: "h1",
//   },
//   xl: {
//     textStyle: "h1",
//   },
//   lg: {
//     textStyle: "h2",
//   },
//   sm: {
//     textStyle: "h3",
//   },
//   xs: {
//     textStyle: "h4",
//   },
//   "2xs": {
//     textStyle: "h5",
//   },
// };

// export default {
//   baseStyle,
//   sizes,
// };
