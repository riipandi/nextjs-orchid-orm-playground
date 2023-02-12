import type { NextApiRequest, NextApiResponse } from 'next'
import { throwError } from '@/utils/response'
import { db } from '@/schema/database'
import { User } from '@/schema/tables/user.table'
import { QueryError } from 'pqb'

async function fetchAllUsers(req: NextApiRequest, res: NextApiResponse<User[]>) {
    res.status(200).json(await db.user.selectAll())
}

async function createUser(req: NextApiRequest, res: NextApiResponse) {
    if (!req.body) return throwError(res, 400, `Must contain body!`)

    try {
        const { email, name } = req.body
        res.status(200).json(await db.user.create({ email, name }))
    } catch (err) {
        return err instanceof QueryError
            ? throwError(res, 400, err.message)
            : throwError(res, 500, 'Something wrong')
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return fetchAllUsers(req, res)
        case 'POST':
            return createUser(req, res)
        default:
            return throwError(res, 500, `Method not allowed!`)
    }
}
