// import Resume from '../components/resume';
import { LayoutGrid } from "../components/layout";
import { LinkOut } from "../components/linkOut";
import {
  Heading,
  Box,
  List,
  UnorderedList,
  ListItem,
  Text,
  Stack,
  Icon,
  Link,
  GridItem,
  HStack,
  Image,
  Button,
  Spacer,
  VisuallyHidden,
  TabIndicator,
} from "@chakra-ui/react";
import {
  ArrowTopRightIcon,
  BackpackIcon,
  FileIcon,
  LinkedInLogoIcon,
  ReaderIcon,
  BookmarkIcon,
  GitHubLogoIcon,
  CounterClockwiseClockIcon,
  DotFilledIcon,
  EnvelopeClosedIcon,
  CursorArrowIcon,
  IdCardIcon,
} from "@radix-ui/react-icons";

import { AnimatePresence, motion } from "framer-motion";

export const About: React.FC = () => {
  return (
    <Stack spacing={10} py={20}>
      <VisuallyHidden>
        <Heading as="h1" size="2xl" mb={10}>
          About
        </Heading>
      </VisuallyHidden>
      <LayoutGrid variant="twoThirds" columnGap={{ base: 4, xl: 20 }}>
        <GridItem>
          <HStack mb={10} color="text-subdued">
            <Icon as={CursorArrowIcon} />
            <Heading as="h2" size="2xs" textTransform="uppercase" id="projects">
              What I do
            </Heading>
          </HStack>
          <Stack gap={5} fontSize="lg" lineHeight="tall" color="emphasis">
            <Text>
              By day, I'm a{" "}
              <Box as="span" fontWeight="semibold">
                Principal Designer, Design Systems
              </Box>{" "}
              at <LinkOut href="https://everfi.com" text="Everfi" />, where I've
              spent the last two years leading the creation of a shared
              organization-wide design language. By night, I'm a{" "}
              <sub>
                little{" "}
                <sub>
                  {" "}
                  <sub>sleepy...</sub>
                </sub>
              </sub>
            </Text>
            <Text fontSize="lg" lineHeight="tall">
              Beginning in 2018, I led the creation of our product
              organization's first design system, shepherding its transition
              from an unstyled SDK into an accessible component library with
              theming and tooling to support 80+ courses across a dozen branded
              product lines.
            </Text>
            <Spacer />
            <HStack my={10} color="text-subdued">
              <Icon as={CounterClockwiseClockIcon} />
              <Heading
                as="h2"
                size="2xs"
                textTransform="uppercase"
                id="projects"
              >
                What I've done
              </Heading>
            </HStack>
            <Text>
              <UnorderedList spacing={3} fontSize="sm">
                <ListItem>
                  Led design efforts for adult & K12 e-learning courses at
                  Everfi, including Achieve, Engage, and Data Science
                  Foundations
                </ListItem>
                <ListItem>
                  Worked on education products for customers such as Google,
                  Meta, LinkedIn, Kroger, Beyond Meat, Truist, and more.
                </ListItem>
                <ListItem>
                  Delivered a (finally relevant!) thesis on chatbots and
                  conversational interface design at
                  <LinkOut
                    href="https://www.mica.edu/graduate-programs/ux-design-mps/"
                    text="MICA"
                  />
                </ListItem>
                <ListItem>
                  Built a mapping application at{" "}
                  <LinkOut href="https://npr.org" text="NPR" />
                  when I wasn't busy{" "}
                  <Link href="https://youtu.be/lgmw41CY1Fo?t=36" isExternal>
                    standing awkwardly
                  </Link>{" "}
                  in the background of Tiny Desk recordings
                </ListItem>
                <ListItem>
                  Designed web & iOS screens, performed user testing, and made
                  some{" "}
                  <Link
                    href="https://twitter.com/ParkingPanda/status/617057417696833536?s=20"
                    isExternal
                  >
                    cheesy
                  </Link>{" "}
                  social media assets for
                  <LinkOut
                    href="https://www.parkingpanda.com"
                    text="Parking Panda"
                  />
                </ListItem>
              </UnorderedList>
            </Text>
          </Stack>
        </GridItem>

        <GridItem position="relative">
          <Image src="/assets/headshot2.png" rounded="2xl" />
          <List spacing={4} fontSize="sm" my={10}>
            <ListItem>
              <Button
                as={Link}
                isExternal
                href="/resume.pdf"
                textDecoration="none"
                variant="outline"
                size="sm"
                leftIcon={<FileIcon />}
              >
                Resume
              </Button>
              {/* <Divider orientation="vertical" h="24px" />
              <Button
                variant="link"
                size="sm"
                fontWeight="normal"
                textOverflow="wrap"
                leftIcon={<DownloadIcon />}
              >
                or try the Papyrus Edition
              </Button> */}
            </ListItem>
            <ListItem>
              <Button
                as={Link}
                href="mailto:yo@bob.fyi"
                variant="outline"
                size="sm"
                textDecoration="none"
                leftIcon={<EnvelopeClosedIcon />}
              >
                Email
              </Button>
            </ListItem>
            <ListItem>
              <Button
                as={Link}
                isExternal
                href="https://read.cv/weisbecker"
                variant="outline"
                textDecoration="none"
                size="sm"
                alignItems="center"
                sx={{ "& svg": { transform: "rotate(20deg)" } }}
                leftIcon={<ReaderIcon />}
              >
                read.cv
              </Button>
            </ListItem>
            <ListItem>
              <Button
                as={Link}
                isExternal
                href="https://www.linkedin.com/in/robertweisbecker/"
                variant="outline"
                textDecoration="none"
                size="sm"
                alignItems="center"
                leftIcon={<LinkedInLogoIcon />}
              >
                LinkedIn
              </Button>
            </ListItem>
            <ListItem>
              <Button
                as={Link}
                size="sm"
                variant="outline"
                alignItems="center"
                textDecoration="none"
                leftIcon={<GitHubLogoIcon />}
                href="https://github.com/robertweisbecker"
                isExternal
              >
                Github
              </Button>
            </ListItem>
          </List>
        </GridItem>
      </LayoutGrid>
      <Spacer />

      <HStack>
        <Icon as={BackpackIcon} />
        <Heading as="h2" size="2xs" textTransform="uppercase" id="projects">
          Where (I've worked)
        </Heading>
      </HStack>
      <LayoutGrid variant="threeUp" rowGap={2}>
        <GridItem rowSpan={{ base: 1, lg: 5 }} colSpan={{ sm: 2, lg: 1 }}>
          <Heading size="lg" m="0" textTransform="uppercase">
            Everfi
          </Heading>{" "}
        </GridItem>
        <GridItem>
          <Text fontWeight="medium">
            Principal Designer, Design Systems
            <Icon
              as={DotFilledIcon}
              color="green.400"
              display="inline"
              verticalAlign="middle"
            />
          </Text>
        </GridItem>
        <GridItem>
          <Text color="text-subdued">2022 – present</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="medium">Principal Designer, Platform UX</Text>
        </GridItem>
        <GridItem>
          <Text color="text-subdued">2022</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="medium">Senior Interaction Designer</Text>
        </GridItem>
        <GridItem>
          <Text color="text-subdued">2020</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="medium">Interaction Designer</Text>
        </GridItem>
        <GridItem>
          <Text color="text-subdued">2018</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="medium">UX Designer</Text>
        </GridItem>
        <GridItem>
          <Text color="text-subdued">2017</Text>
        </GridItem>
      </LayoutGrid>

      <LayoutGrid variant="threeUp" rowGap={2}>
        <GridItem colSpan={{ sm: 2, lg: 1 }}>
          <Heading size="lg" m="0">
            National Public Radio
          </Heading>
        </GridItem>
        <GridItem>
          <Text fontWeight="medium">
            Research & Development Intern, NPR Labs
          </Text>
        </GridItem>
        <GridItem>
          <Text color="text-subdued">Spring 2017</Text>
        </GridItem>
      </LayoutGrid>
      <LayoutGrid variant="threeUp" rowGap={2}>
        <GridItem colSpan={{ sm: 2, lg: 1 }}>
          <Heading size="lg" m="0" display="inline">
            Parking Panda
          </Heading>
          <Text mx={1} textStyle="caption" display="inline">
            (acquired by SpotHero)
          </Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="medium">UX Design Intern</Text>
        </GridItem>
        <GridItem>
          <Text color="text-subdued">Summer 2015</Text>
        </GridItem>
      </LayoutGrid>
      <Spacer />
      <Spacer />
      <HStack>
        <Icon as={IdCardIcon} />
        <Heading as="h2" size="2xs" textTransform="uppercase" id="projects">
          Where (I learned things)
        </Heading>
      </HStack>

      <LayoutGrid variant="threeUp" rowGap={2}>
        <GridItem colSpan={{ sm: 2, lg: 1 }}>
          <Heading size="lg" m="0">
            Maryland Institute College of Art
          </Heading>
        </GridItem>
        <GridItem>
          <Text fontWeight="medium">Master's in User Experience Design</Text>
        </GridItem>
        <GridItem>
          <Text color="text-subdued">2016 – 2017</Text>
        </GridItem>
      </LayoutGrid>
      <LayoutGrid variant="threeUp" rowGap={2}>
        <GridItem colSpan={{ sm: 2, lg: 1 }}>
          <Heading size="lg" m="0">
            University of Michigan
          </Heading>
        </GridItem>
        <GridItem fontWeight="medium">
          <Text>BA, Cognitive Science</Text>
          <Text>Minor, Art & Design</Text>
        </GridItem>
        <GridItem>
          <Text color="text-subdued">2012 – 2016</Text>
        </GridItem>
      </LayoutGrid>
    </Stack>
  );
};

// export default Home;
