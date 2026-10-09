import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TripFormData, Itinerary, FollowUpQuestion, WeatherData } from '../../types';

export type AppStep = 'landing' | 'form' | 'questions' | 'generating' | 'result';

interface TripState {
  step: AppStep;
  formData: TripFormData | null;
  followUpQuestions: FollowUpQuestion[];
  followUpAnswers: Record<string, string>;
  itinerary: Itinerary | null;
  weather: WeatherData | null;
  isLoading: boolean;
  isWeatherLoading: boolean;
  error: string | null;
}

const initialState: TripState = {
  step: 'landing',
  formData: null,
  followUpQuestions: [],
  followUpAnswers: {},
  itinerary: null,
  weather: null,
  isLoading: false,
  isWeatherLoading: false,
  error: null,
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<AppStep>) => {
      state.step = action.payload;
    },
    setFormData: (state, action: PayloadAction<TripFormData>) => {
      state.formData = action.payload;
    },
    setFollowUpQuestions: (state, action: PayloadAction<FollowUpQuestion[]>) => {
      state.followUpQuestions = action.payload;
    },
    setFollowUpAnswer: (
      state,
      action: PayloadAction<{ questionId: string; answer: string }>
    ) => {
      state.followUpAnswers[action.payload.questionId] = action.payload.answer;
    },
    setItinerary: (state, action: PayloadAction<Itinerary>) => {
      state.itinerary = action.payload;
    },
    setWeather: (state, action: PayloadAction<WeatherData>) => {
      state.weather = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setWeatherLoading: (state, action: PayloadAction<boolean>) => {
      state.isWeatherLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetTrip: (state) => {
      state.step = 'landing';
      state.formData = null;
      state.followUpQuestions = [];
      state.followUpAnswers = {};
      state.itinerary = null;
      state.weather = null;
      state.isLoading = false;
      state.isWeatherLoading = false;
      state.error = null;
    },
    loadSavedTrip: (state, action: PayloadAction<Itinerary>) => {
      state.itinerary = action.payload;
      state.step = 'result';
    },
  },
});

export const {
  setStep,
  setFormData,
  setFollowUpQuestions,
  setFollowUpAnswer,
  setItinerary,
  setWeather,
  setLoading,
  setWeatherLoading,
  setError,
  resetTrip,
  loadSavedTrip,
} = tripSlice.actions;

export default tripSlice.reducer;
