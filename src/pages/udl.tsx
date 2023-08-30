import * as React from "react";
import { NavLink } from "react-router-dom";

import {
  Image,
  Highlight,
  Box,
  Stack,
  Text,
  Link,
  Heading,
  Spacer,
  GridItem,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { LayoutGrid } from "../components/layout";
import { Article } from "../components/article";
import { ImageToggle } from "../components/imageToggle";
import { ImageModal } from "../components/imageModal";

export const UDL: React.FC = () => {
  return (
    <>
      <Article pageKey="unified-design-language">
        <Stack spacing={10}>
          <Heading as="h2">Context</Heading>
          <Text>
            EVERFI products lack a cohesive identity and experience; they look
            like they were built by different teams (because they were!) —
            undermining the experience for customers, teachers, and learners.
          </Text>

          <Text>
            Users moving across our products – from everfi.com to platform to
            course – encounter drastically different interfaces, preventing them
            from having an intuitive, seamless experience. This endeavor is
            geared toward unifying the design language across EVERFI’s product
            portfolio.
          </Text>
        </Stack>
        <ImageModal
          src="/assets/udl/ecosystem.png"
          caption="All the different ways we display course content across products and platforms – lacking a singular point of view on how an EVERFI
          product looks, feels, and behaves."
        />
        <Stack spacing={10}>
          <Text>
            Products are powered by different technologies, each influencing
            their respective design direction at inception and ultimately
            dictating the degree to which they could share with one another.
          </Text>
          <Text>
            The question “What does an Everfi button look like?” has a different
            answer depending on which product you look at. Multiply this kind of
            variation across a full library of styles and components per product
            – fields, cards, headers, footers, surveys, data viz – and layer in
            intentional theming of courses and platform tailored to content,
            network, and/or customer branding, and of course we end up with a
            disjointed experience.
          </Text>

          <ImageModal
            src="/assets/udl/styles-foundry.png"
            src2="/assets/udl/styles-foundry@2x.png"
            caption="Foundry, the assigned learning platform, is powered by
            its own React design system, Alloy, which takes cues from Material Design"
          />
          <ImageModal
            src="/assets/udl/styles-homeroom.png"
            src2="/assets/udl/styles-homeroom@2x.png"
            caption="Homeroom, the K12 platform, uses fully-custom styles that override its underlying legacy Bootstrap components. Its teacher-facing UI was redesigned in 2019, but other
            parts of the app remain untouched."
          />
          <ImageModal
            src="/assets/furnace/theme-previews.png"
            caption="EVERFI courses use Furnace, our product design system and SDK,
            to create custom themes that vary greatly depending on customer,
            audience, and learning style. The underlying base theme, Core,
            is a polished (and generic) theme that incorporates some aspects
            of EVERFI's branding."
          />
        </Stack>
        <Spacer />
        <Stack spacing={5}>
          <Heading as="h2">Process</Heading>
          <Text>
            We began with our North Star not as design system but a common
            design language that could guide our products closer together. The
            idea of sharing styles and components org-wide was unthinkable given
            the radically different natures of the respective codebases.
          </Text>
          <Text opacity=".5">
            Spoiler alert: it became thinkable. Keep reading.
          </Text>
          <Text>
            Instead, we set out to establish a unified design foundations that
            we could weave throughout experiences wherever technically feasible.
          </Text>
          <Text>
            We defined a design language as such – note the emphasis on
            "foundations" instead of components:
          </Text>
          <Text
            // fontStyle="italic"
            fontSize="xl"
            lineHeight="tall"
            fontWeight="regular"
            color="muted"
            // textAlign="center"
            borderLeft="4px"
            borderColor="border-muted"
            px={6}
            // mx={-6}
            my={10}
          >
            <Highlight
              query={["foundation", "across"]}
              styles={{ px: "1", bg: "blackAlpha.400", color: "emphasis" }}
            >
              A design language consists of an agreed-upon visual and
              interaction foundation upheld in both code and design workflows to
              foster consistency, intentionality, and predictability within and
              across products.
            </Highlight>
          </Text>
        </Stack>
        <Stack gap={5}>
          <Heading as="h3" size="lg">
            Audit
          </Heading>
          <Text>
            We first needed to know what we were dealing with, so I devised a
            set of benchmarks we could use to gauge the "system health" of our
            platforms, comparing their architecture to what had worked for{" "}
            <Link as={NavLink} to="/furnace" fontWeight="medium">
              Furnace
            </Link>
            .
          </Text>
          <Text>
            We then set off on an old-fashioned visual audit cataloguing each
            step in a potential admin, teacher, or learner journey.
            {/* In order to sell this idea, we first needed to know the cost of a
              style refactor in our platforms – at this stage, the best-case
              scenario was getting the green light to copy-paste variables from
              the theming system I'd devised for courses. I audited the SCSS
              used in our platforms and weighed it against a set of design
              system benchmarks to see just how far off we were. */}
          </Text>
          <ImageModal
            src="/assets/udl/audit.png"
            caption="~1/10th of our audit file"
          />
        </Stack>
        <Stack gap={5}>
          <Heading as="h3" size="lg">
            The Great Component-Off
          </Heading>
          <Text>
            The next step was to establish an opinion – to coalesce around a
            general visual style that reflected our brands, best practices, and,
            to an extent, our taste as a group of designers.
          </Text>
          <Text>
            That spurred the first – and hopefully last –{" "}
            <Box as="span" fontWeight="medium">
              Great EVERFI Component-Off™
            </Box>
            . We pitted competing components from platforms and products against
            one another, holding working sessions to dissect their behavior,
            style, and utility. For each moment of consensus, we laid another
            brick in our new shared foundations.
          </Text>
          <Stack>
            <ImageToggle
              before="/assets/udl/off-before.png"
              after="/assets/udl/off-after.png"
            />
            <Text textStyle="caption">
              There can only be one <del>Highlander</del> popover
            </Text>
          </Stack>
        </Stack>
        <Stack spacing={5}>
          <Heading as="h3" size="lg">
            Proof of Concept
          </Heading>
          <Text>
            When we'd reached a critical mass of solid decisions, I created a
            rough set of components to stress-test in various use cases across
            the organization. The goal was to further refine our approach and
            develop a proof of concept that we could pitch to leadership.
          </Text>
          <ImageModal
            src="/assets/udl/login-after.png"
            caption="One sign-in screen to rule them all"
          />
          <ImageModal
            src="/assets/udl/create-after.png"
            caption="Aligning admin and K12 platform login flows"
          />
          <ImageModal
            src="/assets/udl/evaluations-after.png"
            caption="Evaluations in platform and course contexts"
          />
        </Stack>
        <Stack spacing={5}>
          <Heading as="h2">Foundations</Heading>
          <Heading as="h3" size="lg">
            Color
          </Heading>
          <ImageToggle
            before="/assets/udl/color-before.png"
            after="/assets/udl/color-after.png"
          />
          <Heading as="h3" size="lg">
            Typography
          </Heading>
          <ImageToggle
            before="/assets/udl/type-before.png"
            after="/assets/udl/type-after.png"
          />
          <Heading as="h3" size="lg">
            Spacing
          </Heading>
          <ImageToggle
            before="/assets/udl/space-before.png"
            after="/assets/udl/space-after.png"
          />
        </Stack>

        <Stack spacing="5">
          <Heading as="h2">Implementation</Heading>
          <Heading as="h3" size="lg">
            Design Tokens
          </Heading>

          <ImageModal
            src="/assets/udl/docs-tokens.png"
            caption="Token types documentation"
          />
          <ImageModal src="/assets/udl/base-tokens.png" caption="Base tokens" />
          <ImageModal
            src="/assets/udl/semantic-tokens.png"
            caption="Semantic tokens"
          />
        </Stack>
        <Box
          bg="yellow.50"
          _dark={{ bg: "yellow.900" }}
          p={4}
          borderRadius="md"
          borderWidth="1px"
        >
          <Heading as="h2" m="2">
            That's it so far!
          </Heading>
          <Text>This is an ongoing project, so stay tuned...</Text>
        </Box>
      </Article>
    </>
  );
};
