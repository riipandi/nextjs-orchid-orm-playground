import { rakeDb } from 'rake-db'
import { config } from './config'
import { appCodeUpdater } from 'orchid-orm'
import { join } from 'path'

rakeDb(config.database, {
    migrationsPath: join(__dirname, 'migrations'),
    appCodeUpdater: appCodeUpdater({
        tablePath: (tableName) => join(__dirname, `tables/${tableName}.table.ts`),
        baseTablePath: join(__dirname, 'baseTable.ts'),
        baseTableName: 'BaseTable',
        mainFilePath: join(__dirname, 'db.ts'),
    }),
    useCodeUpdater: true, // set to false to disable code updater
    commands: {
        async seed() {
            const { seed } = await import('./seeders')
            await seed()
        },
    },
})
