'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';
import { useSnippetFormValues } from '@hooks/useSnippetFormValues';
import { useSelector } from 'react-redux';
import { getSnippetById } from '@redux/selectors';
import { useDataContext } from '@providers/DataProvider';

const UpdatePrompt = () => {
  const { getDraftById } = useDataContext();
  const searchParams = useSearchParams();
  const snippetId = searchParams.get('id');
  const isDraft = !!searchParams.get('isDraft');
  const draftSnippet = getDraftById(snippetId);
  const stateSnippet = useSelector(getSnippetById(snippetId));

  const targetSnippet = useMemo(() => {
    return isDraft ? draftSnippet : stateSnippet;
  }, [draftSnippet, isDraft, stateSnippet]);

  const snippetFields = useMemo(() => {
    return {
      snippet: targetSnippet?.snippet || '',
      description: targetSnippet?.description || '',
      title: targetSnippet?.title || '',
    };
  }, [targetSnippet]);

  const { values, handleUpdateValue } = useSnippetFormValues(snippetFields);

  return (
    <Form
      type="Edit"
      values={values}
      onChange={handleUpdateValue}
      isDraft={isDraft}
    />
  );
};

export default UpdatePrompt;
