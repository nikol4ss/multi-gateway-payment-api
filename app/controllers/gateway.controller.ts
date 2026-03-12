import Gateway from '#models/gateway.model'
import GatewayTransformer from '#transformers/gateway.transformer'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * Permite ativar/desativar um gateway e atualizar sua prioridade
 * de acordo com o valor enviado.
 */
export default class GatewayController {
  async toggle({ params, response }: HttpContext) {
    const gateway = await Gateway.findOrFail(params.id)
    gateway.isActive = !gateway.isActive

    await gateway.save()
    return response.ok({ data: new GatewayTransformer(gateway).toObject() })
  }

  async priority({ params, request, response }: HttpContext) {
    const { priority } = request.only(['priority'])
    const gateway = await Gateway.findOrFail(params.id)
    gateway.priority = priority

    await gateway.save()
    return response.ok({ data: new GatewayTransformer(gateway).toObject() })
  }
}
