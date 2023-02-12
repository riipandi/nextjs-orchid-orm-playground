import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
// import Email from 'next-auth/providers/email'
import { UUID } from 'uuidjs'

import OrchidAdapter from '@/libraries/auth/adapter'

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

export const authOptions: NextAuthOptions = {
    // Include user.id on session
    // callbacks: {
    //     session({ session, user }) {
    //         if (session.user) {
    //             session.user.id = user.id
    //         }
    //         return session
    //     },
    // },
    adapter: OrchidAdapter({
        generateId: () => UUID.genV6().hexString,
    }),
    // Configure one or more authentication providers
    providers: [
        // Email({
        //     server: {
        //         port: 465,
        //         host: 'smtp.gmail.com',
        //         secure: true,
        //         auth: {
        //             user: process.env.EMAIL_USERNAME,
        //             pass: process.env.EMAIL_PASSWORD,
        //         },
        //         tls: {
        //             rejectUnauthorized: false,
        //         },
        //     },
        //     from: process.env.EMAIL_FROM,
        // }),
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID || '',
            clientSecret: GOOGLE_CLIENT_SECRET || '',
            allowDangerousEmailAccountLinking: true,
        }),
    ],
}
