import * as React from "react";
import {
  Image,
  Highlight,
  Container,
  Box,
  Stack,
  Text,
  Heading,
  ListItem,
  List,
  UnorderedList,
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

export const Udl: React.FC = () => {
  return (
    <>
      <Article pageKey="">
        <Stack gap={8} maxW="prose">
          <Heading as="h2" size="lg">
            {" "}
            Refinement
          </Heading>
          <Text>
            Homeroom wouldn't yet be migrating to the new system, but we
            couldn't leave it untouched while its siblings each got a facelift –
            that just wouldn't be fair.{" "}
          </Text>
          <Text>
            Instead, we opted to give it a thorough polish to ease its eventual
            transition to this new style. In the process, we also tweaked some
            of our earlier decisions – lightly tinging our neutrals with some
            blue-green to better harmonize with our brand teal and Homeroom
            blue.
            {/* https://youtu.be/m_mPE9gcQJo?t=89 */}
          </Text>
          <Heading as="h3" size="md">
            {" "}
            Theming
          </Heading>
          <Text>
            The exercise of polishing Homeroom provided some insight into how we
            might handle course theming in this new unified world. Homeroom's
            primary color is a bright royal blue, and it uses a more playful
            typeface in Muli. Retaining those two elements was sufficient to
            present a distinct look and feel that still felt like part of the
            same family.
          </Text>
        </Stack>

        <Image src="https://placehold.co/1024x520" />

        <Stack gap={8} maxW="prose">
          <Text>
            This was enough to demonstrate that, with the right foundations in
            place, we could drastically scale back theming options and still
            support the needs of courses. *that is dulled when placed against
            the unsaturated corporate grays of Foundry. It also prompted some
            changes in my thinking from several years ago:
          </Text>
          <UnorderedList>
            <ListItem>
              with more use cases to cover, the number of potential color slots
              in a theme ballooned
            </ListItem>
            <ListItem>
              we couldn't expect designers to craft an accessible palette
              covering 10+ shades for multiple color scales
            </ListItem>
            <ListItem>
              we would instead offer predefined color palettes to choose from
            </ListItem>

            <ListItem>
              this included removing a number of theme properties, like shadows,
              spacing, borders,{" "}
            </ListItem>
            <ListItem>
              one concession was made for border-radii, despite my stance
            </ListItem>
          </UnorderedList>
          <Text>
            Removing flexibility judiciously can, at times, strengthen the
            system. Continuing to allow overrides of values that were now
            enshrined as foundational tokens would undermine the cohesion we set
            out to achieve.
          </Text>
          <Heading as="h3" size="md">
            How this compares
          </Heading>
          <UnorderedList>
            <ListItem>
              An additional theming layer for density consisting of typography
              and spacing
            </ListItem>
            <ListItem>Color palette mapping</ListItem>
            <ListItem>Roundedness – contributes to the character</ListItem>
            <ListItem>Sharp</ListItem>
            <ListItem>Default</ListItem>
            <ListItem></ListItem>
          </UnorderedList>
          <Divider />
          Each color in the scale has
          <Divider />
        </Stack>
      </Article>
    </>
  );
};
