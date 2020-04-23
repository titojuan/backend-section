const { UserService } = require('../../../src/services')
const { Functions } = require('../../../src/helpers')
const {
  UserRepositoryMock,
  UserModelMock: { users, user }
} = require('../../mocks')

const { responseError, responseSuccess } = Functions

describe('User service test', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should return a user by id', async () => {
    const UserRepository = UserRepositoryMock
    UserRepository.get.mockReturnValue(user)

    const _userService = new UserService({ UserRepository })
    const expected = await _userService.get(user._id)

    expect(expected).toMatchObject(responseSuccess({ data: user }))
  })

  it('Should find a user by username', async () => {
    const UserRepository = UserRepositoryMock
    UserRepository.getUserByUsername.mockReturnValue(user)

    const _userService = new UserService({ UserRepository })
    const expected = await _userService.getUserByUsername(user.username)
    expect(expected).toMatchObject(user)
  })

  it('Should return a user collection', async () => {
    const UserRepository = UserRepositoryMock
    UserRepository.getAll.mockReturnValue(users)

    const _userService = new UserService({ UserRepository })
    const expected = await _userService.getAll()

    expect(expected).toMatchObject(responseSuccess({ data: users }))
  })

  it('Should update an especific user by id', async () => {
    const UserRepository = UserRepositoryMock
    UserRepository.update.mockReturnValue(user)

    const _userService = new UserService({ UserRepository })
    const expected = await _userService.update(user._id, {
      name: 'Juan Alexis'
    })

    expect(expected).toMatchObject(responseSuccess({ data: user, message: 'Updated entity' }))
  })

  it('Should delete an especific user by id', async () => {
    const UserRepository = UserRepositoryMock
    UserRepository.delete.mockReturnValue(true)

    const _userService = new UserService({ UserRepository })
    const expected = await _userService.delete(user._id)

    expect(expected).toMatchObject(responseSuccess({ data: true, message: 'Deleted entity' }))
  })
})
