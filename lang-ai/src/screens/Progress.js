// src/screens/Progress.js
import React, { useState } from 'react';
import { Box, Heading, Flex, Menu, MenuButton, MenuList, MenuItem, Button, IconButton, Select, Fade, Slide, Collapse} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useSafeAPI } from '../components/fetch';


// Top bar with language switcher
const TopBar = ({ selectedLanguage, setSelectedLanguage }) => {
  return (
    <Flex bg="teal.500" p={4} justify="space-between" alignItems="center" color="white">
      <Heading as="h3" size="lg">
        Language Progress
      </Heading>
      <Select
        bg="white"
        color="black"
        maxWidth="200px"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        <option value="english">English</option>
        <option value="spanish">Spanish</option>
        <option value="french">French</option>
        {/* Add more languages as needed */}
      </Select>
    </Flex>
  );
};

// Island component
const Island = ({ title, completed, id, lessons = [], show = true, onClick}) => {
  return (
    <>
    <Flex direction="column" alignItems="center" mb={4} position="relative">
    <Box onClick={onClick}
      bg={completed ? 'green.400' : 'gray.300'}
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
        <Flex direction="row" alignItems="center" mb={4} position="relative" justifyContent={"center"}>
        <VerticalPath isCompleted={completed} height="160px"/>
        <Box width="20px"/>
          <Flex key={id} direction="column" alignItems="flex-start" mb={4} position="relative">
            {show && lessons.map((lesson) => (
              <Box key={lesson.id} bg={lesson.completed ? 'green.200' : 'gray.200'} p={2} mt={2}>
                {"Lesson " + lesson.lesson + " - " + lesson.topic}
              </Box>
            ))}
          </Flex>
        </Flex>
      </Collapse>
    </Flex>
    </>
  );
};

// Vertical Path connecting islands (like ladder steps)
const VerticalPath = ({ isCompleted, height}) => (
  <Box
    width="4px"
    height={height || '80px'}
    bg={isCompleted ? 'green.400' : 'gray.300'}
    borderRadius="md"
    margin="0 auto" // Center the path between islands
  />
);



const Progress = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [activeIsland, setActiveIsland] = useState(null);

  const [islandsData, setIslandsData] = useState([]);

  useSafeGetSyllabus = useSafeAPI();
  const handleRequest = async () => {
    const response = await useSafeGetSyllabus(
      `/get_syllabus`,
      { language: selectedLanguage },
    );
    console.log(response);
    setIslandsData(response.syllabus ?? []);
  };




  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/get_syllabus`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ language: selectedLanguage }),
  //     });
  //     const data = JSON.parse(await response.json());

  //     setIslandsData(data.syllabus ?? []);
      
  //     console.log(data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  React.useEffect(() => {
    handleRequest();
  }, []);

  return (
    <Box>
      {/* Top Bar with Language Switching */}
      <TopBar selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />

      {/* Scrollable Progress Area */}
      <Box p={4} overflowY="scroll" maxHeight="80vh">
        <Flex direction="column" alignItems="center">
          {islandsData.map((island, index) => (
            <Flex key={island.id} direction="column" alignItems="center" mb={4} position="relative">
              <Island title={"Unit " + island.unit + " - " + island.title} completed={island.completed} id={island.unit} lessons={island.subunits} show={activeIsland === island.unit} onClick={() => setActiveIsland(activeIsland === island.unit ? null : island.unit)} />

              {/* Render a path if there's a next island */}
              {index < islandsData.length - 1 && (
                <VerticalPath isCompleted={islandsData[index].completed} />
              )}
            </Flex>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Progress;
