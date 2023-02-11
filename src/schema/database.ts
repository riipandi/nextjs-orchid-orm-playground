import { orchidORM } from 'orchid-orm'
import { config } from './config'

import { UserTable } from './tables/user.table'
import { PasswordTable } from './tables/password.table'
import { AccountTable } from './tables/account.table'
import { SessionTable } from './tables/session.table'
import { VerificationTokenTable } from './tables/verificationToken.table'

export const db = orchidORM(config.database, {
    user: UserTable,
    password: PasswordTable,
    account: AccountTable,
    session: SessionTable,
    verificationToken: VerificationTokenTable,
})
