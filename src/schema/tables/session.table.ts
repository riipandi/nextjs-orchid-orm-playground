import { BaseTable } from '../baseTable'
import { UserTable } from './user.table'

export type Session = SessionTable['columns']['type']

export class SessionTable extends BaseTable {
    table = 'session'
    columns = this.setColumns((t) => ({
        id: t.uuid().primaryKey().default('gen_random_uuid()'),
        userId: t.uuid().foreignKey('user', 'id').index(),
        expires: t.timestamp().nullable(),
        sessiontoken: t.text().nullable(),
        ...t.timestamps(),
    }))

    relations = {
        user: this.belongsTo(() => UserTable, {
            primaryKey: 'id',
            foreignKey: 'userId',
        }),
    }
}
