import User from '#models/user.model'
import UserTransformer from '#transformers/user.transformer'
import { loginValidator } from '#validators/user.validator'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * Controller responsável por autenticação baseada em access tokens.
 *
 * Permite login por credenciais e logout revogando o token.
 */
export default class AccessTokenController {
  async store({ request, serialize }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)
    const accessToken = await User.accessTokens.create(user)

    return serialize({
      user: UserTransformer.transform(user),
      token: accessToken.value!.release(),
    })
  }

  async destroy({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    if (user.currentAccessToken) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    }

    return {
      message: 'Logged out',
    }
  }
}
