import { orchidORM } from 'orchid-orm'

import { AccountTable } from './tables/account.table'
import { PasswordTable } from './tables/password.table'
import { SessionTable } from './tables/session.table'
import { UserTable } from './tables/user.table'
import { VerificationTokenTable } from './tables/verificationToken.table'
import { config } from './config'

export const db = orchidORM(config.database, {
  user: UserTable,
  password: PasswordTable,
  account: AccountTable,
  session: SessionTable,
  verificationToken: VerificationTokenTable,
})
