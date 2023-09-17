'use client';

import Profile from '@components/Profile';
import { useSelector } from 'react-redux';
import { getSnippetsByUserId } from '@redux/selectors';
import { useDataContext } from '@providers/DataProvider';

const MyProfile = () => {
  const { user } = useDataContext();
  const snippets = useSelector(getSnippetsByUserId(user?.id));

  return <Profile snippets={snippets} name={user.name} />;
};

export default MyProfile;
