import NextAuth from 'next-auth/next';

import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import TwitterProvider from 'next-auth/providers/twitter';

import {
  createUser,
  getUserById,
} from '../../../src/lib/sanity/mutations/user';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
  ],

  secret: process.env.SECRET,

  session: {
    strategy: 'jwt',

    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  jwt: {},

  pages: {
    signIn: '/signin',
    // signOut: "/auth/signout",
  },

  callbacks: {
    async signIn({
      user,
      account,
      profile,
      email,
      credentials,
    }) {
      await createUser(user, account.provider);
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      const userData = await getUserById(token.sub);

      session.user = userData;

      return session.user;
    },
    async jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
    }) {
      console.log({
        token,
        user,
        account,
        profile,
        isNewUser,
      });
      return token;
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // You can set the theme to 'light', 'dark' or use 'auto' to default to the
  // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
  theme: {
    colorScheme: 'light',
  },

  // Enable debug messages in the console if you are having problems
  debug: false,
});
