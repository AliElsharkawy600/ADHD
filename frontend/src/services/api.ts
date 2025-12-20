import axios, { AxiosError } from 'axios';

const BASE_URL = 'http://localhost:5067/api/auth';

// Create an Axios instance
const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // You can add timeout here if needed
  timeout: 10000, 
});

// Helper function to extract error message from Axios response
// This ensures the UI receives a simple error message string as it expects
const handleRequest = async (request: Promise<any>) => {
  try {
    const response = await request;
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message;
      // Throw a standard Error object with the message from the backend
      throw new Error(serverMessage || error.message || 'Something went wrong');
    }
    throw error;
  }
};

export const api = {
  register: (data: any) => 
    handleRequest(client.post('/register', data)),
  
  verifyEmail: (data: { email: string; code: string }) => 
    handleRequest(client.post('/verify-email', data)),
  
  login: (data: any) => 
    handleRequest(client.post('/login', data)),
  
  forgotPassword: (data: { email: string }) => 
    handleRequest(client.post('/forgot-password', data)),
  
  resetPassword: (data: any) => 
    handleRequest(client.post('/reset-password', data)),
  
  googleLogin: (idToken: string) => 
    handleRequest(client.post('/google', { idToken })),
};