import User from '#models/user.model'
import UserTransformer from '#transformers/user.transformer'
import { signupValidator } from '#validators/user.validator'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * Valida os dados e cria o usuário com access token.
 */
export default class NewAccountController {
  async store({ request, serialize }: HttpContext) {
    const { email, password } = await request.validateUsing(signupValidator)

    const user = await User.create({ email, password })
    const accessToken = await User.accessTokens.create(user)

    return serialize({
      user: new UserTransformer(user).toObject(),
      token: accessToken.value!.release(),
    })
  }
}
