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
	textDecorationColor: "border.interactive",
	textDecorationThickness: ".125em",
	fontWeight: "medium",
	textDecorationSkipInk: "none",
	display: "inline-flex",
	alignItems: "baseline",
	color: "fg.emphasized",
	// boxShadow: "0 0 0 -2px inset",
	_hover: {
		color: "fg.interactive",
		textDecorationColor: "border.interactive-hover",
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
		color: "fg.muted",
		textDecoration: "none",
		fontWeight: "normal",
		fontSize: "sm",
		borderRadius: "lg",
		fontFamily: "heading",
		alignItems: "center",
		display: "inline-flex",
		gap: 1,
		px: 3,
		py: 2,
		_hover: {
			bg: "bg.hover",
			color: "fg.emphasized",
			textDecoration: "none",
		},
		_focus: {
			bg: "brand.300",
		},
		_active: {
			bg: "bg.active",
			color: "fg.interactive",
		},
		_activeLink: {
			bg: "bg.active",
			color: "fg.emphasized",
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
