// quizCountSlice.js
import { createSlice } from '@reduxjs/toolkit';

const quizCountSlice = createSlice({
  name: 'quizCount',
  initialState: {
    count: 0,
  },
  reducers: {
    incrementQuizCount: (state) => {
      state.count += 1;
    },
  },
});

export const { incrementQuizCount } = quizCountSlice.actions;
export default quizCountSlice.reducer;
