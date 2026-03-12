import vine from '@vinejs/vine'

export const gatewayPriorityValidator = vine.compile(
  vine.object({
    priority: vine.number().positive().min(1),
  })
)
