import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.profile.show': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'transaction.store': { paramsTuple?: []; params?: {} }
    'gateway.toggle': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gateway.priority': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user.index': { paramsTuple?: []; params?: {} }
    'user.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user.store': { paramsTuple?: []; params?: {} }
    'user.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.index': { paramsTuple?: []; params?: {} }
    'product.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.store': { paramsTuple?: []; params?: {} }
    'product.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client.index': { paramsTuple?: []; params?: {} }
    'client.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'transaction.index': { paramsTuple?: []; params?: {} }
    'transaction.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'transaction.refund': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'auth.profile.show': { paramsTuple?: []; params?: {} }
    'user.index': { paramsTuple?: []; params?: {} }
    'user.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.index': { paramsTuple?: []; params?: {} }
    'product.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client.index': { paramsTuple?: []; params?: {} }
    'client.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'transaction.index': { paramsTuple?: []; params?: {} }
    'transaction.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'auth.profile.show': { paramsTuple?: []; params?: {} }
    'user.index': { paramsTuple?: []; params?: {} }
    'user.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.index': { paramsTuple?: []; params?: {} }
    'product.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client.index': { paramsTuple?: []; params?: {} }
    'client.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'transaction.index': { paramsTuple?: []; params?: {} }
    'transaction.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'transaction.store': { paramsTuple?: []; params?: {} }
    'user.store': { paramsTuple?: []; params?: {} }
    'product.store': { paramsTuple?: []; params?: {} }
    'transaction.refund': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'user.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'gateway.toggle': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gateway.priority': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PUT: {
    'user.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}