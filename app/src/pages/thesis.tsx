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

export const NPR: React.FC = () => {
  return (
    <Article pageKey="thesis">
      <p>#thesis</p>
      <h2 id="introduction">Introduction</h2>
      <p>10/29/17</p>
      <h3 id="overview">Overview</h3>
      <p>
        Digital forms can be a regular source of user frustration, as they
        typically reproduce their analog counterparts, with numerous input
        fields substituting the original’s blank spaces. They can be rife with
        usability concerns, exacerbated in the context of government paperwork,
        and potentially carry the risk of financial or criminal penalty if
        improperly completed.
      </p>
      <p>
        Perhaps no type of government paperwork carries more significant
        consequences than immigration applications. The difference between
        success and failure is the opportunity to become a permanent resident or
        citizen of the United States. Until a Supreme Court ruling this year,
        incorrect information on an immigration application could result in
        deportation. Still, the issue of usability can lead to immigrants
        failing to complete necessary forms or miss deadlines. Given the
        already-high stakes of immigrating, the design of the form itself should
        be the least of applicant’s concerns, rather than a source of friction.
      </p>
      <p>
        Richard Thaler, the 2017 Nobel Laureate in economics and an expert on
        human behavior and decision-making, states, “My mantra is if you want to
        get people to do something, make it easy.”{" "}
      </p>
      <p>
        With this in mind, I aim to simplify the complex process of completing
        immigration paperwork by removing obstacles to usability. As new
        immigrants are uniquely vulnerable to the consequences of inaccurate
        paperwork, why not make that process easy?
      </p>
      <h3 id="background">Background</h3>
      <h4 id="digital-forms-usability">Digital Forms &amp; Usability</h4>
      <p>
        Form design inherently presents a number of usability hurdles. In a
        traditional online form, there are a multitude of concerns that
        designers must consider in order to guide users through the process of
        submitting information. For example, a standard input field in a web
        form has around seven potential states (default, hover, focus, filled,
        invalid, readonly, and disabled), all of which must be styled distinctly
        in order to communicate their purpose to a user.
      </p>
      <p>
        Additionally, fields must be grouped together in a logical manner to
        allow the user to move quickly through the form. In order to avoid
        overwhelmingly long forms, designer will commonly split fields into
        two-column layout in order to save space. However, this approach can
        force users to divide their attention, as it requires them to determine
        which column they ought to be focused on.{" "}
      </p>
      <p>
        Other factors such as the placement of error messages, instructions, and
        placeholder text can disrupt the user’s flow and must also be factored
        into any layout design. A conversational interface ameliorates many of
        these concerns.<em>*</em>
      </p>
      <h4 id="about-conversational-interfaces">
        About Conversational Interfaces
      </h4>
      <p>
        Two modern alternatives to the traditional online form are natural
        language forms and conversational user interfaces, of which there are
        several different types. Natural language forms differ from true
        conversational interfaces in that the underlying structure of the form
        may utilize HTML form elements. Styling, copywriting, and interaction
        design work together to more closely resemble conversational dialogue.
        The two most common examples of these type of forms are “Mad Libs”-style
        fill-in-the-blanks interactions and wizard-style forms that make use of
        progressive disclosure.{" "}
      </p>
      <p>
        In a typical “Mad Libs”-style form, inputs are strung together in a
        single sentence or paragraph, allowing users to fill in the blanks
        either by typing or making a selection from a dropdown menu.{" "}
      </p>
      <p>
        Wizard forms, such as those popularized by Typeform (see Competitive
        Analysis below for more information), take this one step further by
        accommodating longer forms. In these forms, questions are presented one
        at a time and occupy users’ entire screens. After users type or select a
        response, the response is logged and the next question appears. Upon
        reaching the end, users are able to view a summary of their responses
        and confirm submission.
      </p>
      <p>
        Conversational user interfaces, while similar in their approach, allow
        for even more complex interactions with the assistance of advanced
        algorithms and conditional logic. Text-based conversational interfaces,
        or chatbots, will mimic a text message or chat thread; the user is asked
        questions and replies as if they are conversing in real time. For a
        typical smartphone user, this interaction style is already familiar.
        Modern chatbots oftentimes make use of artificial intelligence to
        interpret user responses and generate personalized responses, while
        simple chatbots can use conditional logic to serve users different
        responses, so long as the user’s response matches a predetermined
        format, such as a ‘yes’ or ‘no’ reply
      </p>
      <p>
        Conversational UI is not limited to text. The recent spate of smart
        speakers and digital assistants – Apple’s Siri, Amazon Alexa, and Google
        Assistant – combine artificial intelligence and machine learning
        algorithms with speech recognition to produce truly conversational
        interactions. The domain of voice/chat assistants represent the next
        frontier in conversational interfaces, though at this time, and require
        significant engineering capability to function. Currently, they are best
        suited to providing in-the-moment responses to simple commands, like
        adjusting Internet of Things-connected (IoT) smart home devices or
        controlling media playback. Soon, however, they may be capable of
        filling out our paperwork for us.
      </p>
      <h3 id="conclusion">Conclusion</h3>
      <p>
        Research on effective form design recommends reducing the number of
        input fields, auto-focusing the first field, and splitting forms into
        multiple steps to make them more manageable.{" "}
      </p>
      <p>
        In a conversational interface, these concerns are either addressed or
        eliminated altogether. In a natural language form, a single question or
        prompt is displayed and responds to user’s keystrokes, thereby
        eliminating the need to auto-focus a field and split steps. Validation
        feedback can also be given instantly on a question-by-question basis
        (and progress to the next step can be disabled until a valid response is
        given), rather than the common issue of users receiving an error message
        only upon submission.{" "}
      </p>
      <p>
        This is also true in chatbots. Styling input fields is unnecessary, as
        the message field serves as the lone input field in the interface. If a
        field is disabled, it can be removed from the flow altogether,
        eliminating the need to style it a certain way. The layout and
        sequencing of inputs becomes irrelevant as well, as a chatbot or
        advanced natural language form can programmatically group similar
        questions together in a conversational manner. Since instructions are
        provided by the system, placeholder text is also not a concern, so long
        as the interface phrases the question to include instruction or an
        example of the desired response format
      </p>
      <p>
        In a voice-based conversational UI, these concerns are moot. Users are
        able to interact as if they are speaking to another person, and
        usability is contingent upon the ability of the command-processing
        algorithm to simulate verbal conversation
      </p>
      <h2 id="thesis-statement">Thesis Statement</h2>
      <p>
        The practice of adapting a traditionally analog process to new
        technology by creating digital facsimiles is uninspired and ought to be
        reconsidered. In the case of paperwork, digital forms simply port
        existing user frustrations into a new medium, failing to leverage
        aspects of digital interaction that may benefit user experience and
        enhance task completion{" "}
      </p>
      <p>
        I propose an alternative to government paperwork in the form of a
        conversational interface. By re-contextualizing traditional paperwork
        into a question-and-answer format, we can use familiar language and
        interaction patterns to provide users with a personalized experience
        that is approachable and stress-free
      </p>
      <h2 id="approach-methods">Approach &amp; Methods</h2>
      <p>
        Using the principles of user-centered design, my decision-making will be
        informed by preliminary user research and regular user feedback through
        multiple rounds of usability testing. I will be exploring a number of
        methods for prototyping and iterating a conversational interfaces.
        Because conversational UI deviates from standard interface design,
        prototyping these interactions will be a challenge. I hope to emulate
        the approach used by the design firm IDEO, which had success in applying
        user-centered design principles to similar products by simulating a
        chatbot using standard text messaging before moving into more advanced
        development. Additionally, I hope to make use of the Facebook Messenger
        platform to create a fully interactive chatbot. Depending on the success
        of my experimentation with that platform, I will either continue to
        refine the experience or look into building an interactive prototype
        using Framer, a Javascript-based prototyping tool, or Twine, a tool used
        for creating non-linear text-based interactions
      </p>
      <p>
        Apart from research into the feasibility of various technologies, my
        discovery phase includes interviews will potential users. Subjects
        slated for interviews include coworkers and friends with experience in
        applying for various immigration statuses (such as work &amp; marriage
        visas, permanent residency, and naturalization), as well as an expert in
        refugee and immigrant resettlement. I aim to return to this base of
        users for subsequent rounds of usability testing once prototyping has
        commenced
      </p>
      <p>
        Overall, I hope to divide my prototyping process into three distinct
        phases. First, I aim to determine which input and response type is
        best-suited for both users and the type of immigration paperwork
        involved, whether it be a chatbot or simplified natural language form in
        the vein of Typeform. Secondly, I will experiment with different
        variations in question and answer format to determine how much
        information ought to be included in a system message and how best to
        sequence the questions asked. Lastly, given time, I hope to test
        variations in copywriting to give the form a user-friendly and
        approachable tone
      </p>
      <h2 id="expected-outcome">Expected Outcome</h2>
      <h3 id="goals">Goals</h3>
      <p>
        Of the types of conversational interfaces described above, my project
        will focus on a combination of natural language forms and a simple
        chatbot-style conversational UI. The prototype developed over the course
        of this project is intended to serve as a proof-of-concept to show that
        conversational interactions are a more effective and user-friendly way
        of filling out digital forms{" "}
      </p>
      <h3 id="scope">Scope</h3>
      <p>
        Due to the complex nature of the immigration paperwork, I intend to
        limit the scope of my project to the first stages of the N-400
        Naturalization Application process, using the Naturalization Eligibility
        worksheet (USCIS form M-480), its accompanying preparation documents
        (USCIS document G-1151), and the document checklist (M-477){" "}
      </p>
      <p>
        As most of the information gathered in the above forms is repeated in
        the N-400, the resulting prototype ought to cover the first half of the
        N-400 (which is comprised largely of biographical information), thereby
        reducing the need for redundant paperwork. While the prototype will be
        designed for mobile use and will be tested accordingly, I hope to
        develop it to function on desktop formats as well. d:
      </p>
    </Article>
  );
};
