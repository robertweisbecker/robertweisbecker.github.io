import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, type StyleFunctionProps } from "@chakra-ui/styled-system";

const { definePartsStyle } = createMultiStyleConfigHelpers(tabsAnatomy.keys);

export const indicator = definePartsStyle((props) => {
	return {
		tablist: {
			borderRadius: "2xl",
			// overflow: "hidden",
			h: "auto",
			// p: "0.5",
			gap: "0.5",
			// outlineWidth: "0.5px",
			// outlineColor: "border.muted",
			// outlineOffset: "-0.5px",
			// w: "auto",
			// justifyContent: "center",
			// width: "max",
			// bg: "bg.canvas",
			mt: "2",
			mx: "2",
			mb: "0",
			// backdropFilter: "auto",
			// backdropBlur: "lg",
			position: "relative",
		},
		tab: {
			color: "fg.subdued",
			// fontFamily: "heading",
			// textStyle: "subheading",
			m: 0,
			fontSize: "sm",
			fontWeight: "medium",
			zIndex: 1,
			borderRadius: "md",
			px: "3",
			py: "1",
			h: "auto",
			_hover: {
				bg: "blackAlpha.100",
				// color: "fg.muted",
				borderColor: "border.muted",
				zIndex: "0",
			},
			_focusVisible: {
				// bg: "bg.active",
				fg: "fg.emphasized",
			},
			_active: {
				// bg: "bg.active",
				fg: "fg.emphasized",
			},
			_selected: {
				color: "fg.emphasized",
				// fontWeight: "bold",
				zIndex: "docked",
				_hover: {
					bg: "transparent",
				},
			},
		},
		indicator: {
			inset: "0",

			borderRadius: "lg",
			boxShadow: "lg",
			bg: "bg.elevated",
			// bg: "bg.active",
			borderWidth: "1px",
			outlineOffset: "-0.5px",
			borderColor: "border.subdued",
			backgroundClip: "padding-box",
		},
		tabpanel: {
			gap: 0,
			m: 0,
			padding: "2",
		},
	};
});
