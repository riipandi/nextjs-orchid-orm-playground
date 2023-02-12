import type { NextApiResponse } from 'next'

export interface ErrorResponse {
    code: number
    message: string
}

export function throwError(res: NextApiResponse<ErrorResponse>, code: number, message: string) {
    const state = JSON.stringify({ code, message })
    return res.status(code).json(JSON.parse(state))
}
