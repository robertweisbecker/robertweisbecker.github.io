// import Resume from '../components/resume';
import { LayoutGrid } from "../components/layout";
import { LinkOut } from "../components/linkOut";
import {
	Divider,
	Tooltip,
	IconButton,
	Heading,
	Box,
	Flex,
	SimpleGrid,
	Wrap,
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
	ImageIcon,
	LinkedInLogoIcon,
	ReaderIcon,
	BookmarkIcon,
	GitHubLogoIcon,
	CounterClockwiseClockIcon,
	DotFilledIcon,
	EnvelopeClosedIcon,
	CursorArrowIcon,
	PersonIcon,
	IdCardIcon,
	QuestionMarkIcon,
	InfoCircledIcon,
	MagicWandIcon,
} from "@radix-ui/react-icons";

import { AnimatePresence, motion } from "framer-motion";

export const About: React.FC = () => {
	return (
		<Stack spacing={10} py={20}>
			<Heading as="h1" size="2xl" mb={10}>
				About
			</Heading>
			<LayoutGrid variant="twoThirds" columnGap={{ base: 4, md: 20 }}>
				<GridItem>
					<HStack mt={3} mb={10}>
						<Icon as={PersonIcon} color="text-subdued" />
						<Heading as="h2" size="2xs" id="projects">
							Who
						</Heading>
					</HStack>
					<Stack spacing="5">
						<Text>My name's Robert, but everyone calls me Bob. We're all about efficiency here at bob dot fyi.</Text>
						<Text>
							I work as a{" "}
							<Box as="span" color="emphasis" fontStyle="italic">
								Principal Designer, Design Systems
							</Box>{" "}
							at <LinkOut href="https://everfi.com" text="EVERFI" />, where I design components and tooling to support
							EVERFI's mission of driving social good through education. Those things have{" "}
							<Link href="https://www.blackbaud.com/newsroom/article/blackbaud-acquires-everfi-a-saas-leader-powering-corporate-esg-and-csr-initiatives-that-reach-millions-of-learners-each-year">
								allegedly
							</Link>{" "}
							reached more than 45 million learners globally.
						</Text>
						{/* <Text color="text-subdued">
							By night, I'm a{" "}
							<sub>
								little{" "}
								<sub>
									{" "}
									<sub>sleepy...</sub>
								</sub>
							</sub>
						</Text> */}
						<Wrap alignItems="baseline" spacing={4}>
							<Button
								as={Link}
								isExternal
								href="/resume.pdf"
								textDecoration="none"
								variant="outline"
								size="sm"
								leftIcon={<FileIcon />}>
								Resume
							</Button>
							<Button
								as={Link}
								href="mailto:yo@bob.fyi"
								variant="outline"
								size="sm"
								textDecoration="none"
								leftIcon={<EnvelopeClosedIcon />}>
								Email
							</Button>
							<Button
								as={Link}
								isExternal
								href="https://read.cv/weisbecker"
								variant="outline"
								textDecoration="none"
								size="sm"
								alignItems="center"
								sx={{ "& svg": { transform: "rotate(20deg)" } }}
								leftIcon={<ReaderIcon />}>
								read.cv
							</Button>
							<Button
								as={Link}
								isExternal
								href="https://www.linkedin.com/in/robertweisbecker/"
								variant="outline"
								textDecoration="none"
								size="sm"
								alignItems="center"
								leftIcon={<LinkedInLogoIcon />}>
								LinkedIn
							</Button>
							<Button
								as={Link}
								size="sm"
								variant="outline"
								alignItems="center"
								textDecoration="none"
								leftIcon={<GitHubLogoIcon />}
								href="https://github.com/robertweisbecker"
								isExternal>
								Github
							</Button>
						</Wrap>
					</Stack>
				</GridItem>

				<GridItem>
					<HStack mt={3} mb={10}>
						<Icon as={ImageIcon} color="text-subdued" />
						<Heading as="h2" size="2xs" id="projects">
							What (I look like)
						</Heading>
					</HStack>
					<Image src="/assets/headshot2.png" rounded="2xl" />
				</GridItem>
				<GridItem>
					<HStack mt={3} mb={10}>
						<Icon as={MagicWandIcon} color="text-subdued" />
						<Heading as="h2" size="2xs" id="projects">
							What (I do)
						</Heading>
					</HStack>
					<Stack gap={5}>
						<Text>
							At EVERFI, I've spent the last two years leading the creation of a shared organization-wide design
							language.
						</Text>
						<Text>
							Beginning in 2018, I led the creation of our product organization's first design system, shepherding its
							transition from an unstyled SDK into an accessible component library with theming and tooling to support
							80+ courses across a dozen branded product lines.
						</Text>

						<Text>Before that, I...</Text>
						<UnorderedList spacing={3} fontSize="sm">
							<ListItem>
								Led design efforts for adult & K12 e-learning courses at EVERFI, including Achieve, Engage, and Data
								Science Foundations
							</ListItem>
							<ListItem>
								Worked on education products for customers such as Google, Meta, LinkedIn, Kroger, Beyond Meat, Truist,
								and more.
							</ListItem>
							<ListItem>
								Delivered a (finally relevant!) thesis on chatbots and conversational interface design at{" "}
								<LinkOut href="https://www.mica.edu/graduate-programs/ux-design-mps/" text="MICA" />
							</ListItem>
							<ListItem>
								Built a mapping application at <LinkOut href="https://npr.org" text="NPR" />
								when I wasn't busy{" "}
								<Link href="https://youtu.be/lgmw41CY1Fo?t=36" isExternal>
									standing awkwardly
								</Link>{" "}
								in the background of Tiny Desk recordings
							</ListItem>
							<ListItem>
								Designed web & iOS screens, performed user testing, and made some{" "}
								<Link href="https://twitter.com/ParkingPanda/status/617057417696833536?s=20" isExternal>
									cheesy
								</Link>{" "}
								social media assets for <LinkOut href="https://www.parkingpanda.com" text="Parking Panda" />
							</ListItem>
						</UnorderedList>
					</Stack>
				</GridItem>
				<GridItem p={3} bg="surface-elevated" borderWidth="1px" rounded="xl">
					<HStack mt={3} mb={10}>
						<Icon as={CursorArrowIcon} color="text-subdued" />
						<Heading as="h2" size="2xs" id="projects">
							What (is this site?)
						</Heading>
					</HStack>
					<Stack fontSize="xs" lineHeight="tall" gap={5} color="text-muted">
						<Text>This is my little corner of the internet. If you're reading this now, I made it for you.</Text>
						<Text>
							This site was built in React and deployed on Github Pages. The icons come from{" "}
							<LinkOut href="https://www.radix-ui.com/icons" text="Radix" />, some components come from{" "}
							<LinkOut href="https://chakra-ui.com/" text="Chakra" />, and others I made. My close and personal friends,
							StackOverflow and ChatGPT, helped to get{" "}
							<LinkOut href="https://reactrouter.com/en/main" text="React Router" /> working.
						</Text>
						<Text>
							{" "}
							Headings use{" "}
							<LinkOut href="https://www.fonts.com/font/urw-type-foundry/nimbus-sans" text="Nimbus Sans Extended" />,
							and everything else is <LinkOut href="https://rsms.me/inter/" text="Inter" /> – because of course it is.
						</Text>
						<Text>
							You can also get here from{" "}
							<Link href="https://bob.cash" isExternal>
								bob.cash
							</Link>
							,{" "}
							<Link href="https://bob.computer" isExternal>
								bob.computer
							</Link>
							,{" "}
							<Link href="https://robertweisbecker.com" isExternal>
								robertweisbecker.com
							</Link>
							,{" "}
							<Link href="https://weisbecker.design" isExternal>
								weisbecker.design
							</Link>
							,{" "}
							<Link href="https://weisbecker.co" isExternal>
								weisbecker.co
							</Link>
							. One day I'll link that first one to my Venmo.
						</Text>
					</Stack>
				</GridItem>
			</LayoutGrid>
			<Spacer />

			<Divider />
			<HStack>
				<Icon as={BackpackIcon} color="text-subdued" />
				<Heading as="h2" size="2xs" id="projects">
					Where (I've worked)
				</Heading>
			</HStack>
			<LayoutGrid variant="threeUp" rowGap={2}>
				<GridItem rowSpan={{ base: 1, lg: 5 }} colSpan={{ sm: 2, lg: 1 }}>
					<Heading size="lg" m="0">
						EVERFI
					</Heading>{" "}
				</GridItem>
				<GridItem>
					<Flex align="flex-start">
						<Text color="emphasis" textStyle="subtitle">
							Principal Designer, Design Systems
						</Text>
						<Icon as={DotFilledIcon} color="accent" boxSize={6} />
					</Flex>
				</GridItem>
				<GridItem>
					<Text color="text-subdued">2022 – present</Text>
				</GridItem>
				<GridItem>
					<Text textStyle="subtitle">Principal Designer, Platform UX</Text>
				</GridItem>
				<GridItem>
					<Text color="text-subdued">2022</Text>
				</GridItem>
				<GridItem>
					<Text textStyle="subtitle">Senior Interaction Designer</Text>
				</GridItem>
				<GridItem>
					<Text color="text-subdued">2020</Text>
				</GridItem>
				<GridItem>
					<Text textStyle="subtitle">Interaction Designer</Text>
				</GridItem>
				<GridItem>
					<Text color="text-subdued">2018</Text>
				</GridItem>
				<GridItem>
					<Text textStyle="subtitle">UX Designer</Text>
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
					<Text textStyle="subtitle">Research & Development Intern, NPR Labs</Text>
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
					<Text textStyle="subtitle">UX Design Intern</Text>
				</GridItem>
				<GridItem>
					<Text color="text-subdued">Summer 2015</Text>
				</GridItem>
			</LayoutGrid>
			<Spacer />

			<Divider />
			<HStack>
				<Icon as={IdCardIcon} color="text-subdued" />
				<Heading as="h2" size="2xs" id="projects">
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
					<Text textStyle="subtitle">Master's in User Experience Design</Text>
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
				<GridItem textStyle="subtitle">
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
