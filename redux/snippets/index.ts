'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '@redux/user';

export type Snippet = {
  id: string;
  creator: UserState['user'];
  title: string;
  description: string;
  snippet: string;
};

export type SnippetsState = {
  snippets: Array<Snippet>;
};

const initialState: SnippetsState = {
  snippets: [],
};

export const snippetsSlice = createSlice({
  name: 'snippets',
  initialState,
  reducers: {
    setSnippets: (state, action: PayloadAction<SnippetsState>) => {
      state.snippets = action.payload.snippets;
    },
  },
});

export const { setSnippets } = snippetsSlice.actions;
export default snippetsSlice.reducer;
