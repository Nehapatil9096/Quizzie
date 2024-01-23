// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: '', // Add any other initial state properties you need
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    // Add more reducers for other actions if needed
  },
});

export const { setUserId } = userSlice.actions;
export default userSlice.reducer;
