import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import Editor from '@monaco-editor/react';
import * as Yup from 'yup';
import { SnippetValues } from '@hooks/useSnippetFormValues';
import { ChangeEvent, useMemo, useState } from 'react';
import { useDataContext } from '@providers/DataProvider';
import Loader from '@components/Loader';
import { createNewSnippet, updateSnippet } from '@utils/api';
import { addDraft, deleteDraftById, updateDraftById } from '@utils/indexDb';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title cannot be empty'),
  description: Yup.string().required('Description cannot be empty'),
  snippet: Yup.string().required('Snippet cannot be empty'),
});

type Props = {
  type: 'Create' | 'Edit';
  values: SnippetValues;
  onChange: (
    key: keyof SnippetValues,
  ) => (eventOrValue: ChangeEvent | string) => void;
  isDraft?: boolean;
};

type SubmitType =
  | 'create'
  | 'update'
  | 'createDraft'
  | 'updateDraft'
  | 'publishDraft';

const Form = ({ type, values, onChange, isDraft }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { user, refreshSnippetsList, refreshDraftsList } = useDataContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<SnippetValues>({
    title: null,
    description: null,
    snippet: null,
  });

  const removeError = (key: keyof SnippetValues) => () => {
    setErrors((prev) => ({
      ...prev,
      [key]: null,
    }));
  };

  const onEditorChange = (value: string) => {
    onChange('snippet')(value);
    removeError('snippet')();
  };

  const onSubmit = (submitType: SubmitType) => async (): Promise<void> => {
    setIsSubmitting(true);

    try {
      await validationSchema.validate(values, {
        abortEarly: false,
      });
    } catch (validationErrors) {
      const errors = {};
      validationErrors.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setErrors((prev) => ({
        ...prev,
        ...errors,
      }));
      setIsSubmitting(false);
      return;
    }

    switch (submitType) {
      case 'create':
        const createResponse = await createNewSnippet({
          ...values,
          userId: user.id,
        });

        if (createResponse.ok) {
          await refreshSnippetsList();
          router.push('/');
        }
        break;
      case 'update':
        console.log('id: ', id);
        const updateResponse = await updateSnippet(id as string, {
          ...values,
          userId: user.id,
        });

        if (updateResponse.ok) {
          await refreshSnippetsList();
          router.push('/');
        }
        break;
      case 'createDraft':
        await addDraft({ ...values, id: crypto.randomUUID() });
        await refreshDraftsList();
        router.push('/drafts');
        break;
      case 'updateDraft':
        await updateDraftById(id as string, values);
        await refreshDraftsList();
        router.push('/drafts');
        break;

      case 'publishDraft':
        await deleteDraftById(id as string);
        const publishResponse = await createNewSnippet({
          ...values,
          userId: user.id,
        });

        if (publishResponse.ok) {
          await refreshSnippetsList();
          await refreshDraftsList();
          router.push('/');
        }
    }
  };

  const isCreateType = type === 'Create';
  const submitType: SubmitType = useMemo(() => {
    if (isDraft) {
      return 'updateDraft';
    }

    return isCreateType ? 'create' : 'update';
  }, [isCreateType, isDraft]);

  if (isSubmitting) {
    return <Loader />;
  }

  return (
    <section className="w-full max-w-full flex-start flex-col mb-6">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Snippet</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing snippets with the world, and let your friends
        see who is better at solving complex tasks. Or simply save it as draft
        for your personal purposes.
      </p>

      <form className="mt-10 w-full flex flex-col gap-7 glassmorphism">
        <label>
          <span className="mb-2 text-xl font-medium text-gray-900 font-satoshi">
            Title
          </span>
          <input
            value={values.title}
            onChange={onChange('title')}
            onFocus={removeError('title')}
            type="text"
            placeholder="Add Title*"
            required
            className="form_input"
          />
          {errors?.title && (
            <p className="text-sm text-red-600">{errors.title}</p>
          )}
        </label>

        <label>
          <span className="mb-2 text-xl font-medium text-gray-900 font-satoshi">
            Description
          </span>
          <textarea
            value={values.description}
            onChange={onChange('description')}
            onFocus={removeError('description')}
            placeholder="Add description of provided snippet*"
            required
            className="form_textarea"
          />
          {errors?.description && (
            <p className="text-sm text-red-600">{errors.description}</p>
          )}
        </label>

        <div className="flex w-120 mx-3 ml-auto py-1 mt-3 mb-5 gap-4 justify-center align-middle sticky top-1 button_container">
          <span>
            <Link href="/" className="outline_btn bg-white">
              Cancel
            </Link>
          </span>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={onSubmit(submitType)}
            className="orange_btn"
          >
            Save
          </button>

          {isCreateType && (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onSubmit('createDraft')}
              className="black_btn"
            >
              Save as Draft
            </button>
          )}

          {isDraft && (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onSubmit('publishDraft')}
              className="black_btn"
            >
              Publish
            </button>
          )}
        </div>

        <div>
          <span className="mb-2 text-xl font-medium text-gray-900 font-satoshi">
            Provide your code here
          </span>
          {errors?.snippet && (
            <p className="text-sm text-red-600">{errors.snippet}</p>
          )}
          <Editor
            height={800}
            theme="vs-dark"
            defaultLanguage="typescript"
            language="typescript"
            defaultValue=""
            value={values.snippet}
            onChange={onEditorChange}
          />
        </div>
      </form>
    </section>
  );
};

export default Form;
