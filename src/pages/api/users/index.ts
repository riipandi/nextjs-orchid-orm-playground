import type { NextApiRequest, NextApiResponse } from 'next'
import { throwError } from '@/utils/response'
import { db } from '@/schema'
import { User } from '@/schema/tables/user.table'

export default async function handler(req: NextApiRequest, res: NextApiResponse<User[]>) {
    if (req.method !== 'GET') return throwError(res, 500, `Method not allowed!`)

    const posts = await db.user.selectAll()

    res.status(200).json(posts)
}
