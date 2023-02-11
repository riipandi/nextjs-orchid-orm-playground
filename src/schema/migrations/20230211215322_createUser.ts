import { change } from 'rake-db'

change(async (db) => {
    await db.createTable('user', (t) => ({
        id: t.uuid().primaryKey(),
        email: t.text().unique(),
        name: t.text(),
        emailVerified: t.timestamp().nullable(),
        ...t.timestamps(),
    }))
})
