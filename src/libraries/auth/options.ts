import type { NextAuthOptions } from 'next-auth'
import Email from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'
import SpotifyProvider from 'next-auth/providers/spotify'
import { UUID } from 'uuidjs'

import OrchidAdapter from '@/libraries/auth/adapter'
import { db } from '@/schema/database'

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } =
  process.env
const { SMTP_PORT, SMTP_HOST, SMTP_USERNAME, SMTP_PASSWORD, SMTP_MAIL_FROM } = process.env

/**
 * If you want to use credentials authentication read the docs at:
 * - https://next-auth.js.org/providers/credentials
 */
export const authOptions: NextAuthOptions = {
  adapter: OrchidAdapter(db, { generateId: () => UUID.genV6().hexString }),
  providers: [
    Email({
      server: {
        port: Number(SMTP_PORT),
        host: String(SMTP_HOST),
        auth: {
          user: String(SMTP_USERNAME),
          pass: String(SMTP_PASSWORD),
        },
        secure: false,
      },
      from: String(SMTP_MAIL_FROM),
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
}
