import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import SpotifyProvider from 'next-auth/providers/spotify'
import { UUID } from 'uuidjs'

import OrchidAdapter from './adapter'
import { db } from '@/schema'

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } =
    process.env

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
    // Configure one or more authentication providers
    adapter: OrchidAdapter(db, {
        generateId: () => UUID.genV6().hexString,
    }),
    providers: [
        SpotifyProvider({
            clientId: SPOTIFY_CLIENT_ID || '',
            clientSecret: SPOTIFY_CLIENT_SECRET || '',
            allowDangerousEmailAccountLinking: true,
        }),
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID || '',
            clientSecret: GOOGLE_CLIENT_SECRET || '',
            allowDangerousEmailAccountLinking: true,
        }),
    ],
}
