import User from '#models/user.model'
import UserTransformer from '#transformers/user.transformer'
import { signupValidator } from '#validators/user.validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class NewAccountController {
  async store({ request, serialize }: HttpContext) {
    const { fullName, email, password } = await request.validateUsing(signupValidator)

    const user = await User.create({ fullName, email, password })
    const token = await User.accessTokens.create(user)

    return serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }
}
