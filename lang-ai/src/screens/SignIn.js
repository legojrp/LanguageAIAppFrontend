// src/screens/SignIn.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data.success) {
          toast({
            title: 'Login successful.',
            description: "Welcome back!",
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          navigate('/progress'); // Navigate to the Progress screen
        } else {
          toast({
            title: 'Login failed.',
            description: data.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          title: 'Login failed.',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Box maxW="400px" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="md">
      <Heading as="h2" size="lg" textAlign="center" mb={6} color="primary.500">
        Sign In
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button 
          colorScheme="primary" 
          width="full" 
          isLoading={isLoading} 
          type="submit"
        >
          Sign In
        </Button>
      </form>
      <Text textAlign="center" mt={4}>
        Don't have an account? <Button variant="link" color="secondary.500" onClick={() => navigate("/sign-up")}>Sign Up</Button>
      </Text>
      <Text textAlign="center" mt={2}>
        <Button variant="link" color="secondary.500">Forgot Password?</Button>
      </Text>
    </Box>
  );
};

export default SignIn;
