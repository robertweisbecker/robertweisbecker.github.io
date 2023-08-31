import {
  ButtonGroup,
  Image,
  Box,
  IconButton,
  Stack,
  Text,
  Container,
} from "@chakra-ui/react";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import { Pattern } from "./pattern";
import { ScrollButton } from "./scrollButton";

const Footer = () => {
  return (
    <Container
      maxW="container.lg"
      as="footer"
      role="contentinfo"
      borderTop="1px"
      borderColor="border"
      py={5}
    >
      <Stack spacing={{ base: "2", md: "5" }}>
        <Stack
          justify="space-between"
          direction={{ base: "column", md: "row" }}
          align="center"
        >
          {/* <Image
            h={{ base: 10, sm: 8 }}
            float="right"
            borderRadius="full"
            objectFit="contain"
            alt=""
            src="/assets/logo.png"
          /> */}
          <Text fontSize="2xs" color="subtle">
            &copy; {new Date().getFullYear()} Robert Weisbecker
          </Text>

          <ButtonGroup variant="ghost" size="md">
            <IconButton
              as="a"
              href="https://www.linkedin.com/in/robertweisbecker/"
              aria-label="LinkedIn"
              target="_blank"
              icon={<LinkedInLogoIcon />}
            />
            <IconButton
              as="a"
              href="https://github.com/robertweisbecker"
              aria-label="GitHub"
              target="_blank"
              icon={<GitHubLogoIcon />}
            />
            <IconButton
              as="a"
              href="https://read.cv/weisbecker"
              aria-label="read.cv"
              target="_blank"
              sx={{ "& svg": { transform: "rotate(15deg)" } }}
              icon={<ReaderIcon />}
            />
            <ScrollButton />
          </ButtonGroup>
        </Stack>
      </Stack>
      {/* <Pattern /> */}
    </Container>
  );
};

export default Footer;
