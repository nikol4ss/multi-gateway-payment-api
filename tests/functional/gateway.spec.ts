import Gateway from '#models/gateway.model'
import User from '#models/user.model'
import { test } from '@japa/runner'

test.group('Gateways', (group) => {
  group.each.setup(async () => {
    await User.query().delete()
  })

  test('should toggle gateway status', async ({ client }) => {
    const admin = await User.create({
      email: 'admin@betalent.com',
      password: 'admin123',
      role: 'ADMIN',
    })
    const gateway = await Gateway.firstOrFail()
    const previousStatus = gateway.isActive

    const response = await client.patch(`/api/gateways/${gateway.id}/toggle`).loginAs(admin)

    response.assertStatus(200)
    response.assertBodyContains({ data: { isActive: !previousStatus } })
  })

  test('should update gateway priority', async ({ client }) => {
    const admin = await User.create({
      email: 'admin@betalent.com',
      password: 'admin123',
      role: 'ADMIN',
    })
    const gateway = await Gateway.firstOrFail()

    const response = await client
      .patch(`/api/gateways/${gateway.id}/priority`)
      .loginAs(admin)
      .json({ priority: 5 })

    response.assertStatus(200)
    response.assertBodyContains({ data: { priority: 5 } })
  })

  test('should not update gateway with invalid priority', async ({ client }) => {
    const admin = await User.create({
      email: 'admin@betalent.com',
      password: 'admin123',
      role: 'ADMIN',
    })
    const gateway = await Gateway.firstOrFail()

    const response = await client
      .patch(`/api/gateways/${gateway.id}/priority`)
      .loginAs(admin)
      .json({ priority: -1 })

    response.assertStatus(422)
    response.assertBodyContains({ message: 'Validation error' })
  })

  test('should not access gateways with FINANCE role', async ({ client }) => {
    const finance = await User.create({
      email: 'finance@betalent.com',
      password: 'finance123',
      role: 'FINANCE',
    })
    const gateway = await Gateway.firstOrFail()

    const response = await client.patch(`/api/gateways/${gateway.id}/toggle`).loginAs(finance)

    response.assertStatus(403)
    response.assertBodyContains({ message: 'Access denied' })
  })
})
