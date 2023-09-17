'use client';

import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getSnippetById } from '@redux/selectors';
import Link from 'next/link';
import Editor from '@monaco-editor/react';

const SnippetDetails = () => {
  const { id } = useParams();
  const snippet = useSelector(getSnippetById(id as string));

  return (
    <section className="w-full max-w-full flex-start flex-col mb-6">
      <div className="mt-10 w-full flex flex-col gap-7 glassmorphism">
        <div className="flex w-80 mx-3 ml-auto py-1 mt-3 mb-5 gap-4 justify-center align-middle sticky top-1 button_container">
          <span>
            <Link href="/" className="outline_btn">
              Go back
            </Link>
          </span>
        </div>

        <h1 className="font-satoshi font-semibold text-gray-800 text-3xl break-words">
          {snippet?.title}
        </h1>

        <p className="font-satoshi font-normal text-base text-gray-500 break-words">
          {snippet?.description}
        </p>
        <Editor
          height="800px"
          theme="vs-dark"
          defaultLanguage="typescript"
          language="typescript"
          defaultValue=""
          value={snippet?.snippet}
          options={{ readOnly: true }}
        />
      </div>
    </section>
  );
};

export default SnippetDetails;
