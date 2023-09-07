import { FC, useId } from "react";

import {
	Stack,
	Tab,
	Tabs,
	TabList,
	TabIndicator,
	TabPanels,
	TabPanel,
	Image,
	Text,
	Center,
	Box,
} from "@chakra-ui/react";
import { ImageModal } from "./imageModal";

interface ImageProps {
	before: string;
	after: string;
	tab1?: string;
	tab2?: string;
}

export const ImageToggle: FC<ImageProps> = ({ before, after, tab1, tab2 }) => {
	const tabId = useId();
	return (
		<Box
			position="relative"
			// mb="2"
			// maxW="container.lg"
			// mx={-4}
			// bg="surface-elevated"
			// pt={2}
		>
			<Tabs variant="indicator" color="text-emphasis" id={tabId}>
				<TabList position="relative" mx="auto" mb="2">
					<Tab>{tab2 ? tab2 : "After"}</Tab>
					<Tab>{tab1 ? tab1 : "Before"}</Tab>
					<TabIndicator />
				</TabList>
				<TabPanels>
					<TabPanel p={0}>
						<ImageModal src={after}></ImageModal>
					</TabPanel>
					<TabPanel p={0}>
						<ImageModal src={before}></ImageModal>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
};
