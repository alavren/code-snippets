import { ChangeEvent, useEffect, useState } from 'react';

export type SnippetValues = {
  snippet: string;
  title: string;
  description: string;
};

const initialState: SnippetValues = {
  snippet: '',
  title: '',
  description: '',
};

export const useSnippetFormValues = (
  initialValues: SnippetValues = initialState,
) => {
  const [values, setValues] = useState<SnippetValues>(initialValues);

  const updateValues = (key: keyof SnippetValues, value: string): void => {
    setValues((prevPost) => ({
      ...prevPost,
      [key]: value,
    }));
  };

  const handleUpdateValue =
    (key: keyof SnippetValues) =>
    (eventOrValue: ChangeEvent<HTMLInputElement> | string) => {
      const value =
        typeof eventOrValue === 'string'
          ? eventOrValue
          : eventOrValue.target.value;
      updateValues(key, value);
    };

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  return { values, handleUpdateValue };
};
