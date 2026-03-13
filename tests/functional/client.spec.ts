import Client from '#models/client.model'
import User from '#models/user.model'
import { test } from '@japa/runner'

test.group('Clients', (group) => {
  group.each.setup(async () => {
    await User.query().delete()
    await Client.query().delete()
  })

  test('should list all clients', async ({ client }) => {
    const admin = await User.create({
      email: 'admin@betalent.com',
      password: 'admin123',
      role: 'ADMIN',
    })

    const response = await client.get('/api/clients').loginAs(admin)

    response.assertStatus(200)
    response.assertBodyContains({ data: [] })
  })

  test('should show client details with transactions', async ({ client }) => {
    const admin = await User.create({
      email: 'admin@betalent.com',
      password: 'admin123',
      role: 'ADMIN',
    })
    const clientRecord = await Client.create({ name: 'João Silva', email: 'joao@email.com' })

    const response = await client.get(`/api/clients/${clientRecord.id}`).loginAs(admin)

    response.assertStatus(200)
    response.assertBodyContains({ data: { email: 'joao@email.com' } })
  })

  test('should return 404 for non-existing client', async ({ client }) => {
    const admin = await User.create({
      email: 'admin@betalent.com',
      password: 'admin123',
      role: 'ADMIN',
    })

    const response = await client.get('/api/clients/99999').loginAs(admin)

    response.assertStatus(404)
    response.assertBodyContains({ message: 'Resource not found' })
  })

  test('should not access clients with USER role', async ({ client }) => {
    const user = await User.create({
      email: 'user@betalent.com',
      password: 'user123',
      role: 'USER',
    })

    const response = await client.get('/api/clients').loginAs(user)

    response.assertStatus(403)
    response.assertBodyContains({ message: 'Access denied' })
  })
})
