import type { NextApiRequest, NextApiResponse } from 'next'
import { NotFoundError } from 'pqb'

import { db } from '@/schema/database'
import { Account } from '@/schema/tables/account.table'
import { ErrorResponse, throwError } from '@/utils/response'

async function fetchUserAccount(
  req: NextApiRequest,
  res: NextApiResponse<Account | ErrorResponse>
) {
  const { userId } = req.query as { userId: string }
  try {
    res.status(200).json(await db.account.findBy({ userId }))
  } catch (err) {
    return err instanceof NotFoundError
      ? throwError(res, 400, err.message)
      : throwError(res, 500, 'Something wrong')
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return fetchUserAccount(req, res)
    default:
      return throwError(res, 500, `Method not allowed!`)
  }
}
