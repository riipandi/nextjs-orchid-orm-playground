import { BaseTable } from '../baseTable'
import { UserTable } from './user.table'

export type Account = AccountTable['columns']['type']

export class AccountTable extends BaseTable {
    table = 'account'
    columns = this.setColumns((t) => ({
        id: t.uuid().primaryKey(),
        userId: t.uuid().foreignKey('user', 'id').index(),
        type: t.text(),
        provider: t.text(),
        providerAccountId: t.text(),
        refreshToken: t.text().nullable(),
        accessToken: t.text().nullable(),
        expiresAt: t.timestamp().nullable(),
        tokenType: t.text().nullable(),
        scope: t.text().nullable(),
        idToken: t.text().nullable(),
        sessionState: t.text().nullable(),
        oauthToken: t.text().nullable(),
        oauthTokenSecret: t.text().nullable(),
        ...t.timestamps(),
    }))

    relations = {
        user: this.belongsTo(() => UserTable, {
            primaryKey: 'id',
            foreignKey: 'userId',
        }),
    }
}
