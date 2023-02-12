/**
 * References:
 * - https://github.com/nextauthjs/next-auth/tree/main/packages
 * - https://next-auth.js.org/tutorials/creating-a-database-adapter
 * - https://next-auth.js.org/adapters/overview
 * - https://next-auth.js.org/adapters/models
 */

import { hash } from '@node-rs/bcrypt'
import type {
  Adapter,
  AdapterAccount,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from 'next-auth/adapters'
import { RawExpression } from 'pqb'

import { db } from '@/schema/database'

/** @return { import("next-auth/adapters").Adapter } */

type SessionAndUserProps = { session: AdapterSession; user: AdapterUser }

export default function OrchidAdapter(
  // db: any, // TODO: use OrchidORM instance type
  opts?: { generateId: () => string | RawExpression<any> }
): Adapter {
  return {
    async createUser(user) {
      try {
        const id = opts?.generateId().toString() || undefined
        const password = { create: { hash: await hash('secret') } }
        const result = await db.user.create({ id, ...user, password })
        return result as unknown as AdapterUser
      } catch (err) {
        return null as unknown as AdapterUser
      }
    },
    async getUser(id) {
      try {
        const user = await db.user.findBy({ id })
        return user as unknown as AdapterUser
      } catch (err) {
        return null as unknown as AdapterUser
      }
    },
    async getUserByEmail(email) {
      try {
        const user = await db.user.findBy({ email })
        return user as unknown as AdapterUser
      } catch (err) {
        return null as unknown as AdapterUser
      }
    },
    async getUserByAccount({ providerAccountId, provider }) {
      try {
        const { userId } = await db.account.findBy({
          providerAccountId,
          provider,
        })
        const user = await db.user.findBy({ id: userId })
        return user as unknown as AdapterUser
      } catch (err) {
        return null as unknown as AdapterUser
      }
    },
    async updateUser(user) {
      try {
        await db.user.where({ id: user.id }).update(user)
        const result = await db.user.findBy({ id: user.id })
        return result as unknown as AdapterUser
      } catch (err) {
        return null as unknown as AdapterUser
      }
    },
    async deleteUser(userId) {
      try {
        const result = await db.user.where({ id: userId }).delete()
        return result as unknown as AdapterUser
      } catch (err) {
        return null as unknown as AdapterUser
      }
    },
    async linkAccount(account) {
      try {
        const id = opts?.generateId().toString() || undefined
        const result = await db.account.create({
          id,
          ...account,
          user: { connect: { id: account.userId } },
        })
        return result as unknown as AdapterAccount
      } catch (err) {
        return null as unknown as AdapterAccount
      }
    },
    async unlinkAccount({ providerAccountId, provider }) {
      try {
        const result = await db.account.where({ providerAccountId, provider }).delete()
        return result as unknown as AdapterAccount
      } catch (err) {
        return null as unknown as AdapterAccount
      }
    },
    async createSession({ sessionToken, userId, expires }) {
      try {
        const result = await db.session.create({
          sessionToken,
          expires,
          user: { connect: { id: userId } },
        })
        return result as unknown as AdapterSession
      } catch (err) {
        return null as unknown as AdapterSession
      }
    },
    async getSessionAndUser(sessionToken) {
      try {
        const session = await db.session.findBy({ sessionToken })
        const user = await db.user.findBy({ id: session.userId })
        return { session, user } as unknown as SessionAndUserProps
      } catch (err) {
        return null
      }
    },
    async updateSession(session) {
      try {
        await db.session.where({ sessionToken: session.sessionToken }).update(session)
        const result = await db.session.findBy({
          sessionToken: session.sessionToken,
        })
        return result as unknown as AdapterSession
      } catch (err) {
        return null as unknown as AdapterSession
      }
    },
    async deleteSession(sessionToken) {
      try {
        const result = await db.session.where({ sessionToken }).delete()
        return result as unknown as AdapterSession
      } catch (err) {
        return null as unknown as AdapterSession
      }
    },
    async createVerificationToken({ identifier, expires, token }) {
      try {
        const result = await db.verificationToken.create({
          identifier,
          expires,
          token,
        })
        return result as unknown as VerificationToken
      } catch (err) {
        return null as unknown as VerificationToken
      }
    },
    async useVerificationToken({ identifier, token }) {
      try {
        const result = await db.verificationToken.where({ identifier, token }).delete()
        return result as unknown as VerificationToken
      } catch (err) {
        return null as unknown as VerificationToken
      }
    },
  }
}
