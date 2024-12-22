import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Text,
  Heading,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useSafeAPI from '../components/fetch';
import  theme  from '../theme';

const CreateSyllabus = () => {
  const [step, setStep] = useState(0);
  const [language, setLanguage] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [experience, setExperience] = useState('');
  const [proposedSyllabus, setProposedSyllabus] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const safeAPI = useSafeAPI();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await safeAPI('/create_syllabus', {
      language: language,
      description: description,
      time: time,
      experience: experience
    });
    console.log(response);
    setLoading(false);
    if (response.message && response.message === 'Syllabus created') {
      toast({
        title: 'Syllabus created',
        description: 'Your syllabus has been created. You will be redirected to the progress page.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.href = "/progress/";
      }, 2000);
    } else {
      toast({
        title: 'Error creating syllabus',
        description: 'There was an error creating your syllabus. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    let proposedSyllabusE = `Language: ${language}\n\nDescription: ${description}\n\nTime: ${time}\n\nExperience: ${experience}`;
    setProposedSyllabus(proposedSyllabusE);
  }, [language, description, time, experience]);

  const steps = [
    {
      label: 'Step 1: Select a Language',
      content: (
        <>
          <Text
            fontSize="lg"
            fontWeight="semibold"
            mb={4}
          >
            Let's choose the language you're interested in learning. You could choose Spanish, Russian, Yapese, Klingon, whatever your desire...
          </Text>
          <FormLabel
            htmlFor="language"
            mb={2}
          >
            Type your desired language below
          </FormLabel>
          <Input
            id="language"
            type="text"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            variant="filled"
            borderRadius="md"
            placeholder="Enter language"
            _placeholder={{ color: theme.colors.text[500] }}
          />
        </>
      ),
    },
    {
      label: 'Step 2: Describe your experience',
      content: (
        <>
          <Text
            fontSize="lg"
            fontWeight="semibold"
            mb={4}
          >
            Describe your experience in the language... Specifically what you know, proficiency level, etc. This will help us identify your starting position.
          </Text>
          <FormLabel
            htmlFor="description"
            mb={2}
          >
            Experience
          </FormLabel>
          <Textarea
            id="description"
            value={experience}
            onChange={(event) => setExperience(event.target.value)}
            variant="filled"
            borderRadius="md"
            placeholder="Enter experience"
            _placeholder={{ color: theme.colors.text[500] }}
          />
        </>
      ),
    },
    {
      label: 'Step 3: Describe Your Learning Goals',
      content: (
        <>
          <Text
            fontSize="lg"
            fontWeight="semibold"
            mb={4}
          >
            Tell us a bit more about why you want to learn this language! Do you want to go to speak to natives? Do you want to converse in specific environments? Are you learning for business? School? etc.
          </Text>
          <FormLabel
            htmlFor="description"
            mb={2}
          >
            Learning Goals
          </FormLabel>
          <Textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            variant="filled"
            borderRadius="md"
            placeholder="Enter learning goals"
            _placeholder={{ color: theme.colors.text[500] }}
          />
        </>
      ),
    },
    {
      label: 'Step 4: Time Allotment ',
      content: (
        <>
          <Text
            fontSize="lg"
            fontWeight="semibold"
            mb={4}
          >
            Be realistic. How much time do you want to spend on learning this language? Will it be 15 minutes, an hour?
          </Text>
          <FormLabel
            htmlFor="description"
            mb={2}
          >
            Time
          </FormLabel>
          <Textarea
            id="description"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            variant="filled"
            borderRadius="md"
            placeholder="Enter time"
            _placeholder={{ color: theme.colors.text[500] }}
          />
        </>
      ),
    },
    {
      label: 'Step 4: Review Your Proposed Syllabus',
      content: (
        <>
          <Text
            fontSize="lg"
            fontWeight="semibold"
            mb={4}
          >
            Here is a summary of your proposed syllabus. Review the details before submitting.
          </Text>
          <Box
            p={4}
            bg="gray.100"
            borderRadius="md"
            placeholder="Your syllabus will appear here after submission."
            as="textarea"
            isReadOnly
            value={proposedSyllabus}
          />
          <Button
            type="submit"
            colorScheme="teal"
            onClick={handleSubmit}
            isLoading={loading}
            variant="solid"
            borderRadius="md"
          >
            Submit
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box
      p={4}
      bg={theme.colors.background[50]}
      borderRadius="md"
    >
      <Heading
        as="h3"
        size="lg"
        mb={6}
        fontWeight="semibold"
      >
        {steps[step].label}
      </Heading>

      {/* Show loading spinner if loading is true */}
      {loading ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Spinner
            size="xl"
            color={theme.colors.primary[500]}
          />
          <Text
            ml={4}
            fontSize="lg"
            fontWeight="semibold"
          >
            Submitting your syllabus...
          </Text>
        </Flex>
      ) : (
        <>
          <VStack
            spacing={4}
            align="flex-start"
          >
            {steps[step].content}
          </VStack>

          {/* Navigation Buttons */}
          <Flex
            mt={8}
            justifyContent="space-between"
          >
            <Button
              onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
              disabled={step === 0}
              colorScheme="teal"
              variant="outline"
              borderRadius="md"
              size="lg"
            >
              Back
            </Button>
            <Button
              onClick={() => setStep((prev) => Math.min(prev + 1, steps.length - 1))}
              disabled={step === steps.length - 1}
              colorScheme="teal"
              variant="solid"
              borderRadius="md"
              size="lg"
            >
              {step === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default CreateSyllabus;

