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
  Show,
  Hide,
} from "@chakra-ui/react";

import {
  DotFilledIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DotIcon,
} from "@radix-ui/react-icons";

import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { projects } from "../data/projects";
// import { BackButton } from "../components/backButton";
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
  <ButtonGroup>
    <Button
      as={NavLink}
      variant="ghost"
      size="sm"
      textAlign="left"
      fontWeight="regular"
      _activeLink={{
        borderColor: "emphasis",
        fontWeight: "bold",
        color: "emphasis",
        bg: "bg-surface-active",
      }}
      to="/about"
    >
      about
    </Button>
    <Button
      as={Link}
      variant="ghost"
      size="sm"
      textAlign="left"
      fontWeight="regular"
      textDecoration="none"
      _activeLink={{
        borderColor: "emphasis",
        fontWeight: "bold",
        color: "emphasis",
        bg: "bg-surface-active",
      }}
      href="/resume.pdf"
    >
      resume
    </Button>
  </ButtonGroup>
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
      bg={isNotHome ? "bg-canvas" : "transparent"}
      // pt={8}
      // mt={isNotHome ? "0" : "8"}
      backdropFilter="auto"
      backdropBlur="10px"
      fontFamily="heading"
      // maxW="100vw"
      maxW="container.lg"
    >
      <Flex
        mx="auto"
        align="center"
        pt={3}
        pb={2}
        px={4}
        direction="row"
        gap={4}
        borderBottom="1px"
        borderColor="border"
      >
        {/* {isNotHome && <BackButton />} */}

        <Link
          as={NavHashLink}
          preventScrollReset
          lineHeight="shorter"
          color="emphasis"
          fontWeight="medium"
          fontSize="sm"
          textDecoration="none"
          colorScheme="blue"
          _hover={{ textDecoration: "none" }}
          to="/"
        >
          bob weisbecker
        </Link>
        <Spacer />

        <Popover
          trigger="hover"
          openDelay={0}
          closeDelay={400}
          placement="bottom"
          gutter={-1}
        >
          {({ isOpen, onClose }) => (
            <>
              <PopoverTrigger>
                <Button
                  aria-label="View project list"
                  fontWeight="normal"
                  variant="ghost"
                  size="sm"
                  gap={1}
                  _activeLink={{
                    borderColor: "emphasis",
                    fontWeight: "semibold",
                    color: "emphasis",
                    isActive: "true",
                  }}
                >
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
                boxShadow="2xl"
                overflow="hidden"
                w="auto"
                bg="surface"
                maxW={{ base: "320px", md: "container.md" }}
                rounded="xl"
              >
                <PopoverBody p={1}>
                  <PopoverHeader
                    fontSize="2xs"
                    fontWeight="semibold"
                    letterSpacing="wider"
                    textTransform="uppercase"
                    color="subtle"
                    lineHeight="taller"
                    mb={1}
                    border="none"
                  >
                    projects
                  </PopoverHeader>

                  <List spacing={0}>
                    {projects.map((project, index) => (
                      <ListItem>
                        <Button
                          variant="ghost"
                          w="full"
                          as={NavLink}
                          to={project.path}
                          size="sm"
                          color="muted"
                          fontWeight="regular"
                          leftIcon={
                            <DotFilledIcon
                              className="popoverCurrentIcon"
                              opacity="0"
                              aria-label="Current Page"
                            />
                          }
                          _activeLink={{
                            color: "emphasis",
                            bg: "surface-active",
                            fontWeight: "medium",
                            "& .popoverCurrentIcon": {
                              display: "inline",
                              opacity: "1",
                              color: "green.400",
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
                <Show below="md">
                  <PopoverFooter>{headerButtons}</PopoverFooter>
                </Show>
              </PopoverContent>
            </>
          )}
        </Popover>
        <Show above="md">{headerButtons}</Show>

        <ColorModeSwitcher />
      </Flex>
      {/* <Divider /> */}
    </Box>
  );
};

export default Header;
