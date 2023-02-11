import { change } from 'rake-db'

change(async (db) => {
    await db.createTable('verificationToken', (t) => ({
        id: t.uuid().primaryKey(),
        token: t.text().unique(),
        expires: t.timestamp().nullable(),
        ...t.timestamps(),
    }))
})
