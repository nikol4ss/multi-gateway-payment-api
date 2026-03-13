import Gateway from '#models/gateway.model'
import Product from '#models/product.model'
import User from '#models/user.model'
import { test } from '@japa/runner'

test.group('Transactions', (group) => {
  group.each.setup(async () => {
    await User.query().delete()
    await Product.query().delete()
  })

  test('should create a transaction', async ({ client }) => {
    const product = await Product.create({ name: 'Plano Basic', amount: 4990 })
    await Gateway.query().where('is_active', true).orderBy('priority', 'asc').firstOrFail()

    const response = await client.post('/api/purchases').json({
      products: [{ id: product.id, quantity: 1 }],
      client: { name: 'João Silva', email: 'joao@email.com' },
      cardNumber: '5569000000006063',
      cvv: '010',
    })

    response.assertStatus(201)
    response.assertBodyContains({ data: { status: 'paid' } })
  })

  test('should not create transaction with invalid card number', async ({ client }) => {
    const product = await Product.create({ name: 'Plano Basic', amount: 4990 })

    const response = await client.post('/api/purchases').json({
      products: [{ id: product.id, quantity: 1 }],
      client: { name: 'João Silva', email: 'joao@email.com' },
      cardNumber: '1234',
      cvv: '010',
    })

    response.assertStatus(422)
    response.assertBodyContains({ message: 'Validation error' })
  })

  test('should not create transaction with empty products', async ({ client }) => {
    const response = await client.post('/api/purchases').json({
      products: [],
      client: { name: 'João Silva', email: 'joao@email.com' },
      cardNumber: '5569000000006063',
      cvv: '010',
    })

    response.assertStatus(422)
    response.assertBodyContains({ message: 'Validation error' })
  })

  test('should list all transactions', async ({ client }) => {
    const admin = await User.create({
      email: 'admin@betalent.com',
      password: 'admin123',
      role: 'ADMIN',
    })

    const response = await client.get('/api/transactions').loginAs(admin)

    response.assertStatus(200)
    response.assertBodyContains({ data: [] })
  })

  test('should refund a transaction', async ({ client }) => {
    const admin = await User.create({
      email: 'admin@betalent.com',
      password: 'admin123',
      role: 'ADMIN',
    })
    const product = await Product.create({ name: 'Plano Basic', amount: 4990 })

    const purchase = await client.post('/api/purchases').json({
      products: [{ id: product.id, quantity: 1 }],
      client: { name: 'João Silva', email: 'joao@email.com' },
      cardNumber: '5569000000006063',
      cvv: '010',
    })

    const transactionId = purchase.body().data.id

    const response = await client.post(`/api/transactions/${transactionId}/refund`).loginAs(admin)

    response.assertStatus(200)
    response.assertBodyContains({ data: { status: 'refunded' } })
  })

  test('should not refund an already refunded transaction', async ({ client }) => {
    const admin = await User.create({
      email: 'admin@betalent.com',
      password: 'admin123',
      role: 'ADMIN',
    })
    const product = await Product.create({ name: 'Plano Basic', amount: 4990 })

    const purchase = await client.post('/api/purchases').json({
      products: [{ id: product.id, quantity: 1 }],
      client: { name: 'João Silva', email: 'joao@email.com' },
      cardNumber: '5569000000006063',
      cvv: '010',
    })

    const transactionId = purchase.body().data.id

    await client.post(`/api/transactions/${transactionId}/refund`).loginAs(admin)

    const response = await client.post(`/api/transactions/${transactionId}/refund`).loginAs(admin)

    response.assertStatus(400)
    response.assertBodyContains({ message: 'Transaction already refunded' })
  })

  test('should not access transactions with USER role', async ({ client }) => {
    const user = await User.create({
      email: 'user@betalent.com',
      password: 'user123',
      role: 'USER',
    })

    const response = await client.get('/api/transactions').loginAs(user)

    response.assertStatus(403)
    response.assertBodyContains({ message: 'Access denied' })
  })
})
