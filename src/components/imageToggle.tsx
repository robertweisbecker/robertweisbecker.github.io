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

interface ImageProps {
  before: string;
  after: string;
  tab1?: string;
  tab2?: string;
}

export const ImageToggle: FC<ImageProps> = ({ before, after, tab1, tab2 }) => {
  const tabId = useId();
  return (
    <Box position="relative">
      <Tabs variant="indicator" colorScheme="blue" color="emphasis" id={tabId}>
        <TabList position="relative" mb="-6">
          <Tab>{tab1 ? tab1 : "Before"}</Tab>
          <Tab>{tab2 ? tab2 : "After"}</Tab>
          <TabIndicator />
        </TabList>
        <TabPanels
          mb={2}
          // bg="bg-subtle"
          borderRadius="lg"
          boxShadow="inner"
          overflow="hidden"
          border="1px"
          borderColor="border"
          // display="flex"
        >
          <TabPanel p={0}>
            <Image src={before}></Image>
          </TabPanel>
          <TabPanel p={0}>
            <Image src={after}></Image>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
