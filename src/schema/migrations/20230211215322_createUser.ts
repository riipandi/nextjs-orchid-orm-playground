import { raw } from 'pqb'
import { change } from 'rake-db'

change(async (db) => {
    await db.createTable('user', (t) => ({
        id: t.uuid().primaryKey().default(raw('gen_random_uuid()')),
        email: t.text().unique(),
        name: t.text().nullable(),
        image: t.text().nullable(),
        emailVerified: t.timestamp().nullable(),
        ...t.timestamps(),
    }))
})
