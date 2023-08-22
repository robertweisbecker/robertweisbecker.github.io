// import Resume from '../components/resume';
import { LayoutGrid } from "../components/layout";
import { Article } from "../components/article";
import { ImageToggle } from "../components/imageToggle";
import {
  Heading,
  Box,
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
  Spacer,
  List,
  ListItem,
  UnorderedList,
  Code,
  OrderedList,
} from "@chakra-ui/react";

import { ArrowTopRightIcon } from "@radix-ui/react-icons";

import { AnimatePresence, motion } from "framer-motion";

export const Thesis: React.FC = () => {
  return (
    <Article pageKey="thesis">
      <Text>
        In December 2017, I completed a Master's in User Experience Design at
        MICA. For my thesis project, I explored how to translate immigration
        application paperwork into a more user-friendly format via
        conversational interfaces.
      </Text>
      <Image src="/assets/thesis/thesis-1.png" />
      <Stack spacing={5}>
        <Heading size="lg">Problem Space</Heading>
        <Text>
          Few people enjoy filling out paperwork, and even fewer enjoy
          government paperwork. Forms are tedious and old-fashioned, and they
          often accompany a particularly byzantine process. But they surface
          infrequently enough that we're able to tolerate them for a few hours
          now and then before moving on with our lives.
        </Text>
        <Text>
          Not everyone has that luxury. For immigrants applying for residency or
          naturalization status in the United States, incomplete or inaccurate
          paperwork can result in life-altering consequences. The rejection of
          an application can deny someone opportunity, security, or a reunion
          with loved ones. And until a Supreme Court ruling in 2017,
          innacuracies on an immigration application, intentional or not, could
          be grounds for prosecution.
        </Text>
        <Text>
          For my thesis project at MICA, I explored the application of usability
          and interaction design principles to these forms – whether emerging
          interaction patterns could improve the experiences of those seeking to
          become residents or citizens of the United States.
        </Text>
        <Text>
          In the absence of fully digital and usable federal paperwork, software
          solutions have arisen to assist people in other bureaucratic matters,
          such as preparing taxes or managing a business. A similar approach
          ought to be applied to the immigration process, where frustration with
          paperwork can complicate an already-stressful process for a
          particularly vulnerable audience.
        </Text>
      </Stack>
      <Stack spacing={5}>
        <Heading size="lg">Research</Heading>
        <Text>
          I conducted user research by interviewing five people with firsthand
          experience in applying for residency or naturalization. Participants
          included three immigrants hailing from Cuba, Nicaragua, and India: one
          a naturalized citizen, the other two permanent residents by marriage.
          The remaining two were US citizens who assisted their spouses with
          their applications.
        </Text>
        <Text>
          Interviews consisted of about 25 questions covering their experience
          with various immigration processes, their comfort with technology, and
          retrospection on how they might improve the process given their
          experiences.
        </Text>
      </Stack>
      <Stack spacing={5}>
        <Heading size="lg">Takeaways</Heading>
        <UnorderedList spacing={3}>
          <ListItem>
            <b>
              Applicants typically resided in the US for several years before
              applying for a change in status.
            </b>{" "}
            Most had held multiple different visas before becoming permanent
            residents or citizens, including refugee, student, employment-based,
            and marriage visas. Several mentioned family members who were
            permanent residents that decided applying for naturalization wasn't
            worth the effort.
          </ListItem>
          <ListItem>
            <b>Government is a “black box”</b>; after submitting an application,
            months of uncertainty would pass before receiving further word from
            USCIS.
          </ListItem>
          <ListItem>
            The process was <b>invasive</b>, as officials often required
            applicants to submit personal communications with their spouses as
            proof of their relationship.
          </ListItem>
          <ListItem>
            <b>Outside help is often necessary, but trust is an issue</b>. Word
            of horror stories about immigration scams traveled through immigrant
            communities, and there was some apprehension of third-party
            services.
          </ListItem>
          <ListItem>
            <b>Applicants aren’t the only users</b> — citizen spouses, lawyers,
            translators, and social workers often assist in filling out
            documents and testimonials.
          </ListItem>
          <ListItem>
            <b>Suggested product features</b>: Document uploading, progress
            tracking, reminders, remote access & multiple users/permissions,
            plain language, contextual definitions, less legalese
          </ListItem>
        </UnorderedList>
      </Stack>

      <Stack>
        <Heading size="lg">Thesis</Heading>
        <Text>
          In many cases, digital forms fail to overcome the challenges posed by
          paper ones. Simply creating a digital facsimile wouldn't suffice. My
          initial exploration & research pointed me toward conversational
          interfaces as a solution, since they rely upon progressive disclosure
          — the method of only exposing immediately relevant information to a
          user at a given time. This reduces cognitive load in users, making
          complex tasks more manageable and thereby easier to complete.
        </Text>
        <Spacer />
        <Text p={5} fontSize="lg" color="emphasis">
          I propose an alternative to immigration paperwork in the form of a
          conversational interface. By re-contextualizing traditional paperwork
          into a question-and-answer format, we can use familiar language and
          interaction patterns to provide users with a personalized experience
          that is approachable and stress-free.
        </Text>
        <Spacer />
        <Text>
          I experimented with three different types of conversational UIs:
          chatbots, wizards, and natural language forms. As a test case, I
          rewrote sections of the USCIS Naturalization Eligibility Checklist
          with more conversational copy and developed several prototypes.
        </Text>
      </Stack>
      <Stack spacing={5}>
        <Heading size="lg">Prototypes</Heading>
        <Heading size="md">Chatbot</Heading>
        <Box
          maxW="container.sm"
          mx="auto"
          bg="emphasis"
          p={2}
          borderRadius="md"
          overflow="hidden"
        >
          <video width="100%" height="auto" controls>
            <source src="assets/thesis/chatbot.mov" />
          </video>
        </Box>

        <Text>
          Simulating human conversation with a Facebook Messenger chatbot made
          with ChatFuel. This let me experiment with branching questions and
          friendly, casual language.
        </Text>
        <Spacer />
        <Heading size="md">Wizard(ish)</Heading>
        <Text>
          I used Twine, an open-source tool for creating text-based narrative
          experiences, to mimic the step-by-step format of a wizard. The output
          was seemingly minimalist, but Twine's branching logic features and the
          visual flow editor made this prototype fully-functional.
        </Text>
        <Box
          maxW="container.md"
          mx="auto"
          bg="emphasis"
          p={2}
          borderRadius="md"
          overflow="hidden"
        >
          <video width="100%" height="auto" controls>
            <source src="assets/thesis/twine.mov" />
          </video>
        </Box>

        <Image src="/assets/thesis/twine-flow.png" />
        <Spacer />
        <Heading size="md">Hybrid</Heading>
        <Text>
          A hybrid UI that allows toggling between chat and traditional form
          modes.
        </Text>
        <Box
          maxW="sm"
          mx="auto"
          bg="emphasis"
          p={2}
          borderRadius="md"
          overflow="hidden"
        >
          <video width="100%" height="auto" controls>
            <source src="assets/thesis/toggle.mov" />
          </video>
        </Box>
      </Stack>
      <Stack spacing={5}>
        <Heading size="lg">Testing</Heading>
        <Text>
          Next came a round of user testing pitting the Twine wizard against my
          Facebook messenger bots. I was looking to determine which interaction
          pattern enabled users to complete the task the quickest, and also
          gauged users' subjective attitudes toward the input methods, tone of
          voice, and ease of use.
        </Text>
        <Heading size="md">Key Findings</Heading>
        <OrderedList>
          <ListItem>
            Faster task completion using the Twine prototype than Messenger
          </ListItem>
          <ListItem>
            Messenger chatbot was deemed more engaging & friendly. However,
            users reported that it felt too casual, and called it "unofficial"
            and “flippant”
          </ListItem>
          <ListItem>
            Users had privacy concerns using a tool hosted on Facebook
          </ListItem>
          <ListItem>
            “The chat paradox”: While chat was more familiar to users, it felt
            unofficial and potential risky. This was someone’s entire life -
            could they trust this service?
          </ListItem>
        </OrderedList>
      </Stack>
      <Stack spacing={5}>
        <Heading size="lg">Results</Heading>
        <Text>
          The biggest revelation from user testing was that conversational
          interfaces (or at least my means of reproducing them in prototypes)
          simply weren't advanced enough to give people the impression that
          completing a complex form was as easy as chatting with another person.
          By forcing everything into a conversational format, I was arbitrarily
          limiting users. In some cases, plain old HTML inputs might be more
          effective than both a chatbot and a paper form, and my conversational
          approach had discounted them from the outset.
        </Text>
        <Spacer />
        <Heading size="md">The inefficiencies of chat</Heading>
        <Text>
          For example, a portion of the N-400 form asks applicants whether they
          have left the United States for an extended period in order to
          determine whether they can be considered permanent residents. If
          someone has been on multiple foreign trips, they must answer
          additional follow-ups.
        </Text>
        <Text>
          My initial instinct was that continued questioning was natural – we
          were simply following the natural flow of a conversation. However, we
          should let content dictate the input mode:{" "}
          <UnorderedList>
            <ListItem>
              for entering a year on mobile, use a native numerical keyboard;
            </ListItem>
            <ListItem>
              for choosing the month, use a select or support autocomplete;
            </ListItem>
            <ListItem>
              and for selecting a date range, use a datepicker rather than
              multiple fields or messages
            </ListItem>
          </UnorderedList>
        </Text>
        <Spacer />
        <Heading size="md">Improvements</Heading>
        <Text>
          Users did, however, respond to progressive disclosure – validating the
          core of my hypothesis. So I then sought to create & test a hybrid UI
          with N-400 content that synthesized the well-recieved qualities of the
          two earlier prototypes along with some more traditional form elements.
        </Text>
        <Text>
          My aim was to instill confidence by increasing the fidelity of the
          prototye and employing a more restrained approach to the
          conversational aspects, dialing up the formality and using it only
          when contextually appropriate. Eventually, I settled on using the US
          Web Design Standards to guide my visual design, as I realized matching
          the look & feel to federal websites could ameliorate the perceived
          insecurity presented by the Facebook Messenger bot.
        </Text>
      </Stack>
      <Stack spacing={5}>
        <Heading size="lg">Iteration: Natural Language Form</Heading>
        <Spacer />
        <Heading size="md">Key changes / benefits</Heading>
        <UnorderedList spacing={3}>
          <ListItem>More formal tone of voice </ListItem>
          <ListItem>
            Use of natural language only when contextually appropriate {"->"}{" "}
            some standard inputs are standard for a reason; utility trumps
            adherence to style
          </ListItem>
          <ListItem>Gradual explanation, minimal instruction </ListItem>
          <ListItem>
            Progressive disclosure {"->"} One question per page{" "}
          </ListItem>
          <ListItem>
            Conform to users’ mental models {"->"} don’t rely exclusively upon
            chat
          </ListItem>
        </UnorderedList>
      </Stack>
      <Stack spacing={5}>
        <LayoutGrid variant="threeUp">
          <Image src="/assets/thesis/thesis-device-img-01.png" />
          <Image src="/assets/thesis/thesis-device-img-03.png" />
          <Image src="/assets/thesis/thesis-device-img-02.png" />

          <Box
            maxW="sm"
            mx="auto"
            bg="emphasis"
            px={2}
            py={5}
            borderRadius="2xl"
            overflow="hidden"
          >
            <video width="100%" height="auto" controls>
              <source src="assets/thesis/thesis-v2-1.mov" />
            </video>
          </Box>
          <Box
            maxW="sm"
            mx="auto"
            bg="emphasis"
            px={2}
            py={5}
            borderRadius="2xl"
            overflow="hidden"
          >
            <video width="100%" height="auto" controls>
              <source src="assets/thesis/thesis-v2-2.mov" />
            </video>
          </Box>
          <Box
            maxW="sm"
            mx="auto"
            bg="emphasis"
            px={2}
            py={5}
            borderRadius="2xl"
            overflow="hidden"
          >
            <video width="100%" height="auto" controls>
              <source src="assets/thesis/thesis-v2-3.mov" />
            </video>
          </Box>
        </LayoutGrid>
      </Stack>
    </Article>
  );
};
