import type User from '#models/user.model'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    return this.pick(this.resource, ['id', 'email', 'role', 'createdAt', 'updatedAt'])
  }

  static serialize(user: User) {
    return new UserTransformer(user).toObject()
  }
}
