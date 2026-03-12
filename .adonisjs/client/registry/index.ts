/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.user.store': {
    methods: ["POST"],
    pattern: '/api/auth/signup',
    tokens: [{"old":"/api/auth/signup","type":0,"val":"api","end":""},{"old":"/api/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.user.store']['types'],
  },
  'auth.access_token.store': {
    methods: ["POST"],
    pattern: '/api/auth/login',
    tokens: [{"old":"/api/auth/login","type":0,"val":"api","end":""},{"old":"/api/auth/login","type":0,"val":"auth","end":""},{"old":"/api/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_token.store']['types'],
  },
  'auth.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/auth/profile',
    tokens: [{"old":"/api/auth/profile","type":0,"val":"api","end":""},{"old":"/api/auth/profile","type":0,"val":"auth","end":""},{"old":"/api/auth/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['auth.profile.show']['types'],
  },
  'auth.access_token.destroy': {
    methods: ["DELETE"],
    pattern: '/api/auth/logout',
    tokens: [{"old":"/api/auth/logout","type":0,"val":"api","end":""},{"old":"/api/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.access_token.destroy']['types'],
  },
  'transaction.store': {
    methods: ["POST"],
    pattern: '/api/purchases',
    tokens: [{"old":"/api/purchases","type":0,"val":"api","end":""},{"old":"/api/purchases","type":0,"val":"purchases","end":""}],
    types: placeholder as Registry['transaction.store']['types'],
  },
  'gateway.toggle': {
    methods: ["PATCH"],
    pattern: '/api/gateways/:id/toggle',
    tokens: [{"old":"/api/gateways/:id/toggle","type":0,"val":"api","end":""},{"old":"/api/gateways/:id/toggle","type":0,"val":"gateways","end":""},{"old":"/api/gateways/:id/toggle","type":1,"val":"id","end":""},{"old":"/api/gateways/:id/toggle","type":0,"val":"toggle","end":""}],
    types: placeholder as Registry['gateway.toggle']['types'],
  },
  'gateway.priority': {
    methods: ["PATCH"],
    pattern: '/api/gateways/:id/priority',
    tokens: [{"old":"/api/gateways/:id/priority","type":0,"val":"api","end":""},{"old":"/api/gateways/:id/priority","type":0,"val":"gateways","end":""},{"old":"/api/gateways/:id/priority","type":1,"val":"id","end":""},{"old":"/api/gateways/:id/priority","type":0,"val":"priority","end":""}],
    types: placeholder as Registry['gateway.priority']['types'],
  },
  'user.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/users',
    tokens: [{"old":"/api/users","type":0,"val":"api","end":""},{"old":"/api/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['user.index']['types'],
  },
  'user.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/users/:id',
    tokens: [{"old":"/api/users/:id","type":0,"val":"api","end":""},{"old":"/api/users/:id","type":0,"val":"users","end":""},{"old":"/api/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['user.show']['types'],
  },
  'user.store': {
    methods: ["POST"],
    pattern: '/api/users',
    tokens: [{"old":"/api/users","type":0,"val":"api","end":""},{"old":"/api/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['user.store']['types'],
  },
  'user.update': {
    methods: ["PUT"],
    pattern: '/api/users/:id',
    tokens: [{"old":"/api/users/:id","type":0,"val":"api","end":""},{"old":"/api/users/:id","type":0,"val":"users","end":""},{"old":"/api/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['user.update']['types'],
  },
  'user.destroy': {
    methods: ["DELETE"],
    pattern: '/api/users/:id',
    tokens: [{"old":"/api/users/:id","type":0,"val":"api","end":""},{"old":"/api/users/:id","type":0,"val":"users","end":""},{"old":"/api/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['user.destroy']['types'],
  },
  'product.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/products',
    tokens: [{"old":"/api/products","type":0,"val":"api","end":""},{"old":"/api/products","type":0,"val":"products","end":""}],
    types: placeholder as Registry['product.index']['types'],
  },
  'product.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/products/:id',
    tokens: [{"old":"/api/products/:id","type":0,"val":"api","end":""},{"old":"/api/products/:id","type":0,"val":"products","end":""},{"old":"/api/products/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['product.show']['types'],
  },
  'product.store': {
    methods: ["POST"],
    pattern: '/api/products',
    tokens: [{"old":"/api/products","type":0,"val":"api","end":""},{"old":"/api/products","type":0,"val":"products","end":""}],
    types: placeholder as Registry['product.store']['types'],
  },
  'product.update': {
    methods: ["PUT"],
    pattern: '/api/products/:id',
    tokens: [{"old":"/api/products/:id","type":0,"val":"api","end":""},{"old":"/api/products/:id","type":0,"val":"products","end":""},{"old":"/api/products/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['product.update']['types'],
  },
  'product.destroy': {
    methods: ["DELETE"],
    pattern: '/api/products/:id',
    tokens: [{"old":"/api/products/:id","type":0,"val":"api","end":""},{"old":"/api/products/:id","type":0,"val":"products","end":""},{"old":"/api/products/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['product.destroy']['types'],
  },
  'client.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/clients',
    tokens: [{"old":"/api/clients","type":0,"val":"api","end":""},{"old":"/api/clients","type":0,"val":"clients","end":""}],
    types: placeholder as Registry['client.index']['types'],
  },
  'client.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/clients/:id',
    tokens: [{"old":"/api/clients/:id","type":0,"val":"api","end":""},{"old":"/api/clients/:id","type":0,"val":"clients","end":""},{"old":"/api/clients/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['client.show']['types'],
  },
  'transaction.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/transactions',
    tokens: [{"old":"/api/transactions","type":0,"val":"api","end":""},{"old":"/api/transactions","type":0,"val":"transactions","end":""}],
    types: placeholder as Registry['transaction.index']['types'],
  },
  'transaction.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/transactions/:id',
    tokens: [{"old":"/api/transactions/:id","type":0,"val":"api","end":""},{"old":"/api/transactions/:id","type":0,"val":"transactions","end":""},{"old":"/api/transactions/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['transaction.show']['types'],
  },
  'transaction.refund': {
    methods: ["POST"],
    pattern: '/api/transactions/:id/refund',
    tokens: [{"old":"/api/transactions/:id/refund","type":0,"val":"api","end":""},{"old":"/api/transactions/:id/refund","type":0,"val":"transactions","end":""},{"old":"/api/transactions/:id/refund","type":1,"val":"id","end":""},{"old":"/api/transactions/:id/refund","type":0,"val":"refund","end":""}],
    types: placeholder as Registry['transaction.refund']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
