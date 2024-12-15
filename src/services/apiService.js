import { API_ENDPOINTS } from '../config/api';

class ApiService {
  async checkStatus() {
    try {
      const response = await fetch(API_ENDPOINTS.status);
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async analyzeKeyword(keyword) {
    try {
      const response = await fetch(API_ENDPOINTS.analyze, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Analysis failed. Please try again.');
      }

      return response.json();
    } catch (error) {
      throw new Error(
        error.message || 'Failed to connect to the server. Please make sure the API server is running.'
      );
    }
  }
}

export const apiService = new ApiService();