import { raw } from 'pqb'
import { change } from 'rake-db'

change(async (db) => {
    await db.createTable('account', (t) => ({
        id: t.uuid().primaryKey().default(raw('gen_random_uuid()')),
        userId: t.uuid().foreignKey('user', 'id').index(),
        type: t.string(),
        provider: t.string(),
        providerAccountId: t.string(),
        refresh_token: t.string().nullable(),
        access_token: t.string().nullable(),
        expires_at: t.integer().nullable(),
        token_type: t.string().nullable(),
        scope: t.text().nullable(),
        id_token: t.string().nullable(),
        session_state: t.string().nullable(),
        oauth_token_secret: t.text().nullable(),
        oauth_token: t.text().nullable(),
        ...t.timestamps(),
        ...t.primaryKey(['provider', 'providerAccountId']),
    }))
})
