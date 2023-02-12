import { default as CookieUniversal } from 'cookie-universal'
import type { NextApiRequest, NextApiResponse } from 'next'
import { AdapterSession, AdapterUser } from 'next-auth/adapters'

import { db } from '@/schema/database'
import { ErrorResponse, isAuthenticated, throwError } from '@/utils/response'

type ResponseProps = { session: AdapterSession; user: AdapterUser }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseProps | ErrorResponse>
) {
  if (req.method !== 'GET') return throwError(res, 500, `Method not allowed!`)
  if (!(await isAuthenticated(req))) return throwError(res, 401, `Unauthenticated!`)

  const cookies = CookieUniversal(req, res)
  const sessionToken = cookies.get('next-auth.session-token')

  try {
    const session = await db.session.findBy({ sessionToken })
    const user = await db.user.findBy({ id: session.userId })
    res.status(200).json({ session, user })
  } catch (err) {
    throwError(res, 500, `Something wrong!`)
  }
}
