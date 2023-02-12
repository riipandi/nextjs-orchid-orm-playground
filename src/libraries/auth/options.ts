import type { NextAuthOptions } from 'next-auth'
import Email from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'
import { UUID } from 'uuidjs'

// import CredentialsProvider from 'next-auth/providers/credentials'
import OrchidAdapter from '@/libraries/auth/adapter'

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env
const { SMTP_PORT, SMTP_HOST, SMTP_USERNAME, SMTP_PASSWORD, SMTP_MAIL_FROM } = process.env

export const authOptions: NextAuthOptions = {
  adapter: OrchidAdapter({ generateId: () => UUID.genV6().hexString }),
  providers: [
    Email({
      server: {
        port: Number(SMTP_PORT),
        host: SMTP_HOST,
        auth: {
          user: SMTP_USERNAME,
          pass: SMTP_PASSWORD,
        },
        secure: false,
      },
      from: SMTP_MAIL_FROM,
    }),
    // CredentialsProvider({
    //     // The name to display on the sign in form (e.g. "Sign in with...")
    //     name: 'Email',
    //     // `credentials` is used to generate a form on the sign in page.
    //     // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    //     // e.g. domain, username, password, 2FA token, etc.
    //     // You can pass any HTML attribute to the <input> tag through the object.
    //     credentials: {
    //         username: { label: 'Email address', type: 'email' },
    //         password: { label: 'Password', type: 'password' },
    //     },
    //     async authorize(credentials, req) {
    //         // Add logic here to look up the user from the credentials supplied
    //         const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' }

    //         if (user) {
    //             // Any object returned will be saved in `user` property of the JWT
    //             return user
    //         } else {
    //             // If you return null then an error will be displayed advising the user to check their details.
    //             return null

    //             // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    //         }
    //     },
    // }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID || '',
      clientSecret: GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
  ],
}
