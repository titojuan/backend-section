const { Router } = require('express')
const {
  AuthMiddleware
  // ParseInMiddleware,
  // CacheMiddleware
} = require('../middlewares')

module.exports = function({ CommentController }) {
  const router = Router()

  router.get(
    '/:commentId/unique',
    [AuthMiddleware],
    CommentController.get
  )
  router.get(
    '/:ideaId',
    [AuthMiddleware],
    CommentController.getIdeaComments
  )
  router.post('/:ideaId', AuthMiddleware, CommentController.createComment)
  router.patch('/:commentId', AuthMiddleware, CommentController.update)
  router.delete('/:commentId', AuthMiddleware, CommentController.delete)

  return router
}
