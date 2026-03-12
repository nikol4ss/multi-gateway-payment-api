import ProductService from '#services/product.service'
import ProductTransformer from '#transformers/product.transformer'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * Gerencia o CRUD de produtos disponíveis para venda.
 */
export default class ProductController {
  private productService = new ProductService()

  async index({ response }: HttpContext) {
    const products = await this.productService.findAll()
    return response.ok({ data: products.map((p) => new ProductTransformer(p).toObject()) })
  }

  async show({ params, response }: HttpContext) {
    const product = await this.productService.findById(Number(params.id))
    return response.ok({ data: new ProductTransformer(product).toObject() })
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'amount'])
    const product = await this.productService.create(data)
    return response.created({ data: new ProductTransformer(product).toObject() })
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.only(['name', 'amount'])
    const product = await this.productService.update(Number(params.id), data)
    return response.ok({ data: new ProductTransformer(product).toObject() })
  }

  async destroy({ params, response }: HttpContext) {
    await this.productService.delete(Number(params.id))
    return response.noContent()
  }
}
