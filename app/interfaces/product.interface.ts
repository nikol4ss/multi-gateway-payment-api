export interface CreateProductDto {
  name: string
  amount: number
}

export interface UpdateProductDto {
  name?: string
  amount?: number
}
