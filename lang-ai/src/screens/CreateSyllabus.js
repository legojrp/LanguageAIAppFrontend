import { Box, Button, Flex, FormLabel, Input, Textarea, VStack, Text, Heading, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useSafeAPI from '../components/fetch';

const CreateSyllabus = () => {
  const [step, setStep] = useState(0);
  const [language, setLanguage] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [experience, setExperience] = useState('');
  const [proposedSyllabus, setProposedSyllabus] = useState('');

  const safeAPI = useSafeAPI();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await safeAPI('/create_syllabus', {
      language: language,
      description: description,
      time: time,
      experience: experience
    });
    console.log(response);
    if (response.message && response.message === 'Syllabus created') {
      window.location.href = "/progress/";
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
          <Text>Let's choose the language you're interested in learning. You could choose Spanish, Russian, Yapese, Klingon, what ever your desire...</Text>
          <FormLabel htmlFor="language">Type your desired language below</FormLabel>
          <Input id="language" type="text" value={language} onChange={(event) => setLanguage(event.target.value)} />
        </>
      ),
    },
    {
      label: 'Step 2: Describe your experience',
      content: (
        <>
          <Text>Describe your experience in the language... Specifically what you know, proficiency level, etc. This will help us identify your starting position.</Text>
          <FormLabel htmlFor="description">Experience</FormLabel>
          <Textarea
            id="description"
            value={experience}
            onChange={(event) => setExperience(event.target.value)}
          />
        </>
      ),
    },
    {
      label: 'Step 3: Describe Your Learning Goals',
      content: (
        <>
          <Text>Tell us a bit more about why you want to learn this language! Do you want to go to speak to natives? Do you want to converse in specific environments? Are you learning for business? School? etc.</Text>
          <FormLabel htmlFor="description">Learning Goals</FormLabel>
          <Textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </>
      ),
    },
    {
      label: 'Step 4: Time Allotment ',
      content: (
        <>
          <Text>Be realistic. How much time do you want to spend on learning this language? Will it be 15 minutes, an hour?</Text>
          <FormLabel htmlFor="description">Time</FormLabel>
          <Textarea
            id="description"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          />
        </>
      ),
    },
    {
      label: 'Step 4: Review Your Proposed Syllabus',
      content: (
        <>
          <Text>Here is a summary of your proposed syllabus. Review the details before submitting.</Text>
          <Box
            p={4}
            bg="gray.100"
            borderRadius="md"
            placeholder="Your syllabus will appear here after submission."
            as="textarea"
            isReadOnly
            value={proposedSyllabus}
          />
          <Button type="submit" colorScheme="teal" onClick={handleSubmit}>
            Submit
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box p={4}>
      <Heading as="h3" size="lg" mb={6}>
        {steps[step].label}
      </Heading>

      <VStack spacing={4} align="flex-start">
        {steps[step].content}
      </VStack>

      {/* Navigation Buttons */}
      <Flex mt={8} justifyContent="space-between">
        <Button
          onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
          disabled={step === 0}
          colorScheme="teal"
          variant="outline"
        >
          Back
        </Button>
        <Button
          onClick={() => setStep((prev) => Math.min(prev + 1, steps.length - 1))}
          disabled={step === steps.length - 1}
          colorScheme="teal"
        >
          {step === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Flex>
    </Box>
  );
};

export default CreateSyllabus;
