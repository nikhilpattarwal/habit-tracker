import { configureStore } from '@reduxjs/toolkit';
import { habitReducer } from '../redux/reducers/homeTaskReducer';

export const store = configureStore({
  reducer: {habitReducer}
});
  