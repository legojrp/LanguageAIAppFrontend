// lang-ai/src/hooks/useSafeAPI.js
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Your API base URL
});

const useSafeAPI = () => {
  const toast = useToast();

  const safeAPI = async (endpoint, request = {}, customErrorMessage = null) => {
    try {
      const response = await api.post(endpoint, request);
      return response.data;
    } catch (error) {
      const message = customErrorMessage || error?.response?.data?.message || 'An error occurred';
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      throw error;
    }
  };

  return safeAPI;
};

export default useSafeAPI;
