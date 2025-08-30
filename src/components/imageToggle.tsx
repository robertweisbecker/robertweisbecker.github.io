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
			bg="bg.canvas"
			rounded="2xl"
			outline="1px solid"
			outlineColor="border.subdued"
			outlineOffset="-1px"
			// mb="2"
			// maxW="container.lg"
			// mx={-4}
			// bg="surface-elevated"
			// pt={2}
		>
			<Tabs variant="indicator" id={tabId}>
				<TabList position="relative">
					<Tab>{tab2 ? tab2 : "After"}</Tab>
					<Tab>{tab1 ? tab1 : "Before"}</Tab>
					<TabIndicator />
				</TabList>
				<TabPanels>
					<TabPanel>
						<ImageModal src={after}></ImageModal>
					</TabPanel>
					<TabPanel>
						<ImageModal src={before}></ImageModal>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
};
