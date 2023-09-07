import { NavHashLink } from "react-router-hash-link";
import { LayoutGrid } from "../components/layout";
import { LinkOut } from "../components/linkOut";
import {
	Divider,
	Container,
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
	Tooltip,
	GridItem,
	HStack,
	Image,
	Button,
	Spacer,
	VisuallyHidden,
	Badge,
	TabIndicator,
} from "@chakra-ui/react";
import {
	ArrowRightIcon,
	BackpackIcon,
	FileIcon,
	CameraIcon,
	LinkedInLogoIcon,
	ReaderIcon,
	BookmarkIcon,
	GitHubLogoIcon,
	CounterClockwiseClockIcon,
	DotFilledIcon,
	Link1Icon,
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
		<Stack spacing={8} mt={10}>
			<VisuallyHidden>
				<Heading as="h1" size="2xl" mb={10}>
					About
				</Heading>
			</VisuallyHidden>
			<Spacer />
			<LayoutGrid variant="oneThird">
				<HStack>
					<Icon as={PersonIcon} color="accent" />
					<Heading as="h2" size="2xs" id="projects">
						Who
					</Heading>
				</HStack>

				<Stack spacing="4">
					<Text>
						My birth certificate says Robert, but everyone calls me{" "}
						<Tooltip label="We're all about efficiency here at bob dot fyi.">
							<Link>Bob</Link>
						</Tooltip>
						.
					</Text>
					<Text>
						I work as a{" "}
						<Box as="span" color="text-emphasis" fontStyle="italic">
							Principal Designer, Design Systems
						</Box>{" "}
						at <LinkOut href="https://everfi.com" text="EVERFI" />, where I design components and tooling to support
						EVERFI's mission of driving social good through education. Those things have{" "}
						<Link href="https://www.blackbaud.com/newsroom/article/blackbaud-acquires-everfi-a-saas-leader-powering-corporate-esg-and-csr-initiatives-that-reach-millions-of-learners-each-year">
							allegedly
						</Link>{" "}
						reached more than 45 million learners globally.
					</Text>
					<Text>
						Since late 2021, I've been leading the creation of a shared organization-wide design language for all of{" "}
						<Box as="span" textTransform="uppercase">
							Everfi
						</Box>
						. You can read a bit about that process{" "}
						<Link as={NavHashLink} to="/unified-design-language" gap={0.5}>
							here
						</Link>
						.
					</Text>
					<Text>You can also find or reach me here:</Text>
					<Wrap alignItems="baseline" spacing={4} mb="8">
						{/* <Button
								as={Link}
								isExternal
								href="/bob-weisbecker-resume.pdf"
								textDecoration="none"
								variant="outline"
								size="sm"
								leftIcon={<FileIcon />}>
								Resume
							</Button> */}
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
					<Spacer />
				</Stack>
			</LayoutGrid>
			<LayoutGrid variant="oneThird">
				<HStack>
					<Icon as={CameraIcon} color="accent" />
					<Heading as="h2" size="2xs" id="projects">
						What{" "}
						<Box as="span" fontWeight="normal" color="text-subdued">
							(I look like)
						</Box>
					</Heading>
				</HStack>

				<Box>
					<Image src="/assets/headshot2.png" maxW="sm" w="full" rounded="2xl" />
					<Text textStyle="caption" mt="2" mb="8" fontStyle="italic">
						Moody!
					</Text>
				</Box>
			</LayoutGrid>
			<LayoutGrid variant="oneThird">
				<HStack>
					<Icon as={MagicWandIcon} color="accent" />
					<Heading as="h2" size="2xs" id="projects">
						What
						<Box as="span" fontWeight="normal" color="text-subdued">
							{" "}
							(I've done)
						</Box>
					</Heading>
				</HStack>

				<Stack gap={4}>
					<Text>
						Starting in 2018, I led the creation of our product organization's{" "}
						<Link as={NavHashLink} to="/unified-design-language" gap={0.5}>
							first design system
						</Link>
						, shepherding its transition from an unstyled SDK into an accessible component library with theming and
						tooling to support 80+ courses across a dozen branded product lines.
					</Text>
					<Text>Some other things I've done:</Text>
					<UnorderedList spacing={3}>
						<ListItem>
							Led design efforts for adult & K12 e-learning courses at EVERFI, including{" "}
							<LinkOut href="https://everfi.com/financial-education/consumers/" text="Achieve" />,{" "}
							<LinkOut href="https://everfi.com/financial-education/consumers/engage/" text="Engage" />, and{" "}
							<LinkOut
								href="https://everfi.com/courses/k-12/teaching-data-science-in-high-school/"
								text="Data
								Science for High Schoolers"
							/>
							.
						</ListItem>
						<ListItem>
							Worked on education products for customers such as Google, Meta, LinkedIn, Kroger, Beyond Meat, Truist,
							and more.
						</ListItem>
						<ListItem>
							Delivered a (finally relevant!){" "}
							<Link as={NavHashLink} to="/conversational-immigration-forms" gap={0.5}>
								thesis
							</Link>{" "}
							on chatbots and conversational interface design at{" "}
							<LinkOut href="https://www.mica.edu/graduate-programs/ux-design-mps/" text="MICA" />
						</ListItem>
						<ListItem>
							Built a{" "}
							<Link as={NavHashLink} to="/npr-maps" gap={0.5}>
								mapping application
							</Link>{" "}
							at <LinkOut href="https://npr.org" text="NPR" />
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
					<Spacer />
				</Stack>
			</LayoutGrid>
			<LayoutGrid variant="oneThird">
				<HStack>
					<Icon as={BackpackIcon} color="accent" />
					<Heading as="h2" size="2xs" id="projects" minW="200px">
						Where{" "}
						<Box as="span" fontWeight="normal" color="text-subdued">
							(I've worked)
						</Box>
					</Heading>
				</HStack>

				<Stack fontSize="sm" divider={<Divider borderColor="border-subdued" />}>
					<HStack>
						<Text fontWeight="semibold" fontSize="md" textTransform="uppercase">
							Everfi
						</Text>
					</HStack>
					<HStack>
						<Icon
							as={DotFilledIcon}
							aria-label="Current position"
							color="success"
							ms={{ md: "-5" }}
							verticalAlign="text-top"
						/>
						<Text>Principal Designer, Design Systems</Text>
						<Spacer />
						<Text color="text-subdued" fontFamily="mono">
							2022
						</Text>
					</HStack>
					<HStack>
						<Text>Principal Designer, Platform UX</Text>
						<Spacer />
						<Text color="text-subdued" fontFamily="mono">
							2022
						</Text>
					</HStack>
					<HStack>
						<Text>Senior Interaction Designer</Text>
						<Spacer />
						<Text color="text-subdued" fontFamily="mono">
							2020
						</Text>
					</HStack>
					<HStack>
						<Text>Interaction Designer</Text>
						<Spacer />
						<Text color="text-subdued" fontFamily="mono">
							2018
						</Text>
					</HStack>
					<HStack>
						<Text>UX Designer</Text>
						<Spacer />
						<Text color="text-subdued" fontFamily="mono">
							2017
						</Text>
					</HStack>
					<HStack>
						<Text>Product Design Intern</Text>
						<Spacer />
						<Text color="text-subdued" fontFamily="mono">
							2017
						</Text>
					</HStack>

					<Text fontWeight="semibold" fontSize="md" mt="1em">
						NPR Labs
					</Text>
					<HStack>
						<Text>Research & Development Design Intern</Text>
						<Spacer />
						<Text color="text-subdued" fontFamily="mono">
							2017
						</Text>
					</HStack>
					<HStack align="baseline">
						<Text fontWeight="semibold" fontSize="md" mt="1em">
							Parking Panda{" "}
						</Text>
						<Text fontSize="2xs" letterSpacing="wide">
							(acquired by SpotHero)
						</Text>
					</HStack>
					<HStack>
						<Text>UX/Design Intern</Text>
						<Spacer />
						<Text color="text-subdued" fontFamily="mono">
							2015
						</Text>
					</HStack>
				</Stack>
			</LayoutGrid>
			<LayoutGrid variant="oneThird">
				<HStack>
					<Icon as={BookmarkIcon} color="accent" />
					<Heading as="h2" size="2xs" id="projects" minW="200px">
						Where{" "}
						<Box as="span" color="text-subdued" fontWeight="normal">
							(I learned things)
						</Box>
					</Heading>
				</HStack>

				<Stack fontSize="sm" divider={<Divider borderColor="border-subdued" />}>
					<Text fontWeight="semibold" fontSize="md">
						Maryland Institute College of Art
					</Text>
					<HStack>
						<Text>Master's, UX Design</Text>
						<Spacer />
						<Text color="text-subdued" fontFamily="mono">
							2016–2017
						</Text>
					</HStack>
					<Text fontWeight="semibold" fontSize="md" mt="1em">
						University of Michigan, Ann Arbor
					</Text>
					<HStack align="end">
						<Text>
							BA, Cognitive Science
							<br />
							Minor, Art & Design
						</Text>
						<Spacer />
						<Text color="text-subdued" fontFamily="mono">
							2012–2016
						</Text>
					</HStack>
				</Stack>
			</LayoutGrid>
			<LayoutGrid variant="oneThird">
				<HStack mb={5}>
					<Icon as={CursorArrowIcon} color="accent" />
					<Heading as="h2" size="2xs" id="projects">
						What{" "}
						<Box as="span" color="text-subdued" fontWeight="normal">
							(is this site?)
						</Box>
					</Heading>
				</HStack>
				<Stack gap={4} color="text-muted">
					<Text>This is my little corner of the internet. If you're reading this now, I made it for you.</Text>
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
						. Someday, buying all those domains will have made sense.
					</Text>
					<Text>
						The current version of this site was built in React using{" "}
						<LinkOut href="https://github.com/facebook/create-react-app" text="Create React App" /> and is deployed on
						Github Pages. The icons come from <LinkOut href="https://www.radix-ui.com/icons" text="Radix Icons" />,
						theming is handled by <LinkOut href="https://chakra-ui.com/" text="Chakra" />, and components are a mix of
						Chakra's and some home cooking. My close and personal friends, StackOverflow and ChatGPT, helped to get{" "}
						<LinkOut href="https://reactrouter.com/en/main" text="React Router" /> working.
					</Text>
					<Text>
						{" "}
						Headings use{" "}
						<LinkOut href="https://www.fonts.com/font/urw-type-foundry/nimbus-sans" text="Nimbus Sans Extended" />, and
						everything else is <LinkOut href="https://rsms.me/inter/" text="Inter" /> – because of course it is.
					</Text>
				</Stack>
			</LayoutGrid>
		</Stack>
	);
};

// export default Home;
