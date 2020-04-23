const { Router } = require('express')
// const { AuthMiddleware } = require('../middlewares')

module.exports = function({ HomeController }) {
  const router = Router()

  router.get('/', HomeController.index)

  return router
}
