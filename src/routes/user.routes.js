const { Router } = require('express')
// const { CacheTimeHelper } = require('../helpers')
const {
  AuthMiddleware,
  ParseInMiddleware
  // CacheMiddleware
} = require('../middlewares')

module.exports = function({ UserController }) {
  const router = Router()

  /*
    RUTA PUBLICA
    router.get('', UserController.getAll)
  */

  // RUTAS PRIVADAS
  router.get('', [AuthMiddleware, ParseInMiddleware], UserController.getAll)
  router.get('/:userId', [AuthMiddleware], UserController.get)
  router.patch('/:userId', AuthMiddleware, UserController.update)
  router.delete('/:userId', AuthMiddleware, UserController.delete)

  return router
}
