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
} from "@chakra-ui/react";

import { ArrowRightIcon, DotIcon, TokensIcon } from "@radix-ui/react-icons";
import { LayoutGrid } from "../components/layout";

import { projects } from "../data/projects";

function ProjectGrid() {
  return (
    <Stack
      id="projects"
      gap={0}
      className="peer"
      sx={{
        ".chakra-stack__divider": {
          pointerEvents: "none",
          m: "0",
        },
      }}
      divider={<StackDivider opacity=".5" borderStyle="dotted" />}
    >
      {projects.map((project, index) => (
        <LinkBox
          className="group peer"
          transitionProperty="common"
          transitionDuration="slow"
          transitionTimingFunction="ease-out"
          _peerHover={{
            opacity: ".25",
          }}
          _hover={{
            opacity: "1",
            transform: "translateX(1em)",
            borderColor: "border",
          }}
          _focusWithin={{ boxShadow: "focus" }}
        >
          <HStack gap={2} position="relative" py={4} className="group">
            {project.logoStub ? (
              <Image
                src={`assets/logos/${project.logoStub}-icon.png`}
                w={8}
                opacity=".5"
                transitionProperty="common"
                transitionDuration="fast"
                transitionTimingFunction="ease-out"
                transform="scale(.8)"
                filter="brightness(100%) contrast(0%) grayscale(100%)"
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

            <Flex flexGrow="1" align="baseline">
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
              <Text flexGrow="1" display="inline" fontSize="sm" color="subtle">
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
