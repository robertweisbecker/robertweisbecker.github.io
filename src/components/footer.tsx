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
  InstagramLogoIcon,
} from "@radix-ui/react-icons";
import { Pattern } from "./pattern";
import { ScrollButton } from "./scrollButton";

const Footer = () => {
  return (
    <Container
      maxW="container.lg"
      as="footer"
      role="contentinfo"
      py={{ base: "12", md: "16" }}
    >
      <Stack spacing={{ base: "2", md: "5" }}>
        <Stack justify="space-between" direction="row" align="center">
          <Image
            h={{ base: 10, sm: 8 }}
            float="right"
            borderRadius="full"
            objectFit="contain"
            alt=""
            src="app/public/assets/durve2.png"
          />

          <ButtonGroup variant="ghost" size="md">
            <IconButton
              as="a"
              href="#"
              aria-label="LinkedIn"
              icon={<LinkedInLogoIcon />}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="GitHub"
              icon={<GitHubLogoIcon />}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="Twitter"
              icon={<InstagramLogoIcon />}
            />
            <ScrollButton />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" color="fg.subtle">
          &copy; {new Date().getFullYear()} Robert Weisbecker. All rights
          reserved.
        </Text>
      </Stack>
      {/* <Pattern /> */}
    </Container>
  );
};

export default Footer;
