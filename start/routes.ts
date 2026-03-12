import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    // ─── Auth ───────────────────────────────────────────────────────────
    router
      .group(() => {
        router.post('signup', [controllers.User, 'store'])
        router.post('login', [controllers.AccessToken, 'store'])
        router.get('profile', [controllers.Profile, 'show']).use(middleware.auth())
        router.delete('logout', [controllers.AccessToken, 'destroy']).use(middleware.auth())
      })
      .prefix('auth')
      .as('auth')

    // ─── Compra (pública) ───────────────────────────────────────────────
    router.post('purchases', [controllers.Transaction, 'store'])

    // ─── Rotas privadas ─────────────────────────────────────────────────
    router
      .group(() => {
        // Gateways
        router.patch('gateways/:id/toggle', [controllers.Gateway, 'toggle'])
        router.patch('gateways/:id/priority', [controllers.Gateway, 'priority'])

        // Usuários
        router.get('users', [controllers.User, 'index'])
        router.get('users/:id', [controllers.User, 'show'])
        router.post('users', [controllers.User, 'store'])
        router.put('users/:id', [controllers.User, 'update'])
        router.delete('users/:id', [controllers.User, 'destroy'])

        // Produtos
        router.get('products', [controllers.Product, 'index'])
        router.get('products/:id', [controllers.Product, 'show'])
        router.post('products', [controllers.Product, 'store'])
        router.put('products/:id', [controllers.Product, 'update'])
        router.delete('products/:id', [controllers.Product, 'destroy'])

        // Clientes
        router.get('clients', [controllers.Client, 'index'])
        router.get('clients/:id', [controllers.Client, 'show'])

        // Transações
        router.get('transactions', [controllers.Transaction, 'index'])
        router.get('transactions/:id', [controllers.Transaction, 'show'])
        router.post('transactions/:id/refund', [controllers.Transaction, 'refund'])
      })
      .use(middleware.auth())
  })
  .prefix('/api')
