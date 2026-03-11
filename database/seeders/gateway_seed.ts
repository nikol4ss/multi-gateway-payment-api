import Gateway from '#models/gateway'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class GatewaySeeder extends BaseSeeder {
  async run() {
    await Gateway.updateOrCreate(
      { name: 'Gateway 1' },
      {
        name: 'Gateway 1',
        isActive: true,
        priority: 1,
      }
    )

    await Gateway.updateOrCreate(
      { name: 'Gateway 2' },
      {
        name: 'Gateway 2',
        isActive: true,
        priority: 2,
      }
    )
  }
}
