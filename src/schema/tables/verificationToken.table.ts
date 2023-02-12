import { tableToZod } from 'orchid-orm-schema-to-zod'

import { BaseTable } from '../baseTable'

export class VerificationTokenTable extends BaseTable {
  table = 'verificationToken'
  noPrimaryKey = true
  columns = this.setColumns((t) => ({
    identifier: t.text(),
    token: t.text().unique(),
    expires: t.timestamp(),
    ...t.timestamps(),
    ...t.primaryKey(['identifier', 'token']),
  }))
}

export type VerificationToken = VerificationTokenTable['columns']['type']

export const schema = tableToZod(VerificationTokenTable)
