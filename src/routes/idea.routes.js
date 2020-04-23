const { Router } = require('express')
// const { CacheTimeHelper } = require('../helpers')
const {
  AuthMiddleware,
  ParseInMiddleware
  // CacheMiddleware
} = require('../middlewares')

module.exports = function({ IdeaController }) {
  const router = Router()

  router.get('/', [AuthMiddleware, ParseInMiddleware], IdeaController.getAll)
  router.get('/:ideaId', [AuthMiddleware], IdeaController.get)
  router.get('/:userId/all', [AuthMiddleware], IdeaController.getUserIdeas)
  router.post('/', AuthMiddleware, IdeaController.create)
  router.patch('/:ideaId', AuthMiddleware, IdeaController.update)
  router.delete('/:ideaId', AuthMiddleware, IdeaController.delete)
  router.post('/:ideaId/upvote', AuthMiddleware, IdeaController.upvoteIdea)
  router.post('/:ideaId/downvote', AuthMiddleware, IdeaController.downvoteIdea)

  return router
}
