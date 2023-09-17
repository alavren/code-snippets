'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
  user: {
    id: string;
    email: string;
    name?: string;
    username?: string;
    image: string;
  };
};

const initialState: UserState = {
  user: {
    id: null,
    email: null,
    name: null,
    image: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
    },
    signOut: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { setUser, signOut } = userSlice.actions;
export default userSlice.reducer;
