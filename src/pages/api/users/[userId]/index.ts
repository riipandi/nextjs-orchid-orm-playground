import type { NextApiRequest, NextApiResponse } from 'next'
import { NotFoundError, QueryError } from 'pqb'

import { db } from '@/schema/database'
import { User } from '@/schema/tables/user.table'
import { ErrorResponse, throwError } from '@/utils/response'

async function fetchUserById(req: NextApiRequest, res: NextApiResponse<User | ErrorResponse>) {
  const { userId } = req.query as { userId: string }
  try {
    res.status(200).json(await db.user.findBy({ id: userId }))
  } catch (err) {
    return err instanceof NotFoundError
      ? throwError(res, 400, err.message)
      : throwError(res, 500, 'Something wrong')
  }
}

async function updateUser(req: NextApiRequest, res: NextApiResponse<User | ErrorResponse>) {
  if (!req.body) return throwError(res, 400, `Must contain body!`)

  const { userId } = req.query as { userId: string }
  const { email, name } = req.body

  try {
    await db.user.where({ id: userId }).update({ email, name })
    res.status(200).json(await db.user.findBy({ id: userId }))
  } catch (err) {
    return err instanceof NotFoundError
      ? throwError(res, 400, err.message)
      : throwError(res, 500, 'Something wrong')
  }
}

async function deleteUser(req: NextApiRequest, res: NextApiResponse<User | ErrorResponse>) {
  const { userId } = req.query as { userId: string }
  try {
    if (!(await db.user.findBy({ id: userId }))) throw new Error()

    await db.user.where({ id: userId }).delete()
    res.status(200).json({ code: 200, message: 'User has been deleted' })
  } catch (err) {
    return err instanceof NotFoundError || err instanceof QueryError
      ? throwError(res, 400, err.message)
      : throwError(res, 500, 'Something wrong')
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return fetchUserById(req, res)
    case 'PUT':
      return updateUser(req, res)
    case 'DELETE':
      return deleteUser(req, res)
    default:
      return throwError(res, 500, `Method not allowed!`)
  }
}
