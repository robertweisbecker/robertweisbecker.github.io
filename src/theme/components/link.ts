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
		borderRadius: "lg",
		p: "2",
		_hover: {
			textDecoration: "none",
			bg: "bg-subdued",
		},
		_active: {
			textDecoration: "none",
			bg: "bg-active",
		},
		_activeLink: {
			fontWeight: "bold",
			bg: "bg-active",
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
