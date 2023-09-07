import { FC, useId } from "react";

import {
	Stack,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	IconButton,
	Image,
	Heading,
	Text,
	Box,
	DarkMode,
	useDisclosure,
	ModalHeader,
	VisuallyHidden,
} from "@chakra-ui/react";

import { ZoomInIcon, Cross2Icon } from "@radix-ui/react-icons";
import { sizes } from "../theme/proTheme/foundations";

interface ImageProps {
	src: string;
	src2?: string;
	caption?: string;
	full?: boolean;
}

export const ImageModal: FC<ImageProps> = ({ src, src2, caption, full }) => {
	const modalId = useId();
	const captionId = useId();
	const buttonId = useId();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const customClose = (
		<DarkMode>
			<IconButton
				as={ModalCloseButton}
				icon={<Cross2Icon />}
				variant="outline"
				aria-label="Close"
				position="absolute"
				boxShadow="lg"
				right={{ base: "50%", md: "0" }}
				top={{ base: "auto", md: "0" }}
				bottom={{ base: -12, md: "auto" }}
				transform={{ base: "translateX(50%)", md: "unset" }}
				isRound
			/>
		</DarkMode>
	);
	return (
		<Stack mx={full ? "-4" : 0}>
			<Box
				position="relative"
				borderRadius="2xl"
				borderWidth="1px"
				bg="bg-subdued"
				borderColor="border-subdued"
				_dark={{ bg: "bg-subdued" }}
				overflow="hidden"
				w={full ? "100vw" : "auto"}
				maxW={full ? "container.lg" : "100%"}>
				<Image src={src} />

				<IconButton
					id={buttonId}
					onClick={onOpen}
					aria-label="View fullscreen image"
					size="sm"
					boxShadow="md"
					variant="outline"
					position="absolute"
					// borderEndRadius="0"
					// borderEndEndRadius="12px"
					bottom="3"
					right="3"
					sx={{
						"& > svg": {
							boxSize: "1.5em",
							// color: "text-muted",
						},
					}}
					icon={<ZoomInIcon />}
					zIndex="docked"
				/>
			</Box>
			<Text textStyle="caption" textAlign="center" maxW="prose" id={captionId}>
				{caption}
			</Text>

			<Modal isOpen={isOpen} onClose={onClose} allowPinchZoom id={modalId} size="6xl">
				<ModalOverlay bg="surface-frosted" backdropFilter="auto" backdropBlur="md" />
				<ModalContent p={{ md: "4" }} boxShadow="none" bg="transparent">
					<ModalHeader p="0">
						<VisuallyHidden>Image</VisuallyHidden>
						{customClose}
					</ModalHeader>
					<ModalBody p="0" border="1px" borderColor="border-subdued" overflow="hidden" borderRadius="2xl">
						<Image borderRadius="lg" objectFit="contain" src={src2 ? src2 : src} alt="caption" />
					</ModalBody>
					<ModalFooter p="0" display="flex" flexDirection="column">
						{caption && (
							<Text mt="2" borderRadius="full" textStyle="caption" mx="auto" color="emphasis">
								{caption}
							</Text>
						)}
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Stack>
	);
};
