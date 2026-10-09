import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import type { RootState, AppDispatch } from '../store';
import {
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
} from '../store/slices/tripSlice';
import { travelApi, weatherApi } from '../services/api';
import type { TripFormData } from '../types';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector(selector);

export const useTripPlanner = (navigate?: NavigateFunction) => {
  const dispatch = useAppDispatch();
  const tripState = useAppSelector((state) => state.trip);

  const submitForm = useCallback(
    async (formData: TripFormData) => {
      dispatch(setFormData(formData));
      dispatch(setLoading(true));
      dispatch(setError(null));

      try {
        const result = await travelApi.getFollowUpQuestions(formData);
        if (result.needsFollowUp && result.questions.length > 0) {
          dispatch(setFollowUpQuestions(result.questions));
          dispatch(setStep('questions'));
          navigate?.('/questions');
        } else {
          dispatch(setFollowUpQuestions([]));
          await generateItinerary(formData, {});
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to process your trip details.';
        dispatch(setError(message));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, navigate]
  );

  const submitFollowUpAnswers = useCallback(
    async (answers: Record<string, string>) => {
      if (!tripState.formData) return;

      dispatch(setLoading(true));
      dispatch(setError(null));

      const enrichedData: TripFormData = {
        ...tripState.formData,
        followUpAnswers: answers,
      };

      await generateItinerary(enrichedData, answers);
    },
    [tripState.formData, dispatch, navigate]
  );

  const generateItinerary = useCallback(
    async (formData: TripFormData, answers: Record<string, string>) => {
      dispatch(setStep('generating'));
      dispatch(setLoading(true));
      dispatch(setError(null));

      const enrichedData: TripFormData = {
        ...formData,
        followUpAnswers: answers,
      };

      try {
        // Fetch weather in parallel
        fetchWeather(formData.destination);

        const itinerary = await travelApi.planTrip(enrichedData);
        dispatch(setItinerary(itinerary));
        dispatch(setStep('result'));
        navigate?.('/result');
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Something went wrong while creating your itinerary. Please try again.';
        dispatch(setError(message));
        dispatch(setStep('form'));
        navigate?.('/plan');
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, navigate]
  );

  const fetchWeather = useCallback(
    async (destination: string) => {
      dispatch(setWeatherLoading(true));
      try {
        const weather = await weatherApi.getWeather(destination);
        dispatch(setWeather(weather));
      } catch (err) {
        console.warn('Weather fetch failed:', err);
      } finally {
        dispatch(setWeatherLoading(false));
      }
    },
    [dispatch]
  );

  const refineItinerary = useCallback(
    async (instruction: string) => {
      if (!tripState.itinerary) return;

      dispatch(setLoading(true));
      dispatch(setError(null));

      try {
        const refined = await travelApi.refineItinerary(tripState.itinerary, instruction);
        dispatch(setItinerary(refined));
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Failed to refine your itinerary. Please try again.';
        dispatch(setError(message));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [tripState.itinerary, dispatch]
  );

  return {
    tripState,
    submitForm,
    submitFollowUpAnswers,
    refineItinerary,
    fetchWeather,
    dispatch,
    actions: {
      setStep,
      setError,
      resetTrip,
      loadSavedTrip,
      setFollowUpAnswer,
    },
  };
};
