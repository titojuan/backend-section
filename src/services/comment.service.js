const BaseService = require('./base.service')
const { Functions } = require('../helpers')

let _commentRepository = null
let _ideaRepository = null

class CommentService extends BaseService {
  constructor({ CommentRepository, IdeaRepository }) {
    super(CommentRepository)
    _commentRepository = CommentRepository
    _ideaRepository = IdeaRepository
  }

  async getIdeaComments(ideaId) {
    if (!ideaId) {
      throw Functions.getError({
        status: 400,
        message: 'ideaId must be sent'
      })
    }

    const idea = await _ideaRepository.get(ideaId)

    if (!idea) {
      throw Functions.getError({
        status: 404,
        message: 'idea does not exists'
      })
    }

    const { comments } = idea
    return comments
  }

  async createComment(ideaId, comment) {
    if (!ideaId) {
      throw Functions.getError({
        status: 400,
        message: 'ideaId must be sent'
      })
    }

    const idea = await _ideaRepository.get(ideaId)

    if (!idea) {
      throw Functions.getError({
        status: 404,
        message: 'idea does not exists'
      })
    }

    const createdComment = await _commentRepository.create(comment)
    idea.comments.push(createdComment)

    return await _ideaRepository.update(ideaId, { comments: idea.comments })
  }
}

module.exports = CommentService
