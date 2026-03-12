/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    user: {
      store: typeof routes['auth.user.store']
    }
    accessToken: {
      store: typeof routes['auth.access_token.store']
      destroy: typeof routes['auth.access_token.destroy']
    }
    profile: {
      show: typeof routes['auth.profile.show']
    }
  }
  transaction: {
    store: typeof routes['transaction.store']
    index: typeof routes['transaction.index']
    show: typeof routes['transaction.show']
    refund: typeof routes['transaction.refund']
  }
  gateway: {
    toggle: typeof routes['gateway.toggle']
    priority: typeof routes['gateway.priority']
  }
  user: {
    index: typeof routes['user.index']
    show: typeof routes['user.show']
    store: typeof routes['user.store']
    update: typeof routes['user.update']
    destroy: typeof routes['user.destroy']
  }
  product: {
    index: typeof routes['product.index']
    show: typeof routes['product.show']
    store: typeof routes['product.store']
    update: typeof routes['product.update']
    destroy: typeof routes['product.destroy']
  }
  client: {
    index: typeof routes['client.index']
    show: typeof routes['client.show']
  }
}
