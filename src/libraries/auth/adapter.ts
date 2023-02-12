/**
 * References:
 * - https://next-auth.js.org/tutorials/creating-a-database-adapter
 * - https://github.com/nextauthjs/next-auth/tree/main/packages
 * - https://next-auth.js.org/adapters/overview
 */

import type {
    Adapter,
    AdapterAccount,
    AdapterSession,
    AdapterUser,
    VerificationToken,
} from 'next-auth/adapters'
import { hash } from '@node-rs/bcrypt'
import { RawExpression } from 'pqb'

/** @return { import("next-auth/adapters").Adapter } */
export default function OrchidAdapter(
    db: any, // TODO: use OrchidORM instance type
    opts?: {
        generateId: () => string | RawExpression<any>
    }
): Adapter {
    return {
        async createUser(user) {
            console.log('DEBUG ~ user', user)
            const id = opts?.generateId().toString() || undefined
            const result = await db.user.findBy({ email: user.email }).orCreate({
                id,
                ...user,
                password: { create: { hash: await hash('secret') } },
            })

            return result as unknown as AdapterUser
        },
        async getUser(id) {
            return {} as unknown as AdapterUser
        },
        async getUserByEmail(email) {
            return {} as unknown as AdapterUser
        },
        async getUserByAccount({ providerAccountId, provider }) {
            return {} as unknown as AdapterUser
        },
        async updateUser(user) {
            return {} as unknown as AdapterUser
        },
        async deleteUser(userId) {
            return {} as unknown as AdapterUser
        },
        async linkAccount(account) {
            return {} as unknown as AdapterAccount
        },
        async unlinkAccount({ providerAccountId, provider }) {
            return {} as unknown as AdapterAccount
        },
        async createSession({ sessionToken, userId, expires }) {
            return {} as unknown as AdapterSession
        },
        async getSessionAndUser(sessionToken) {
            return {} as any
        },
        async updateSession({ sessionToken }) {
            return {} as unknown as AdapterSession
        },
        async deleteSession(sessionToken) {
            return {} as unknown as AdapterSession
        },
        async createVerificationToken({ identifier, expires, token }) {
            return {} as unknown as VerificationToken
        },
        async useVerificationToken({ identifier, token }) {
            return {} as unknown as VerificationToken
        },
    }
}
