import NextAuth from 'next-auth'

import { authOptions } from '@/libraries/auth/options'

export default NextAuth(authOptions)
