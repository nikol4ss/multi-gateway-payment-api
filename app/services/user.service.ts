import User from '#models/user.model'
import type { CreateUserDto, UpdateUserDto } from '../interfaces/user.interface.ts'

export default class UserService {
  async create(data: CreateUserDto) {
    return User.create(data)
  }

  async readAll() {
    return User.query().orderBy('created_at', 'desc')
  }

  async readById(id: number) {
    return User.findOrFail(id)
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await User.findOrFail(id)
    user.merge(data)
    await user.save()
    return user
  }

  async delete(id: number) {
    const user = await User.findOrFail(id)
    await user.delete()
  }
}
