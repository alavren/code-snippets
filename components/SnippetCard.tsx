'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Snippet } from '@redux/snippets';
import { useDataContext } from '@providers/DataProvider';
import { deleteDraftById, IDBSnippet } from '@utils/indexDb';
import { deleteSnippetById } from '@utils/api';

type Props = {
  snippet: Snippet | IDBSnippet;
  isDraft?: boolean;
};

const SnippetCard = ({ snippet, isDraft }: Props): React.ReactElement => {
  const { user, refreshDraftsList, refreshSnippetsList } = useDataContext();
  const router = useRouter();
  const creator = isDraft ? user : (snippet as Snippet).creator;

  const handleProfileClick = (): void => {
    if (creator.id === user.id) return router.push('/profile');

    router.push(`/profile/${creator.id}?name=${creator.username}`);
  };

  const handleOpenClick = (): void => {
    router.push(`/snippet/${snippet.id}`);
  };

  const handleEdit = (): void => {
    router.push(
      `/update-snippet?id=${snippet.id}${isDraft ? '&isDraft=true' : ''}`,
    );
  };

  const deleteDraft = async (): Promise<void> => {
    await deleteDraftById(snippet.id);
    await refreshDraftsList();
  };

  const handleDelete = async (): Promise<void> => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this snippets?',
    );

    if (!hasConfirmed) {
      return;
    }

    if (isDraft) {
      await deleteDraft();
      return;
    }

    await deleteSnippetById(snippet.id);
    await refreshSnippetsList();
  };

  return (
    <div className="snippet_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={creator?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {creator?.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">{creator?.email}</p>
          </div>
        </div>
      </div>

      <p className="font-satoshi my-4 text-xl text-gray-700 break-words max-h-20 overflow-hidden overflow-ellipsis">
        {snippet.title}
      </p>
      <p className="font-satoshi my-4 text-sm italic text-gray-700 max-h-60 break-words overflow-hidden overflow-ellipsis">
        {snippet.description}
      </p>

      <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
        {!isDraft && (
          <span
            className="font-inter text-sm blue_gradient cursor-pointer"
            onClick={handleOpenClick}
          >
            Open
          </span>
        )}
        {user.id === creator?.id && (
          <>
            <span
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </span>
            <span
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default SnippetCard;
