const BASE_URL = 'http://localhost:5067/api/auth';

const headers = {
  'Content-Type': 'application/json',
};

// Helper function to handle fetch requests
async function request(endpoint: string, method: string, body?: any) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error: any) {
    throw error;
  }
}

export const api = {
  register: (data: any) => request('/register', 'POST', data),
  
  verifyEmail: (data: { email: string; code: string }) => request('/verify-email', 'POST', data),
  
  login: (data: any) => request('/login', 'POST', data),
  
  forgotPassword: (data: { email: string }) => request('/forgot-password', 'POST', data),
  
  resetPassword: (data: any) => request('/reset-password', 'POST', data),
  
  googleLogin: (idToken: string) => request('/google', 'POST', { idToken }),
};