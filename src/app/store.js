import { configureStore } from '@reduxjs/toolkit';
import jobReducers from '../features/JobInformation/JobSlice';
import filterReducers from '../features/filter/filterSlice';
import sortingReducers from '../features/Sort/sortSlice';

export const store = configureStore({
  reducer: {
    jobs: jobReducers,
    filter:filterReducers,
    sort:sortingReducers
  },
});
