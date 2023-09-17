import React from 'react';
import SnippetCard from '@components/SnippetCard';
import { Snippet } from '@redux/snippets';
import { IDBSnippet } from '@utils/indexDb';

type Props = {
  data: Snippet[] | IDBSnippet[];
  isDraft?: boolean;
};

const SnippetsList = ({ data, isDraft }: Props): React.ReactElement => {
  return (
    <div className="mt-16 snippet_layout">
      {data.map((snippet: Snippet | IDBSnippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} isDraft={isDraft} />
      ))}
    </div>
  );
};

export default SnippetsList;
