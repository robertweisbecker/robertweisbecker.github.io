const typography = {
	letterSpacings: {
		tightest: "-0.025em",
		tighter: "-0.01em",
		tight: "-0.005em",
		normal: "0",
		wide: "0.025em",
		wider: "0.05em",
		widest: "0.1em",
	},

	lineHeights: {
		normal: "normal",
		none: 1,
		shorter: 1.25,
		short: 1.375,
		base: 1.5,
		tall: 1.75,
		taller: "1.875",
	},
	fonts: {
		heading: `'nimbus-sans-extended'`,
		body: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
		"Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
		fallback: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
		"Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
	},
	fontSizes: {
		"3xs": "0.5rem", //8
		"2xs": "0.625rem", //10
		xs: "0.75rem", //12
		sm: "0.875rem", //14
		md: "0.9375rem", //16
		lg: "1.25rem", //20
		xl: "1.5rem", //24
		"2xl": "1.75rem", //28
		"3xl": "1.875rem", //30
		"4xl": "2", //32
		"5xl": "2.25rem", //36
		"6xl": "2.5rem", //40
		"7xl": "2.75", //44
		"8xl": "3rem", //48
		"9xl": "3.25rem", //52
	},
};

export default typography;
