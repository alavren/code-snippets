import { NextApiHandler } from 'next';
import NextAuth, { Profile, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User, { UserFromDB } from '@models/user';
import { connectToDB } from '@utils/database';
import { GoogleProfile } from '@node_modules/next-auth/src/providers/google';

const handler: NextApiHandler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }): Promise<Session> {
      const sessionUser: UserFromDB = await User.findOne({
        email: session?.user?.email,
      });

      // @ts-ignore
      session.user.id = sessionUser?._id.toString();

      return session;
    },
    async signIn({ profile }): Promise<boolean> {
      try {
        await connectToDB();

        const { email, picture, name } = profile as GoogleProfile;

        const userExists: UserFromDB = await User.findOne({
          email,
        });

        if (!userExists) {
          await User.create({
            email,
            username: name,
            image: picture,
          });
        }

        return true;
      } catch (error) {
        console.log('Error checking if user exists: ', error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
