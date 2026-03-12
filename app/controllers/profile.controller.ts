import UserTransformer from '#transformers/user.transformer'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * Controller responsável por retornar o perfil do usuário autenticado.
 *
 * Obtém o usuário autenticado e retorna seus dados transformados.
 */
export default class ProfileController {
  async show({ auth, serialize }: HttpContext) {
    return serialize(UserTransformer.transform(auth.getUserOrFail()))
  }
}
