import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to check if error is retryable
const isRetryableError = (error: AxiosError): boolean => {
  if (!error.response) {
    // Network errors (including socket hang up) are retryable
    return true;
  }
  
  // Retry on server errors (5xx) but not client errors (4xx)
  return error.response.status >= 500;
};

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000, // Increased timeout to 30 seconds
  headers: {
    'Content-Type': 'application/json',
    "Authorization":  `Bearer ${typeof window !== "undefined"? localStorage.getItem("token"):null}`
  },
  // Add keep-alive and connection reuse
  httpAgent: typeof window === 'undefined' ? require('http').Agent({ keepAlive: true }) : undefined,
  httpsAgent: typeof window === 'undefined' ? require('https').Agent({ keepAlive: true }) : undefined,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    if (config.url) {
      console.log(`🚀 Making request to: ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Handle successful responses
    console.log(`✅ Response received from: ${response.config.url}`, response.status);
    
    // You can dispatch a success action here if using Redux/Context
    return response;
  },
  (error: AxiosError) => {
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - redirect to login
          localStorage.removeItem('authToken');
          break;
        case 403:
          // Forbidden
          console.error('❌ Access forbidden');
          break;
        case 404:
          // Not found
          console.error('❌ Resource not found');
          break;
        case 500:
          // Server error
          console.error('❌ Server error occurred');
          break;
        default:
          console.error(`❌ HTTP error ${status}:`, data);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('❌ Network error - no response received:', error.code || 'Unknown network error');
    } else {
      // Something else happened
      console.error('❌ Request setup error:', error.message);
    }

    // You can dispatch an error action here if using Redux/Context
    return Promise.reject(error);
  }
);

// Retry wrapper function
const withRetry = async <T>(
  operation: () => Promise<AxiosResponse<T>>,
  retries: number = MAX_RETRIES
): Promise<AxiosResponse<T>> => {
  try {
    return await operation();
  } catch (error) {
    const axiosError = error as AxiosError;
    
    if (retries > 0 && isRetryableError(axiosError)) {
      console.log(`🔄 Retrying request... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
      await delay(RETRY_DELAY * (MAX_RETRIES - retries + 1)); // Exponential backoff
      return withRetry(operation, retries - 1);
    }
    
    throw error;
  }
};

// API service methods
export const apiService = {
  // GET request
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.get<T>(url, config);
  },

  // POST request
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.post<T>(url, data, config);
  },

  // PUT request
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return withRetry(() => api.put<T>(url, data, config));
  },

  // DELETE request
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return withRetry(() => api.delete<T>(url, config));
  },

  // PATCH request
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return withRetry(() => api.patch<T>(url, data, config));
  },
};

// Export the axios instance for direct use if needed
export default api;
