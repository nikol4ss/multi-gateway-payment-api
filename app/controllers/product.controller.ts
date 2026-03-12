import ProductService from '#services/product.service'
import ProductTransformer from '#transformers/product.transformer'
import { createProductValidator, updateProductValidator } from '#validators/product.validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductController {
  private productService = new ProductService()

  async index({ response }: HttpContext) {
    const products = await this.productService.readAll()
    return response.ok({ data: products.map((p) => new ProductTransformer(p).toObject()) })
  }

  async show({ params, response }: HttpContext) {
    const product = await this.productService.readById(Number(params.id))
    return response.ok({ data: new ProductTransformer(product).toObject() })
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createProductValidator)
    const product = await this.productService.create(data)
    return response.created({ data: new ProductTransformer(product).toObject() })
  }

  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(updateProductValidator)
    const product = await this.productService.update(Number(params.id), data)
    return response.ok({ data: new ProductTransformer(product).toObject() })
  }

  async destroy({ params, response }: HttpContext) {
    await this.productService.delete(Number(params.id))
    return response.noContent()
  }
}
