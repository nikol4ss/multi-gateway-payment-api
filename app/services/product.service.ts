import Product from '#models/product.model'
import type { CreateProductDto, UpdateProductDto } from '../interfaces/product.interface.ts'

export default class ProductService {
  async create(data: CreateProductDto) {
    return Product.create(data)
  }

  async readAll() {
    return Product.query().orderBy('name', 'asc')
  }

  async readById(id: number) {
    return Product.findOrFail(id)
  }

  async update(id: number, data: UpdateProductDto) {
    const product = await Product.findOrFail(id)
    product.merge(data)
    await product.save()
    return product
  }

  async delete(id: number) {
    const product = await Product.findOrFail(id)
    await product.delete()
  }
}
