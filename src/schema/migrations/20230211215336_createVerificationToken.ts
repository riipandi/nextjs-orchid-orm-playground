import { raw } from 'pqb'
import { change } from 'rake-db'

change(async (db) => {
    await db.createTable('verificationToken', (t) => ({
        id: t.uuid().primaryKey().default(raw('gen_random_uuid()')),
        token: t.text().unique(),
        expires: t.timestamp().nullable(),
        ...t.timestamps(),
    }))
})
