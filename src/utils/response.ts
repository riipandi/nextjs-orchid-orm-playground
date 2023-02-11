import type { NextApiResponse } from 'next'

export function throwError(res: NextApiResponse, code: number, message: string) {
    const state = JSON.stringify({ error: true, message: message, code: code })
    return res.status(code).json(JSON.parse(state))
}
