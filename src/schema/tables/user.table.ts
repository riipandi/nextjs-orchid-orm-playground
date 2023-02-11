import { BaseTable } from '../baseTable'
import { AccountTable } from './account.table'
import { PasswordTable } from './password.table'
import { SessionTable } from './session.table'

export type User = UserTable['columns']['type']

export class UserTable extends BaseTable {
    table = 'user'
    columns = this.setColumns((t) => ({
        id: t.uuid().primaryKey(),
        email: t.text().unique(),
        name: t.text(),
        emailVerified: t.timestamp().nullable(),
        ...t.timestamps(),
    }))

    relations = {
        password: this.hasOne(() => PasswordTable, {
            primaryKey: 'id',
            foreignKey: 'userId',
        }),
        account: this.hasMany(() => AccountTable, {
            primaryKey: 'id',
            foreignKey: 'userId',
        }),
        session: this.hasMany(() => SessionTable, {
            primaryKey: 'id',
            foreignKey: 'userId',
        }),
    }
}
