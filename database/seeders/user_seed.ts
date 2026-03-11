import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class UserSeeder extends BaseSeeder {
  async run() {
    await User.updateOrCreate(
      { email: 'admin@betalent.com' },
      {
        email: 'admin@betalent.com',
        password: 'admin123',
        role: 'ADMIN',
      }
    )

    await User.updateOrCreate(
      { email: 'manager@betalent.com' },
      {
        email: 'manager@betalent.com',
        password: 'manager123',
        role: 'MANAGER',
      }
    )

    await User.updateOrCreate(
      { email: 'finance@betalent.com' },
      {
        email: 'finance@betalent.com',
        password: 'finance123',
        role: 'FINANCE',
      }
    )
  }
}
