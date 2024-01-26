// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import quizCountReducer from './quizCountSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    quizCount: quizCountReducer,  // Fix: use quizCountReducer here
    // Add more reducers if needed
  },
});

export default store;
