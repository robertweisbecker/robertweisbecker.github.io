// import Resume from '../components/resume';
import { LayoutGrid } from "../components/layout";
import { LinkOut } from "../components/linkOut";
import { Article } from "../components/article";
import {
  Heading,
  Box,
  Text,
  Divider,
  Stack,
  SimpleGrid,
  Icon,
  Container,
  Link,
  GridItem,
  HStack,
  Image,
  Spacer,
  List,
  ListItem,
} from "@chakra-ui/react";

import { ArrowTopRightIcon } from "@radix-ui/react-icons";

import { AnimatePresence, motion } from "framer-motion";

export const Achieve: React.FC = () => {
  return (
    <Article pageKey="achieve">
      <Stack spacing={20} py={20}>
        <Text>
          Achieve offers a curated collection of digital education modules
          covering critical concepts like loans, mortgages, building credit, and
          saving, delivered through a customized landing page unique to customer
          organizations.
        </Text>

        <LinkOut
          href="https://everfi.com/financial-education/consumers/"
          text="Read more"
        />
      </Stack>
    </Article>
  );
};
