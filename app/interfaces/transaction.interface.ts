export interface ProductInput {
  id: number
  quantity: number
}

export interface ClientInput {
  name: string
  email: string
}

export interface CreateTransactionDto {
  products: ProductInput[]
  client: ClientInput
  cardNumber: string
  cvv: string
}
