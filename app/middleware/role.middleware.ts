import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RoleMiddleware {
  async handle(ctx: HttpContext, next: NextFn, allowedRoles: string[]) {
    const user = ctx.auth.getUserOrFail()

    if (!allowedRoles.includes(user.role)) {
      return ctx.response.forbidden({ message: 'Access denied' })
    }

    return next()
  }
}
