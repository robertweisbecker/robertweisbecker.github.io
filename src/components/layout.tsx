import * as React from "react";
import { Grid, GridProps, Container, Box } from "@chakra-ui/react";

type Props = GridProps & {
	variant: "two" | "three" | "twoUp" | "threeUp" | "oneToThreeUp" | "fourUp" | "fit" | "oneThird" | "twoThirds";
	columnGap?: GridProps["columnGap"];
	rowGap?: GridProps["rowGap"];
};

const layouts: Record<Props["variant"], { templateColumns: GridProps["templateColumns"] }> = {
	two: { templateColumns: { base: "repeat(2, 1fr)" } },
	three: { templateColumns: { base: "1fr", sm: "repeat(3, 1fr)" } },
	twoUp: { templateColumns: { base: "1fr", md: "repeat(2, 1fr)" } },
	threeUp: {
		templateColumns: { base: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" },
	},
	oneToThreeUp: { templateColumns: { sm: "1fr 1fr 1fr" } },
	fourUp: {
		templateColumns: {
			base: "1fr",
			sm: "1fr 1fr",
			md: "1fr 1fr 1fr",
			lg: "1fr 1fr 1fr 1fr",
		},
	},
	fit: { templateColumns: { base: "1fr", sm: "auto 1fr" } },
	oneThird: { templateColumns: { base: "1fr", md: "1fr 2fr", xl: "1fr 3fr" } },
	twoThirds: { templateColumns: { base: "1fr", md: "2fr 1fr" } },
};

const defaultLayout = { templateColumns: "twoUp" };

export const LayoutGrid: React.FC<Props> = ({
	variant = "twoUp",
	columnGap = { base: 8, md: 12 },
	rowGap = { base: 4, sm: 10, md: 12 },
	children,
	...rest
}) => {
	const layout = layouts[variant] || defaultLayout;

	return (
		<Box>
			<Grid templateColumns={layout.templateColumns} rowGap={rowGap} columnGap={columnGap} alignItems="start" {...rest}>
				{children}
			</Grid>
		</Box>
	);
};
