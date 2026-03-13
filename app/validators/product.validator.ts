import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .minLength(3)
      .maxLength(255)
      .unique({ table: 'products', column: 'name' }),
    amount: vine.number().positive().min(1).withoutDecimals(),
  })
)

export const updateProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255).optional(),
    amount: vine.number().positive().min(1).optional(),
  })
)
