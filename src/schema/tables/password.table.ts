import { BaseTable } from '../baseTable'

import { UserTable } from './user.table'

export type Password = PasswordTable['columns']['type']

export class PasswordTable extends BaseTable {
  table = 'password'
  noPrimaryKey = true
  columns = this.setColumns((t) => ({
    userId: t.uuid().foreignKey('user', 'id').index(),
    hash: t.text(),
    ...t.timestamps(),
  }))

  relations = {
    user: this.belongsTo(() => UserTable, {
      primaryKey: 'id',
      foreignKey: 'userId',
    }),
  }
}
