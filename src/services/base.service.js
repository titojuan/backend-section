const { Functions } = require('../helpers')

const { responseError, responseSuccess } = Functions

class BaseService {
  constructor(repository) {
    this.repository = repository
  }

  async get(id) {
    if (!id) {
      throw responseError({
        status: 400,
        message: 'id must be sent'
      })
    }

    const currentEntity = await this.repository.get(id)

    if (!currentEntity) {
      throw responseError({
        status: 400,
        message: 'entity does not found'
      })
    }

    return responseSuccess({
      data: currentEntity
    })
  }

  async getAll(pageSize, pageNumber) {
    const data = await this.repository.getAll(pageSize, pageNumber)
    return responseSuccess({ data })
  }

  async create(entity) {
    const newEntity = await this.repository.create(entity)
    return responseSuccess({ data: newEntity, message: 'Created entity' })
  }

  async update(id, entity) {
    if (!id) {
      throw responseError({
        status: 400,
        message: 'id must be sent'
      })
    }

    const updateEntity = await this.repository.update(id, entity)
    return responseSuccess({ data: updateEntity, message: 'Updated entity' })
  }

  async delete(id) {
    if (!id) {
      throw responseError({
        status: 400,
        message: 'id must be sent'
      })
    }

    const deleteEntity = await this.repository.delete(id)
    return responseSuccess({ data: deleteEntity, message: 'Deleted entity' })
  }
}

module.exports = BaseService
