import type Product from '#models/product.model'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class ProductTransformer extends BaseTransformer<Product> {
  toObject() {
    return this.pick(this.resource, ['id', 'name', 'amount', 'createdAt', 'updatedAt'])
  }
}
