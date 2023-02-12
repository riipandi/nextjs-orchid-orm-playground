import type { NextAuthOptions } from 'next-auth'
// import Email from 'next-auth/providers/email'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import SpotifyProvider from 'next-auth/providers/spotify'
import { UUID } from 'uuidjs'

import OrchidAdapter from '@/libraries/auth/adapter'
import { db } from '@/schema/database'

import { login } from './services'

const {
  NEXTAUTH_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  // SMTP_PORT,
  // SMTP_HOST,
  // SMTP_USERNAME,
  // SMTP_PASSWORD,
  // SMTP_MAIL_FROM,
} = process.env

/**
 * If you want to use credentials authentication read the docs at:
 * - https://next-auth.js.org/providers/credentials
 */
export const authOptions: NextAuthOptions = {
  secret: String(NEXTAUTH_SECRET),
  session: { strategy: 'database' },
  adapter: OrchidAdapter(db, { generateId: () => UUID.genV6().hexString }),
  providers: [
    // Email({
    //   server: {
    //     port: Number(SMTP_PORT),
    //     host: String(SMTP_HOST),
    //     auth: {
    //       user: String(SMTP_USERNAME),
    //       pass: String(SMTP_PASSWORD),
    //     },
    //     secure: false,
    //   },
    //   from: String(SMTP_MAIL_FROM),
    // }),
    CredentialsProvider({
      id: 'login',
      name: 'Email',
      credentials: {
        email: { label: 'Email address', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('No credentials!')
        }
        return await login(credentials)
      },
    }),
    GoogleProvider({
      clientId: String(GOOGLE_CLIENT_ID),
      clientSecret: String(GOOGLE_CLIENT_SECRET),
      allowDangerousEmailAccountLinking: true,
    }),
    SpotifyProvider({
      clientId: String(SPOTIFY_CLIENT_ID),
      clientSecret: String(SPOTIFY_CLIENT_SECRET),
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return user ? true : false
    },
    async jwt({ token, user }) {
      /* Update the token based on the user object */
      if (user) {
        token.role = 'admin'
      }
      return token
    },
    session({ session, token }) {
      /* Update the session.user based on the token object */
      // if (token && session.user) {
      //   session.user.role = token.sub
      // }
      return session
    },
  },
}
