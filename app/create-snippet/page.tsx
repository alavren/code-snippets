'use client';

import Form from '@components/Form';
import { useSnippetFormValues } from '@hooks/useSnippetFormValues';

const CreatePrompt = () => {
  const { values, handleUpdateValue } = useSnippetFormValues();

  return <Form type="Create" values={values} onChange={handleUpdateValue} />;
};

export default CreatePrompt;
