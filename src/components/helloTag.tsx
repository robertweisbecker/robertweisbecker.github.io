import { Box, Heading, Text } from "@chakra-ui/react";

const HelloTag = () => {
  return (
    <Box
      position="absolute"
      minW="300px"
      left="20%"
      top="-20%"
      transform="rotate(20deg) scale(.75)"
      rounded="2xl"
      overflow="hidden"
      bg="red.500"
      border="2px"
      borderColor="blackAlpha.200"
      pb={4}
      boxShadow="2xl"
    >
      <Box py={2} textAlign="center">
        <Heading
          color="white"
          fontWeight="extrabold"
          fontSize="2xl"
          textTransform="uppercase"
          letterSpacing="widest"
          mb={1}
        >
          Hello
        </Heading>
        <Heading
          color="white"
          fontWeight="semibold"
          fontSize="md"
          textTransform="uppercase"
          letterSpacing="wide"
        >
          My name is
        </Heading>
      </Box>
      <Box p={4} minH={24} bg="white">
        <Text>Bob</Text>
      </Box>
    </Box>
  );
};
