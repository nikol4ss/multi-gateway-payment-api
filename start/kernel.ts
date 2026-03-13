import router from '@adonisjs/core/services/router'
import server from '@adonisjs/core/services/server'

server.errorHandler(() => import('#exceptions/handler'))

server.use([
  () => import('#middleware/force_json_response.middleware'),
  () => import('#middleware/container_bindings.middleware'),
  () => import('@adonisjs/cors/cors_middleware'),
])

router.use([
  () => import('@adonisjs/core/bodyparser_middleware'),
  () => import('@adonisjs/session/session_middleware'),
  () => import('@adonisjs/shield/shield_middleware'),
  () => import('@adonisjs/auth/initialize_auth_middleware'),
  () => import('#middleware/silent_auth.middleware'),
])

export const middleware = router.named({
  role: () => import('#middleware/role.middleware'),
  auth: () => import('#middleware/auth.middleware'),
})
