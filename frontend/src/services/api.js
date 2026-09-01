import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT token for admin requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('swaraj_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// API Helper Functions
export const fetchServices = async (category = '') => {
  const response = await api.get('/services', { params: { category } });
  return response.data;
};

export const fetchServiceBySlug = async (slugOrId) => {
  const response = await api.get(`/services/${slugOrId}`);
  return response.data;
};

export const fetchJobs = async (department = '') => {
  const response = await api.get('/jobs', { params: { department } });
  return response.data;
};

export const fetchJobById = async (id) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
};

export const submitJobApplication = async (jobId, applicationData) => {
  const response = await api.post(`/jobs/${jobId}/apply`, applicationData);
  return response.data;
};

export const fetchCaseStudies = async (industry = '') => {
  const response = await api.get('/case-studies', { params: { industry } });
  return response.data;
};

export const fetchCaseStudyBySlug = async (slugOrId) => {
  const response = await api.get(`/case-studies/${slugOrId}`);
  return response.data;
};

export const fetchTestimonials = async () => {
  const response = await api.get('/testimonials');
  return response.data;
};

export const submitContactInquiry = async (inquiryData) => {
  const response = await api.post('/contact', inquiryData);
  return response.data;
};

export const sendChatMessage = async (message, history = []) => {
  const response = await api.post('/chatbot/chat', { message, history });
  return response.data;
};

// Admin API calls
export const adminLogin = async (username, password) => {
  const response = await api.post('/auth/login-json', { username, password });
  return response.data;
};

export const fetchAdminMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const fetchAdminInquiries = async () => {
  const response = await api.get('/contact');
  return response.data;
};

export const fetchInquiryById = async (id) => {
  const response = await api.get(`/contact/${id}`);
  return response.data;
};

export const updateInquiryStatus = async (id, statusStr) => {
  const response = await api.patch(`/contact/${id}/status`, null, { params: { status_str: statusStr } });
  return response.data;
};

export const deleteInquiry = async (id) => {
  const response = await api.delete(`/contact/${id}`);
  return response.data;
};

export const fetchAdminApplications = async () => {
  const response = await api.get('/jobs/admin/applications');
  return response.data;
};

export default api;
