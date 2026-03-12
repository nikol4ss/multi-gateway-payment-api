import type Transaction from '#models/transaction.model'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class TransactionTransformer extends BaseTransformer<Transaction> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'externalId',
        'status',
        'amount',
        'cardLastNumbers',
        'createdAt',
        'updatedAt',
      ]),
      client: this.resource.client
        ? this.pick(this.resource.client, ['id', 'name', 'email'])
        : { id: this.resource.clientId },
      gateway: this.resource.gateway
        ? this.pick(this.resource.gateway, ['id', 'name'])
        : { id: this.resource.gatewayId },
      products:
        this.resource.products?.map((p) => ({
          id: p.id,
          name: p.name,
          amount: p.amount,
          quantity: p.$extras.pivot_quantity,
        })) ?? [],
    }
  }
}
