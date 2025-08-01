// src/screens/Progress.js
import React, { useState, useEffect } from 'react';
import { Box, Heading, Flex, Select, Collapse, Spinner, Text, Button } from '@chakra-ui/react';
import useSafeAPI from '../components/fetch';
import { Route } from 'react-router-dom';
import theme  from '../theme';

// Top bar with language switcher
const TopBar = ({ selectedLanguage, setSelectedLanguage, syllabi }) => {
  return (
    <Flex bg={theme.colors.primary[500]} p={4} justify="space-between" alignItems="center" color="white">
      <Heading as="h3" size="lg">
        Language Progress
      </Heading>
      <Select
        bg={theme.colors.white}
        color={theme.colors.black}
        maxWidth="300px"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >

        {syllabi.map((syllabus) => (
          <option key={syllabus.name} value={syllabus.name}>
            {syllabus.name} - {syllabus.language}
          </option>
        ))}
        {/* Add more languages as needed */}
      </Select>
        <Button
          onClick={() => {
            window.location.href = "/progress/create-syllabus";
          }}
          variant="ghost"
          colorScheme={theme.colors.primary[500]}
          size="sm"
          p={2}
        >
          +
        </Button>
    </Flex>
  );
};

// Island component
const Island = ({ title, completed, id, lessons = [], show = true, onClick, onClickLesson }) => {
  return (
    <Flex direction="column" alignItems="center" mb={4} position="relative">
      <Box
        onClick={onClick}
        bg={completed ? theme.colors.green[400] : theme.colors.gray[300]}
        borderRadius="md"
        p={6}
        textAlign="center"
        color="white"
        fontWeight="bold"
        fontSize="lg"
        width="500px"
        height="50px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
        zIndex={1}
      >
        {title}
      </Box>

      <Collapse in={show} unmountOnExit>
        <Flex direction="row" alignItems="center" mb={4} position="relative" justifyContent="center">
          <VerticalPath isCompleted={completed} height="160px" />
          <Box width="20px" />
          <Flex key={id} direction="column" alignItems="flex-start" mb={4} position="relative">
            {show &&
              lessons.map((lesson) => (
                <Box key={lesson.type} bg={lesson.completed ? theme.colors.green[200] : theme.colors.gray[200]} p={2} mt={2} onClick={() => onClickLesson(id, lesson)}>
                  {`${lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)} ${lesson.subunit} - ${lesson.topic}`}
                </Box>
              ))}
          </Flex>
        </Flex>
      </Collapse>
    </Flex>
  );
};

// Vertical Path connecting islands (like ladder steps)
const VerticalPath = ({ isCompleted, height }) => (
  <Box
    width="4px"
    height={height || '80px'}
    bg={isCompleted ? theme.colors.green[400] : theme.colors.gray[300]}
    borderRadius="md"
    margin="0 auto" // Center the path between islands
  />
);

const Progress = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [activeIsland, setActiveIsland] = useState(null);
  const [islandsData, setIslandsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [syllabi, setSyllabi] = useState([]);
  const [syllabusID, setSyllabusID] = useState(null);


  const safeAPI = useSafeAPI();
  
  const handleSyllabusRequest = async () => {
    try {
      const response = await safeAPI('/get_syllabus', { name : selectedLanguage });
      
      console.log(response);
      if (response.message && response.message === 'Syllabus not found') {
      window.location.href = "/progress/create-syllabus/";
      }
      setIslandsData(JSON.parse(response).syllabus ?? []);
      setSyllabusID(JSON.parse(response)._id.$oid ?? null);
    } catch (error) {
      console.error('Failed to fetch syllabus:', error);
    }
  };

  const handleSelectSyllabus = async (id) => {
    try {
      const response = await safeAPI('/get_user_syllabi', {});
      console.log(response);
      setSyllabi(JSON.parse(response) ?? [{name:"Unable to get syllabi", language:"None"}]);
      
    } catch (error) {
      console.error('Failed to fetch syllabus:', error)
      setSyllabi([{name:"Unable to get syllabi", language:"None"}]);
    } 
  }

  const onClickLesson = (id, lesson) => {
    console.log(id, lesson);
    window.location.href = `/learn/${syllabusID}/${id}/${lesson.subunit}`
  }
  useEffect(() => {
    handleSyllabusRequest();
  }, [selectedLanguage]);

  useEffect(() => {
    handleSelectSyllabus();
  }, []);

  useEffect(() => {
    console.log(syllabi);
  }, [syllabi]);

  return (
    <Box>
      {/* Top Bar with Language Switching */}
      <TopBar selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} syllabi={syllabi}/>

      {/* Scrollable Progress Area */}
      <Box p={4} overflowY="scroll" maxHeight="80vh">
        {loading && (
          <Flex justifyContent="center" alignItems="center">
            <Spinner size="xl" />
          </Flex>
        )}
        {error && (
          <Flex justifyContent="center" alignItems="center">
            <Text color="red.500">{error}</Text>
          </Flex>
        )}
        {!loading && !error && (
          <Flex direction="column" alignItems="center">
            {islandsData.map((island, index) => (
              <Flex direction="column" alignItems="center" mb={4} position="relative">
                <Island
                  key={island.unit}
                  title={`Unit ${island.unit} - ${island.title}`}
                  completed={island.completed}
                  id={island.unit}
                  lessons={island.subunits}
                  show={activeIsland === island.unit}
                  onClick={() => setActiveIsland(activeIsland === island.unit ? null : island.unit)}
                  onClickLesson={onClickLesson}
                />
                {/* Render a path if there's a next island */}
                {index < islandsData.length - 1 && <VerticalPath isCompleted={islandsData[index].completed} />}
              </Flex>
            ))}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Progress;

