import { SnippetFromDB } from '@models/snippet';
import { Snippet } from '@redux/snippets';

export const normalizeSnippetData = (snippet: SnippetFromDB): Snippet => {
  const { _id, creator, ...snippetProps } = snippet;
  const { _id: creatorId, ...creatorProps } = creator;
  return {
    id: String(_id),
    creator: {
      id: String(creatorId),
      ...creatorProps,
    },
    ...snippetProps,
  };
};
