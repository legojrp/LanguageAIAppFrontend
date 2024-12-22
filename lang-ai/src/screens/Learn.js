import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import  theme  from '../theme';
import { Flex, Text, Spinner } from '@chakra-ui/react';
import useSafeAPI from '../components/fetch';
import Chat from './learn/Chat';
import Lesson from './learn/Lesson';
import Quiz from './learn/Quiz';


const Learn = () => {
    const { id, unit, subunit } = useParams();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);

    const safeAPI = useSafeAPI();

    const getLesson = async () => {
        try {
            const response = await safeAPI('/get_subunit', {
              id : id,
              unit : unit,
              subunit : subunit 
            });
            let resp = JSON.parse(response);
            setLesson(resp);
        } catch (error) {
            console.error('Failed to fetch lesson:', error);
            return null;
        }
    };

    useEffect(() => {
        getLesson();
    }, []);

    useEffect(() => {
        console.log(typeof lesson);
        console.log(lesson && lesson.type);

        if (lesson){
            console.log(lesson.type);
        }
        if (lesson && lesson.type) {
            setLoading(false);
        }
    }, [lesson]);

    if (loading) {
        return <>
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
            Loading...
          </Text>
        </Flex>
        </>;
      }
    
      // Now you can use the lesson variable to determine the screen to render
     
      switch (lesson.type) {
        case 'chat':
          return <Chat />;
        case 'lesson':
          return <Lesson />;
        case 'quiz':
          return <Quiz />;
        default:
          return <div>Unknown lesson type</div>;
      }
};

export default Learn;
