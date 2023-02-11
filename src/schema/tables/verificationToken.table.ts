import { BaseTable } from '../baseTable'

export type VerificationToken = VerificationTokenTable['columns']['type']

export class VerificationTokenTable extends BaseTable {
    table = 'verificationToken'
    columns = this.setColumns((t) => ({
        identifier: t.uuid().primaryKey(),
        token: t.text().unique(),
        expires: t.timestamp().nullable(),
        ...t.timestamps(),
    }))
}
