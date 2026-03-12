import Gateway from '#models/gateway.model'
import Transaction from '#models/transaction.model'
import {
  default as GatewayOneService,
  default as GatewayTwoService,
} from './gateway_adapters/gateway_one/gateway_one.service.ts'

import type {
  ChargeDto,
  ChargeResponse,
  GatewayInterface,
} from '../../app/interfaces/gateway.interface.ts'

export default class GatewayService {
  private readonly gatewayMap: Record<number, GatewayInterface> = {
    1: new GatewayOneService(),
    2: new GatewayTwoService(),
  }

  private resolveGateway(gateway: Gateway): GatewayInterface {
    const service = this.gatewayMap[gateway.id]

    if (!service) {
      throw new Error(`Gateway not supported: ${gateway.name}`)
    }

    return service
  }

  async charge(data: ChargeDto): Promise<ChargeResponse & { gatewayId: number }> {
    const gateways = await Gateway.query().where('is_active', true).orderBy('priority', 'asc')

    for (const gateway of gateways) {
      try {
        const result = await this.resolveGateway(gateway).charge(data)

        return { ...result, gatewayId: gateway.id }
      } catch (error) {
        console.error(`Gateway ${gateway.name} failed:`, error.message)
        continue
      }
    }

    throw new Error('All gateways failed')
  }

  async refund(transactionId: number): Promise<void> {
    const transaction = await Transaction.findOrFail(transactionId)
    const gateway = await Gateway.findOrFail(transaction.gatewayId)
    await this.resolveGateway(gateway).refund(transaction.externalId)
  }
}
