// import Resume from '../components/resume';
import { LayoutGrid } from "../components/layout";
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

export const Engage: React.FC = () => {
  return (
    <Article pageKey="data-science">
      <Stack spacing={20} py={20}>
        <Heading>EverFi Engage </Heading>

        <Text>
          Engage allows financial institutions to deliver in-person financial
          education to their customers and the community via guided workshop
          events at their branches. The product consists of 13 digital learning
          modules covering personal finance & money management, small business
          operations, and home ownership.
        </Text>

        <Link href="https://everfi-curriculums.s3.amazonaws.com/curriculums/engage-content/develop/index.html#">
          See it in action
        </Link>
        <Divider />
        <Heading as="h2">Details</Heading>

        <Image src="images/engage/engage-1.png" />

        <Text>
          Engage workshops are geared toward low- to moderate-income adults,
          families, and small business owners. In order to help these users feel
          at ease with weighty topics, the visual design relied on soft colors
          and springy animation, and content was written with a casual tone.
        </Text>
        <Image src="images/engage/bbva-1.jpg" />
        <Image src="images/engage/bbva-2.jpg" />
        <Heading as="h2">Using a Design System</Heading>
        <Text color="muted">
          Upon joining the project, I had the team migrate existing designs to
          Sketch, so that we could use it to build a design system that would
          let us rapidly execute and iterate. That change in process led to the
          creation of a template library containing 40+ unique pages in mobile,
          tablet, and desktop sizes.
        </Text>
        <Image src="images/engage/engage-components.png" borderRadius="lg" />

        <Text textAlign="center" fontStyle="italic">
          Reusable components created in Sketch.
        </Text>
        <Image src="images/engage/engage-templates.png" borderRadius="lg" />

        <Text textAlign="center" fontStyle="italic">
          Check out the full template library
          <Link href="https://frankfrankfrankfrank.github.io/engage/global/index.html">
            here
          </Link>
        </Text>
        <Heading as="h2">Interaction Design</Heading>
        <Text color="muted">
          I used a host of tools to prototype different interactions, including
          Invision, Flinto, Framer, as well as HTML/CSS so that we could ship
          code directly to developers.
        </Text>
        <Text color="muted">
          A sampling of these are below. To see them in action, check out the
          live development link{" "}
          <Link href="http://everfi-curriculums.s3.amazonaws.com/curriculums/engage-content/develop/index.html#">
            Hello
          </Link>
        </Text>
        <video width="100%" height="auto" controlsshadow-sm>
          <source
            src="images/engage/engage-facilitator-script-drawer.mov"
            type="video/mp4"
          />
        </video>

        <Text textAlign="center" fontStyle="italic">
          Workshop facilitators can access their script at any time by tapping a
          persistent tab on the left edge.
        </Text>
        {/* <video width="100%" height="auto" controls borderRadius="lg"> */}
        {/* <source src="images/engage/carousel.mov"
borderRadius shadow-sm" type="video/mp4"> */}
        {/* </video> */}
        <Text textAlign="center" fontStyle="italic">
          Carousel component with some light animation to focus users'
          attention.
        </Text>
        {/* <video width="100%" height="auto" controls borderRadius="lg"> */}
        {/* <source src="images/engage/card-expand.mov"
borderRadius="lg" type="video/mp4"> */}
        {/* </video> */}
        <Text textAlign="center" fontStyle="italic">
          Using animation to maintain continuity between components.
        </Text>
        {/* <video width="100%" height="auto" controls borderRadius="lg"> */}
        {/* <source src="images/engage/Engage-Circle-Progression.mov" borderRadius shadow-sm" type="video/mp4"> */}
        {/* </video> */}
        <Text textAlign="center" fontStyle="italic">
          Turning a list into an appealing interactive.
        </Text>
      </Stack>
    </Article>
  );
};
