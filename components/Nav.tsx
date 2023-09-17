'use client';

import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut } from 'next-auth/react';
import { useAppDispatch } from '@redux/hooks';
import { signOut as singOutAction } from '@redux/user';
import { useDataContext } from '@providers/DataProvider';

const Nav = () => {
  const dispatch = useAppDispatch();
  const { user, drafts } = useDataContext();

  console.log('drafts: ', drafts);

  const onSingIn = () => signIn('google');

  const onSignOut = async () => {
    await signOut();
    dispatch(singOutAction());
  };

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <span className="logo_text">Snippet Library</span>
      </Link>

      <div className="flex">
        {user?.id ? (
          <div className="flex gap-3 md:gap-5">
            {drafts?.length > 0 && (
              <Link href="/drafts" className="black_btn">
                Check your drafts
              </Link>
            )}

            <Link href="/create-snippet" className="black_btn">
              Add your snippet
            </Link>

            <button type="button" onClick={onSignOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={user?.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <button type="button" onClick={onSingIn} className="black_btn">
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
