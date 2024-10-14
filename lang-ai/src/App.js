// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use 'Routes' instead of 'Switch'
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import { Box } from '@chakra-ui/react';
import Progress from './screens/Progress';

const App = () => {
  return (
    <Router>
      <Box p={4}>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/progress" element={<Progress />} />

        </Routes>
      </Box>
    </Router>
  );
};

export default App;
