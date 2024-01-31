// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: localStorage.getItem('userId') || '',
    password:'',
    token: localStorage.getItem('token') || null,
    /*dashboardData: {
      numberOfQuizzes: 0,
      totalQuestionsInQuizzes: 0,
      totalImpressions: 0,
    },*/
    // Add any other initial state properties you need
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem('userId', action.payload);
    },
    setPasswordValue: (state, action) => {
      state.password = action.payload;
    },
    setDashboardData: (state, action) => {
      state.dashboardData = action.payload;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    clearUserData: (state) => {
      state.userId = '';
      state.password = '';
      state.token = null;
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
    },
    // Add more reducers for other actions if needed
  },
});

export const { setUserId, setPasswordValue, setDashboardData } = userSlice.actions;
//export const selectDashboardData = (state) => state.user.dashboardData;
export const { loginSuccess, clearUserData } = userSlice.actions;

export default userSlice.reducer;