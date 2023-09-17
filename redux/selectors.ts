'use client';

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

const userState = (state: RootState) => state.user;
const snippetsState = (state: RootState) => state.snippets;

export const getUserState = createSelector(userState, (state) => state.user);

export const getSnippetsState = createSelector(
  snippetsState,
  (state) => state.snippets,
);

export const getSnippetsByUserId = (id: string) =>
  createSelector(snippetsState, (state) =>
    state.snippets.filter((snippet) => snippet.creator.id === id),
  );

export const getSnippetById = (id: string) =>
  createSelector(snippetsState, (state) =>
    state.snippets.find((snippet) => snippet.id === id),
  );
