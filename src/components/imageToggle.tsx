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
}

export const ImageToggle: FC<ImageProps> = ({ before, after }) => {
  return (
    <Flex gap="4">
      <Tabs variant="soft-rounded">
        <TabPanels
          mb={2}
          bg="bg-subtle"
          borderRadius="2xl"
          boxShadow="inner"
          display="flex"
        >
          <TabPanel p={0} flexGrow="1">
            <Image src={before}></Image>
          </TabPanel>
          <TabPanel flexGrow="1">
            <Image src={after}></Image>
          </TabPanel>
        </TabPanels>
        <Center>
          <TabList>
            <Tab>Before</Tab>
            <Tab>After</Tab>
          </TabList>
          <TabIndicator />
        </Center>
      </Tabs>
    </Flex>
  );
};
