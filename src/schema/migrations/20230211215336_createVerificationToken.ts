import { change } from 'rake-db'

change(async (db) => {
  await db.createTable('verificationToken', { noPrimaryKey: true }, (t) => ({
    identifier: t.text(),
    token: t.text().unique(),
    expires: t.timestamp(),
    ...t.timestamps(),
    ...t.primaryKey(['identifier', 'token']),
  }))
})
