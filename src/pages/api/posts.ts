import type { NextApiRequest, NextApiResponse } from 'next'
import { throwError } from '@/utils/response'
import { db } from '@/schema'
import { Post } from '@/schema/tables/post.table'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Post[]>) {
    if (req.method !== 'GET') return throwError(res, 500, `Method not allowed!`)

    const posts = await db.post.selectAll()

    res.status(200).json(posts)
}
