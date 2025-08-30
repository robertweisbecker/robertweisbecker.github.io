export const semanticTokens = {
	fonts: {
		fallback: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
		"Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
		"nimbus-ext": `'nimbus-sans-extended'`,
		nimbus: `'nimbus-sans'`,
	},
	colors: {
		// Foreground (text) tokens
		fg: {
			default: "fg.muted",
			emphasized: { _light: "black", _dark: "whiteAlpha.800" },
			muted: { _light: "gray.700", _dark: "gray.200" },
			subdued: { _light: "gray.500", _dark: "gray.400" },
			frosted: { _light: "blackAlpha.700", _dark: "whiteAlpha.700" },
			placeholder: { _light: "blackAlpha.400", _dark: "whiteAlpha.400" },
			interactive: { _light: "brand.500", _dark: "brand.400" },
			inverted: { _light: "white", _dark: "gray.800" },
			disabled: { _light: "blackAlpha.200", _dark: "whiteAlpha.100" },
			"emphasis-invert": { _light: "whiteAlpha.900", _dark: "gray.800" },
			"invert-muted": "brand.50",
			"invert-subdued": "brand.100",
		},

		// Background tokens
		bg: {
			page: { _light: "white", _dark: "gray.950" },
			canvas: { _light: "gray.100", _dark: "black" },
			"canvas-hover": { _light: "blackAlpha.200", _dark: "whiteAlpha.50" },
			subdued: { _light: "gray.100", _dark: "black" },
			muted: { _light: "gray.200", _dark: "gray.700" },
			invert: { _light: "gray.900", _dark: "white" },
			accent: "brand.500",
			"accent-muted": "brand.400",
			"accent-subdued": { _light: "brand.50", _dark: "brand.700" },
			// Surface tokens nested under bg
			surface: { _light: "bg.page", _dark: "gray.900" },
			inset: "bg-canvas",
			hover: { _light: "gray.50", _dark: "gray.700" },
			active: { _light: "gray.200", _dark: "gray.600" },
			elevated: { _light: "white", _dark: "gray.800" },
			frosted: { _light: "whiteAlpha.400", _dark: "blackAlpha.600" },
		},

		// Border tokens
		border: {
			default: { _light: "gray.300", _dark: "gray.700" },
			elevated: { _light: "blackAlpha.100", _dark: "whiteAlpha.400" },
			muted: { _light: "blackAlpha.200", _dark: "whiteAlpha.300" },
			subdued: { _light: "blackAlpha.100", _dark: "whiteAlpha.200" },
			interactive: { _light: "brand.400", _dark: "brand.500" },
			"interactive-hover": { _light: "brand.500", _dark: "brand.100" },
		},

		// Accent and status tokens (remain ungrouped)
		accent: { _light: "brand.400", _dark: "brand.300" },
		success: { _light: "green.500", _dark: "green.200" },
		error: { _light: "red.500", _dark: "red.200" },
		// Chakra tokens (remain ungrouped)
		"chakra-body-text": "fg.muted",
		"chakra-body-bg": "bg.page",
		"chakra-border-color": "border.default",
		"chakra-subtle-bg": "bg.subdued",
		"chakra-placeholder-color": "fg.placeholder",
	},
	shadows: {
		xs: {
			_light:
				"0px 3px 6px -3px rgba(0,0,0,.05) ,0px 2px 4px -2px rgba(0,0,0,.05) ,0px 1px 2px -1px rgba(0,0,0,.05) ,0px 1px 1px -1px rgba(0,0,0,.05) ,0px 1px 0px -1px rgba(0,0,0,.05)",
			// _light: "0px 1px 4px 1px rgba(36, 42, 66, 0.06), 0px 0px 2px rgba(36, 42, 66, 0.06)",

			_dark: "0px 0px 1px rgba(13, 14, 20, 0.5), 0px 1px 2px rgba(13, 14, 20, .4)",
		},
		sm: {
			_light:
				"0px 8px 20px -6px rgba(36, 42, 66, 0.08), 0px 1px 4px 1px rgba(36, 42, 66, 0.06), 0px 0px 2px rgba(36, 42, 66, 0.06)",
			_dark: "0px 0px 1px rgba(13, 14, 20, 0.5), 0px 2px 4px rgba(13, 14, 20, .4)",
		},
		md: {
			_light:
				"0px 1px 4px 1px rgba(36, 42, 66, 0.06), 0px 10px 24px 8px rgba(36, 42, 66, 0.04), 0px 20px 70px -10px rgba(36, 42, 66, 0.08)",
			_dark: "0px 0px 1px rgba(13, 14, 20, 0.5), 0px 4px 8px rgba(13, 14, 20, .4)",
		},
		lg: {
			_light:
				"0px 1px 4px 1px rgba(36, 42, 66, 0.06), 0px 12px 36px -6px rgba(36, 42, 66, 0.12), 0px 32px 120px -15px rgba(36, 42, 66, 0.15)",
			// default:
			//   "0px 0px 1px rgba(45, 55, 72, 0.05), 0px 8px 16px rgba(45, 55, 72,  0.1)",
			_dark:
				"0px 0px 1px rgba(13, 14, 20, 0.5), 0px 12px 36px -6px rgba(13, 14, 20, .4),  0px 32px 120px -15px rgba(13, 14, 20, 0.6)",
		},
		xl: {
			default: "0px 0px 1px rgba(45, 55, 72, 0.05), 0px 16px 24px rgba(45, 55, 72,  0.1)",
			_dark:
				"0px 0px 1px rgba(13, 14, 20, 0.5), 0px 16px 24px rgba(13, 14, 20, .4), inset 0 0 0 1px rgba(255,255,255,.12)",
		},
	},
	space: {
		"2xs": "1",
		xs: "2",
		sm: "3",
		md: "5",
		lg: "8",
		xl: "12",
		"2xl": "16",
		"squish-xs": "var(--bob-space-3) var(--bob-space-3)",
		"squish-sm": "2xs xs",

		"squish-md": "{[ 2, 3 ]}",
		"squish-lg": {
			px: "8",
			py: "5",
		},
		"squish-xl": ["12", "8"],
		"squish-2xl": ["16", "12"],
	},

	// fontSizes: {
	//   "ui-micro": "3xs",
	//   "ui-compact": "xs",
	//   "ui-default": "sm",
	//   "ui-title": "xs",
	//   p4: "2xs",
	//   p3: "xs",
	//   p2: "sm",
	//   p1: "md",
	//   subtitle: "lg",
	//   h6: "xs",
	//   h5: "sm",
	//   h4: "md",
	//   h3: "lg",
	//   h2: "xl",
	//   h1: "2xl",
	//   h0: "4xl",
	// },
	// lineHeights: {
	//   "ui-default": "5",
	//   "ui-compact": "4",
	//   "ui-title": "base",
	//   p4: "3.5",
	//   p3: "4",
	//   p2: "5",
	//   p1: "6",
	//   subtitle: "6",
	//   h6: "4",
	//   h5: "4.5",
	//   h4: "5",
	//   h3: "5",
	//   h2: "6",
	//   h1: "6",
	//   h0: "9",
	// },
};
