import * as React from "react";
import { ReactComponent as Pattern } from "../blur.svg";
import ProjectGrid from "../components/projectGrid";
import { ImageSnap } from "../components/imageSnap";
import { LayoutGrid } from "../components/layout";
import { Squiggle } from "../components/images/squiggle";
import { LinkOut } from "../components/linkOut";

import { Heading, Center, Box, Text, Stack, Icon, HStack, Spacer, Divider, Image, Tooltip } from "@chakra-ui/react";
import { HandIcon, EyeOpenIcon, EyeClosedIcon, BackpackIcon, ArrowTopRightIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";

export const System: React.FC = () => {
	return (
		<Stack spacing={10} mt={10} divider={<Divider />}>
			<Heading as="h1" size="2xl">
				Components
			</Heading>
			<Heading>BackButton</Heading>
			<Heading>Footer</Heading>
			<Heading>Header</Heading>
			<Heading>Hello Tag</Heading>
			<Heading>Image Modal</Heading>
			<Heading>Image Toggle</Heading>
			<Heading>Image Snap</Heading>
			<Heading>Layout</Heading>
			<Heading>LinkOut</Heading>
			<Heading>PageHeader</Heading>
			<Heading>Peek</Heading>
			<Heading>Scroll Button</Heading>
		</Stack>
	);
};

// export default Home;
