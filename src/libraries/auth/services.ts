import { User } from 'next-auth'
import { verify } from '@node-rs/bcrypt'

import { db } from '@/schema/database'

export type LoginCredentialsType = {
  email: string
  password: string
}

export async function login(credentials: LoginCredentialsType): Promise<User | null> {
  try {
    const user = await db.user.findBy({ email: credentials.email })
    const password = await db.user.where({ email: credentials.email }).password

    if (!user || !password) {
      throw new Error('Invalid email or password')
    }

    return !(await verify(credentials.password, password.hash)) ? null : user
  } catch (error) {
    return null
  }
}
