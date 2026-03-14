import { errors as authErrors } from '@adonisjs/auth'
import { type HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { errors as lucidErrors } from '@adonisjs/lucid'
import { errors as vineErrors } from '@vinejs/vine'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction

  async handle(error: unknown, ctx: HttpContext) {
    // 401 — não autenticado
    if (error instanceof authErrors.E_UNAUTHORIZED_ACCESS) {
      return ctx.response.unauthorized({ message: 'Unauthorized' })
    }

    // 401 — credenciais inválidas
    if (error instanceof authErrors.E_INVALID_CREDENTIALS) {
      return ctx.response.unauthorized({ message: 'Invalid credentials' })
    }

    // 404 — recurso não encontrado
    if (error instanceof lucidErrors.E_ROW_NOT_FOUND) {
      return ctx.response.notFound({ message: 'Resource not found' })
    }

    // 422 — erro de validação
    if (error instanceof vineErrors.E_VALIDATION_ERROR) {
      return ctx.response.unprocessableEntity({
        message: 'Validation error',
        errors: error.messages,
      })
    }

    if (error instanceof Error && error.message.includes('gateways_priority_unique')) {
      return ctx.response.conflict({ message: 'Priority already in use' })
    }

    // 403 — sem permissão
    if (error instanceof Error && error.message === 'Access denied') {
      return ctx.response.forbidden({ message: 'Access denied' })
    }

    // 400 — erros de negócio conhecidos
    if (error instanceof Error) {
      const businessErrors = [
        'Transaction already refunded',
        'One or more products not found',
        'All gateways failed',
      ]

      if (businessErrors.includes(error.message)) {
        return ctx.response.badRequest({ message: error.message })
      }
    }

    // 500 — erro interno
    return ctx.response.internalServerError({ message: 'Internal server error' })
  }

  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
