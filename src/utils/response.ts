import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export interface ErrorResponse {
  code: number
  message: string
}

export function throwError(res: NextApiResponse<ErrorResponse>, code: number, message: string) {
  const state = JSON.stringify({ code, message })
  return res.status(code).json(JSON.parse(state))
}

export async function isAuthenticated(req: NextApiRequest): Promise<boolean> {
  return (await getSession({ req })) ? true : false
}
