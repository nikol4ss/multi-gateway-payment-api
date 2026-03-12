export interface ChargeDto {
  name: string
  email: string
  amount: number
  cardNumber: string
  cvv: string
}

export interface ChargeResponse {
  externalId: string
  status: string
  cardLastNumbers: string
}

export interface GatewayInterface {
  charge(data: ChargeDto): Promise<ChargeResponse>
  refund(externalId: string): Promise<void>
}
