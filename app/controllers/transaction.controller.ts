import TransactionService from '#services/transaction.service'
import TransactionTransformer from '#transformers/transaction.transformer'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * Gerencia o ciclo de vida das transações:
 * listagem, detalhes, criação via gateway e reembolso.
 */
export default class TransactionController {
  private transactionService = new TransactionService()

  async index({ response }: HttpContext) {
    const transactions = await this.transactionService.findAll()
    return response.ok({ data: transactions.map((t) => new TransactionTransformer(t).toObject()) })
  }

  async show({ params, response }: HttpContext) {
    const transaction = await this.transactionService.findById(params.id)
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
