import Product from '#models/product.model'
import User from '#models/user.model'
import { test } from '@japa/runner'

test.group('Products', (group) => {
  group.each.setup(async () => {
    await Product.query().delete()
    await User.query().delete()
  })

  test('should list all products', async ({ client }) => {
    const admin = await User.create({
      email: 'admin@betalent.com',
      password: 'admin123',
      role: 'ADMIN',
    })
    await Product.createMany([
      { name: 'Plano Basic', amount: 4990 },
      { name: 'Plano Pro', amount: 9990 },
    ])

    const response = await client.get('/api/products').loginAs(admin)

    response.assertStatus(200)
    response.assertBodyContains({ data: [] })
  })

  test('should create a product', async ({ client }) => {
    const admin = await User.create({
      email: 'admin@betalent.com',
      password: 'admin123',
      role: 'ADMIN',
    })

    const response = await client.post('/api/products').loginAs(admin).json({
      name: 'Plano Basic',
      amount: 4990,
    })

    response.assertStatus(201)
    response.assertBodyContains({ data: { name: 'Plano Basic', amount: 4990 } })
  })

  test('should not create product with duplicate name', async ({ client }) => {
    const admin = await User.create({
      email: 'admin@betalent.com',
      password: 'admin123',
      role: 'ADMIN',
    })
    await Product.create({ name: 'Plano Basic', amount: 4990 })

    const response = await client.post('/api/products').loginAs(admin).json({
      name: 'Plano Basic',
      amount: 4990,
    })

    response.assertStatus(422)
    response.assertBodyContains({ message: 'Validation error' })
  })

  test('should not create product with decimal amount', async ({ client }) => {
    const admin = await User.create({
      email: 'admin@betalent.com',
      password: 'admin123',
      role: 'ADMIN',
    })

    const response = await client.post('/api/products').loginAs(admin).json({
      name: 'Plano Basic',
      amount: 49.9,
    })

    response.assertStatus(422)
    response.assertBodyContains({ message: 'Validation error' })
  })

  test('should update a product', async ({ client }) => {
    const admin = await User.create({
      email: 'admin@betalent.com',
      password: 'admin123',
      role: 'ADMIN',
    })
    const product = await Product.create({ name: 'Plano Basic', amount: 4990 })

    const response = await client.put(`/api/products/${product.id}`).loginAs(admin).json({
      name: 'Plano Basic Plus',
    })

    response.assertStatus(200)
    response.assertBodyContains({ data: { name: 'Plano Basic Plus' } })
  })

  test('should delete a product', async ({ client }) => {
    const admin = await User.create({
      email: 'admin@betalent.com',
      password: 'admin123',
      role: 'ADMIN',
    })
    const product = await Product.create({ name: 'Plano Basic', amount: 4990 })

    const response = await client.delete(`/api/products/${product.id}`).loginAs(admin)

    response.assertStatus(204)
  })

  test('should not access products without token', async ({ client }) => {
    const response = await client.get('/api/products')

    response.assertStatus(401)
    response.assertBodyContains({ message: 'Unauthorized' })
  })

  test('should not access products with USER role', async ({ client }) => {
    const user = await User.create({
      email: 'user@betalent.com',
      password: 'user123',
      role: 'USER',
    })

    const response = await client.get('/api/products').loginAs(user)

    response.assertStatus(403)
    response.assertBodyContains({ message: 'Access denied' })
  })
})
