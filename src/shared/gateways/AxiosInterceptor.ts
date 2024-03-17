import api from './AxiosInstance';

// Request interceptor
api.interceptors.request.use(
  config => {
    // Modify the request config here (e.g., add authentication token)
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  response => {
    // Modify the response data here
    return response;
  },
  error => {
    // Handle errors globally (e.g., redirect to login for unauthorized requests)
    return Promise.reject(error);
  },
);

export default api;
