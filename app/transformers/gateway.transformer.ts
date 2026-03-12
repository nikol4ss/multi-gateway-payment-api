import type Gateway from '#models/gateway.model'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class GatewayTransformer extends BaseTransformer<Gateway> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'name',
      'isActive',
      'priority',
      'createdAt',
      'updatedAt',
    ])
  }

  includeTransactions() {
    return (
      this.resource.transactions?.map((tx) => ({
        id: tx.id,
        amount: tx.amount,
        status: tx.status,
        gateway: { id: this.resource.id, name: this.resource.name },
        products: tx.products?.map((p) => ({ id: p.id, name: p.name })) || [],
      })) || []
    )
  }

  static serialize(gateway: Gateway) {
    return new GatewayTransformer(gateway).toObject()
  }
}
