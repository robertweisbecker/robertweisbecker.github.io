import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

export const headingStyles = defineStyleConfig({
	baseStyle: {
		fontFamily: "heading",
		fontWeight: "", // make sure it's empty,
		lineHeight: "shorter",
		letterSpacing: "tight",
		color: "text-emphasis",
	},
	sizes: {
		"3xl": {
			fontSize: "3xl",
			letterSpacing: "tighter",
			fontWeight: "bold",
			lineHeight: "short",
			mb: "2",
		},
		"2xl": {
			fontSize: ["xl", null, "2xl"],
			fontWeight: "black",
			lineHeight: "short",
			mb: "8",
			_first: {
				mt: 0,
			},
		},
		xl: {
			fontSize: ["lg", null, "xl"],
			fontWeight: "semibold",
			mt: "8",
		},
		lg: {
			fontSize: ["md", null, "lg"],
			lineHeight: "base",
			fontWeight: "semibold",
			mt: "2em",
			mb: ".25em",
		},

		md: {
			fontSize: "md",
			fontWeight: "semibold",
			letterSpacing: "normal",
			mt: "1em",
			mb: ".5em",
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
		},
		heading3: {
			textStyle: "h3",
		},
		h4: {
			textStyle: "h4",
		},
		h5: {
			textStyle: "h5",
		},
		h6: {
			textStyle: "h6",
		},
		subtitle: {
			fontSize: "lg",
			fontWeight: "medium",
			lineHeight: "shorter",
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
