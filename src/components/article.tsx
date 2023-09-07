import * as React from "react";
import { FC } from "react";
import {
	Box,
	Stack,
	Text,
	SimpleGrid,
	GridItem,
	Heading,
	Spacer,
	Wrap,
	Container,
	Divider,
	Center,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { jobs, schools } from "../data/cv";
import { LayoutGrid } from "./layout";
import PageHeader from "./pageHeader";
import { BackButton } from "./backButton";

const pageFade = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
};

interface ArticleProps {
	children?: React.ReactNode;
	pageKey: string;
}

export const Article: FC<ArticleProps> = ({ children, pageKey }) => {
	return (
		<motion.div variants={pageFade} initial="initial" animate="animate" exit="exit">
			<Stack maxW="container.lg" spacing={10} alignItems="start">
				<Spacer />
				<BackButton />
				<PageHeader pageKey={pageKey} />
				<Stack
					maxW="container.md"
					spacing={12}
					sx={{
						".chakra-heading, .chakra-text, .chakra-list, .chakra-stack ul": {
							maxW: "prose",
							// m: "auto",
						},
						".chakra-heading": {
							flexGrow: "1",
							w: "full",
						},
					}}>
					{children}
				</Stack>
				<Spacer />
			</Stack>
		</motion.div>
	);
};
