'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';
import { useSelector } from '@node_modules/react-redux';
import {
  getSnippetsByUserId,
  getSnippetsState,
  getUserState,
} from '@redux/selectors';

const MyProfile = () => {
  const user = useSelector(getUserState);
  const snippets = useSelector(getSnippetsByUserId(user?.id));

  console.log(user);

  return <Profile snippets={snippets} name={user.name} />;
};

export default MyProfile;
