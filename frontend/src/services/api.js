import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
  withCredentials: true, // This is KEY for CORS with cookies
  headers: {
    'Content-Type': 'application/json',
  }
});

// Get token from storage
const getToken = () => {
  return localStorage.getItem('token') || 
         document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Log for development (localhost only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    // Add token if exists
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Handle FormData requests
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log for development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log(`API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    // Network/CORS error
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please try again.');
      }
      
      if (error.message === 'Network Error') {
        console.error('Network/CORS Error!');
        console.error('Check if:');
        console.error('1. Backend is running on http://localhost:8000');
        console.error('2. You have CORS configured in backend');
        throw new Error('Cannot connect to server. Is backend running?');
      }
      
      throw new Error('Network error. Please check connection.');
    }
    
    // Server responded with error
    const { status, data } = error.response;
    let message = 'An error occurred';
    
    // Try to extract message from response
    if (data) {
      if (typeof data === 'string') {
        message = data;
      } else if (data.message) {
        message = data.message;
      } else if (data.error) {
        message = data.error;
      } else if (data.errors) {
        // Handle validation errors
        if (typeof data.errors === 'object') {
          const errors = Object.values(data.errors).flat();
          message = errors.join(', ');
        }
      }
    }
    
    // Handle specific status codes
    if (status === 401) {
      localStorage.removeItem('token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    const apiError = new Error(message);
    apiError.status = status;
    apiError.data = data;
    
    throw apiError;
  }
);

export default api;