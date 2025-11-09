/**
 * API Client for SkillSense HR Dashboard
 * Axios instance with authentication and error handling
 */
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hr_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('hr_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// API endpoints
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  getMe: () =>
    api.get('/auth/me'),
};

export const hrAPI = {
  getAllCandidates: () =>
    api.get('/hr/candidates'),

  getCandidateProfile: (submissionId: string) =>
    api.get(`/hr/candidates/${submissionId}`),

  matchCandidates: (jobDescription: string, topN?: number) =>
    api.post('/hr/match-candidates', { job_description: jobDescription, top_n: topN }),

  getSummary: () =>
    api.get('/hr/summary'),
};
