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
    <motion.div
      variants={pageFade}
      initial="initial"
      animate="animate"
      exit="exit"
      //   mode="wait"
    >
      <Stack maxW="container.lg" spacing={20}>
        <Spacer />
        <PageHeader pageKey={pageKey} />

        <Stack
          spacing={20}
          sx={{
            ".chakra-heading, .chakra-text, .chakra-list, .chakra-stack ul": {
              maxW: "container.sm",
              // m: "auto",
            },

            ".chakra-heading": {
              flexGrow: "1",
              w: "full",
            },
          }}
        >
          {children}
        </Stack>
        <Spacer />
      </Stack>
    </motion.div>
  );
};
