import Client from '#models/client.model'
import ClientTransformer from '#transformers/client.transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientController {
  async index({ response }: HttpContext) {
    const clients = await Client.query().orderBy('name', 'asc')
    const data = clients.map((client) => new ClientTransformer(client).toObject())
    return response.ok({ data })
  }

  async show({ params, response }: HttpContext) {
    const client = await Client.query()
      .where('id', params.id)
      .preload('transactions', (q) => q.preload('gateway').preload('products'))
      .firstOrFail()

    const transformer = new ClientTransformer(client)
    return response.ok({
      data: {
        ...transformer.toObject(),
        transactions: transformer.includeTransactions(),
      },
    })
  }
}
