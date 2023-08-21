import * as React from "react";
import { NavLink } from "react-router-dom";

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
  Link,
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
import { ImageToggle } from "../components/imageToggle";

export const UDL: React.FC = () => {
  return (
    <>
      <Article pageKey="unified-design-language">
        <Stack>
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
              Courses have a multitude of themes, loosely related by their
              product type
            </ListItem>
            <ListItem>
              But, for the most part, their look and feel is determined by the
              team that built the initial offering in a product line. There is
              no singular{" "}
            </ListItem>
          </UnorderedList>
          <Stack>
            <Image borderRadius="2xl" src="/assets/udl/ecosystem.png" />
            <Text textStyle="caption"></Text>
          </Stack>
        </Stack>
        <Spacer />
        <Stack spacing={5}>
          <Heading as="h2" size="lg">
            Process
          </Heading>
          <Text>
            We began with our North Star not as design system but a common
            design language that could guide our products closer together. The
            idea of sharing styles and components org-wide was unthinkable given
            the radically different natures of the respective codebases.
          </Text>
          <Text opacity=".5">
            Spoiler alert: it became thinkable. Keep reading.
          </Text>
          <Text>
            Instead, we set out to establish a unified design foundations that
            we could weave throughout experiences wherever technically feasible.
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
              A design language consists of an agreed-upon visual and
              interaction foundation upheld in both code and design workflows to
              foster consistency, intentionality, and predictability within and
              across products.
            </Highlight>
          </Text>
        </Stack>
        <Stack gap={5}>
          <Heading as="h3" size="md">
            Audit
          </Heading>
          <Text>
            We first needed to know what we were dealing with, so I devised a
            set of benchmarks we could use to gauge the "system health" of our
            platforms, comparing their architecture to what had worked for{" "}
            <Link as={NavLink} to="/furnace">
              Furnace
            </Link>
            .
          </Text>

          <Text>
            We then set off on an old-fashioned visual audit cataloguing each
            step in a potential admin, teacher, or learner journey.
            {/* In order to sell this idea, we first needed to know the cost of a
              style refactor in our platforms – at this stage, the best-case
              scenario was getting the green light to copy-paste variables from
              the theming system I'd devised for courses. I audited the SCSS
              used in our platforms and weighed it against a set of design
              system benchmarks to see just how far off we were. */}
          </Text>
          <Stack>
            <Image src="/assets/udl/audit.png" />
            <Text textStyle="caption">
              ~1/10<sup>th</sup> of our audit file
            </Text>
          </Stack>
        </Stack>
        <Stack>
          <Heading as="h3" size="md">
            The Great Component-Off
          </Heading>
          <Text>
            The next step was to establish an opinion – to coalesce around a
            general visual style that reflected our brands, best practices, and,
            to an extent, our taste as a group of designers.
          </Text>
          <Text>
            That spurred the first – and hopefully last –{" "}
            <Box as="span" fontWeight="medium">
              Great EVERFI Component-Off™
            </Box>
            . We pitted competing components from platforms and products against
            one another, holding working sessions to dissect their behavior,
            style, and utility. For each moment of consensus, we laid another
            brick in our new shared foundations.
          </Text>
          <Stack>
            <Image src="https://placehold.co/1024x520" />
            <Text textStyle="caption">
              There can only be one <s>Highlander</s> button
            </Text>
          </Stack>
        </Stack>
        <Stack spacing={5}>
          <Heading as="h3" size="md">
            Proof of Concept
          </Heading>
          <Text>
            When we'd reached a critical mass of solid decisions, I created a
            rough set of components to stress-test in wildly different use cases
            across the organization. The goal was to further refine our approach
            and develop a proof of concept.
          </Text>
          <Stack>
            <Image borderRadius="2xl" src="/assets/udl/login-after.png" />
            <Text textStyle="caption">One login screen to rule them all</Text>
          </Stack>
          <Stack>
            <Image borderRadius="2xl" src="/assets/udl/create-after.png" />
            <Text textStyle="caption">
              Aligning admin and K12 platform onboarding
            </Text>
          </Stack>
          <Stack>
            <Image borderRadius="2xl" src="/assets/udl/evaluations-after.png" />
            <Text textStyle="caption">
              Evaluations in platform and course contexts
            </Text>
          </Stack>
        </Stack>
        <Heading as="h2" size="lg">
          Foundations
        </Heading>
        <ImageToggle
          before="/assets/udl/color-before.png"
          after="/assets/udl/color-after.png"
        />
        <ImageToggle
          before="/assets/udl/type-before.png"
          after="/assets/udl/type-after.png"
        />
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
