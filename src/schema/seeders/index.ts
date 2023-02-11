import { hash } from '@node-rs/bcrypt'
import { db } from '..'

export const seed = async () => {
    await db.user.findBy({ email: 'admin@example.com' }).orCreate({
        id: '04b0990b-dae9-4a18-ae8e-1b1937a1b6f0',
        name: 'Admin Sistem',
        email: 'admin@example.com',
        password: {
            create: {
                hash: await hash('secret'),
            },
        },
    })

    await db.$close()
}
