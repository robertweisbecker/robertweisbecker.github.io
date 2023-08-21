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
  Stack,
  List,
  ListItem,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import {
  DotFilledIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DotIcon,
} from "@radix-ui/react-icons";

import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { projects } from "../data/projects";
import BackButton from "../components/backButton";
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

// const headerButtons = [
//   {
//     label: "Work",
//     to: "/",
//     as: NavLink,
//   },
//   {
//     label: "About",
//     to: "/about",
//     as: NavLink,
//   },
//   // {
//   //   label: 'Contact',
//   //   to: '/contact',
//   //   as: NavLink,
//   //   rightIcon: <ArrowTopRightIcon />
//   // }
// ].map((buttonProps) => (
//   <Button
//     key={buttonProps.to}
//     as={buttonProps.as}
//     // rightIcon={buttonProps.rightIcon}
//     rounded="full"
//     px={3}
//     _activeLink={{
//       borderColor: "emphasis",
//       fontWeight: "bold",
//       color: "emphasis",
//       bg: "bg-surface-active",
//     }}
//     fontWeight="regular"
//     to={buttonProps.to}
//   >
//     {buttonProps.label}
//   </Button>
// ));

const Header: FC<HeaderProps> = ({ variant }) => {
  const location = useLocation();
  const isChild =
    location.pathname !== "/" &&
    location.pathname !== "/about" &&
    location.pathname !== "/contact";

  return (
    <Box
      as="nav"
      position="sticky"
      mx="auto"
      zIndex="10"
      top="0"
      left="0"
      right="0"
      bg="bg-canvas"
      // pt={8}
      // mt={isChild ? "0" : "8"}
      backdropFilter="auto"
      backdropBlur="10px"
      fontFamily="heading"
      // maxW="100vw"
      maxW="container.lg"
    >
      <Flex
        mx="auto"
        align="center"
        p={4}
        direction="row"
        gap={4}
        borderBottom="1px"
        borderColor="border"
      >
        <Link
          as={NavHashLink}
          preventScrollReset
          lineHeight="shorter"
          color="emphasis"
          fontWeight="semibold"
          fontSize="md"
          textDecoration="none"
          colorScheme="blue"
          _hover={{ textDecoration: "none" }}
          to="/"
        >
          Bob Weisbecker
        </Link>
        <Spacer />

        <ButtonGroup isAttached fontWeight="normal" variant="ghost">
          <Button
            as={NavHashLink}
            borderEndRadius="0"
            to="/#projects"
            fontWeight="normal"
            gap={1}
            _activeLink={{
              borderColor: "emphasis",
              fontWeight: "semibold",
              color: "emphasis",
            }}
          >
            work
          </Button>

          <Popover
            trigger="hover"
            openDelay={0}
            closeDelay={0}
            placement="bottom"
            gutter={0}
          >
            {({ isOpen, onClose }) => (
              <>
                <PopoverTrigger>
                  <Button
                    aria-label="View project list"
                    fontWeight="normal"
                    p={1}
                    w="auto"
                    minW="0"
                    color="subtle"
                    borderLeftWidth="0"
                    borderStartRadius="0"
                    _activeLink={{
                      // borderColor: "emphasis",
                      // fontWeight: "semibold",
                      // color: "emphasis",
                      isActive: "true",
                    }}
                  >
                    all
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
                  boxShadow="xl"
                  w="auto"
                  maxW={{ base: "320px", md: "container.md" }}
                  rounded="xl"
                >
                  <PopoverBody>
                    <PopoverHeader
                      fontSize="2xs"
                      fontWeight="semibold"
                      letterSpacing="wider"
                      textTransform="uppercase"
                      opacity=".5"
                      lineHeight="taller"
                    >
                      Projects
                    </PopoverHeader>

                    <List spacing={0}>
                      {projects.map((project, index) => (
                        <ListItem>
                          <Button
                            variant="ghost"
                            w="full"
                            as={NavLink}
                            to={project.path}
                            fontSize="sm"
                            p={2}
                            rounded="lg"
                            color="muted"
                            fontWeight="medium"
                            leftIcon={<project.icon />}
                            rightIcon={
                              <DotFilledIcon
                                className="popoverCurrentIcon"
                                opacity="0"
                              />
                            }
                            _activeLink={{
                              color: "emphasis",
                              bg: "bg-muted",
                              "& .popoverCurrentIcon": {
                                opacity: "1",
                                transform: "scale(1.2)",
                              },
                            }}
                          >
                            <Box as="span" flexGrow="1">
                              {project.nickname}
                            </Box>
                            {/* <Text fontWeight="normal" fontSize="xs">
                            {project.description}
                          </Text> */}
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  </PopoverBody>
                  <PopoverFooter>
                    <LayoutGrid variant="twoUp" columnGap={2} rowGap={2}>
                      <Button variant="ghost">Button 1</Button>
                      <Button variant="ghost">Button 1</Button>
                    </LayoutGrid>
                  </PopoverFooter>
                </PopoverContent>
              </>
            )}
          </Popover>
        </ButtonGroup>

        <Button
          as={NavLink}
          to="/about"
          // onClick={handleClick}
          fontWeight="normal"
          variant="ghost"
          _activeLink={{
            fontWeight: "medium",
            color: "emphasis",
          }}
        >
          about
        </Button>
        <Button
          as={Link}
          href="/resume.pdf"
          fontWeight="normal"
          variant="ghost"
          textDecoration="none"
          _activeLink={{
            fontWeight: "medium",
            color: "emphasis",
          }}
        >
          resume
        </Button>

        <Spacer />
        <ColorModeSwitcher />
      </Flex>
      {/* <Divider /> */}
    </Box>
  );
};

export default Header;
