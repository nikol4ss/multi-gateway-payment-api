import TransactionService from '#services/transaction.service'
import TransactionTransformer from '#transformers/transaction.transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class TransactionController {
  private transactionService = new TransactionService()

  async index({ response }: HttpContext) {
    const transactions = await this.transactionService.readAll()
    return response.ok({ data: transactions.map((t) => new TransactionTransformer(t).toObject()) })
  }

  async show({ params, response }: HttpContext) {
    const transaction = await this.transactionService.readById(params.id)
    return response.ok({ data: new TransactionTransformer(transaction).toObject() })
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['products', 'client', 'cardNumber', 'cvv'])
    const transaction = await this.transactionService.create(data)
    return response.created({ data: new TransactionTransformer(transaction).toObject() })
  }

  async refund({ params, response }: HttpContext) {
    const transaction = await this.transactionService.refund(params.id)
    return response.ok({ data: new TransactionTransformer(transaction).toObject() })
  }
}
