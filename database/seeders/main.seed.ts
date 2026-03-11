import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { type QueryClientContract } from '@adonisjs/lucid/types/database'

import GatewaySeeder from './gateway.seed.ts'
import ProductSeeder from './product.seed.ts'
import UserSeeder from './user.seed.ts'

export default class MainSeeder extends BaseSeeder {
  private async seed(Seeder: { new (client: QueryClientContract): BaseSeeder }) {
    await new Seeder(this.client).run()
  }

  async run() {
    await this.seed(UserSeeder)
    await this.seed(GatewaySeeder)
    await this.seed(ProductSeeder)
  }
}
