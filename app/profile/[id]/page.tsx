'use client';

import { useSearchParams, useParams } from 'next/navigation';

import Profile from '@components/Profile';
import { useSelector } from 'react-redux';
import { getSnippetsByUserId } from '@redux/selectors';

const UserProfile = ({ params }) => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const userName = searchParams.get('name');
  const userSnippets = useSelector(getSnippetsByUserId(id as string));

  return <Profile snippets={userSnippets} name={userName} />;
};

export default UserProfile;
