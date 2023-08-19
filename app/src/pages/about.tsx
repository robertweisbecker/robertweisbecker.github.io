// import Resume from '../components/resume';
import { LayoutGrid } from "../components/layout";
import { LinkOut } from "../components/linkOut";
import {
  ButtonGroup,
  Heading,
  Box,
  List,
  UnorderedList,
  ListItem,
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
  Button,
  Spacer,
  Tabs,
  Tab,
  TabList,
  TabIndicator,
} from "@chakra-ui/react";
import {
  ArrowTopRightIcon,
  SunIcon,
  MoonIcon,
  LinkedInLogoIcon,
  ReaderIcon,
  FileTextIcon,
  DownloadIcon,
  GitHubLogoIcon,
  CounterClockwiseClockIcon,
  DrawingPinIcon,
  Link1Icon,
  DotFilledIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";

import { AnimatePresence, motion } from "framer-motion";

export const About: React.FC = () => {
  return (
    <Stack spacing={10} py={20}>
      <Heading size="2xl" mb={10}>
        About (Bob)
      </Heading>
      <LayoutGrid variant="twoThirds" columnGap={{ base: 4, xl: 20 }}>
        <GridItem>
          <HStack mb={10}>
            <Icon as={DotFilledIcon} color="green.400" />
            <Heading as="h2" size="2xs" textTransform="uppercase" id="projects">
              What I do
            </Heading>
          </HStack>
          <Stack gap={5} fontSize="lg" lineHeight="tall" color="emphasis">
            <Text>
              During the day, I'm a{" "}
              <Box as="span" fontWeight="medium">
                Principal Designer, Design Systems
              </Box>{" "}
              at Everfi, where I've spent the last two years leading the
              creation of a shared organization-wide design language. And at
              night, I{" "}
              <sub>
                get{" "}
                <sub>
                  {" "}
                  a little <sub>sleepy.</sub>.
                </sub>
                .
              </sub>
              .
            </Text>

            <Text fontSize="lg" lineHeight="tall">
              Beginning in 2018, I led the creation of our product
              organization's first design system, shepherding its transition
              from an unstyled SDK into an accessible component library with
              theming and tooling to support 80+ courses across a dozen branded
              product lines.
            </Text>
          </Stack>
        </GridItem>
        <GridItem position="relative">
          <Image src="/assets/headshot.png" rounded="2xl" />
        </GridItem>
        <GridItem>
          <HStack mb={10}>
            <Icon as={CounterClockwiseClockIcon} />
            <Heading as="h2" size="2xs" textTransform="uppercase" id="projects">
              What I've done
            </Heading>
          </HStack>
          <Text>
            <UnorderedList spacing={3}>
              <ListItem>
                Led design efforts for adult & K12 products, including Everfi
                Achieve, Engage, and Data Science
              </ListItem>
              {/* <ListItem>
                Worked on other projects like{" "}
                <LinkOut
                  text="The Compassion Project"
                  href="https://thecompassionproject.com/"
                />
                ,
              </ListItem> */}

              <ListItem>
                Built a mapping application at{" "}
                <Link href="https://npr.org" isExternal>
                  NPR
                  <Icon opacity=".5" as={ArrowTopRightIcon} mx={1} />
                </Link>
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
                social media assets for{" "}
                <Link href="https://www.parkingpanda.com">
                  Parking Panda / SpotHero
                  <Icon opacity=".5" as={ArrowTopRightIcon} mx={1} />
                </Link>
              </ListItem>
              <ListItem>
                Delivered a (finally relevant!) thesis on chatbots and
                conversational interface design at {"  "}
                <Link
                  href="https://www.mica.edu/graduate-programs/ux-design-mps/"
                  isExternal
                >
                  MICA
                  <Icon opacity=".5" as={ArrowTopRightIcon} mx={1} />
                </Link>
              </ListItem>
            </UnorderedList>
          </Text>
        </GridItem>
        <GridItem>
          <HStack mb={10}>
            <Icon as={Link1Icon} />
            <Heading as="h2" size="2xs" textTransform="uppercase" id="projects">
              Links I have
            </Heading>
          </HStack>
          <List spacing={4} fontSize="sm" color="subtle">
            <ListItem display="flex" gap={4} flexWrap="wrap">
              <Button
                as={Link}
                isExternal
                href="/resume.pdf"
                variant="link"
                textDecoration="none"
                size="sm"
                leftIcon={<FileTextIcon />}
              >
                View resume
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
                isExternal
                href="https://www.linkedin.com/in/robertweisbecker/"
                variant="link"
                size="sm"
                alignItems="center"
                leftIcon={<LinkedInLogoIcon />}
              >
                LinkedIn
              </Button>
            </ListItem>
            <ListItem>
              {" "}
              <Button
                as={Link}
                isExternal
                href="https://read.cv/weisbecker"
                variant="link"
                size="sm"
                alignItems="center"
                sx={{ "& svg": { transform: "rotate(-20deg)" } }}
                leftIcon={<ReaderIcon />}
              >
                read.cv
              </Button>
            </ListItem>
            {/* <ListItem>
              <Button
                variant="link"
                size="sm"
                alignItems="center"
                leftIcon={<GitHubLogoIcon />}
              >
                Github
              </Button>
            </ListItem> */}
            {/* <ListItem>
              <Button
                variant="link"
                size="sm"
                leftIcon={<EnvelopeClosedIcon />}
              >
                Email
              </Button>
            </ListItem> */}
          </List>
        </GridItem>
      </LayoutGrid>
      <Spacer />
      <Heading size="lg">Experience</Heading>
      <LayoutGrid variant="threeUp" rowGap={4}>
        <GridItem rowSpan={{ base: 1, md: 5 }}>
          <Heading size="md" textTransform="uppercase">
            Everfi
          </Heading>{" "}
        </GridItem>
        <GridItem>
          <HStack>
            <Icon as={DotFilledIcon} display="inline" />
            <Text>Current</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <Text>Principal Designer, Design Systems</Text>{" "}
        </GridItem>
        <GridItem>
          <Text>2022</Text>
        </GridItem>
        <GridItem>
          <Text>Principal Designer, Platform UX</Text>
        </GridItem>
        <GridItem>
          <Text>2020</Text>
        </GridItem>
        <GridItem>
          <Text>Senior Interaction Designer</Text>
        </GridItem>
        <GridItem>
          <Text>2018</Text>
        </GridItem>
        <GridItem>
          <Text>Interaction Designer</Text>
        </GridItem>
        <GridItem>
          <Text>2017</Text>
        </GridItem>
        <GridItem>
          <Text>UX Designer</Text>
        </GridItem>
      </LayoutGrid>
      <LayoutGrid variant="threeUp">
        <GridItem>
          <Heading size="md">NPR Labs</Heading>
        </GridItem>
        <GridItem>
          <Text>Research & Development Intern</Text>
        </GridItem>
        <GridItem>
          <Text>2017</Text>
        </GridItem>
      </LayoutGrid>
      <LayoutGrid variant="threeUp">
        <GridItem>
          <Heading size="md">Parking Panda</Heading>
        </GridItem>
        <GridItem>
          <Text>UX Design Intern</Text>
        </GridItem>
        <GridItem>
          <Text>2015</Text>
        </GridItem>
      </LayoutGrid>
      <Divider />
      <Heading size="lg">School</Heading>
      <LayoutGrid variant="threeUp" rowGap={4}>
        <GridItem rowSpan={{ base: 1, md: 5 }}>
          <Heading size="md">Maryland Institute College of Art</Heading>{" "}
        </GridItem>
        <GridItem>
          <Text>Master's in User Experience Design</Text>{" "}
        </GridItem>
        <GridItem>
          <HStack>
            <Icon as={DotFilledIcon} display="inline" />
            <Text>2017</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <Text>Principal Designer, Platform UX</Text>
        </GridItem>
        <GridItem>
          <Text>2022</Text>
        </GridItem>
        <GridItem>
          <Text>Senior Interaction Designer</Text>
        </GridItem>
        <GridItem>
          <Text>2020</Text>
        </GridItem>
        <GridItem>
          <Text>Interaction Designer</Text>
        </GridItem>
        <GridItem>
          <Text>2018</Text>
        </GridItem>
        <GridItem>
          <Text>UX Designer</Text>
        </GridItem>
        <GridItem>
          <Text>2017</Text>
        </GridItem>

        <GridItem>
          <Heading size="md">NPR Labs</Heading>
        </GridItem>
        <GridItem>
          <Text>Research & Development Intern</Text>
        </GridItem>
        <GridItem>
          <Text>2017</Text>
        </GridItem>
        <GridItem>
          <Heading size="md">Parking Panda</Heading>
        </GridItem>
        <GridItem>
          <Text>UX Design Intern</Text>
        </GridItem>
        <GridItem>
          <Text>2015</Text>
        </GridItem>
      </LayoutGrid>
    </Stack>
  );
};

// export default Home;
