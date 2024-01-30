// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice.js';
import quizCountSlice from './quizCountSlice.js';

const store = configureStore({
  reducer: {
    user: userSlice,
    quizCount: quizCountSlice,  // Fix: use quizCountReducer here
    // Add more reducers if needed
  },
});

export default store;
