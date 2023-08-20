import ProjectGrid from "../components/projectGrid";
// import Resume from '../components/resume';
import { LayoutGrid } from "../components/layout";
import { Squiggle } from "../components/images/squiggle";
import { LinkOut } from "../components/linkOut";

import {
  Heading,
  Box,
  Text,
  Divider,
  Stack,
  Icon,
  Link,
  HStack,
  Image,
  Spacer,
} from "@chakra-ui/react";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

import { HandIcon, EyeOpenIcon, BackpackIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";

export const Home: React.FC = () => {
  return (
    <Stack spacing={20} mx={0} px={0}>
      <Spacer />
      <HStack align="center">
        <Icon
          boxSize=""
          as={HandIcon}
          opacity="0.5"
          transform="scaleX(-1) rotate(45deg)"
        />

        <Heading as="h2" size="2xs" id="">
          Howdy partner
        </Heading>
      </HStack>

      <Box>
        <Text fontSize="lg">
          I'm currently designing design systems
          <br /> & tools for designers for <br />
          <LinkOut
            src="/assets/logos/everfi-blue-icon.png"
            href="https://www.everfi.com"
            text="Everfi"
          />
          +
          <LinkOut
            src="/assets/logos/blackbaud-logo.png"
            href="https://www.blackbaud.com"
            text="Blackbaud"
          />
          .
        </Text>
      </Box>
      {/* <Divider borderStyle="dashed" orientation="vertical" h={20} /> */}
      {/* <Squiggle w={10} color="gray.100" transform="rotate(-45deg)" /> */}
      <Image
        position="relative"
        top="-120px"
        left="20%"
        h="200px"
        color="subtle"
        opacity=".3"
        transform="rotate(-20deg) scale(2)"
        filter="auto"
        // blur="2px"
        src="../assets/pattern1.svg"
      />
      {/* <HStack align="center">
        <Icon boxSize="" as={EyeOpenIcon} opacity="0.5" />
        <Heading as="h2" size="2xs" id="projects">
          Take a gander
        </Heading>
      </HStack> */}

      {/* <ProjectGrid />

      <HStack align="center">
        <Icon boxSize="" as={BackpackIcon} opacity="0.5" />
        <Heading as="h2" size="2xs" id="cv">
          fiddling away
        </Heading>
      </HStack> */}
    </Stack>
  );
};

// export default Home;
