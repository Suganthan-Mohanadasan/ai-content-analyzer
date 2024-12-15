// Use window.env for production or import.meta.env for development
const getEnvVariable = (key) => {
  return import.meta.env[key] || window.env?.[key];
};

export const API_URL = getEnvVariable('VITE_API_URL') || 'http://localhost:3000';

export const API_ENDPOINTS = {
  analyze: `${API_URL}/api/analyze`,
  status: `${API_URL}/api/status`
};