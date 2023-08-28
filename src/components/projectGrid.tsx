import * as React from "react";
import {
  BrowserRouter as Router,
  NavLink as RouterLink,
} from "react-router-dom";
import {
  Text,
  GridItem,
  Image,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  AspectRatio,
  Button,
  IconButton,
  LinkBox,
  LinkOverlay,
  Box,
  Flex,
  VisuallyHidden,
  HStack,
  Stack,
  StackDivider,
  Icon,
  Badge,
  Tag,
} from "@chakra-ui/react";

import { ArrowRightIcon, DotIcon, TokensIcon } from "@radix-ui/react-icons";
import { LayoutGrid } from "../components/layout";

import { projects } from "../data/projects";

function ProjectGrid() {
  return (
    <Stack
      id="projects"
      bg="whiteAlpha.50"
      ps={4}
      pe={6}
      borderRadius="2xl"
      gap={0}
      boxShadow="lg"
      borderColor="whiteAlpha.50"
      backdropFilter="auto"
      backdropBlur="80px"
      borderWidth="1px"
      className="peer"
      // _hover={{
      //   "&  .group:not(.group:hover)": {
      //     opacity: ".5",
      //   },
      // }}
    >
      {projects.map((project, index) => (
        <LinkBox
          className="peer group"
          transitionProperty="common"
          transitionDuration="slow"
          transitionTimingFunction="ease-out"
          borderBottom="1px"
          borderColor="border"
          key={index}
          _last={{
            border: "none",
          }}
          pe={2}
          _hover={{
            opacity: "1",
            transform: "translateX(1em)",
            borderColor: "border",
          }}
          _groupHover={{
            opacity: ".1",
            filter: "grayscale(100%)",
          }}
          _peerHover={{
            opacity: ".5",
          }}
          _focusWithin={{ boxShadow: "focus" }}
        >
          <HStack
            gap={3}
            position="relative"
            py={4}
            align="start"
            className="group"
          >
            {project.logo ? (
              <Image
                src={`${project.logo}`}
                w={8}
                opacity=".8"
                transitionProperty="common"
                transitionDuration="fast"
                transitionTimingFunction="ease-out"
                transform="scale(.8)"
                _dark={{ filter: "brightness(120%) " }}
                _groupHover={{
                  filter: "none",
                  w: "8",
                  opacity: "1",
                  transform: "translate(0) scale(1)",
                }}
              />
            ) : (
              <Icon as={project.icon} w="8" opacity=".5" />
            )}

            <Flex flexGrow="1" align="baseline" wrap="wrap">
              <LinkOverlay
                as={RouterLink}
                to={project.path}
                aria-label="{project.title}"
              >
                <Text
                  as="h3"
                  size="md"
                  me={3}
                  color="emphasis"
                  fontWeight="medium"
                >
                  {project.title}
                </Text>
              </LinkOverlay>
              <Text flexGrow="1" display="inline" fontSize="sm" color="muted">
                {project.description}
              </Text>
            </Flex>

            <Icon
              transitionProperty="common"
              transitionDuration="ultraslow"
              transitionTimingFunction="ease-out"
              opacity="1"
              as={ArrowRightIcon}
            />
          </HStack>
        </LinkBox>
      ))}
    </Stack>
  );
}

export default ProjectGrid;
