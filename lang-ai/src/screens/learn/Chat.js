import React from 'react';
import { Box, Text, Flex, Avatar, Button } from '@chakra-ui/react';

const Chat = () => {
  return (
    <Box
      p={4}
      bg="white"
      borderRadius="lg"
      borderColor="gray.200"
      borderWidth="1px"
      maxH="100vh"
      overflowY="scroll"
      sx={{
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'gray.100',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'gray.300',
          borderRadius: '10px',
        },
      }}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold" fontSize="lg">
          Language Assistant
        </Text>
        <Button variant="link" fontSize="sm" color="blue.500">
          End Chat
        </Button>
      </Flex>
      <Flex pt={4} justifyContent="space-between">
        <Avatar
          size="md"
          name="Language Assistant"
          src="https://i.pravatar.cc/300?img=1"
        />
        <Box
          bg="gray.100"
          p={2}
          borderRadius="lg"
          maxW="75%"
          ml={2}
        >
          <Text fontSize="md">
            Hi there! I'm your language assistant. What would you like to talk
            about today?
          </Text>
        </Box>
      </Flex>
      <Flex pt={4} justifyContent="space-between">
        <Avatar
          size="md"
          name="You"
          src="https://i.pravatar.cc/300?img=2"
        />
        <Box
          bg="blue.500"
          p={2}
          borderRadius="lg"
          maxW="75%"
          mr={2}
        >
          <Text fontSize="md" color="white">
            I'm having trouble with the verb conjugation in Spanish.
          </Text>
        </Box>
      </Flex>
      <Flex pt={4} justifyContent="space-between">
        <Avatar
          size="md"
          name="Language Assistant"
          src="https://i.pravatar.cc/300?img=1"
        />
        <Box
          bg="gray.100"
          p={2}
          borderRadius="lg"
          maxW="75%"
          ml={2}
        >
          <Text fontSize="md">
            I'd be happy to help you with that! What specific verb are you
            having trouble with?
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Chat;
