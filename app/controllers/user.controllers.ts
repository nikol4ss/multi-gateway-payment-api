import UserService from '#services/user.service'
import UserTransformer from '#transformers/user.transformer'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * Gerencia o CRUD de usuários do sistema.
 * Listagem, criação, atualização e remoção de usuários.
 */
export default class UserController {
  private userService = new UserService()

  async index({ response }: HttpContext) {
    const users = await this.userService.findAll()
    return response.ok({ data: users.map((u) => new UserTransformer(u).toObject()) })
  }

  async show({ params, response }: HttpContext) {
    const user = await this.userService.findById(params.id)
    return response.ok({ data: new UserTransformer(user).toObject() })
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['email', 'password', 'role'])
    const user = await this.userService.create(data)
    return response.created({ data: new UserTransformer(user).toObject() })
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.only(['email', 'password', 'role'])
    const user = await this.userService.update(params.id, data)
    return response.ok({ data: new UserTransformer(user).toObject() })
  }

  async destroy({ params, response }: HttpContext) {
    await this.userService.delete(params.id)
    return response.ok({ message: 'User deleted successfully' })
  }
}
