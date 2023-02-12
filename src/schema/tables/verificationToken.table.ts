import { BaseTable } from '../baseTable'

export type VerificationToken = VerificationTokenTable['columns']['type']

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
