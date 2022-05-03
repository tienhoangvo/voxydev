import NextAuth from 'next-auth/next';

import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import TwitterProvider from 'next-auth/providers/twitter';
import GithubProvider from 'next-auth/providers/github';
import LinkedInProvider from 'next-auth/providers/linkedin';

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
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID,
      clientSecret: process.env.LINKEDIN_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',

    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  jwt: {},

  pages: {
    signIn: '/login',
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
      if (url.startsWith(baseUrl)) return url;
      // Allows relative callback URLs
      else if (url.startsWith('/'))
        return new URL(url, baseUrl).toString();
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
