import * as React from "react";
import { FC } from "react";
import { NavHashLink, genericHashLink } from "react-router-hash-link";
import { useLocation, useNavigate, useParams, NavLink } from "react-router-dom";

import {
	Box,
	Flex,
	Spacer,
	IconButton,
	Button,
	ButtonGroup,
	Link,
	PopoverFooter,
	Divider,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	PopoverHeader,
	PopoverCloseButton,
	Icon,
	List,
	ListItem,
	Text,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Show,
	Hide,
} from "@chakra-ui/react";

import {
	DotFilledIcon,
	HomeIcon,
	ChevronDownIcon,
	ChevronUpIcon,
	DotIcon,
	ArrowTopRightIcon,
	IdCardIcon,
	InfoCircledIcon,
	Cross1Icon,
	Cross2Icon,
} from "@radix-ui/react-icons";

import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { projects } from "../data/projects";
import { LayoutGrid } from "../components/layout";
import ProjectGrid from "./projectGrid";

interface HeaderProps {
	variant?: string;
	children?: React.ReactNode;
}

function withRouter(Component) {
	function ComponentWithRouterProp(props) {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		return <Component {...props} router={{ location, navigate, params }} />;
	}

	return ComponentWithRouterProp;
}

const headerButtons = (
	<>
		<Link
			as={NavLink}
			display={{ base: "inline-flex", md: "none" }}
			variant="menu"
			fontWeight={{ base: "semibold", md: "normal" }}
			to="/"
			w={{ base: "full", md: "auto" }}>
			<Show below="md">
				<Icon as={HomeIcon} />
			</Show>
			home
		</Link>
		<Link
			as={NavLink}
			variant="menu"
			fontWeight={{ base: "semibold", md: "normal" }}
			to="/about"
			w={{ base: "full", md: "auto" }}>
			<Show below="md">
				<Icon as={InfoCircledIcon} />
			</Show>
			about
		</Link>
	</>
);

const Header: FC<HeaderProps> = ({ variant }) => {
	const location = useLocation();
	const isNotHome = location.pathname !== "/";

	return (
		<Box
			as="nav"
			position="sticky"
			mx="auto"
			zIndex="modal"
			top="0"
			left="0"
			right="0"
			bg={isNotHome ? "surface" : "surface-frosted"}
			backdropFilter="auto"
			backdropBlur="xl"
			maxW="container.lg">
			<Flex
				mx="auto"
				align="center"
				pt={3}
				pb={2}
				px={4}
				direction="row"
				gap={4}
				borderBottom="1px"
				borderColor="border-subdued">
				{/* {isNotHome && <BackButton />} */}

				<Link
					as={NavHashLink}
					preventScrollReset
					fontSize="sm"
					textDecoration="none"
					lineHeight="shorter"
					px={1}
					fontWeight="semibold"
					bg="transparent"
					color="text-emphasis"
					_hover={{ textDecoration: "none" }}
					to="/"
					letterSpacing="wide"
					flexDirection="column"
					fontFamily="heading">
					bob dot fyi
					<Box fontSize="xs" fontWeight="light" display="block" color="text-subdued">
						Bob Weisbecker
					</Box>
				</Link>
				<Spacer />
				<Show above="md">{headerButtons}</Show>
				<Popover trigger="click" openDelay={0} closeDelay={200} placement="bottom-end" gutter={-36}>
					{({ isOpen, onClose }) => (
						<>
							<PopoverTrigger>
								<Button
									fontWeight="normal"
									variant="link"
									size="sm"
									gap={1}
									px={3}
									_expanded={{
										fontWeight: "medium",
										color: "text-emphasis",
									}}>
									<Show above="md">work</Show>
									<Show below="md">menu</Show>
									<Icon
										fontSize=".875em"
										transform={isOpen ? "rotate(-180deg)" : "none"}
										transitionProperty="common"
										transitionDuration="fast"
										transitionTimingFunction="ease-out"
										opacity="1"
										as={ChevronDownIcon}
									/>
								</Button>
							</PopoverTrigger>

							<PopoverContent
								boxShadow="lg"
								overflow="hidden"
								bg="surface-elevated"
								maxW={{ base: "280px", md: "container.md" }}
								rounded="xl">
								<PopoverHeader p="3">
									<Text textStyle="title-sm" border="none">
										<Show above="md">projects</Show>
										<Show below="md">work</Show>
										<IconButton
											as={PopoverCloseButton}
											icon={<Cross2Icon />}
											right="1"
											top="1"
											size="sm"
											variant="ghost"
											position="absolute"
											aria-label="Close"
										/>
									</Text>
								</PopoverHeader>
								<PopoverBody p="2">
									<List>
										{projects.map((project, index) => (
											<ListItem>
												<Link
													variant="menu"
													w="full"
													as={NavLink}
													to={project.path}
													// leftIcon={
													// 	<DotFilledIcon
													// 		className="popoverCurrentIcon"
													// 		visibility="hidden"
													// 		aria-label="Current Page"
													// 	/>
													// }
												>
													<Icon className="link_icon--current" display="none" as={DotFilledIcon} />
													{project.nickname}
													<Spacer />
												</Link>
											</ListItem>
										))}
									</List>
								</PopoverBody>
								<Show below="md">
									<PopoverFooter p="2">{headerButtons}</PopoverFooter>
								</Show>
							</PopoverContent>
						</>
					)}
				</Popover>

				<ColorModeSwitcher />
			</Flex>
			{/* <Divider /> */}
		</Box>
	);
};

export default Header;
