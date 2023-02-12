import { hash } from '@node-rs/bcrypt'

import { db } from '../database'

export const seed = async () => {
  await db.user.findBy({ email: 'admin@example.com' }).orCreate({
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
