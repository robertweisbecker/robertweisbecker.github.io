import * as React from "react";
import { FC } from "react";

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
  Flex,
} from "@chakra-ui/react";

interface ImageProps {
  before: string;
  after: string;
  tab1?: string;
  tab2?: string;
}

export const ImageToggle: FC<ImageProps> = ({ before, after, tab1, tab2 }) => {
  return (
    <Flex gap="4">
      <Tabs variant="soft-rounded" colorScheme="blue" color="emphasis">
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
        <Center>
          <TabList>
            <Tab>{tab1 ? tab1 : "Before"}</Tab>
            <Tab>{tab2 ? tab2 : "After"}</Tab>
          </TabList>
          <TabIndicator />
        </Center>
      </Tabs>
    </Flex>
  );
};
