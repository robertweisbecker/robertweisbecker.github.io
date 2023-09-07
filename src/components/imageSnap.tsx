import { FC } from "react";
import {
	Text,
	Image,
	Heading,
	VStack,
	AspectRatio,
	IconButton,
	Box,
	Flex,
	HStack,
	Stack,
	Badge,
	Tag,
} from "@chakra-ui/react";

import { ArrowRightIcon, DotIcon, TokensIcon } from "@radix-ui/react-icons";
import { LayoutGrid } from "./layout";

interface ImageSnapProps {
	children?: React.ReactNode;
}

export const ImageSnap: FC<ImageSnapProps> = ({ children }) => {
	return (
		<HStack
			gap={5}
			maxW="100%"
			overflowX="scroll"
			w="100vw"
			scrollSnapType="x mandatory"
			sx={{ "& > *": { scrollSnapStop: "always", scrollSnapAlign: "center", flexShrink: "0", width: "75%" } }}>
			{children}
		</HStack>
	);
};
