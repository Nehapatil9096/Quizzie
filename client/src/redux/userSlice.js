// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: '',
    password:'',
    dashboardData: {
      numberOfQuizzes: 0,
      totalQuestionsInQuizzes: 0,
      totalImpressions: 0,
    },
    // Add any other initial state properties you need
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setPasswordValue: (state, action) => {
      state.password = action.payload;
    },
    setDashboardData: (state, action) => {
      state.dashboardData = action.payload;
    },// Add more reducers for other actions if needed
  },
});

export const { setUserId, setPasswordValue, setDashboardData } = userSlice.actions;
export const selectDashboardData = (state) => state.user.dashboardData;

export default userSlice.reducer;