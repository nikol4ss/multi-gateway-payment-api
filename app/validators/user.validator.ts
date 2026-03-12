import vine from '@vinejs/vine'

const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

export const signupValidator = vine.compile(
  vine.object({
    email: email().unique({ table: 'users', column: 'email' }),
    password: password(),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: email(),
    password: vine.string(),
  })
)

export const createUserValidator = vine.compile(
  vine.object({
    email: email().unique({ table: 'users', column: 'email' }),
    password: password(),
    role: vine.enum(['ADMIN', 'MANAGER', 'FINANCE', 'USER'] as const),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    email: email().optional(),
    password: password().optional(),
    role: vine.enum(['ADMIN', 'MANAGER', 'FINANCE', 'USER'] as const).optional(),
  })
)
