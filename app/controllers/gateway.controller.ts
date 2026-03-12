import Gateway from '#models/gateway.model'
import GatewayTransformer from '#transformers/gateway.transformer'
import { gatewayPriorityValidator } from '#validators/gateway.vallidator'
import type { HttpContext } from '@adonisjs/core/http'

export default class GatewayController {
  async toggle({ params, response }: HttpContext) {
    const gateway = await Gateway.findOrFail(params.id)
    gateway.isActive = !gateway.isActive
    await gateway.save()
    return response.ok({ data: new GatewayTransformer(gateway).toObject() })
  }

  async priority({ params, request, response }: HttpContext) {
    const { priority } = await request.validateUsing(gatewayPriorityValidator)
    const gateway = await Gateway.findOrFail(params.id)
    gateway.priority = priority
    await gateway.save()
    return response.ok({ data: new GatewayTransformer(gateway).toObject() })
  }
}
