import { raw } from 'pqb'
import { change } from 'rake-db'

change(async (db) => {
  await db.createTable('session', (t) => ({
    id: t.uuid().primaryKey().default(raw('gen_random_uuid()')),
    userId: t.uuid().foreignKey('user', 'id').index(),
    sessionToken: t.text().unique(),
    expires: t.timestamp(),
    ...t.timestamps(),
  }))
})
