const BaseService = require('./base.service')
const { Functions } = require('../helpers')

let _ideaRepository = null

class IdeaService extends BaseService {
  constructor({ IdeaRepository }) {
    super(IdeaRepository)
    _ideaRepository = IdeaRepository
  }

  async getUserIdeas(author) {
    if (!author) {
      throw Functions.getError({
        status: 400,
        message: 'userId must be sent'
      })
    }

    return await _ideaRepository.getUserIdeas(author)
  }

  async upvoteIdea(ideaId) {
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

    idea.upvotes.push(true)

    return await _ideaRepository.update(ideaId, { upvotes: idea.upvotes })
  }

  async downvoteIdea(ideaId) {
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

    idea.downvotes.push(false)

    return await _ideaRepository.update(ideaId, { downvotes: idea.downvotes })
  }
}

module.exports = IdeaService
