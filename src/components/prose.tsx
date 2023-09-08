import React from "react";
import { Heading, Text, Box } from "@chakra-ui/react";

type ProseProps = {
	heading: string;
	p: string[];
	h?: 1 | 2 | 3 | 4 | 5 | 6;
};

export const Prose: React.FC<ProseProps> = ({ heading, p, h = 1 }) => {
	const headingSizes = ["3xl", "2xl", "xl", "lg", "md", "sm"];

	return (
		<Box>
			<Heading as={`heading${h}` as any} size={headingSizes[h - 1]}>
				{heading}
			</Heading>
			{p.map((paragraph, index) => (
				<Text key={index} mt={4}>
					{paragraph}
				</Text>
			))}
		</Box>
	);
};
