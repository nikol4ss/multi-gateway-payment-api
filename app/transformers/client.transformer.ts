import type Client from '#models/client.model'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class ClientTransformer extends BaseTransformer<Client> {
  toObject() {
    return this.pick(this.resource, ['id', 'name', 'email', 'createdAt', 'updatedAt'])
  }

  includeTransactions() {
    return (
      this.resource.transactions?.map((tx) => ({
        id: tx.id,
        amount: tx.amount,
        status: tx.status,
        gateway: tx.gateway ? { id: tx.gateway.id, name: tx.gateway.name } : null,
        products: tx.products?.map((p) => ({ id: p.id, name: p.name })) || [],
      })) || []
    )
  }
}
