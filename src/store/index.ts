import { configureStore } from '@reduxjs/toolkit';
import tripReducer from './slices/tripSlice';

export const store = configureStore({
  reducer: {
    trip: tripReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['trip/setFormData'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
