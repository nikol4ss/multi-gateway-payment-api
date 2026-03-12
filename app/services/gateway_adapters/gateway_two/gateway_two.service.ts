import env from '#start/env'
import type {
  ChargeDto,
  ChargeResponse,
  GatewayInterface,
} from '../../../interfaces/gateway.interface.ts'
import type { GatewayTwoChargeResponse } from './gateway_two.interface.ts'

export default class GatewayTwoService implements GatewayInterface {
  private readonly baseUrl = env.get('GATEWAY2_URL')
  private readonly authToken = env.get('GATEWAY2_AUTH_TOKEN')
  private readonly authSecret = env.get('GATEWAY2_AUTH_SECRET')

  private get authHeaders() {
    return {
      'Content-Type': 'application/json',
      'Gateway-Auth-Token': this.authToken,
      'Gateway-Auth-Secret': this.authSecret,
    }
  }

  async charge(data: ChargeDto): Promise<ChargeResponse> {
    const response = await fetch(`${this.baseUrl}/gateway/transacoes`, {
      method: 'POST',
      headers: this.authHeaders,
      body: JSON.stringify({
        valor: data.amount,
        nome: data.name,
        email: data.email,
        numeroCartao: data.cardNumber,
        cvv: data.cvv,
      }),
    })

    if (!response.ok) {
      throw new Error('Gateway 2: charge failed')
    }

    const result = (await response.json()) as GatewayTwoChargeResponse

    return {
      externalId: result.id,
      status: result.status,
      cardLastNumbers: data.cardNumber.slice(-4),
    }
  }

  async refund(externalId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/gateway/transacoes/reembolso`, {
      method: 'POST',
      headers: this.authHeaders,
      body: JSON.stringify({ id: externalId }),
    })

    if (!response.ok) {
      throw new Error('Gateway 2: refund failed')
    }
  }
}
