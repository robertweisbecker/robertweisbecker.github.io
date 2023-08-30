import { FC, useId } from "react";

import {
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  IconButton,
  Image,
  Center,
  Text,
  Tooltip,
  Box,
  useDisclosure,
  ModalHeader,
  VisuallyHidden,
} from "@chakra-ui/react";

import { ZoomInIcon } from "@radix-ui/react-icons";
import { sizes } from "../theme/proTheme/foundations";

interface ImageProps {
  src: string;
  src2?: string;
  caption?: string;
}

export const ImageModal: FC<ImageProps> = ({ src, src2, caption }) => {
  const modalId = useId();
  const captionId = useId();
  const buttonId = useId();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Stack my="2">
      <Box position="relative">
        <Image src={src} borderRadius="xl" bg="blackAlpha.100" />

        <IconButton
          id={buttonId}
          onClick={onOpen}
          aria-label="View fullscreen image"
          size="sm"
          color="muted"
          variant="neutral"
          position="absolute"
          right={4}
          bottom={4}
          boxShadow="md"
          sx={{
            "& > svg": {
              boxSize: "1.5em",
              color: "muted",
            },
          }}
          icon={<ZoomInIcon />}
          zIndex="docked"
        />
      </Box>
      <Text textStyle="caption" id={captionId}>
        {caption}
      </Text>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        allowPinchZoom
        id={modalId}
        size="6xl"
      >
        <ModalOverlay bg="blackAlpha.900" />
        <ModalContent
          mx="5vw"
          aria-describedby={captionId}
          bg="transparent"
          boxShadow="none"
        >
          <ModalHeader>
            <VisuallyHidden>Image</VisuallyHidden>
          </ModalHeader>
          <ModalCloseButton
            rounded="full"
            right={-4}
            top={4}
            boxShadow="md"
            bg="bg-canvas"
            _hover={{
              bg: "bg-muted",
              boxShadow: "lg",
            }}
          />

          <ModalBody p={0}>
            <Image
              mx="auto"
              objectFit="contain"
              boxShadow="inner"
              // maxH="80dvh"
              // w="auto"
              borderRadius="lg"
              src={src2 ? src2 : src}
              alt="caption"
            />
          </ModalBody>
          {caption && (
            <ModalFooter
              fontSize="sm"
              justifyContent="center"
              textAlign="center"
              color="white"
            >
              {caption}
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </Stack>
  );
};
