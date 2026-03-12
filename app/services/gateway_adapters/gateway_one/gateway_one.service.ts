import env from '#start/env'
import type {
  ChargeDto,
  ChargeResponse,
  GatewayInterface,
} from '../../../interfaces/gateway.interface.ts'
import type { GatewayOneChargeResponse, GatewayOneLoginResponse } from './gateway_one.interface.ts'

export default class GatewayOneService implements GatewayInterface {
  private readonly baseUrl = env.get('GATEWAY1_URL')
  private readonly email = env.get('GATEWAY1_EMAIL')
  private readonly token = env.get('GATEWAY1_TOKEN')
  private bearerToken: string = ''

  private async authenticate(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/gateway/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.email,
        token: this.token,
      }),
    })

    if (!response.ok) {
      throw new Error('Gateway 1: authentication failed')
    }

    const data = (await response.json()) as GatewayOneLoginResponse
    this.bearerToken = data.token
  }

  async charge(data: ChargeDto): Promise<ChargeResponse> {
    await this.authenticate()

    const response = await fetch(`${this.baseUrl}/gateway/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.bearerToken}`,
      },
      body: JSON.stringify({
        amount: data.amount,
        name: data.name,
        email: data.email,
        cardNumber: data.cardNumber,
        cvv: data.cvv,
      }),
    })

    if (!response.ok) {
      throw new Error('Gateway 1: charge failed')
    }

    const result = (await response.json()) as GatewayOneChargeResponse

    return {
      externalId: result.id,
      status: result.status,
      cardLastNumbers: data.cardNumber.slice(-4),
    }
  }

  async refund(externalId: string): Promise<void> {
    await this.authenticate()

    const response = await fetch(`${this.baseUrl}/gateway/transactions/${externalId}/charge_back`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.bearerToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Gateway 1: refund failed')
    }
  }
}
