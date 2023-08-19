// import Resume from '../components/resume';
import { LayoutGrid } from "../components/layout";
import { Article } from "../components/article";
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
  OrderedList,
} from "@chakra-ui/react";

import { ArrowTopRightIcon } from "@radix-ui/react-icons";

import { AnimatePresence, motion } from "framer-motion";

export const DSF: React.FC = () => {
  return (
    <Article pageKey="data-science">
      <Heading as="h2" size="xl">
        Data Science Foundations
      </Heading>
      <Text>
        EVERFI's K12 Data Science courses are intended to provide upper high
        school students with the skills and knowledge they need to accurately
        evaluate the ROI of a data science education and career options.
      </Text>
      <Text>
        The 101 course, Foundations, introduces students to the concept of data
        science why it matters – covering the collection, visualization, and
        interpreation of data.
      </Text>
      <Text>
        Each instruction module culminates in an interactive lab where learners
        act as a data scientist assisting a business. They practice collecting,
        cleaning, and verifying data; evaluate the difference between
        descriptive and predictive analytics; and decide how to employ data to
        influence customers.
      </Text>
      <Heading as="h3" size="lg">
        Lab 1: What is Data Science?
      </Heading>
      <Text> Help Malachi boost his clothing company’s sales.</Text>
      <Heading as="h4">Collecting, Cleaning, and Validating Data</Heading>
      <LayoutGrid variant="twoUp">
        <GridItem>
          <Image />
          <Text>Collecting Data</Text>
        </GridItem>
        <GridItem>
          <Image />
          <Text>Cleaning Data</Text>
        </GridItem>
        <GridItem>
          <Image />
          <Text>Validating Data</Text>
        </GridItem>
        <GridItem>
          <Image />
          <Text>
            Study CordiQ’s new user data to gain insights about their customers.
          </Text>
        </GridItem>
      </LayoutGrid>

      <Heading as="h4">Analyzing and Visualizing Data</Heading>
      <Text>
        Students will learn about the processes of analyzing and visualizing
        data and will explore various ways that data can be presented. Use
        various displays and analytics tools to understand data sets.
      </Text>
      <Text>
        Assist Arun in performing statistical analysis on his data to optimize
        the performance of a soccer team.
      </Text>
      <Heading as="h4">Reporting and Acting on Data</Heading>
      <Text>
        Students will understand the different uses of dashboards and reports,
        then determine which is better to use for a variety of audiences.
        Summarizing data for different audiences in order to inform business
        decisions.
      </Text>
      <Text>
        Use probability and statistics to help PlanetPlan choose their next
        conservation project.
      </Text>
      <Divider />
      <Heading as="h2" size="lg">
        Banking Industry
      </Heading>
      <Text>
        The Data Science Exploration: Banking Fraud is a 201 course dedicated to
        providing upper high school students with the skills and knowledge they
        need to accurately evaluate the ROI of data science education and career
        options specifcally within the banking industry.
      </Text>
      <Text>
        It will refresh learners on some core concepts from the Data Science
        Foundations course and introduce them to the role data science plays in
        the banking industry, including:
      </Text>
      <Text>
        Students will discover how fraud in financial transactions is detected
        and mitigated. Students will determine when risk of fraud is highest and
        how steps are taken to prevent fraud.
      </Text>
      <Heading as="h4">Automation</Heading>
      <Text>
        Students will learn about the use of machine learning to automate
        processes such as data collection, analysis, fraud detection and
        prevention.
      </Text>
      <Text>
        Students will discover how fraud in financial transactions is detected
        and mitigated. Students will determine when risk of fraud is highest and
        how steps are taken to prevent fraud.
      </Text>

      <Heading as="h3" size="md">
        Banking Fraud Simulation
      </Heading>

      <Heading as="h4" size="sm">
        Learning Objectives:
      </Heading>
      <Text>Students will be able to...</Text>
      <UnorderedList>
        <ListItem>
          List examples of how data science is used to prevent risk in the
          financial industry.
        </ListItem>
        <ListItem>
          List examples of how data science is used to create improved processes
          and automation in the financial industry.
        </ListItem>
        <ListItem>Define and demonstrate how to use a decision tree.</ListItem>
        <ListItem>
          Define and demonstrate how to use a confusion matrix.
        </ListItem>
      </UnorderedList>
      <Heading as="h3" size="lg">
        Data Science Exploration: Financial Wellness
      </Heading>
      <Divider />
      <LayoutGrid variant="twoUp">
        <GridItem>
          <Text mb={5}>
            The Data Science Exploration: Financial Wellness course is a 201
            course designed to be taken after learners complete Data Science
            Foundations
          </Text>

          <Text>
            This course includes a simulation experience where learners practice
            and apply data science concepts to identify common issues faced by
            young adults and decide how to target specific solutions.
          </Text>
        </GridItem>
        <GridItem>
          <Heading as="h4" size="md" mb={5}>
            Simulation Learning Objectives:
          </Heading>
          <Text mb={5} fontSize="sm">
            Students will be able to...
          </Text>
          <UnorderedList fontSize="xs" spacing={3}>
            <ListItem>
              List examples of how data science is used to create improved
              processes and automation in the banking industry.
            </ListItem>
            <ListItem>
              List examples of how data science is used to improve customer
              experience in the banking industry.
            </ListItem>
            <ListItem>
              Define and demonstrate how to use data mining techniques.
            </ListItem>
            <ListItem>
              Define and demonstrate how to segment customers based on specifc
              characteristics.
            </ListItem>
            <ListItem>
              Identify common financial challenges faced by newly independent
              adults and how to overcome them.
            </ListItem>
          </UnorderedList>
        </GridItem>
      </LayoutGrid>

      <LayoutGrid variant="twoUp">
        <GridItem fontSize="sm">
          <Stack>
            <Image bg="gray.200" borderRadius="xl" src="/assets/durve2.png" />
            <Heading as="h5" size="xs">
              Story set-up
            </Heading>
            <Text>
              Learners meet a character they’ll follow through the lesson as he
              learns how to use online banking to manage his money.
            </Text>
          </Stack>
        </GridItem>
        <GridItem fontSize="sm">
          <Stack>
            <Image bg="gray.200" borderRadius="xl" src="/assets/durve2.png" />
            <Heading as="h5" size="xs">
              Financial Wellness and New Adults
            </Heading>
            <Text>
              Learners are introduced to the common financial problems and
              pitfalls for newly independent adults. They will explore ideal
              financial behavior. Learners will practice segmenting customer
              data by age and life stage.
            </Text>
          </Stack>
        </GridItem>
        <GridItem fontSize="sm">
          <Stack>
            <Image bg="gray.200" borderRadius="xl" src="/assets/durve2.png" />
            <Heading as="h5" size="xs">
              How Data Scientists Use Data to Provide Advice
            </Heading>
            <Text>
              Learners will review solutions to common financial problems and
              pitfalls. They will identify ideal timing for delivering
              information, as well as best messaging and delivery methods for
              information and products.
            </Text>
          </Stack>
        </GridItem>
        <GridItem fontSize="sm">
          <Stack>
            <Image bg="gray.200" borderRadius="xl" src="/assets/durve2.png" />
            <Heading as="h5" size="xs">
              Testing and Validating Messaging
            </Heading>
            <Text>
              Learners will apply automated processes to get messages to the
              right customers, and evaluate how well the process worked.
            </Text>
          </Stack>
        </GridItem>
      </LayoutGrid>
    </Article>
  );
};
