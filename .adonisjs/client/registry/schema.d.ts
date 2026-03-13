/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/api/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user.validator').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user.validator').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account.controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account.controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_token.store': {
    methods: ["POST"]
    pattern: '/api/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user.validator').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user.validator').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_token.controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_token.controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/auth/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile.controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile.controller').default['show']>>>
    }
  }
  'auth.access_token.destroy': {
    methods: ["DELETE"]
    pattern: '/api/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_token.controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_token.controller').default['destroy']>>>
    }
  }
  'transaction.store': {
    methods: ["POST"]
    pattern: '/api/purchases'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/transaction.validator').createTransactionValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/transaction.validator').createTransactionValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/transaction.controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/transaction.controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'gateway.toggle': {
    methods: ["PATCH"]
    pattern: '/api/gateways/:id/toggle'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/gateway.controller').default['toggle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/gateway.controller').default['toggle']>>>
    }
  }
  'gateway.priority': {
    methods: ["PATCH"]
    pattern: '/api/gateways/:id/priority'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/gateway.vallidator').gatewayPriorityValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/gateway.vallidator').gatewayPriorityValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/gateway.controller').default['priority']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/gateway.controller').default['priority']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'user.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user.controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user.controller').default['index']>>>
    }
  }
  'user.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user.controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user.controller').default['show']>>>
    }
  }
  'user.store': {
    methods: ["POST"]
    pattern: '/api/users'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user.validator').createUserValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user.validator').createUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user.controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user.controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'user.update': {
    methods: ["PUT"]
    pattern: '/api/users/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user.validator').updateUserValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/user.validator').updateUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user.controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user.controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'user.destroy': {
    methods: ["DELETE"]
    pattern: '/api/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user.controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user.controller').default['destroy']>>>
    }
  }
  'product.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/products'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/product.controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/product.controller').default['index']>>>
    }
  }
  'product.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/products/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/product.controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/product.controller').default['show']>>>
    }
  }
  'product.store': {
    methods: ["POST"]
    pattern: '/api/products'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/product.validator').createProductValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/product.validator').createProductValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/product.controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/product.controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'product.update': {
    methods: ["PUT"]
    pattern: '/api/products/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/product.validator').updateProductValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/product.validator').updateProductValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/product.controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/product.controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'product.destroy': {
    methods: ["DELETE"]
    pattern: '/api/products/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/product.controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/product.controller').default['destroy']>>>
    }
  }
  'client.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/clients'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/client.controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/client.controller').default['index']>>>
    }
  }
  'client.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/clients/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/client.controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/client.controller').default['show']>>>
    }
  }
  'transaction.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/transactions'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/transaction.controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/transaction.controller').default['index']>>>
    }
  }
  'transaction.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/transactions/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/transaction.controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/transaction.controller').default['show']>>>
    }
  }
  'transaction.refund': {
    methods: ["POST"]
    pattern: '/api/transactions/:id/refund'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/transaction.controller').default['refund']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/transaction.controller').default['refund']>>>
    }
  }
}
