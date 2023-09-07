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
	PopoverHeader,
	PopoverFooter,
	Divider,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
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
		<Button
			as={NavLink}
			variant="link"
			size="sm"
			justifyContent="flex-start"
			to="/"
			fontWeight={{ sm: "normal" }}
			w={{ base: "full", lg: "auto" }}>
			home
		</Button>
		<Button
			as={NavLink}
			variant="link"
			size="sm"
			textAlign="left"
			justifyContent="flex-start"
			to="/about"
			fontWeight={{ sm: "normal" }}
			w={{ base: "full", lg: "auto" }}>
			about
		</Button>
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
				<Popover trigger="hover" openDelay={0} closeDelay={200} placement="bottom-end" gutter={-1}>
					{({ isOpen, onClose }) => (
						<>
							<PopoverTrigger>
								<Button
									fontWeight="normal"
									variant="ghost"
									size="sm"
									gap={1}
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
										transitionTimingFunction="ease-in"
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
								<Show below="md">
									<PopoverHeader>{headerButtons}</PopoverHeader>
								</Show>
								<PopoverBody p="2">
									<PopoverHeader textStyle="title-sm" border="none">
										<Show above="md">projects</Show>
										<Show below="md">work</Show>
									</PopoverHeader>

									<List spacing={1}>
										{projects.map((project, index) => (
											<ListItem>
												<Button
													variant="link"
													w="full"
													as={NavLink}
													to={project.path}
													size="sm"
													color="text-muted"
													leftIcon={
														<DotFilledIcon
															className="popoverCurrentIcon"
															visibility="hidden"
															aria-label="Current Page"
														/>
													}
													_activeLink={{
														color: "text-emphasis",
														bg: "surface-active",
														fontWeight: "semibold",
														"& .popoverCurrentIcon": {
															display: "inline",
															visibility: "visible",
															opacity: "1",
															color: "accent",
														},
													}}>
													{project.nickname}
													<Spacer />
												</Button>
											</ListItem>
										))}
									</List>
								</PopoverBody>
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
