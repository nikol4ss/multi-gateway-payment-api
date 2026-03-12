import UserTransformer from '#transformers/user.transformer'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * Obtém o usuário autenticado e retorna seus dados transformados.
 */
export default class ProfileController {
  async show({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    return response.ok({ data: new UserTransformer(user).toObject() })
  }
}
