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
      const userIdCookie = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('user_id'))
        ?.split('=')[1];
    const tokenCookie = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('token'))
      ?.split('=')[1];

      if (userIdCookie) {
        request.user_id = userIdCookie;
      }
      if (tokenCookie) {
        request.token = tokenCookie;
      }
      
      const response = await api.post(endpoint, request);
      if (response.data.cookies) {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        document.cookie = `${Object.keys(response.data.cookies).map(
            (key) => `${key}=${response.data.cookies[key]}; expires=${date.toUTCString()}; path=/`,
        ).join('; ')}`;
      }
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
