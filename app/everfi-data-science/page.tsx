import { Article } from "@/components/article";
import { Heading } from "@/components/ui/heading";
import { LayoutGrid } from "@/components/layout-grid";
import { Separator } from "@/components/ui/separator";

export default function EverfiDataScience() {
  return (
    <Article pageKey="data-science">
      <Heading>Data Science Foundations</Heading>
      <p>
        EVERFI&apos;s K12 Data Science courses are intended to provide upper
        high school students with the skills and knowledge they need to
        accurately evaluate the ROI of a data science education and career
        options.
      </p>
      <p>
        The 101 course, Foundations, introduces students to the concept of data
        science why it matters — covering the collection, visualization, and
        interpretation of data.
      </p>
      <p>
        Each instruction module culminates in an interactive lab where learners
        act as a data scientist assisting a business. They practice collecting,
        cleaning, and verifying data; evaluate the difference between
        descriptive and predictive analytics; and decide how to employ data to
        influence customers.
      </p>

      <Heading level={3}>Lab 1: What is Data Science?</Heading>
      <p>Help Malachi boost his clothing company&apos;s sales.</p>

      <Heading level={4}>Collecting, Cleaning, and Validating Data</Heading>
      <LayoutGrid variant="twoUp">
        <div>
          <div className="mb-2 h-40 rounded-xl bg-muted" />
          <p className="text-sm">Collecting Data</p>
        </div>
        <div>
          <div className="mb-2 h-40 rounded-xl bg-muted" />
          <p className="text-sm">Cleaning Data</p>
        </div>
        <div>
          <div className="mb-2 h-40 rounded-xl bg-muted" />
          <p className="text-sm">Validating Data</p>
        </div>
        <div>
          <div className="mb-2 h-40 rounded-xl bg-muted" />
          <p className="text-sm">
            Study CordiQ&apos;s new user data to gain insights about their
            customers.
          </p>
        </div>
      </LayoutGrid>

      <Heading level={4}>Analyzing and Visualizing Data</Heading>
      <p>
        Students will learn about the processes of analyzing and visualizing data
        and will explore various ways that data can be presented. Use various
        displays and analytics tools to understand data sets.
      </p>
      <p>
        Assist Arun in performing statistical analysis on his data to optimize
        the performance of a soccer team.
      </p>

      <Heading level={4}>Reporting and Acting on Data</Heading>
      <p>
        Students will understand the different uses of dashboards and reports,
        then determine which is better to use for a variety of audiences.
        Summarizing data for different audiences in order to inform business
        decisions.
      </p>
      <p>
        Use probability and statistics to help PlanetPlan choose their next
        conservation project.
      </p>

      <Separator />

      <Heading>Banking Industry</Heading>
      <p>
        The Data Science Exploration: Banking Fraud is a 201 course dedicated to
        providing upper high school students with the skills and knowledge they
        need to accurately evaluate the ROI of data science education and career
        options specifically within the banking industry.
      </p>
      <p>
        It will refresh learners on some core concepts from the Data Science
        Foundations course and introduce them to the role data science plays in
        the banking industry, including:
      </p>
      <p>
        Students will discover how fraud in financial transactions is detected
        and mitigated. Students will determine when risk of fraud is highest and
        how steps are taken to prevent fraud.
      </p>

      <Heading level={4}>Automation</Heading>
      <p>
        Students will learn about the use of machine learning to automate
        processes such as data collection, analysis, fraud detection and
        prevention.
      </p>
      <p>
        Students will discover how fraud in financial transactions is detected
        and mitigated. Students will determine when risk of fraud is highest and
        how steps are taken to prevent fraud.
      </p>

      <Heading level={3}>Banking Fraud Simulation</Heading>

      <Heading level={4}>Learning Objectives:</Heading>
      <p>Students will be able to...</p>
      <ul className="list-disc space-y-2 ps-5">
        <li>
          List examples of how data science is used to prevent risk in the
          financial industry.
        </li>
        <li>
          List examples of how data science is used to create improved processes
          and automation in the financial industry.
        </li>
        <li>Define and demonstrate how to use a decision tree.</li>
        <li>Define and demonstrate how to use a confusion matrix.</li>
      </ul>

      <Heading level={3}>Data Science Exploration: Financial Wellness</Heading>
      <Separator />

      <LayoutGrid variant="twoUp">
        <div>
          <p className="mb-5">
            The Data Science Exploration: Financial Wellness course is a 201
            course designed to be taken after learners complete Data Science
            Foundations
          </p>
          <p>
            This course includes a simulation experience where learners practice
            and apply data science concepts to identify common issues faced by
            young adults and decide how to target specific solutions.
          </p>
        </div>
        <div>
          <Heading level={4}>Simulation Learning Objectives:</Heading>
          <p className="mb-5 text-sm">Students will be able to...</p>
          <ul className="list-disc space-y-3 ps-5 text-xs">
            <li>
              List examples of how data science is used to create improved
              processes and automation in the banking industry.
            </li>
            <li>
              List examples of how data science is used to improve customer
              experience in the banking industry.
            </li>
            <li>
              Define and demonstrate how to use data mining techniques.
            </li>
            <li>
              Define and demonstrate how to segment customers based on specific
              characteristics.
            </li>
            <li>
              Identify common financial challenges faced by newly independent
              adults and how to overcome them.
            </li>
          </ul>
        </div>
      </LayoutGrid>

      <LayoutGrid variant="twoUp">
        <div className="text-sm">
          <div className="mb-2 rounded-xl bg-muted">
            <img
              src="/assets/durve2.png"
              alt="Story set-up"
              className="rounded-xl"
            />
          </div>
          <Heading level={5}>Story set-up</Heading>
          <p>
            Learners meet a character they&apos;ll follow through the lesson as
            he learns how to use online banking to manage his money.
          </p>
        </div>
        <div className="text-sm">
          <div className="mb-2 rounded-xl bg-muted">
            <img
              src="/assets/durve2.png"
              alt="Financial Wellness and New Adults"
              className="rounded-xl"
            />
          </div>
          <Heading level={5}>Financial Wellness and New Adults</Heading>
          <p>
            Learners are introduced to the common financial problems and pitfalls
            for newly independent adults. They will explore ideal financial
            behavior. Learners will practice segmenting customer data by age and
            life stage.
          </p>
        </div>
        <div className="text-sm">
          <div className="mb-2 rounded-xl bg-muted">
            <img
              src="/assets/durve2.png"
              alt="How Data Scientists Use Data to Provide Advice"
              className="rounded-xl"
            />
          </div>
          <Heading level={5}>How Data Scientists Use Data to Provide Advice</Heading>
          <p>
            Learners will review solutions to common financial problems and
            pitfalls. They will identify ideal timing for delivering information,
            as well as best messaging and delivery methods for information and
            products.
          </p>
        </div>
        <div className="text-sm">
          <div className="mb-2 rounded-xl bg-muted">
            <img
              src="/assets/durve2.png"
              alt="Testing and Validating Messaging"
              className="rounded-xl"
            />
          </div>
          <Heading level={5}>Testing and Validating Messaging</Heading>
          <p>
            Learners will apply automated processes to get messages to the right
            customers, and evaluate how well the process worked.
          </p>
        </div>
      </LayoutGrid>
    </Article>
  );
}
