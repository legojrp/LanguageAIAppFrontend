// src/screens/SignUp.js
import React, { useState } from 'react';
import { Box, Button, Input, Heading, Flex, Text, FormControl, FormLabel } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For API call (you can replace this with fetch if preferred)

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null); // For handling errors
  const navigate = useNavigate();

  // Placeholder for making the API call to your backend
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match!"); // Set error message
      return;
    }

    // Clear previous error
    setError(null);

    try {
      // Make the API call to register the user
      const response = await axios.post('http://localhost:5000/signup', {
        name,
        email,
        password,
      });

      // Handle success (you can customize this depending on your API's response)
      if (response.status === 201) {
        console.log('User registered successfully:', response.data);
        if (response.data.cookies) {
            const date = new Date();
            date.setDate(date.getDate() + 7);
            Object.keys(response.data.cookies).forEach((key) => {
              document.cookie = `${key}=${response.data.cookies[key]}; expires=${date.toUTCString()}; path=/`;
            });
          }
        // Redirect to progress page after successful sign-up
        navigate('/progress');
      } else {
        // Handle non-201 responses
        setError('Failed to sign up. Please try again.');
      }
    } catch (error) {
      // Handle API errors (network issues, server errors, etc.)
      console.error('Sign-up error:', error);
      setError('An error occurred during sign-up. Please try again.');
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" bg="background.50">
      <Box
        maxW="md"
        w="full"
        p={8}
        borderRadius="md"
        boxShadow="lg"
        bg="white"
        borderWidth={1}
        borderColor="gray.200"
      >
        <Heading as="h2" mb={6} textAlign="center" color="primary.500">
          Sign Up
        </Heading>

        <FormControl mb={4}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <FormControl mb={6}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>

        {error && (
          <Text color="primary.500" mb={4}>
            {error}
          </Text>
        )}

        <Button
          colorScheme="primary"
          size="lg"
          w="full"
          onClick={handleSignUp}
        >
          Sign Up
        </Button>

        <Text mt={4} textAlign="center">
          Already have an account?{' '}
          <Button
            variant="link"
            colorScheme="primary"
            onClick={() => navigate('/sign-in')}
          >
            Sign In
          </Button>
        </Text>
      </Box>
    </Flex>
  );
};

export default SignUp;

