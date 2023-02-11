import { BaseTable } from '../baseTable'

export type VerificationToken = VerificationTokenTable['columns']['type']

export class VerificationTokenTable extends BaseTable {
    table = 'verificationToken'
    columns = this.setColumns((t) => ({
        id: t.uuid().primaryKey().default('gen_random_uuid()'),
        token: t.text().unique(),
        expires: t.timestamp().nullable(),
        ...t.timestamps(),
    }))
}
