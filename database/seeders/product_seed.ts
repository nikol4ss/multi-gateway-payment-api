import Product from '#models/product'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class ProductSeeder extends BaseSeeder {
  async run() {
    const products = [
      { name: 'Plano Basic', amount: 4990 }, // R$ 49,90
      { name: 'Plano Pro', amount: 9990 }, // R$ 99,90
      { name: 'Plano Enterprise', amount: 29990 }, // R$ 299,90
      { name: 'Suporte Premium', amount: 1990 }, // R$ 19,90
    ]

    for (const product of products) {
      await Product.updateOrCreate({ name: product.name }, product)
    }
  }
}
