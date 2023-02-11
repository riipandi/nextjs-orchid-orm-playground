import { change } from 'rake-db'

change(async (db) => {
    await db.createTable('account', (t) => ({
        id: t.uuid().primaryKey(),
        userId: t.uuid().foreignKey('user', 'id').index(),
        type: t.string(),
        provider: t.string(),
        providerAccountId: t.string(),
        refreshToken: t.string().nullable(),
        accessToken: t.string().nullable(),
        expiresAt: t.timestamp().nullable(),
        tokenType: t.string().nullable(),
        scope: t.text().nullable(),
        idToken: t.string().nullable(),
        sessionState: t.string().nullable(),
        oauthToken: t.text().nullable(),
        oauthTokenSecret: t.text().nullable(),
        ...t.timestamps(),
    }))
})
