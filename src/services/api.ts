import axios from 'axios';
import type { TripFormData, Itinerary, FollowUpResponse, WeatherData } from '../types';
import { API_BASE_URL } from '../constants';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 2 minutes for AI generation
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for clean error messages
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      'An unexpected error occurred. Please try again.';
    return Promise.reject(new Error(message));
  }
);

export const travelApi = {
  getFollowUpQuestions: async (formData: TripFormData): Promise<FollowUpResponse> => {
    const response = await apiClient.post<FollowUpResponse>('/travel/questions', formData);
    return response.data;
  },

  planTrip: async (formData: TripFormData): Promise<Itinerary> => {
    const response = await apiClient.post<Itinerary>('/travel/plan', formData);
    return response.data;
  },

  refineItinerary: async (itinerary: Itinerary, instruction: string): Promise<Itinerary> => {
    const response = await apiClient.post<Itinerary>('/travel/refine', {
      itinerary,
      instruction,
    });
    return response.data;
  },
};

export const weatherApi = {
  getWeather: async (destination: string): Promise<WeatherData> => {
    const response = await apiClient.get<WeatherData>('/weather', {
      params: { destination },
      timeout: 15000,
    });
    return response.data;
  },
};
