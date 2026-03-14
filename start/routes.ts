import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessToken, 'store'])
        router.get('profile', [controllers.Profile, 'show']).use(middleware.auth())
        router.delete('logout', [controllers.AccessToken, 'destroy']).use(middleware.auth())
      })
      .prefix('auth')
      .as('auth')

    // public
    router.post('purchases', [controllers.Transaction, 'store'])

    // private
    router
      .group(() => {
        router.patch('gateways/:id/toggle', [controllers.Gateway, 'toggle'])
        router.patch('gateways/:id/priority', [controllers.Gateway, 'priority'])

        router.get('users', [controllers.User, 'index'])
        router.get('users/:id', [controllers.User, 'show'])
        router.post('users', [controllers.User, 'store'])
        router.put('users/:id', [controllers.User, 'update'])
        router.delete('users/:id', [controllers.User, 'destroy'])

        router.get('products', [controllers.Product, 'index'])
        router.get('products/:id', [controllers.Product, 'show'])
        router.post('products', [controllers.Product, 'store'])
        router.put('products/:id', [controllers.Product, 'update'])
        router.delete('products/:id', [controllers.Product, 'destroy'])

        router.get('clients', [controllers.Client, 'index'])
        router.get('clients/:id', [controllers.Client, 'show'])

        router.get('transactions', [controllers.Transaction, 'index'])
        router.get('transactions/:id', [controllers.Transaction, 'show'])
        router.post('transactions/:id/refund', [controllers.Transaction, 'refund'])
      })
      .use(middleware.auth())
  })
  .prefix('/api')
