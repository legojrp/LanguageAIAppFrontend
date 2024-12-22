import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, Spinner, RadioGroup, Radio, Stack } from '@chakra-ui/react';
import useSafeAPI from '../../components/fetch';
import { useParams, useNavigate } from 'react-router-dom';

// Utility function to shuffle an array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const Quiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const safeAPI = useSafeAPI();
  const { id, unit, subunit } = useParams();
  const navigate = useNavigate();

  const fetchQuiz = async () => {
    try {
      const response = await safeAPI('/get_quiz', {
        id: id,
        unit: unit,
        subunit: subunit,
      });
      const quizData = JSON.parse(response);
      // Randomize the options for each question
      quizData.content = quizData.content.map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }));
      setQuiz(quizData);
    } catch (error) {
      console.error('Failed to fetch quiz:', error);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (quiz) {
      setLoading(false);
    }
  }, [quiz]);

  const handleNext = () => {
    if (selectedAnswer === quiz.content[currentQuestion].options[0]) { // The first option is the correct one before shuffling
      setScore(score + 1);
    }
    if (currentQuestion < quiz.content.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(''); // Reset answer selection for the next question
    } else {
      setShowResults(true); // Show results after the last question
    }
  };

  const handleComplete = async () => {
    try {
      await safeAPI('/complete_quiz', {
        id: id,
        unit: unit,
        subunit: subunit,
        score: score,
      });
      navigate('/progress'); // Navigate to progress after completing quiz
    } catch (error) {
      console.error('Failed to complete quiz:', error);
    }
  };

  const handleRetake = () => {
    setShowResults(false);
    setCurrentQuestion(0);
    setScore(0);
  };

  if (loading) {
    return (
      <Box p={4} mt={4} borderRadius="md" boxShadow="md" bg="white">
        <Spinner thickness="4px" speed="0.65s" color="teal.500" size="xl" />
        <Text fontSize="lg" mt={4}>
          Generating quiz, please wait...
        </Text>
      </Box>
    );
  }

  if (!quiz || quiz.content.length === 0) {
    return (
      <Box p={4} mt={4} borderRadius="md" boxShadow="md" bg="white">
        <Text fontSize="lg">No quiz available.</Text>
      </Box>
    );
  }

  if (showResults) {
    return (
      <Box p={4} mt={4} borderRadius="md" boxShadow="md" bg="white" padding={"50px"}>
        <Heading as="h1" size="lg" mb={4}>
          Quiz Completed
        </Heading>
        <Text fontSize="lg" mb={4}>
          Your Score: {score} out of {quiz.content.length}
        </Text>
        <Button colorScheme="teal" onClick={handleComplete}>
          Complete Quiz and Submit Score
        </Button>
        <Button variant="outline" colorScheme="teal" mt={4} onClick={handleRetake}>
          Retake Quiz
        </Button>
      </Box>
    );
  }

  const { question, options } = quiz.content[currentQuestion];

  return (
    <Box p={4} mt={4} borderRadius="md" boxShadow="md" bg="white" padding={"50px"}>
      <Heading as="h1" size="lg" mb={4}>
        Quiz
      </Heading>
      <Text fontSize="lg" mb={4}>
        {question}
      </Text>
      <RadioGroup onChange={setSelectedAnswer} value={selectedAnswer}>
        <Stack direction="column">
          {options.map((option, index) => (
            <Radio key={index} value={option}>
              {option}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <Box display="flex" justifyContent="space-between" mt={6}>
        <Button colorScheme="teal" onClick={handleNext} isDisabled={!selectedAnswer}>
          {currentQuestion === quiz.content.length - 1 ? 'Submit Quiz' : 'Next Question'}
        </Button>
      </Box>
    </Box>
  );
};

export default Quiz;
