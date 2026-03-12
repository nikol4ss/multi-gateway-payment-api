import vine from '@vinejs/vine'

export const createTransactionValidator = vine.compile(
  vine.object({
    products: vine
      .array(
        vine.object({
          id: vine.number().positive(),
          quantity: vine.number().min(1),
        })
      )
      .minLength(1),
    client: vine.object({
      name: vine.string().trim().minLength(3).maxLength(255),
      email: vine.string().email().maxLength(254),
    }),
    cardNumber: vine.string().regex(/^\d{16}$/),
    cvv: vine.string().regex(/^\d{3}$/),
  })
)
