import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { type QueryClientContract } from '@adonisjs/lucid/types/database'

import GatewaySeeder from './gateway_seed.js'
import ProductSeeder from './product_seed.js'
import UserSeeder from './user_seed.js'

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
