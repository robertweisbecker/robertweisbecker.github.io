import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import React from "react";
import ReactDOMServer from "react-dom/server";

// Serialize the SVG React component to a string using React.createElement instead of JSX
const svgString = ReactDOMServer.renderToStaticMarkup(React.createElement(ArrowTopRightIcon));
// Encode the SVG string to use it in CSS
const encodedSvg = encodeURIComponent(svgString);

// ... (the rest of your code)

const baseStyle = {
	textDecoration: "underline",
	textDecorationColor: "border-interactive",
	textDecorationThickness: ".125em",
	fontWeight: "medium",
	textDecorationSkipInk: "none",
	display: "inline-flex",
	alignItems: "baseline",
	color: "text-emphasis",
	// boxShadow: "0 0 0 -2px inset",
	_hover: {
		color: "text-interactive",
		textDecorationColor: "border-interactive-hover",
		textDecorationThickness: ".0625em",
		textDecorationStyle: "wavy",
	},
};

const isExternal = {
	_after: {
		content: `url('data:image/svg+xml,${encodedSvg}')`,
	},
};

const variants = {
	menu: () => ({
		color: "text-muted",
		textDecoration: "none",
		fontWeight: "normal",
		fontSize: "sm",
		borderRadius: "lg",
		fontFamily: "heading",
		alignItems: "center",
		display: "inline-flex",
		gap: 1,
		px: 3,
		py: 1,
		_hover: {
			bg: "surface-hover",
			color: "text-emphasis",
			textDecoration: "none",
		},
		_focus: {
			bg: "brand.300",
		},
		_active: {
			bg: "surface-active",
			color: "text-interactive",
		},
		_activeLink: {
			bg: "surface-active",
			color: "text-emphasis",
			fontWeight: "semibold",

			"& .link_icon--current": {
				display: "inline",
				visibility: "visible",
				opacity: "1",
				color: "accent",
			},
		},
	}),
	isExternal: {
		_after: {
			content: `url('data:image/svg+xml,${encodedSvg}')`,
		},
	},
};

export default {
	variants,
	baseStyle,
};
