import { configureStore } from '@reduxjs/toolkit';
import formSlice from './FormComponent/formSlice';

export const store = configureStore({
  reducer: {
    form: formSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;