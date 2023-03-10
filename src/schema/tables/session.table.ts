import { tableToZod } from 'orchid-orm-schema-to-zod'

import { BaseTable } from '../baseTable'

import { UserTable } from './user.table'

export class SessionTable extends BaseTable {
  table = 'session'
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey().default('gen_random_uuid()'),
    userId: t.uuid().foreignKey('user', 'id').index(),
    sessionToken: t.text().unique(),
    expires: t.timestamp(),
    ...t.timestamps(),
  }))

  relations = {
    user: this.belongsTo(() => UserTable, {
      primaryKey: 'id',
      foreignKey: 'userId',
    }),
  }
}

export type Session = SessionTable['columns']['type']

export const schema = tableToZod(SessionTable)
