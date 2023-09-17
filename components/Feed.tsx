'use client';

import React, { ChangeEvent, useState } from 'react';
import { debounce } from 'lodash';

import { useAppSelector } from '@redux/hooks';
import { getSnippetsState } from '@redux/selectors';
import { Snippet } from '@redux/snippets';
import { useDataContext } from '@providers/DataProvider';
import SnippetsList from '@components/SnippetList';
import { IDBSnippet } from '@utils/indexDb';

type Props = {
  isDrafts?: boolean;
};

const Feed = ({ isDrafts }: Props): React.ReactElement => {
  const snippets = useAppSelector(getSnippetsState);
  const { drafts } = useDataContext();

  const currentData = isDrafts ? drafts : snippets;

  const [searchText, setSearchText] = useState<string>('');
  const [searchedResults, setSearchedResults] = useState<
    Snippet[] | IDBSnippet[]
  >([]);

  const filterPrompts = (search: string): Snippet[] | IDBSnippet[] => {
    const regex = new RegExp(search, 'i'); // 'i' flag for case-insensitive search
    return currentData.filter(
      (item: Snippet) =>
        regex.test(item?.creator?.username) ||
        regex.test(item.title) ||
        regex.test(item.description),
    );
  };

  const debouncedSearch = debounce((searchText) => {
    const searchResult = filterPrompts(searchText);
    setSearchedResults(searchResult);
  }, 500);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value);

    debouncedSearch(event.target.value);
  };

  return (
    <section className="feed">
      <div className="relative w-full flex-center">
        <input
          type="text"
          placeholder={`Search for a snippet${!isDrafts ? ' or username' : ''}`}
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </div>

      {searchText ? (
        <SnippetsList data={searchedResults} isDraft={isDrafts} />
      ) : (
        <SnippetsList data={currentData} isDraft={isDrafts} />
      )}
    </section>
  );
};

export default Feed;
