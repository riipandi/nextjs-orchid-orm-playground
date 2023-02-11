import { change } from 'rake-db'

change(async (db) => {
    await db.createTable('password', { noPrimaryKey: true }, (t) => ({
        userId: t.uuid().foreignKey('user', 'id').index(),
        hash: t.text(),
        ...t.timestamps(),
    }))
})
