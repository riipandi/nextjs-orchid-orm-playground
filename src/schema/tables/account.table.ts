import { BaseTable } from '../baseTable'

import { UserTable } from './user.table'

export type Account = AccountTable['columns']['type']

export class AccountTable extends BaseTable {
  table = 'account'
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey().default('gen_random_uuid()'),
    userId: t.uuid().foreignKey('user', 'id').index(),
    type: t.text(),
    provider: t.text(),
    providerAccountId: t.text(),
    refresh_token: t.text().nullable(),
    access_token: t.text().nullable(),
    expires_at: t.integer().nullable(),
    token_type: t.text().nullable(),
    scope: t.text().nullable(),
    id_token: t.text().nullable(),
    session_state: t.text().nullable(),
    oauth_token_secret: t.text().nullable(),
    oauth_token: t.text().nullable(),
    ...t.timestamps(),
    ...t.primaryKey(['provider', 'providerAccountId']),
  }))

  relations = {
    user: this.belongsTo(() => UserTable, {
      primaryKey: 'id',
      foreignKey: 'userId',
    }),
  }
}
