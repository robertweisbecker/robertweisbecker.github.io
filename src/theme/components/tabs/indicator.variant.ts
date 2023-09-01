import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, type StyleFunctionProps } from "@chakra-ui/styled-system";

const { definePartsStyle } = createMultiStyleConfigHelpers(tabsAnatomy.keys);

export const indicator = definePartsStyle((props) => {
	return {
		tablist: {
			borderRadius: "2xl",
			overflow: "hidden",
			h: "auto",
			p: "1",
			gap: "0",
			borderWidth: "1px",
			borderColor: "border-subdued",
			w: "auto",
			justifyContent: "center",
			width: "max",
			bg: "bg-canvas",
			backdropFilter: "auto",
			backdropBlur: "lg",
			position: "relative",
			_hover: {
				borderColor: "border-muted",
			},
		},
		tab: {
			color: "text-subdued",
			fontFamily: "heading",
			fontSize: "sm",
			fontWeight: "medium",
			zIndex: 1,
			borderRadius: "xl",
			px: "4",
			py: "2",
			h: "auto",
			_hover: {
				bg: "surface-hover",
				color: "text-muted",
				borderColor: "border-muted",
				zIndex: "0",
			},
			_selected: {
				color: "emphasis",
				// fontWeight: "bold",
				zIndex: "10",
				_hover: {
					bg: "transparent",
				},
			},
		},
		indicator: {
			top: "1",
			bottom: "1",
			borderRadius: "xl",
			boxShadow: "xs",
			bg: "surface-elevated",
			border: "1px",
			borderColor: "border-muted",

			// _dark: {
			//   bg: "gray.700",
			// },
		},
	};
});
