import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, Spinner, IconButton} from '@chakra-ui/react';
import useSafeAPI from '../../components/fetch';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Lesson = () => {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const safeAPI = useSafeAPI();
  const { id, unit, subunit } = useParams();

  const fetchLesson = async () => {
    try {
      const response = await safeAPI('/get_lesson', {
        id: id,
        unit: unit,
        subunit: subunit,
      });
      const lessonData = JSON.parse(response);
      // Process content to ensure it's marked down and formatted
      lessonData.content = lessonData.content.map((slide) => ({
        ...slide,
        content: marked(slide.content).replace(/\n/g, '<br />'),
      }));
      setLesson(lessonData);
    } catch (error) {
      console.error('Failed to fetch lesson:', error);
    }
  };

  useEffect(() => {
    fetchLesson();
  }, []);

  useEffect(() => {
    if (lesson) {
      setLoading(false);
    }
  }, [lesson]);

  const handleNext = () => {
    if (currentSlide < lesson.content.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleComplete = async () => {
    try {
      await safeAPI('/complete_lesson', {
        id: id,
        unit: unit,
        subunit: subunit,
      });
      window.location.href = `/progress`;
    } catch (error) {
      console.error('Failed to complete lesson:', error);
    }
  };

  if (loading) {
    return (
      <Box
        p={4}
        mt={4}
        borderRadius="md"
        boxShadow="md"
        bg="white"
        className="lesson"
      >
        <Spinner thickness="4px" speed="0.65s" color="teal.500" size="xl" />
        <Text fontSize="lg" mt={4}>
          Generating lesson, please wait...
        </Text>
      </Box>
    );
  }

  if (!lesson || lesson.content.length === 0) {
    return (
      <Box p={4} mt={4} borderRadius="md" boxShadow="md" bg="white" className="lesson">
        <Text fontSize="lg">No content available.</Text>
      </Box>
    );
  }

  const { title, content } = lesson.content[currentSlide];

  return (
    <Box
      p={4}
      mt={4}
      borderRadius="md"
      boxShadow="md"
      bg="white"
      className="lesson"
      padding={"50px"}
    >
      <Heading as="h1" size="lg" mb={2}>
        {title}
      </Heading>
      <Box sx={{ '& h1': { fontSize: '24px', fontWeight: 'bold' }, '& h2': { fontSize: '18px', fontWeight: 'bold' }, '& h3': { fontSize: '16px', fontWeight: 'bold' }, '& p': { fontSize: '16px' },  }}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Box>
      <Box display="flex" justifyContent="space-between" mt={4}>
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={handlePrev}
          isDisabled={currentSlide === 0}
          aria-label="Previous Slide"
          colorScheme="teal"
        />
        { currentSlide === lesson.content.length - 1 ? (
          <Button colorScheme="teal" variant="solid" size="sm" onClick={handleComplete}>
            Complete Lesson
          </Button>
        ) : (
          <Button colorScheme="teal" variant="outline" size="sm" onClick={handleNext} isDisabled={currentSlide === lesson.content.length - 1}>
            Next Slide
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Lesson;

