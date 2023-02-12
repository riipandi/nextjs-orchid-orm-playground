import type { NextApiRequest, NextApiResponse } from 'next'

import { throwError } from '@/utils/response'

type ResponseProps = {
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseProps>) {
  if (req.method !== 'GET') return throwError(res, 500, `Method not allowed!`)

  res.status(200).json({ message: 'All is well' })
}
