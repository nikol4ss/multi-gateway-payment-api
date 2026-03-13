import User from '#models/user.model'
import { test } from '@japa/runner'

test.group('Auth', (group) => {
  group.each.setup(async () => {
    await User.query().delete()
  })

  test('should create a new account', async ({ client }) => {
    const response = await client.post('/api/auth/signup').json({
      email: 'test@betalent.com',
      password: 'password123',
    })

    response.assertStatus(200)
    response.assertBodyContains({ user: { email: 'test@betalent.com' } })
    response.assertBodyContains({ token: '' })
  })

  test('should not create account with duplicate email', async ({ client }) => {
    await User.create({ email: 'test@betalent.com', password: 'password123' })

    const response = await client.post('/api/auth/signup').json({
      email: 'test@betalent.com',
      password: 'password123',
    })

    response.assertStatus(422)
    response.assertBodyContains({ message: 'Validation error' })
  })

  test('should not create account with short password', async ({ client }) => {
    const response = await client.post('/api/auth/signup').json({
      email: 'test@betalent.com',
      password: '123',
    })

    response.assertStatus(422)
    response.assertBodyContains({ message: 'Validation error' })
  })

  test('should login with valid credentials', async ({ client }) => {
    await User.create({ email: 'test@betalent.com', password: 'password123' })

    const response = await client.post('/api/auth/login').json({
      email: 'test@betalent.com',
      password: 'password123',
    })

    response.assertStatus(200)
    response.assertBodyContains({ user: { email: 'test@betalent.com' } })
  })

  test('should not login with invalid credentials', async ({ client }) => {
    await User.create({ email: 'test@betalent.com', password: 'password123' })

    const response = await client.post('/api/auth/login').json({
      email: 'test@betalent.com',
      password: 'wrongpassword',
    })

    response.assertStatus(401)
    response.assertBodyContains({ message: 'Invalid credentials' })
  })

  test('should return profile of authenticated user', async ({ client }) => {
    const user = await User.create({ email: 'test@betalent.com', password: 'password123' })

    const response = await client.get('/api/auth/profile').loginAs(user)

    response.assertStatus(200)
    response.assertBodyContains({ data: { email: 'test@betalent.com' } })
  })

  test('should not return profile without token', async ({ client }) => {
    const response = await client.get('/api/auth/profile')

    response.assertStatus(401)
    response.assertBodyContains({ message: 'Unauthorized' })
  })

  test('should logout authenticated user', async ({ client }) => {
    const user = await User.create({ email: 'test@betalent.com', password: 'password123' })

    const response = await client.delete('/api/auth/logout').loginAs(user)

    response.assertStatus(200)
    response.assertBodyContains({ message: 'Logged out' })
  })
})
