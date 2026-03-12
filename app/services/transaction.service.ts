import Client from '#models/client.model'
import Product from '#models/product.model'
import Transaction from '#models/transaction.model'
import type { ChargeDto } from '../interfaces/gateway.interface.ts'
import { type CreateTransactionDto } from '../interfaces/transaction.interface.ts'
import GatewayService from './gateway.service.ts'

export default class TransactionService {
  private readonly gatewayService = new GatewayService()

  async readAll() {
    return Transaction.query().preload('client').preload('gateway').orderBy('created_at', 'desc')
  }

  async readById(id: number) {
    return Transaction.query()
      .where('id', id)
      .preload('client')
      .preload('gateway')
      .preload('products', (query) => {
        query.pivotColumns(['quantity'])
      })
      .firstOrFail()
  }

  async create(data: CreateTransactionDto) {
    const products = await Product.query().whereIn(
      'id',
      data.products.map((p) => p.id)
    )

    if (products.length !== data.products.length) {
      throw new Error('One or more products not found')
    }

    const amount = data.products.reduce((total, item) => {
      const product = products.find((p: Product) => p.id === item.id)!
      return total + product.amount * item.quantity
    }, 0)

    const client = await Client.firstOrCreate(
      { email: data.client.email },
      { name: data.client.name, email: data.client.email }
    )

    const chargeDto: ChargeDto = {
      amount,
      name: data.client.name,
      email: data.client.email,
      cardNumber: data.cardNumber,
      cvv: data.cvv,
    }

    const chargeResult = await this.gatewayService.charge(chargeDto)

    const transaction = await Transaction.create({
      clientId: client.id,
      gatewayId: chargeResult.gatewayId,
      externalId: chargeResult.externalId,
      status: chargeResult.status as 'pending' | 'paid' | 'refunded' | 'failed',
      amount,
      cardLastNumbers: chargeResult.cardLastNumbers,
    })

    const pivotData = data.products.reduce(
      (acc, item) => {
        acc[item.id] = { quantity: item.quantity }
        return acc
      },
      {} as Record<number, { quantity: number }>
    )

    await transaction.related('products').attach(pivotData)

    return this.readById(transaction.id)
  }

  async refund(id: number) {
    const transaction = await Transaction.findOrFail(id)

    if (transaction.status === 'refunded') {
      throw new Error('Transaction already refunded')
    }

    await this.gatewayService.refund(transaction.id)

    transaction.status = 'refunded'
    await transaction.save()

    return this.readById(transaction.id)
  }
}
