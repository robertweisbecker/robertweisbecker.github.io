import * as React from "react";
import {
  Image,
  Highlight,
  GridItem,
  Container,
  Box,
  Stack,
  Wrap,
  HStack,
  Text,
  Heading,
  ListItem,
  List,
  UnorderedList,
  Spacer,
  OrderedList,
  Divider,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { LayoutGrid } from "../components/layout";
import { Article } from "../components/article";
import {} from "@chakra-ui/react";

export const UDL: React.FC = () => {
  return (
    <>
      <Article pageKey="unified-design-language">
        <Heading as="h2" size="lg">
          {" "}
          Background
        </Heading>
        <UnorderedList>
          <ListItem>
            Supporting multiple brands/themes, product types, vastly different
            users and tasks
          </ListItem>
          <ListItem>
            Theming is critical to courses, whitelabeling is critical to
            Platform
          </ListItem>
          <ListItem>Everfi has several distinct touchpoints:</ListItem>
          <ListItem>Foundry: admin portal</ListItem>
          <ListItem>Assigned Learner:</ListItem>
          <ListItem>Next: Elective Admin</ListItem>
          <ListItem>Next: Elective Learner</ListItem>
          <ListItem>Homeroom Admin: K12 teacher center</ListItem>
          <ListItem>Homeroom: Learner</ListItem>
          <ListItem>Courses</ListItem>
          <ListItem>
            Courses have a multitude of themes, loosely related by their product
            type
          </ListItem>
          <ListItem>
            But, for the most part, their look and feel is determined by the
            team that built the initial offering in a product line. There is no
            singular{" "}
          </ListItem>
        </UnorderedList>
        <Spacer />
        <Heading as="h2" size="lg">
          Process
        </Heading>
        <Text>
          We began with our North Star not as design system but a common design
          language that could guide our products closer together. The idea of
          sharing styles and components org-wide was unthinkable given the
          radically different natures of the respective codebases.
        </Text>
        <Text opacity=".5">But, reader, do I have news for you...</Text>
        <Text>
          Instead, we set out to establish a unified design foundations that we
          could weave throughout experiences wherever technically feasible.
        </Text>
        <Text>
          We defined a design language as such – note the emphasis on
          "foundations" instead of components:
        </Text>
        <Text
          // fontStyle="italic"
          fontSize="lg"
          lineHeight="tall"
          fontWeight="regular"
          color="fg.subtle"
          // textAlign="center"
          // borderLeft="1px"
          // px={6}
          // mx={-6}
          my={10}
          mx="auto"
          maxW="80%"
          // borderColor="border.default"
          // borderStyle="dashed"
          sx={{
            textDecorationSkipInk: "none",
            textDecoration: "underline wavy 2px",
            textDecorationColor: "blackAlpha.100",
            textUnderlineOffset: "0.5em",
          }}
        >
          <Highlight
            query={["foundation", "across"]}
            styles={{ px: "1", bg: "orange.100" }}
          >
            A design language consists of an agreed-upon visual and interaction
            foundation upheld in both code and design workflows to foster
            consistency, intentionality, and predictability within and across
            products.
          </Highlight>
        </Text>
        <Heading as="h3" size="md">
          Audit
        </Heading>
        <Text>
          I devised a set of benchmarks we could use to gauge the "system
          strength" of our three platforms and audited the respective repos.
        </Text>
        <Heading as="h4" size="sm">
          Criteria
        </Heading>
        <Text>
          An old fashioned visual audit was next. It was...a lot to unpack.
          {/* In order to sell this idea, we first needed to know the cost of a
              style refactor in our platforms – at this stage, the best-case
              scenario was getting the green light to copy-paste variables from
              the theming system I'd devised for courses. I audited the SCSS
              used in our platforms and weighed it against a set of design
              system benchmarks to see just how far off we were. */}
        </Text>
        <Image src="https://placehold.co/1024x520" />
        <Heading as="h3" size="md">
          {" "}
          The Great Component-Off
        </Heading>
        <Text>
          The next step was to establish an opinion – to coalesce around a
          general visual style that reflected our brands, best practices, and,
          to an extent, our taste as a group of designers.
        </Text>
        <Text>
          That spurred the first – and hopefully last –{" "}
          <Box as="span" fontWeight="medium" fontStyle="italic">
            Great EVERFI Component-Off™
          </Box>
          . We pitted competing components from platforms and products against
          one another, holding working sessions to dissect their behavior,
          style, and utility. For each moment of consensus, we laid another
          brick in our new shared foundations.
        </Text>
        <Image src="https://placehold.co/1024x520" />
        <Heading as="h3" size="md">
          {" "}
          Proof of Concept
        </Heading>
        <Text>
          When we'd reached a critical mass of solid decisions, I created a
          rough set of components to stress-test in wildly different use cases
          across the organization. The goal was to further refine our approach
          and develop a proof of concept.
        </Text>
        <Text>
          for a friendlier design language that supports applications of varying
          information densities.
        </Text>
        <Image borderRadius="2xl" src="https://placehold.co/1024x520" />
        <Heading as="h2" size="lg">
          {" "}
          Establishing the Foundations
        </Heading>
        <Image src="https://placehold.co/1024x520" />
        <LayoutGrid variant="twoUp" alignItems="center">
          <Stack>
            <Heading as="h2" size="md">
              Typography
            </Heading>
            <Text>This was difficult.</Text>
          </Stack>

          <Image src="https://placehold.co/600x400" />

          <Image src="https://placehold.co/600x400" />

          <Stack>
            <Heading as="h2" size="md">
              Iconography
            </Heading>
            <Text>This was not difficult.</Text>
          </Stack>
          <Stack>
            <Heading as="h2" size="md">
              Density Theming
            </Heading>
            <Text>
              An additional theming layer for density consisting of typography
              and spacing
            </Text>
          </Stack>
          <GridItem colSpan={2}>
            <Image src="https://placehold.co/1024x600" />
          </GridItem>
        </LayoutGrid>
        <Heading as="h2" size="md">
          Color
        </Heading>
        <Divider />
        Each color in the scale has
        <Heading as="h2" size="lg">
          Implementation
        </Heading>
        <Heading>Tokens Studio integration</Heading>
        <Heading>Figma Setup</Heading>
        <Heading>Storybook</Heading>
      </Article>
    </>
  );
};
