import window from 'global';
import { createSlice } from '@reduxjs/toolkit';

let key = 'wujo_login_profile';


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    login: (state,action) => {
      window.localStorage.setItem(key, JSON.stringify(action.payload));
      state.user = action.payload;
    },
    logout: (state) => {
      window.localStorage.clear(key);
      state.user = null;
    },
  },
});

export const { login,logout } = userSlice.actions;


export const selectUser = (state: any) => state.user.user;

export default userSlice.reducer;
