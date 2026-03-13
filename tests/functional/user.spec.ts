import User from '#models/user.model'
import { test } from '@japa/runner'

test.group('Users', (group) => {
  group.each.setup(async () => {
    await User.query().delete()
  })

  test('should list all users', async ({ client }) => {
    const admin = await User.create({
      email: 'admin@betalent.com',
      password: 'admin123',
      role: 'ADMIN',
    })

    const response = await client.get('/api/users').loginAs(admin)

    response.assertStatus(200)
    response.assertBodyContains({ data: [] })
  })

  test('should create a user with role', async ({ client }) => {
    const admin = await User.create({
      email: 'admin@betalent.com',
      password: 'admin123',
      role: 'ADMIN',
    })

    const response = await client.post('/api/users').loginAs(admin).json({
      email: 'finance@betalent.com',
      password: 'finance123',
      role: 'FINANCE',
    })

    response.assertStatus(201)
    response.assertBodyContains({ data: { email: 'finance@betalent.com' } })
  })

  test('should not create user with invalid role', async ({ client }) => {
    const admin = await User.create({
      email: 'admin@betalent.com',
      password: 'admin123',
      role: 'ADMIN',
    })

    const response = await client.post('/api/users').loginAs(admin).json({
      email: 'test@betalent.com',
      password: 'test123',
      role: 'INVALID',
    })

    response.assertStatus(422)
    response.assertBodyContains({ message: 'Validation error' })
  })

  test('should not access users with FINANCE role', async ({ client }) => {
    const finance = await User.create({
      email: 'finance@betalent.com',
      password: 'finance123',
      role: 'FINANCE',
    })

    const response = await client.get('/api/users').loginAs(finance)

    response.assertStatus(403)
    response.assertBodyContains({ message: 'Access denied' })
  })

  test('should delete a user', async ({ client }) => {
    const admin = await User.create({
      email: 'admin@betalent.com',
      password: 'admin123',
      role: 'ADMIN',
    })
    const user = await User.create({
      email: 'user@betalent.com',
      password: 'user123',
      role: 'USER',
    })

    const response = await client.delete(`/api/users/${user.id}`).loginAs(admin)

    response.assertStatus(200)
    response.assertBodyContains({ message: 'User deleted successfully' })
  })
})
