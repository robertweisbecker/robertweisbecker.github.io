import * as React from "react";
import { ReactComponent as Pattern } from "../blur.svg";
import ProjectGrid from "../components/projectGrid";
import { LayoutGrid } from "../components/layout";
import { Squiggle } from "../components/images/squiggle";
import { LinkOut } from "../components/linkOut";

import {
  Heading,
  Box,
  Text,
  Stack,
  Icon,
  HStack,
  Spacer,
  Image,
} from "@chakra-ui/react";
import {
  HandIcon,
  EyeOpenIcon,
  BackpackIcon,
  ArrowTopRightIcon,
} from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";

export const Home: React.FC = () => {
  return (
    <Stack spacing={10}>
      <Image
        src="/assets/blob.png"
        position="fixed"
        mx="0"
        boxSize={{ base: "150vmin" }}
        left={{ base: "50%", sm: "75%" }}
        top="50%"
        transform="translate(-50%, -50%)"
        maxW="unset"
        // w={{ base: "200vw", md: "200vw", xl: "200vw" }}
        // h={{ base: "500px", md: "800px", xl: "1200px" }}
        zIndex="-1"
      />
      <Spacer />

      <HStack align="center" mt={5} className="group">
        <Icon
          boxSize=""
          as={HandIcon}
          opacity="0.5"
          transform="scaleX(-1) rotate(30deg)"
          _groupHover={{
            transform: "scaleX(-1) rotate(-30deg)",
          }}
        />

        <Heading as="h2" size="2xs" id="">
          Howdy partner
        </Heading>
      </HStack>

      <Box>
        <Text fontSize="xl" lineHeight="taller">
          I'm currently designing design systems
          <br /> & systems for designers at <br />
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
        </Text>
        <Text textStyle="caption" my={2} opacity={0.6}>
          (we got acquired)
        </Text>
      </Box>
      <Spacer />
      <HStack align="center">
        <Icon boxSize="" as={EyeOpenIcon} opacity="0.5" />
        <Heading as="h2" size="2xs" id="projects">
          Take a gander
        </Heading>
      </HStack>
      <ProjectGrid />
      <Spacer />
    </Stack>
  );
};

// export default Home;
