import { SnippetFromDB } from '@models/snippet';
import { SnippetValues } from '@hooks/useSnippetFormValues';

export const deleteSnippetById = async (id: string): Promise<void> => {
  await fetch(`/api/snippets/${id}`, {
    method: 'DELETE',
  });
};

export const getAllSnippets = async (): Promise<SnippetFromDB[]> => {
  const response = await fetch('/api/snippets');
  return await response.json();
};

export const createNewSnippet = async (
  data: SnippetValues & { userId: string },
): Promise<Response> => {
  return await fetch('/api/snippets/new', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateSnippet = async (
  id: string,
  data: SnippetValues & { userId: string },
): Promise<Response> => {
  return await fetch(`/api/snippets/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};
