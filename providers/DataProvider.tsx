import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { setUser, UserState } from '@redux/user';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getUserState } from '@redux/selectors';
import { setSnippets } from '@redux/snippets';
import { getAllDrafts, IDBSnippet } from '@utils/indexDb';
import { normalizeSnippetData } from '@utils/helpers';
import { SnippetFromDB } from '@models/snippet';
import { getAllSnippets } from '@utils/api';

const DataContext = createContext(null);

type DataContextValue = {
  user: UserState['user'];
  drafts: IDBSnippet[];
  refreshSnippetsList: () => Promise<void>;
  refreshDraftsList: () => Promise<void>;
  getDraftById: (id: string) => IDBSnippet | undefined;
};

export const DataProvider = ({ children }) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const [drafts, setDrafts] = useState<IDBSnippet[]>([]);
  const user = useAppSelector(getUserState);

  const getSnippets = async (): Promise<void> => {
    const data = await getAllSnippets();

    const normalizedData = data.map((snippet: SnippetFromDB) =>
      normalizeSnippetData(snippet),
    );

    dispatch(setSnippets({ snippets: normalizedData }));
  };

  const getDrafts = async (): Promise<void> => {
    const snippets = await getAllDrafts();
    setDrafts(snippets);
  };

  const getDraftById = (id: string): IDBSnippet => {
    return drafts.find((draft) => draft.id === id);
  };

  useEffect(() => {
    getSnippets();
    getDrafts();
  }, []);

  useEffect(() => {
    if (session?.user) {
      dispatch(setUser({ user: session.user as UserState['user'] }));
    }
  }, [session]);

  return (
    <DataContext.Provider
      value={{
        user,
        drafts,
        refreshSnippetsList: getSnippets,
        refreshDraftsList: getDrafts,
        getDraftById,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): DataContextValue => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
